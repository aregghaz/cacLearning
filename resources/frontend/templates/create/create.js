import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import pluralize from 'pluralize';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Field, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';

import { Tabs } from '../../plugins/react-tabs';
import Textarea from '../../components/form/textarea/textarea';
import Checkbox from '../../components/form/checkbox/checkbox';
import Button from '../../components/button/button';
import TranslatableContent from '../../components/translatable-content/translatable-content';

import RichText from '../../components/form/rich-text/rich-text';
import TextField from '../../components/form/text-field/text-field';
import SingleFileUpload from '../../components/form/single-file-upload/single-file-upload';
import Datepicker from '../../components/form/datepicker/datepicker';
import Order from '../../components/form/order/order';
import MultiSelect from '../../components/form/multi-select/multi-select';

import getFieldLabel from '../../utils/getFieldLabel';
import toSnakeCase from '../../utils/toSnakeCase';
import validationRules from '../../utils/validationRules';
import collectFormData from '../../utils/collectFormData';
import populateInitialFormFields from '../../utils/populateInitialFormFields';
import getFieldName from "../../utils/getFieldName";
import getListItemCount from "../../utils/getListItemCount";

import styles from './create.module.scss';

const Create = ({
                    crudKey,
                    fields,
                    title,
                    dataNeeded,
                    translatableFields,
                    requiredFields,
                }) => {
    const { i18n, t } = useTranslation();

    const [listItemQuantities, setListItemQuantities] = useState([] );

    const [dataNeededObj, setDataNeededObj] = useState(null);

    const handleListItemQuantityChange = (name, count, setValues, values) => {
        const newListItemQuantities = [...listItemQuantities];
        if (newListItemQuantities.find(item => item.name === name)) {
            newListItemQuantities.splice(newListItemQuantities.findIndex(item => item.name === name), 1);
        }
        //FIXME: sync this part smh
        setListItemQuantities([
            ...newListItemQuantities,
            {name: name, count: count}
        ]);

        reInitiateValues(
            setValues,
            [
                ...newListItemQuantities,
                {name: name, count: count}
            ],
            values
        );
    }

    const initialValues = populateInitialFormFields(
        fields,
        translatableFields,
        i18n,
        listItemQuantities,
    );

    const reInitiateValues = (setValues, nLIQ, values) => {
        setValues({
            ...populateInitialFormFields(
                fields,
                translatableFields,
                i18n,
                nLIQ,
                values
            )
        });
    }

    const validate = (values) =>
        validationRules(values, requiredFields, fields, translatableFields, t);

    const submit = (values, { setFieldError, setSubmitting, setFieldValue }) => {
        const formData = collectFormData(values, fields, translatableFields, i18n);

        setSubmitting(true);

        axios
            .post(`/api/${pluralize(crudKey)}`, formData)
            .then((response) => {
                if (response.status === 200) {
                    const options = {
                        type: toast.TYPE.SUCCESS,
                    };
                    toast(t('admin:record_successfully_added'), options);
                    fields.map(({ name, type }) => {
                        switch (type) {
                            case 'select':
                                values[`${name}_id`] = false;
                                break;
                            case 'multiselect':
                                values[`${name}_ids`] = [];
                                break;
                            case 'order':
                                values['relative'] = false;
                                values['placement'] = false;
                                break;
                            default:
                                setFieldValue(name, initialValues[name]);
                                break;
                        }
                    });
                    for (let i = 0; i < translatableFields.length; ++i) {
                        i18n.options.fallbackLng.map((ln) => {
                            setFieldValue(
                                `${ln}_${translatableFields[i].name}`,
                                initialValues[`${ln}_${translatableFields[i].name}`],
                            );
                        });
                    }
                }
            })
            .catch((error) => {
                setFieldError('name', t(`admin:${error.response.data}`));
            });
    };

    const formikHandler = useCallback((
        i,
        handleChange,
        values,
        setFieldValue,
        errors,
        locale,
        value,
        name,
        setValues,
        ) => {
            switch (i.type) {
                case 'checkbox':
                    return (
                        <Checkbox
                            name={i.name}
                            label={getFieldLabel(t, i.label, i.name, requiredFields)}
                            checked={values[i.name]}
                            onChange={() => setFieldValue(i.name, !values[i.name])}
                        />
                    );
                case 'select':
                    const handleSelectChange = async (val) => {
                        if (name) {
                            setFieldValue(`${name}`, val);
                        }
                        else {
                            if (i.child) {
                                const result = await axios.get(`/api/${pluralize(crudKey)}/${val}?parent=${i.name}`);
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
                                //TODO: Make the hardcoded "select" more dynamic for other cases in future
                                //  some refactoring might be needed
                                setFieldValue(getFieldName(locale, i.child, "select"), false);
                            }
                            setFieldValue(getFieldName(locale, i.name, i.type), val);
                        }
                    };
                    return (
                        dataNeededObj &&
                        dataNeededObj[toSnakeCase(pluralize(i.name))] && (
                            <Field
                                component={Select}
                                options={dataNeededObj[toSnakeCase(pluralize(i.name))]}
                                placeholder={t(`admin:${i.placeholder ? i.placeholder : i.name}`)}
                                onChange={(option) => handleSelectChange(option.value)}
                                //FIXME: watch out for the "parseInt" part
                                value={dataNeededObj[toSnakeCase(pluralize(i.name))].find(
                                    (option) => option.value === value || parseInt(values[getFieldName(locale, i.name, i.type)]),
                                ) || false}
                            />
                        )
                    );
                case 'multiselect':
                    const handleMultiSelectChange = async (options) => {
                        const option_ids = [];
                        options.forEach(opt =>
                            option_ids.push(opt.value)
                        );
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
                                fieldName={getFieldName(locale, i.name, i.type)}
                                setFieldValue={setFieldValue}
                                onChange={(option) => handleMultiSelectChange(option)}
                                values={values[getFieldName(locale, i.name, i.type)]}
                            />
                        )
                    );
                case 'textarea':
                    return (
                        <Textarea
                            onChange={handleChange}
                            name={getFieldName(locale, i.name, i.type)}
                            label={getFieldLabel(t, i.label, i.name, requiredFields)}
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
                                initialValue={values[`${locale}_${i.name}`] || i.initialValue}
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
                        !!dataNeededObj['relative'].length && (
                            <Order
                                dataNeededObj={dataNeededObj}
                                setFieldValue={setFieldValue}
                                label={i.label}
                                values={values}
                            />
                        )
                    );
                case 'list':
                    return (
                        <div className={styles.list}>
                            <div className={styles.listTitle}>
                                <span className={styles.label}>
                                    {getFieldLabel(t, i.label, i.name, requiredFields)}
                                </span>
                                <Button
                                    type="gray"
                                    round
                                    onClick={() => {
                                        handleListItemQuantityChange(
                                            i.name,
                                            getListItemCount(listItemQuantities, i.name) + 1,
                                            setValues,
                                            values
                                        )
                                    }}
                                >
                                    +
                                </Button>
                            </div>
                            <div>
                                {[...Array(getListItemCount(listItemQuantities, i.name))].map((a, c) => (
                                    <div
                                        key={`${c}-block`}
                                        className={`${i.children.length > 1 ? styles.itemBlock : styles.itemBlockSingle}`}
                                    >
                                        <div className={styles.contentBlock}>
                                            {i.children.map(childField => {
                                                const parentIndex = name ? parseInt(name.split("][")[0].split("[")[1]) : 0;
                                                const str = values[getFieldName(locale, i.name, i.type)]
                                                    ? `${getFieldName(locale, i.name, i.type)}[${c}].${getFieldName(locale, childField.name, childField.type)}`
                                                    : `${i.parentList}[${parentIndex}].${i.name}[${c}].${getFieldName(locale, childField.name, childField.type)}`;
                                                const handleListValueChange = (e) => setFieldValue(str, e.target.value);
                                                // console.log(parentIndex, c, str, name);
                                                const listValue = values[getFieldName(locale, i.name, i.type)]
                                                    ? values[i.name][c][getFieldName(locale, childField.name, childField.type)]
                                                    : values[i.parentList][parentIndex][i.name][c][getFieldName(locale, childField.name, childField.type)];
                                                // TODO: make this multi-level, now it's max two-level
                                                // FIXME: get the parent index smh
                                                return (
                                                    <div
                                                        key={childField.name}
                                                        className={styles.item}
                                                    >{
                                                        formikHandler(
                                                            childField,
                                                            handleListValueChange,
                                                            values,
                                                            setFieldValue,
                                                            errors,
                                                            locale,
                                                            listValue,
                                                            str,
                                                            setValues,
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className={styles.removeBlock}>
                                            {c > 0 &&
                                            <Button
                                                type="blank"
                                                className={styles.removeButton}
                                                onClick={() => {
                                                    handleListItemQuantityChange(
                                                        i.name,
                                                        getListItemCount(listItemQuantities, i.name) - 1,
                                                        setValues,
                                                        values
                                                    )
                                                }}
                                            >
                                                —
                                            </Button>
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                case 'input':
                default:
                    return (
                        <TextField
                            label={getFieldLabel(t, i.label, i.name, requiredFields)}
                            name={name || getFieldName(locale, i.name, i.type)}
                            type={i.type}
                            onChange={handleChange}
                            value={value || values[name || getFieldName(locale, i.name, i.type)]}
                            autoComplete={i.autoComplete ? i.autoComplete : false}
                            error={errors[getFieldName(locale, i.name, i.type)]}
                        />
                    );
            }
        }, [
            listItemQuantities,
            dataNeededObj
        ]
    );


    useEffect(() => {
        if (dataNeeded) {
            axios.get(`/api/${pluralize(crudKey)}/create`).then((response) => {
                fields
                    .filter((field) => field.type === 'select')
                    .map((selectField) => {
                        setDataNeededObj((prevState) => ({
                            ...prevState,
                            [pluralize(selectField.name)]: response.data[pluralize(selectField.name)].map((field) => ({
                                value: field.id, label: field.name
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

                const nFields = fields.filter((field) => field.type === 'list');
                //FIXME: this is sooooooooo wrong, fix it
                nFields.forEach(field => {
                    if(field.children) {
                        field
                            .children
                            .filter((field) => field.type === 'select')
                            .map((selectField) => {
                                setDataNeededObj((prevState) => ({
                                    ...prevState,
                                    [toSnakeCase(pluralize(selectField.name))]: response
                                        .data[toSnakeCase(pluralize(selectField.name))]
                                        .map((field) => ({
                                            value: field.id, label: field.name
                                        })),
                                }));
                            });
                    }
                })
            });
        }
    }, []);

    return (
        !((!!dataNeeded + !!dataNeededObj) % 2) && (
            <div>
                <h2 className={styles.title}>
                    {!title && `${t('admin:add_new')} `}
                    {t(`admin:${toSnakeCase(title ? title : crudKey)}`)}
                </h2>
                <Formik
                    initialValues={initialValues}
                    validate={(values) => validate(values)}
                    onSubmit={(values, { setFieldError, setSubmitting, setFieldValue }) =>
                        submit(values, { setFieldError, setSubmitting, setFieldValue })
                    }
                    validateOnClick={false}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {({
                          handleSubmit,
                          handleChange,
                          values,
                          errors,
                          setFieldValue,
                          setValues,
                      }) => (
                        <form onSubmit={handleSubmit} className={styles.form}>
                            {fields.map((i) => (
                                <div key={i.name} className={styles.item}>
                                    {formikHandler(
                                        i,
                                        handleChange,
                                        values,
                                        setFieldValue,
                                        errors,
                                        '',
                                        false,
                                        false,
                                        setValues
                                    )}
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
                                                                false,
                                                                false,
                                                                setValues
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
                                    <span className={styles.button}>{t('admin:submit')}</span>
                                </Button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        )
    );
}

Create.propTypes = {
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
    dataNeeded: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.shape({
                key: PropTypes.string,
                items: PropTypes.array,
            }),
        ),
        PropTypes.bool,
    ]),
    requiredFields: PropTypes.arrayOf(PropTypes.string),
};

Create.defaultProps = {
    title: '',
    dataNeeded: false,
    requiredFields: [],
    translatableFields: [],
};

export default Create;
