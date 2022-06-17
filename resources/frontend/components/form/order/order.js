import React from 'react';
import PropTypes from 'prop-types';
import {Field} from "formik";
import Select from "react-select";

import { useTranslation } from 'react-i18next';

import styles from './order.module.scss';

const Order = ({ dataNeededObj, setFieldValue, label, values }) => {

    const { t } = useTranslation();

    const placementOptions = [
        {value: 1, label: t('admin:before')},
        {value: 2, label: t('admin:after')},
    ];

    return (
        <div>
            <p className={styles.label}>{t(`admin:${label}`)}</p>
            <div className={styles.row}>
                <Field
                    component={Select}
                    options={dataNeededObj['relative']}
                    placeholder={t(`admin:select`)}
                    onChange={(option) => setFieldValue('relative', option.value)}
                    value={dataNeededObj['relative'].find(opt => opt.value === values.relative) || false }
                />
                <Field
                    component={Select}
                    options={placementOptions}
                    placeholder={t('admin:select')}
                    onChange={(option) => setFieldValue('placement', option.value)}
                    value={placementOptions.find(opt => opt.value === values.placement) || false }
                />
            </div>
        </div>
    );
};

Order.propTypes = {
    dataNeededObj: PropTypes.object.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    values: PropTypes.object,
};

Order.defaultProps = {
    values: null,
};

export default Order;
