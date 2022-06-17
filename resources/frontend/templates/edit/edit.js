import React, { useEffect, useState } from 'react';
import axios from 'axios';
import pluralize from 'pluralize';
import { navigate } from '@reach/router';
import PropTypes from 'prop-types';
import { Field, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';

import { Tabs } from '../../plugins/react-tabs';
import Textarea from '../../components/form/textarea/textarea';
import Datepicker from "../../components/form/datepicker/datepicker";
import Checkbox from '../../components/form/checkbox/checkbox';
import Button from '../../components/button/button';
import TranslatableContent from '../../components/translatable-content/translatable-content';

import RichText from '../../components/form/rich-text/rich-text';
import TextField from '../../components/form/text-field/text-field';
import SingleFileUpload from '../../components/form/single-file-upload/single-file-upload';
import Order from "../../components/form/order/order";
import MultiSelect from "../../components/form/multi-select/multi-select";

import getFieldLabel from '../../utils/getFieldLabel';
import toSnakeCase from '../../utils/toSnakeCase';
import validationRules from '../../utils/validationRules';
import collectFormData from '../../utils/collectFormData';
import populateEditFormFields from '../../utils/populateEditFormFields';

import styles from './edit.module.scss';
import getFieldName from "../../utils/getFieldName";


const Edit = ({ id, crudKey, fields, title, translatableFields, requiredFields }) => {
    const { i18n, t } = useTranslation();
    const [itemData, setItemData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    // FIXME: This gotta be an array
    //  const [existingImage, setExistingImage] = useState(null)

    const validate = (values) =>
        validationRules(values, requiredFields, fields, translatableFields, t);

    const submit = (values, { setFieldError, setSubmitting, setFieldValue }) => {
        setSubmitting(true);

        const formData = collectFormData(values, fields, translatableFields, i18n);

        formData.append('_method', 'put');

        axios
            .post(`/api/${pluralize(crudKey)}/${id}`, formData)
            .then((response) => {
                if (response.status === 200) {
                    navigate(`/admin/${pluralize(crudKey)}`);
                }
            })
            .catch((error) => {
                // TODO: make this dynamic
                setFieldError('name', t(`admin:${error.response.data}`));
            });
    };

    const [dataNeededObj, setDataNeededObj] = useState(null);

    useEffect(() => {
        axios.get(`/api/${pluralize(crudKey)}/${id}/edit`).then((response) => {
            if (response.data.id) {
                setItemData(
                    populateEditFormFields(fields, translatableFields, i18n, response.data),
                );
            } else {
                setItemData(
                    populateEditFormFields(
                        fields,
                        translatableFields,
                        i18n,
                        response.data[toSnakeCase(crudKey)],
                    ),
                );
            }
            fields
                .filter((field) => field.type === 'select')
                .map((selectField) => {
                    setDataNeededObj((prevState) => ({
                        ...prevState,
                        [pluralize(selectField.name)]: response.data[pluralize(selectField.name)].map((field) => ({
                            value: field.id,
                            label: field.name
                        })),
                    }));
                });
            if (fields.find((field) => field.type === 'multiselect')) {
                fields
                    .filter((field) => field.type === 'multiselect')
                    .map((selectField) => {
                        setDataNeededObj((prevState) => ({
                            ...prevState,
                            [pluralize(selectField.name)]: response.data[pluralize(selectField.name)].map((field) => ({
                                value: field.id, label: field.name
                            })),
                        }));
                    });
            }
            if (fields.find((field) => field.type === 'order')) {
                setDataNeededObj((prevState) => ({
                    ...prevState,
                    'relative': response.data[pluralize(crudKey)].map((field) => ({
                        value: field.order, label: field.name
                    })),
                }));
            }
            //TODO: think about this:
            setIsLoading(false);
        });
    }, []);

    const formikHandler = (i, handleChange, values, setFieldValue, errors, locale = '') => {
        switch (i.type) {
            case 'input':
                return (
                    <TextField
                        label={getFieldLabel(t, i.label, i.name, requiredFields)}
                        name={locale ? `${locale}_${i.name}` : i.name}
                        type={i.type}
                        onChange={handleChange}
                        value={values[locale ? `${locale}_${i.name}` : i.name]}
                        autoComplete={i.autoComplete ? i.autoComplete : false}
                        error={errors[locale ? `${locale}_${i.name}` : i.name]}
                    />
                );
            case 'checkbox':
                return (
                    <Checkbox
                        name={i.name}
                        label={getFieldLabel(t, i.label, i.name, requiredFields)}
                        checked={values[i.name]}
                        onChange={() => setFieldValue('accept', !values.accept)}
                        value={i.value}
                    />
                );
            case 'select':
                const handleNestedSelectChange = async (value) => {
                    if (i.child) {
                        const result = await axios.get(`/api/${pluralize(crudKey)}/${value}?parent=${i.name}`);
                        const opts = result.data[pluralize(i.child)].map(opt => {
                            const o = Object.assign({}, opt);
                            //TODO: id, name keys dynamic for more complex cases in future
                            o.label = opt.name;
                            o.value = opt.id;
                            return o;
                        });
                        setDataNeededObj((prevState) => ({
                            ...prevState,
                            [pluralize(i.child)]: [...opts]
                        }));
                        setFieldValue(`${i.child}_id`, false);
                    }
                    setFieldValue(`${i.name}_id`, value);
                };

                return (
                    dataNeededObj &&
                    dataNeededObj[pluralize(i.name)] && (
                        <Field
                            component={Select}
                            options={dataNeededObj[pluralize(i.name)]}
                            placeholder={t(`admin:${i.placeholder ? i.placeholder : i.name}`)}
                            onChange={(option) => handleNestedSelectChange(option.value)}
                            value={dataNeededObj[pluralize(i.name)].find(
                                (option) => option.value === parseInt(values[`${i.name}_id`]),
                            ) || false}
                        />
                    )
                );
            case 'multiselect':
                const getOptionIds = (options) => {
                    const option_ids = [];
                    options.forEach(opt =>
                        option_ids.push(opt.value||opt.id||opt)
                    );
                    return option_ids;
                };
                const handleMultiSelectChange = async (options) => {
                    const option_ids = getOptionIds(options);
                    setFieldValue(`${i.name}_ids`, options);
                    if (i.child) {
                        const result = await axios.get(`/api/${pluralize(crudKey)}/${JSON.stringify(option_ids)}?parent=${i.name}`);
                        const opts = result.data[pluralize(i.child)].map(opt => {
                            const o = Object.assign({}, opt);
                            //TODO: id, name keys dynamic for more complex cases in future
                            o.label = opt.name;
                            o.value = opt.id;
                            return o;
                        });
                        setDataNeededObj((prevState) => ({
                            ...prevState,
                            [pluralize(i.child)]: [...opts]
                        }));
                        //FIXME: check child field type
                        //FIXME: should not clear selections
                        setFieldValue(`${i.child}_ids`, []);
                    }
                };
                return (
                    dataNeededObj &&
                    dataNeededObj[pluralize(i.name)] && (
                        <MultiSelect
                            options={dataNeededObj[pluralize(i.name)]}
                            placeholder={t(`admin:${i.placeholder ? i.placeholder : i.name}`)}
                            fieldName={`${i.name}_ids`}
                            setFieldValue={setFieldValue}
                            onChange={(option) => handleMultiSelectChange(option)}
                            values={values[`${i.name}_ids`].length ?
                                dataNeededObj[pluralize(i.name)].filter(
                                    (option) => getOptionIds(values[`${i.name}_ids`]).includes(option.value)
                                )
                                : []}
                        />
                    )
                );
            case 'textarea':
                return (
                    <Textarea
                        label={getFieldLabel(t, i.label, i.name, requiredFields)}
                        onChange={handleChange}
                        name={getFieldName(locale, i.name, i.type)}
                        value={values[locale ? `${locale}_${i.name}` : i.name]}
                    />
                );
            case 'datepicker':
                return (
                    <Datepicker
                        fieldName={locale ? `${locale}_${i.name}` : i.name}
                        name={locale ? t(`admin:${locale}_${i.name}`) : t(`admin:${i.name}`)}
                        type={i.type}
                        setFieldValue={setFieldValue}
                        value={values[locale ? `${locale}_${i.name}` : i.name]}
                        autoComplete={i.autoComplete ? i.autoComplete : false}
                        error={errors[locale ? `${locale}_${i.name}` : i.name]}
                    />
                );
            case 'richText':
                return locale ? (
                    <>
                        <label className={styles.label}>
                            {getFieldLabel(t, i.label, i.name, requiredFields)}
                        </label>
                        <RichText
                            handleEditorChange={(content, editor) =>
                                setFieldValue(`${locale}_${i.name}`, content)
                            }
                            initialValue={values[`${locale}_${i.name}`]}
                            menubar={i.menubar}
                        />
                    </>
                ) : (
                    <>
                        <label className={styles.label}>
                            {getFieldLabel(t, i.label, i.name, requiredFields)}
                        </label>
                        <RichText
                            handleEditorChange={(content, editor) => setFieldValue(i.name, content)}
                            initialValue={i.initialValue}
                            menubar={i.menubar}
                        />
                    </>
                );
            case 'file':
                return (
                    <SingleFileUpload
                        onChange={(event) => {
                            setFieldValue(i.name, event.currentTarget.files[0]);
                        }}
                        value={values[i.name]}
                        error={errors[i.name]}
                        name={i.name}
                    />
                );
            case 'order':
                return (
                    !!dataNeededObj &&
                    !!dataNeededObj['relative'] &&
                    !!dataNeededObj['relative'].length &&(
                        <Order
                            dataNeededObj={dataNeededObj}
                            setFieldValue={setFieldValue}
                            label={i.label}
                            values={values}
                        />
                    )
                );
            default:
                return (
                    <TextField
                        label={getFieldLabel(t, i.label, i.name, requiredFields)}
                        name={locale ? `${locale}_${i.name}` : i.name}
                        type={i.type}
                        onChange={handleChange}
                        value={values[locale ? `${locale}_${i.name}` : i.name]}
                        autoComplete={i.autoComplete ? i.autoComplete : false}
                        error={errors[locale ? `${locale}_${i.name}` : i.name]}
                    />
                );
        }
    };

    return (
        !isLoading && (
            <div>
                <h2 className={styles.title}>
                    {!title && `${t('admin:edit_the')} `}
                    {t(`admin:${toSnakeCase(title ? title : crudKey)}`)}
                </h2>
                <Formik
                    initialValues={itemData}
                    validate={(values) => validate(values)}
                    onSubmit={(values, { setFieldError, setSubmitting, setFieldValue }) =>
                        submit(values, { setFieldError, setSubmitting, setFieldValue })
                    }
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {({ handleSubmit, handleChange, values, errors, setFieldValue }) => (
                        <form onSubmit={handleSubmit} className={styles.form}>
                            {fields.map((i) => (
                                <div key={i.name} className={styles.item}>
                                    {formikHandler(i, handleChange, values, setFieldValue, errors)}
                                </div>
                            ))}
                            {!!translatableFields.length && (
                                <TranslatableContent>
                                    {i18n.options.fallbackLng.map((ln) => {
                                        return (
                                            <Tabs.Tab id={ln} title={t(`admin:${ln}`)} key={ln}>
                                                <div style={{ padding: 10 }}>
                                                    {translatableFields.map((i) => (
                                                        <div key={i.name} className={styles.item}>
                                                            {formikHandler(
                                                                i,
                                                                handleChange,
                                                                values,
                                                                setFieldValue,
                                                                errors,
                                                                ln,
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </Tabs.Tab>
                                        );
                                    })}
                                </TranslatableContent>
                            )}
                            <div className={styles.actionButtons}>
                                <Button to={`/admin/${pluralize(crudKey)}`} type={'white'}>
                                    <span className={styles.button}>{t('admin:cancel')}</span>
                                </Button>
                                <Button isSubmit={true} type={'gray'}>
                                    <span className={styles.button}>{t('admin:update')}</span>
                                </Button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        )
    );
}

Edit.propTypes = {
    crudKey: PropTypes.string.isRequired,
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.string,
            name: PropTypes.string,
        }),
    ).isRequired,
    translatableFields: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.string,
            name: PropTypes.string,
        }),
    ),
    title: PropTypes.string,
    requiredFields: PropTypes.arrayOf(PropTypes.string),
};

Edit.defaultProps = {
    title: '',
    requiredFields: [],
    translatableFields: [],
};

export default Edit;
