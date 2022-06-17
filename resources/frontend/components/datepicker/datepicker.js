import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../input/input';
import Calendar from 'react-calendar';
import { useTranslation } from 'react-i18next';
import { useOnClickOutsite } from '../../hooks/use-on-click-outside/use-on-click-outside';

import styles from './datepicker.module.scss';

const Datepicker = ({ name, onChange, multiple }) => {
    const { t } = useTranslation();

    const [dateValue, setDateValue] = useState(new Date());

    const [isOpen, setOpen] = useState(false);

    const handleFocus = () => {
        setOpen(true);
    };

    const handleBlur = () => {
        setOpen(false);
    };

    return (
        <>
            <span className={styles.label}>{t(`admin:${name}`)}</span>
            <Input
                label={''}
                name={name}
                value={+dateValue / 1000}
                onFocus={handleFocus}
            />
            {isOpen &&
                <Calendar
                    minDate={new Date()}
                    onChange={(date) => {
                        //setFieldValue(fieldName, +date / 1000);
                        //setDateValue(date);
                    }}
                    value={dateValue}
                />
            }
        </>
    );
};

Datepicker.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    multiple: PropTypes.bool,
};

Datepicker.defaultProps = {
    onChange: () => {},
    multiple: false
};

export default Datepicker;
