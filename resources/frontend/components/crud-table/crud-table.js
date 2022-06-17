import React from 'react';
import PropTypes from 'prop-types';
import TableHead from './table-head/table-head';
import TableBody from './table-body/table-body';
import TableFoot from "./table-foot/table-foot";

import styles from './crud-table.module.scss';
import axios from "axios";
import pluralize from "pluralize";

const CrudTable = ({
                       data,
                       titles,
                       crudKey,
                       hideEdit,
                       hideDelete,
                       fieldsSetManually,
                       paginated,
                       count,
                       cellConfigs,
                       filterValues,
                       setFieldValue,
                   }) => {

    return (
        <>
            <table className={styles.table}>
                <TableHead
                    titles={titles}
                    noActions={hideDelete && hideEdit}
                    filterValues={filterValues}
                    setFieldValue={setFieldValue}
                />
                <TableBody
                    data={data}
                    crudKey={crudKey}
                    hideEdit={hideEdit}
                    hideDelete={hideDelete}
                    fieldsSetManually={fieldsSetManually}
                    cellConfigs={cellConfigs}
                    filterValues={filterValues}
                />
                {paginated &&
                    <TableFoot
                        dataLength={count}
                        setFieldValue={setFieldValue}
                        colSpan={titles.length + ((hideDelete && hideEdit) ? 1 : 2)}
                        // + 2 for actions & number columns
                        filterValues={filterValues}
                    />
                }
            </table>
        </>
    );
}

CrudTable.propTypes = {
    data: PropTypes.array.isRequired,
    titles: PropTypes.array.isRequired,
    crudKey: PropTypes.string.isRequired,
    hideDelete: PropTypes.bool,
    hideEdit: PropTypes.bool,
    fieldsSetManually: PropTypes.bool,
    paginated: PropTypes.bool,
    cellConfigs: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            crudKey: PropTypes.string,
            type: PropTypes.string,
        }),
    ),
    filterValues: PropTypes.object.isRequired, //FIXME: fix this
    setFieldValue: PropTypes.func.isRequired,
};

CrudTable.defaultProps = {
    hideDelete: false,
    hideEdit: false,
    fieldsSetManually: false,
    paginated: false,
    cellConfigs: [],
};

export default CrudTable;
