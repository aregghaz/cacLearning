import React from 'react';
import PropTypes from 'prop-types';

import styles from './toggle.module.scss';

const Toggle = ({ isChecked, name, onChange })  =>{
    return (
        <div className={styles.root}>
            <input
                checked={isChecked}
                value={''}
                type="checkbox"
                name={name}
                className={styles.mobileToggle}
                onChange={onChange}
            />
        </div>
    );
};

export default Toggle;

Toggle.propTypes = {
    isChecked: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

Toggle.defaultProps = {
    isChecked: false,
};
