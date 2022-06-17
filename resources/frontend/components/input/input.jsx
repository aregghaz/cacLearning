import React from "react";
import PropTypes from "prop-types";

import styles from "./input.module.scss";

export default function Input({
    error,
    type,
    placeholder,
    onChange,
    value,
    name,
    disabled,
    className,
    pattern,
}) {
    return (
        <>
            {error && <p className={styles.errorText}>{error}</p>}
            <input
                pattern={pattern}
                name={name}
                className={`${styles.base} ${className ? className : ""} ${
                    error ? styles.error : ""
                }`}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
            />
        </>
    );
}

Input.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    error: PropTypes.string,
    disabled: PropTypes.bool,
};
Input.defaultProps = {
    name: "",
    type: "text",
    placeholder: "",
    disabled: false,
    error: "",
    value: "",
};
