import React from 'react';
import PropTypes from 'prop-types';

import styles from './checkbox.module.scss';

const Checkbox = ({
                      disabled,
                      name,
                      label,
                      checked,
                      onChange
}) => {
    const html = `${name}${Math.random()}`;

    return (
        <span className={styles.root} onClick={onChange}>
            <input
                type="checkbox"
                name={name}
                id={html}
                disabled={disabled}
                checked={checked}
                onChange={onChange}
            />
            <span className={styles.indicator} />
            <label
                className={styles.label}
                htmlFor={html}
            >
                {label}
            </label>
        </span>
    );
}

Checkbox.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    onLabelClick: PropTypes.func,
    value: PropTypes.bool,
};

Checkbox.defaultProps = {
    id: '',
    value: false,
    label: '',
    link: { text: '', url: '' },
    onLabelClick: () => {},
};

export default Checkbox;
