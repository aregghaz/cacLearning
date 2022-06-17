import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';
import { useTranslation } from 'react-i18next';
import TableData from '../table-data/table-data';
import TableRow from '../table-row/table-row';
import Button from '../../button/button';
import Toggle from "../../toggle/toggle";
import DeleteButton from '../../form/delete-button/delete-button';
import toSnakeCase from '../../../utils/toSnakeCase';
import numberFormatting from '../../../utils/numberFormatting';
import timestampToDate from "../../../utils/timestampToDate";
import EditIcon from '-!svg-react-loader!../../../images/edit.svg';
import LinkIcon from '-!svg-react-loader!../../../images/link.svg';

import styles from './table-body.module.scss';

const getRowNumber = (filterValues, number) => {
    return filterValues.page_number === -1
        ? number
        : (filterValues.page_number - 1) * filterValues.items_per_page + number;
};

const TableBody = ({ data, crudKey, hideEdit, hideDelete, fieldsSetManually, cellConfigs, filterValues }) => {

    /*  Currently available cellConfigs types are:
            hidden
            link
            date
            price
            image
            translatable
            toggle
    */

    // TODO: Add translatable

    const [currentData, setCurrentData] = useState(data);

    // TODO: think sth better
    useEffect(() => {
        setCurrentData(data);
    }, [data]);

    const { t } = useTranslation();

    return (
        <tbody>
            {currentData.map((item, index) => {
                const arrayProperty = Object.keys(item);
                return (
                    <TableRow
                        key={index}
                        number={getRowNumber(filterValues, index+1)}
                    >
                        {arrayProperty.map((prop) => {
                            if (
                                cellConfigs.find(cell =>
                                    cell.name === prop &&
                                    (cell.crudKey === crudKey || !cell.crudKey) &&
                                    cell.type === "hidden"
                                ) ||
                                prop === 'id' ||
                                prop === 'slug' ||
                                prop === 'created_at' ||
                                prop === 'updated_at' ||
                                prop === 'deleted_at'
                            ) {
                                return null;
                            }
                            if (item[prop] === null) {
                                return <TableData key={prop} />;
                            } else if (prop.search('_id') > -1) {
                                return (
                                    !fieldsSetManually && (
                                        <TableData key={prop}>
                                            {/* e.g. item.country.name for city */}
                                            {item[prop.replace('_id', '')].name}
                                        </TableData>
                                    )
                                );
                            } else if (
                                cellConfigs.find(cell =>
                                    cell.name === prop &&
                                    (cell.crudKey === crudKey || !cell.crudKey) &&
                                    cell.type === "image"
                                )
                            ) {
                                return (
                                    <TableData key={prop}>
                                        <img
                                            src={
                                                fieldsSetManually
                                                    ? item[prop]
                                                    : `/${item[prop]}`
                                            }
                                            alt={`${crudKey}_${prop}`}
                                            width="100px"
                                            height="100px"
                                        />
                                    </TableData>
                                );
                            } else if (
                                cellConfigs.find(cell =>
                                    cell.name === prop &&
                                    (cell.crudKey === crudKey || !cell.crudKey) &&
                                    cell.type === "price"
                                )
                            ) {
                                return (
                                    <TableData key={prop}>
                                        {!!item[prop] && (
                                            <>
                                                <span>AMD</span>
                                                {numberFormatting(item[prop])}
                                            </>
                                        )}
                                    </TableData>
                                );
                            } else if (
                                cellConfigs.find(cell =>
                                    cell.name === prop &&
                                    (cell.crudKey === crudKey || !cell.crudKey) &&
                                    cell.type === "link"
                                )
                            ) {
                                return (
                                    <TableData key={prop}>
                                        {!!item[prop] && (
                                            <a href={item[prop]} target={'blank'}>
                                                <span className={styles.link}><LinkIcon /></span>
                                            </a>
                                        )}
                                    </TableData>
                                );
                            } else if (
                                cellConfigs.find(cell =>
                                    cell.name === prop &&
                                    (cell.crudKey === crudKey || !cell.crudKey) &&
                                    cell.type === "toggle"
                                )
                            ) {
                                return (
                                    <TableData key={prop}>
                                        <Toggle
                                            // FIXME: write the right on change
                                            onChange={() => {}}
                                            name={prop}
                                            isChecked={item[prop]}
                                        />
                                    </TableData>
                                );
                            } else if(
                                cellConfigs.find(cell =>
                                    cell.name === prop &&
                                    (cell.crudKey === crudKey || !cell.crudKey) &&
                                    cell.type === "date"
                                )
                            ) {
                                return <TableData key={prop}>{timestampToDate(item[prop]*1000)}</TableData>;
                            }
                            else if (typeof item[prop] !== 'object') {
                                return (
                                    <TableData key={prop}>
                                        {cellConfigs.find(cell =>
                                            cell.name === prop &&
                                            (cell.crudKey === crudKey || !cell.crudKey) &&
                                            cell.type === "translatable"
                                        ) ? t(`admin:${item[prop]}`) : item[prop]}
                                    </TableData>
                                );
                            } else if (prop === 'action' && Array.isArray(item[prop])) {
                                return <TableData key={prop} actionCell={item[prop]} />;
                            }
                            return null;
                        })}
                        {!(hideEdit && hideDelete) &&
                            <TableData key={'actions'}>
                                <div className={styles.actions}>
                                    {!hideEdit && (
                                        <Button
                                            type={'blank'}
                                            to={`/admin/${crudKey}/${item.id}`}
                                            noPadding
                                            className={styles.editButton}
                                        >
                                            <span className={styles.icon}>
                                                <EditIcon />
                                            </span>
                                        </Button>
                                    )}
                                    {!hideDelete && (
                                        <DeleteButton
                                            crudKey={crudKey}
                                            id={item.id}
                                            setCurrentData={setCurrentData}
                                        />
                                    )}
                                </div>
                            </TableData>
                        }
                    </TableRow>
                );
            })}
        </tbody>
    );
}

TableBody.propTypes = {
    data: PropTypes.array.isRequired,
    crudKey: PropTypes.string.isRequired,
    hideEdit: PropTypes.bool,
    hideDelete: PropTypes.bool,
    fieldsSetManually: PropTypes.bool,
    cellConfigs: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            crudKey: PropTypes.string,
            type: PropTypes.string,
        }),
    ),
};

TableBody.defaultProps = {
    hideEdit: false,
    hideDelete: false,
    fieldsSetManually: false,
    cellConfigs: [],
};


export default TableBody;
