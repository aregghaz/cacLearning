import React, { useState } from 'react';
import TextField from '../text-field/text-field';
import Calendar from 'react-calendar';

import styles from '../../datepicker/datepicker.module.scss';

const Datepicker = ({ fieldName, name, type, setFieldValue, error }) => {
    const [dateValue, setDateValue] = useState(new Date());

    return (
        <>
            <span className={styles.label}>{name}</span>
            <TextField
                label={''}
                name={name}
                type={type}
                value={parseInt(+dateValue / 1000)}
                onChange={() => {}}
                autoComplete={false}
                error={error}
                hidden
            />
            <Calendar
                minDate={new Date()}
                onChange={(date) => {
                    setFieldValue(fieldName, +date / 1000);
                    setDateValue(date);
                }}
                value={dateValue}
            />
        </>
    );
};

export default Datepicker;
