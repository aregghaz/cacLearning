import React from 'react';
import TableRow from '../table-row/table-row';
import PropTypes from 'prop-types';

import styles from '../crud-table.module.scss';

const TableHead = ({
                       titles,
                       noActions,
                       filterValues,
                       setFieldValue,
}) => {
    return (
        <thead className={styles.tableHead}>
            <TableRow
                type={'th'}
                titles={titles}
                noActions={noActions}
                filterValues={filterValues}
                setFieldValue={setFieldValue}
            />
        </thead>
    );
}

TableHead.propTypes = {
    titles: PropTypes.array.isRequired,
    noActions: PropTypes.bool.isRequired,
    filterValues: PropTypes.object.isRequired, //FIXME: fix this
    setFieldValue: PropTypes.func.isRequired,
};


export default TableHead;
