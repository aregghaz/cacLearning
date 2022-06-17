import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Field } from "formik";

import TableData from '../table-data/table-data';
import Input from '../../input/input';
import Button from "../../button/button";

import styles from '../crud-table.module.scss';

const TableRow = ({
                      titles,
                      type,
                      number,
                      noActions,
                      filterValues,
                      setFieldValue,
                      children,
    }) => {

    const { t } = useTranslation();

    const isSearchable = titles && !!titles.length && titles[0].name && titles.find(title => title.searchable);

    const handleSorting = (columnSortedByData) => {

        setFieldValue('sort_by', columnSortedByData.name);

        switch (filterValues.sort_dir) {
            case 'asc':
                setFieldValue('sort_dir', 'desc');
                break;
            case 'desc':
                setFieldValue('sort_dir', 'asc');
                break;
            default:
                setFieldValue('sort_dir', 'asc');
        }
    };

    return (
        <tr>
            {type === 'th' && (
                <TableData
                    key="#"
                    type={type}
                    className={`
                        ${isSearchable ? styles.searchable : ""}
                        ${titles.length && titles[0].global ? titles[0].className : ""}
                    `}
                >
                    {isSearchable ?
                        <div className={`${styles.tableHeadBlock} block`}>
                            <span className={`${styles.tableHeadText} text`}>#</span>
                            <div className={styles.inputWrapper}>
                                <Input
                                    type="text"
                                    name="#"
                                    disabled
                                />
                            </div>
                        </div>
                        : <span className={`${styles.tableHeadText} text`}>#</span>
                    }
                </TableData>
            )}
            {type !== 'th' && (
                <TableData key={number} type={type}>
                    {number}
                </TableData>
            )}
            {(titles && !!titles.length && !titles[0].name) && titles.map((title) => {
                return (
                    <TableData key={title} type={type}>
                        <span className={`${styles.tableHeadText} text`}>{title}</span>
                    </TableData>
                );
            })}
            {(titles && !!titles.length && titles[0].name && type === 'th') && titles.map((title) => {
                return (
                    <TableData
                        key={title.name}
                        type={type}
                        className={`
                            ${(title.searchable || isSearchable) ? styles.searchable : ""}
                            ${(title.className || titles[0].global) ? (title.className || titles[0].className) : ""}
                        `}
                    >
                        <div className={`${styles.tableHeadBlock} block`}>
                            {title.sortable ? (
                                <Button
                                    type={`blank`}
                                    onClick={() => handleSorting(title)}
                                    noPadding
                                >
                                    <span className={`${styles.tableHeadText} text`}>
                                        {t(`admin:${title.name}`)}{' '}
                                        {title.name === filterValues.sort_by && (filterValues.sort_dir === 'asc' ? '↑' : '↓')}
                                    </span>
                                </Button>
                            ) : (
                                <span className={`${styles.tableHeadText} text`}>
                                    {t(`admin:${title.name}`)}
                                </span>
                            )}
                            {title.searchable &&
                            <div className={styles.inputWrapper}>
                                <Field
                                    component={Input}
                                    type="text"
                                    name={`search_criteria[${filterValues.search_criteria.findIndex(item => item.field === title.name)}].q`}
                                    value={
                                        filterValues
                                            .search_criteria[
                                                filterValues
                                                    .search_criteria
                                                    .findIndex(item => item.field === title.name)
                                            ]
                                            .q
                                    }
                                    placeholder={t(`admin:search`)}
                                    onChange={(e) => setFieldValue(
                                        `search_criteria[${filterValues.search_criteria.findIndex(item => item.field === title.name)}].q`,
                                        e.target.value
                                    )}
                                />
                            </div>
                            }
                            {isSearchable && !title.searchable &&
                            <div className={styles.inputWrapper}>
                                <Input
                                    type="text"
                                    name="actions"
                                    disabled
                                />
                            </div>
                            }
                        </div>
                    </TableData>
                );
            })}
            {children}
            {type === 'th' && !noActions && (
                <TableData
                    key="actions"
                    type={type}
                    className={`
                        ${isSearchable ? styles.searchable : ""}
                        ${!!titles.length && titles[0].global ? titles[0].className : ""}
                    `}
                >
                    {isSearchable
                        ? (
                            <div className={`${styles.tableHeadBlock} block`}>
                                <span className={`${styles.tableHeadText} text`}>
                                   {t('admin:actions')}
                                </span>
                                <div className={styles.inputWrapper}>
                                    <Input
                                        type="text"
                                        name="actions"
                                        disabled
                                    />
                                </div>
                            </div>
                        )
                        : (
                            <span className={`${styles.tableHeadText} text`}>
                               {t('admin:actions')}
                            </span>
                        )
                    }
                </TableData>
            )}
        </tr>
    );
}

// TODO: accurate prop types
TableRow.propTypes = {
    getUrl: PropTypes.string,
    number: PropTypes.number,
    noActions: PropTypes.bool,
};

TableRow.defaultProps = {
    getUrl: '',
    number: 0,
    noActions: false,
};

export default TableRow;
