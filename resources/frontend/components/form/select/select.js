import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Field } from 'formik';

import styles from './select-field.module.scss';

export default function SelectField({ items, fieldName, setFieldValue, placeholder, value }) {
    return (
        <div className={styles.field}>
            <Field
                component={Select}
                options={items}
                value={value}
                getOptionValue={(option) => option.name}
                onChange={(option) => setFieldValue(fieldName, option.id)}
                placeholder={placeholder}
            />
        </div>
    );
}

SelectField.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
        }),
    ).isRequired,

    fieldName: PropTypes.string.isRequired,
    value: PropTypes.number,
    placeholder: PropTypes.string.isRequired,
    setFieldValue: PropTypes.func.isRequired,
};

SelectField.defaultProps = {
    value: null,
};
