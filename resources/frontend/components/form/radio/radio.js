import React from 'react';
import PropTypes from 'prop-types';

import styles from './radio.module.scss';

export default function Radio({ name, onChange, checked, id, label, value, desc, disabled }) {
    return (
        <div className={styles.root}>
            <input
                className={styles.radio}
                onChange={onChange}
                checked={checked}
                type="radio"
                name={name}
                value={value}
                id={id}
                disabled={disabled}
            />
            <label className={styles.label} htmlFor={id}>
                <span className={styles.labelText}>{label}</span>
            </label>
            <p className={styles.desc}>{desc}</p>
        </div>
    );
}

Radio.propTypes = {
    checked: PropTypes.bool,
    className: PropTypes.string,
    errors: PropTypes.array,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
};

Radio.defaultProps = {
    checked: false,
    className: '',
    errors: [],
    name: '',
    disabled: false,
};
