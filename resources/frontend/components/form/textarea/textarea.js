import React from 'react';
import PropTypes from 'prop-types';

import styles from './textarea.module.scss';

const Textarea = ({
                      name,
                      placeholder,
                      error,
                      onChange,
                      value,
                      cols,
                      rows,
                      label
}) => {
    return (
        <div className={styles.textareaWrapper}>
            {error && <div className={styles.error}>{error}</div>}
            {label && <p className={styles.label}>{label}</p>}
            <textarea
                name={name}
                className={styles.textarea}
                placeholder={placeholder}
                onChange={onChange}
                cols={cols}
                rows={rows}
                value={value}
            />
        </div>
    );
};

Textarea.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    autocomplete: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
};

Textarea.defaultProps = {
    placeholder: '',
    value: '',
    error: '',
    autocomplete: '',
    name: '',
    label: '',
};

export default Textarea;
