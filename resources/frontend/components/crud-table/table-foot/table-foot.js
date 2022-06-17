import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Button from "../../button/button";

import styles from './table-foot.module.scss'

const TableFoot = ({ dataLength, setFieldValue, colSpan, filterValues }) => {
    const [paginationState, setPaginationState] = useState({active: 1, pages: []});

    useEffect(() => {
        const pages = [];
        for (let i=1; i<=Math.ceil(dataLength / filterValues.items_per_page); ++i){
            pages.push(i)
        }

        setPaginationState(prevState => ({
            ...prevState,
            pages: [...pages]
        }));
    }, [dataLength]);

    const handlePageClick = (page) => {
        setFieldValue('page_number', page);
    };

    return (
        <tfoot>
        <tr>
            <td colSpan={colSpan}>
                {paginationState.pages.length > 1 &&
                    <div className={styles.root}>
                        {paginationState.pages.map(page => (
                            <Button
                                key={page}
                                onClick={()=>handlePageClick(page)}
                                type={'blank'}
                                className={`${styles.number} ${filterValues.page_number === page ? styles.active : ''}`}
                            >
                                {page}
                            </Button>
                        ))}
                    </div>
                }
            </td>
        </tr>
        </tfoot>
    );
};

TableFoot.propTypes = {
    dataLength: PropTypes.number,
    setFieldValue: PropTypes.func,
    colSpan: PropTypes.number.isRequired,
    // FIXME: fix this
    filterValues: PropTypes.object.isRequired,
};

TableFoot.defaultProps = {
    dataLength: 0,
    setFieldValue: () => {},
};

export default TableFoot;
