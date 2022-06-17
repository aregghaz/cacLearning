import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './text-field.module.scss';

export default function NumberField({
    name,
    value,
    placeholder,
    error,
    onChange,
    autocomplete,
    disable,
    label,
}) {
    const html = `${name} + ${Math.random()} `;

    const [isActive, setActive] = useState(false);

    const handleOnBlur = () => value.trim().length === 0 && setActive(false);

    const handleOnFocus = () => setActive(true);

    return (
        <div className={styles.inputWrapper}>
            {error && <div className={styles.error}>{error}</div>}
            <input
                id={html}
                disabled={disable}
                name={name}
                className={styles.input}
                type="number"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                autoComplete={autocomplete}
                onBlur={handleOnBlur}
                onFocus={handleOnFocus}
            />
            <label className={` ${isActive ? styles.active : styles.label} `} htmlFor={html}>
                {label}
            </label>
        </div>
    );
}
NumberField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    autocomplete: PropTypes.string,
    name: PropTypes.string,
    disable: PropTypes.bool,
};
NumberField.defaultProps = {
    label: null,
    type: '',
    placeholder: '',
    value: '',
    error: '',
    autocomplete: '',
    name: '',
    disable: false,
};
