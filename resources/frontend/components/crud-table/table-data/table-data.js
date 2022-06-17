import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import Button from '../../button/button';

import styles from '../crud-table.module.scss';

const TableData = ({
    type,
    rowspan,
    colspan,
    actionCell,
    className,
    children,
}) => {
    const { t } = useTranslation();

    return (
        <>
            {type === 'th' ? (
                <th
                    className={`
                        ${styles.tableTd}
                        ${styles.tableTh}
                        ${className ? className : ""}
                    `}
                    colSpan={colspan || 1}
                    rowSpan={rowspan || 1}
                >
                    {React.isValidElement(children) && children}
                </th>
            ) : (
                <td className={styles.tableTd} colSpan={colspan || 1} rowSpan={rowspan || 1}>
                    {children}
                    {actionCell?.map((action, index) => {
                        return (
                            <Button type={`action`} key={index} link={action.link}>
                                {action.name}
                            </Button>
                        );
                    })}
                </td>
            )}
        </>
    );
};

TableData.propTypes = {
    type: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.number, PropTypes.object]),
    rowspan: PropTypes.number,
    colspan: PropTypes.number,
    actionCell: PropTypes.array,
    className: PropTypes.string,
};

TableData.defaultProps = {
    type: '',
    rowspan: 1,
    colspan: 1,
    actionCell: [],
    className: '',
    children: null,
};

export default TableData;
