import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';
import { Formik, Form } from "formik";
import { useTranslation } from 'react-i18next';

import CrudTable from '../../components/crud-table/crud-table';
import Button from '../../components/button/button';
import Select from 'react-select';
import Datepicker from '../../components/datepicker/datepicker';
import createUrl from '../../utils/createUrl';
import toSnakeCase from '../../utils/toSnakeCase';

import styles from './list.module.scss';

const List = ({
    titles,
    crudKey,
    hideCreate,
    hideAdd,
    hideEdit,
    fieldsSetManually,
    paginated,
    filters,
    cellConfigs,
    buttons,
}) => {
    const { t } = useTranslation();
    // TODO: useReducer
    const [sortedData, setSortedData] = useState([]);
    const [filterData, setFilterData] = useState(null);
    const [count, setCount] = useState(0);

    useEffect(() => {
        axios.get(`/api/${pluralize(crudKey)}`).then((response) => {
            setSortedData(paginated ? response.data[toSnakeCase(pluralize(crudKey))] : response.data);
            if (paginated) {
                setCount(response.data.count);
            }
        });
    }, []);

    const formData = new FormData();

    // FIXME: Deprecated
    const handleFilters = (key, value) => {
        if (columnSortedBy) {
            formData.append('sort_by_column', columnSortedBy.name);
            formData.append('sort_by', sortedBy);
        }
        formData.append([key], value);
        setFilterData({ ...filterData, [key]: value });
        axios.post(`/api/${pluralize(crudKey)}/filtered`, formData).then((res) => {
            setSortedData([...res.data]);
        });
    };

    const initialValues = {
        sort_by: '',
        sort_dir: '',
        search_criteria: [],
        page_number: paginated ? 1 : -1,
        items_per_page: 20,
    };

    titles.forEach(title => {
        if (title.searchable) {
            initialValues.search_criteria.push({field: title.name, q: ''});
        }
    });

    const validate = (values) => {};

    const submit = (values, { setFieldError, setSubmitting }) => {
        const formData = new FormData();

        formData.append('table', pluralize(toSnakeCase(crudKey)));
        formData.append('sort_dir', values.sort_dir);
        formData.append('sort_by', values.sort_by);
        formData.append('search_criteria', JSON.stringify(values.search_criteria));
        formData.append('page_number', values.page_number);
        formData.append('items_per_page', values.items_per_page);

        setSubmitting(true);
        axios
            .post(`/api/search`, formData)
            .then((response) => {
                if (response.status === 200) {
                    // TODO: navigate(); ??
                    setSortedData([...response.data.items]);
                    if (paginated) {
                        setCount(response.data.count);
                    }
                }
            })
            .catch((error) => {
                setFieldError('name', t(`admin:${error.response.data}`));
            });
    };

    return (
        <>
            <div className={styles.header}>
                <h2 className={styles.title}>
                    {t(`admin:${toSnakeCase(pluralize(crudKey))}`)}
                </h2>
                {!hideCreate && !hideAdd && (
                    <Button
                        type={'gray'}
                        to={createUrl(crudKey)}
                        className={styles.addButton}
                    >
                        +
                        {' '}
                        {t('admin:add_new')}
                        {' '}
                        <span className={styles.crudKey}>
                            {t(`admin:${toSnakeCase(crudKey)}`)}
                        </span>
                    </Button>
                )}
            </div>
            {!!buttons.length &&
                <div className={styles.buttons}>
                    {buttons.map(button => (
                        <div
                            key={button.name}
                            className={styles.buttonBox}
                        >
                            <Button
                                type="gray"
                                to={button.to}
                            >
                                {t(`admin:${button.name}`)}
                            </Button>
                        </div>
                    ))}
                </div>
            }
            <Formik
                initialValues={initialValues}
                validate={(values) => validate(values)}
                onSubmit={(values, { setFieldError, setSubmitting }) =>
                    submit(values, { setFieldError, setSubmitting })
                }
                validateOnChange={false}
                validateOnBlur={false}
            >
                {({
                      handleSubmit,
                      values,
                      setFieldValue
                }) => (
                    <Form
                        onSubmit={handleSubmit}
                    >
                        {!!filters.length && (
                            <div className={`${styles.filters} ${styles[filters[0].mode || "select"]}`}>
                                {filters.map((filter) => {
                                    switch (filter.mode) {
                                        case "pills":
                                            return filter.data.map((item) => (
                                                <div
                                                    key={item[filter.value] || item.id}
                                                    className={styles.filterBox}
                                                >
                                                    <Button
                                                        type={'blank'}
                                                        noPadding
                                                        onClick={() =>
                                                            handleFilters(
                                                                filter.key,
                                                                item[filter.value] || item.id,
                                                            )
                                                        }
                                                        className={`
                                                ${styles.filterButton}
                                                ${
                                                            filterData &&
                                                            (filterData[filter.key] ===
                                                            (item[filter.value] || item.id)
                                                                ? styles.active
                                                                : '')
                                                        }
                                            `}
                                                    >
                                                        {item[filter.label] || item.name}
                                                    </Button>
                                                </div>
                                            ));
                                        case "select":
                                            return (
                                                <div
                                                    key={filter.key}
                                                    className={styles.filterBox}
                                                >
                                                    <Select
                                                        options={filter.data}
                                                        placeholder={t(`admin:${filter.placeholder}`)}
                                                        //TODO: finish this up
                                                        onChange={(option) => console.log(option)}
                                                    />
                                                </div>
                                            );
                                        case "multiselect":
                                            break;
                                        case "date":
                                            return (
                                                <div
                                                    key={filter.key}
                                                    className={styles.filterBox}
                                                >
                                                    <Datepicker
                                                        name={filter.key}
                                                    />
                                                </div>
                                            );
                                        case "date_range":
                                            return (
                                                <div
                                                    key={filter.key}
                                                    className={styles.filterBox}
                                                >
                                                    <Datepicker
                                                        name={filter.key}
                                                        multiple
                                                    />
                                                </div>
                                            );
                                        default:
                                            return (
                                                <div
                                                    key={filter.key}
                                                    className={styles.filterBox}
                                                >
                                                    <Select
                                                        options={filter.data}
                                                        placeholder={t(`admin:${filter.placeholder}`)}
                                                        //TODO: finish this up
                                                        onChange={(option) => console.log(option)}
                                                    />
                                                </div>
                                            );
                                    }
                                })}
                            </div>
                        )}
                        <CrudTable
                            data={sortedData}
                            titles={titles}
                            crudKey={crudKey}
                            hideEdit={hideEdit}
                            hideDelete={!!hideCreate}
                            fieldsSetManually={fieldsSetManually}
                            paginated
                            cellConfigs={cellConfigs}
                            count={count}
                            filterValues={values}
                            setFieldValue={
                                (fieldName, fieldValue) => {
                                    setFieldValue(fieldName, fieldValue);
                                    if (fieldName.search('search_criteria') > -1 && paginated) {
                                        setFieldValue('page_number', 1);
                                    }
                                    handleSubmit();
                                }
                            }
                        />
                    </Form>
                )}
            </Formik>
        </>
    );
};

List.propTypes = {
    titles: PropTypes.array.isRequired,
    crudKey: PropTypes.string.isRequired,
    hideCreate: PropTypes.bool,
    hideAdd: PropTypes.bool,
    hideDelete: PropTypes.bool,
    hideEdit: PropTypes.bool,
    //If true, won't try to find data automatically via model relationships for fields ending with "_id"
    fieldsSetManually: PropTypes.bool,
    paginated: PropTypes.bool,
    filters: PropTypes.arrayOf(
        PropTypes.shape({
            data: PropTypes.array,
            key: PropTypes.string,
            value: PropTypes.string,
            label: PropTypes.string,
            mode: PropTypes.string,
        }),
    ),
    cellConfigs: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            crudKey: PropTypes.string,
            type: PropTypes.string,
        }),
    ),
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            to: PropTypes.string,
        }),
    ),
};

List.defaultProps = {
    hideCreate: false,
    hideAdd: false,
    hideDelete:false,
    hideEdit: false,
    fieldsSetManually: false,
    paginated: false,
    filters: [],
    cellConfigs: [],
    buttons: [],
};

export default List;
