import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './text-field.module.scss';

export default function TextField({
    name,
    value,
    placeholder,
    type,
    error,
    onChange,
    autoComplete,
    disable,
    label,
    hidden,
}) {
    const [isActive, setActive] = useState(false);

    const handleOnBlur = () => value.trim().length === 0 && setActive(false);

    const handleOnFocus = () => setActive(true);

    // TODO: Find a better way
    useEffect(() => {
        if (value || value === 0) {
            setActive(true);
        }
    }, []);

    return (
        <div className={`${styles.inputWrapper} ${hidden ? styles.hidden : ''}`}>
            {error && <div className={styles.error}>{error}</div>}
            {hidden && (
                <input
                    hidden={hidden}
                    id={name}
                    disabled={disable}
                    name={name}
                    className={styles.input}
                    type={type}
                    placeholder={placeholder}
                    //value={value}
                    onChange={onChange}
                    autoComplete="off"
                    onBlur={handleOnBlur}
                    onFocus={handleOnFocus}
                />
            )}
            {!hidden &&
                (autoComplete ? (
                    <input
                        id={name}
                        disabled={disable}
                        name={name}
                        className={styles.input}
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        onBlur={handleOnBlur}
                        onFocus={handleOnFocus}
                    />
                ) : (
                    <input
                        id={name}
                        disabled={disable}
                        name={name}
                        className={styles.input}
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        autoComplete="off"
                        onBlur={handleOnBlur}
                        onFocus={handleOnFocus}
                    />
                ))}
            <label className={` ${isActive ? styles.active : styles.label} `} htmlFor={name}>
                {label}
            </label>
        </div>
    );
}
TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    autoComplete: PropTypes.bool,
    name: PropTypes.string,
    disable: PropTypes.bool,
    hidden: PropTypes.bool,
};
TextField.defaultProps = {
    label: null,
    type: 'text',
    placeholder: '',
    value: '',
    error: '',
    autoComplete: true,
    name: '',
    disable: false,
    hidden: false,
};
