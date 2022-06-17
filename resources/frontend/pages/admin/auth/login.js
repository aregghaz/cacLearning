import React from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import TextField from '../../../components/form/text-field/text-field';
import Button from '../../../components/button/button';

import styles from './auth.module.scss';

export default function Login() {
    const { t } = useTranslation();

    const sendData = (values, { setSubmitting }) => {
        const formData = new FormData();
        setSubmitting(true);
        Object.keys(values).map((key) => formData.append(key, values[key]));
        axios.post('/api/auth/login', formData).then((response) => {
            localStorage.access_token = response.data.access_token;
            axios.interceptors.request.use(function (config) {
                config.headers.Authorization = 'Bearer ' + localStorage.access_token;
                return config;
            });
            axios
                .get('/api/auth/user')
                .then((response) => {
                    //TODO: setUserLoggedIn(!!response.data.length)
                    navigate('/admin');
                })
                .catch(function (error) {
                    // handle error
                    navigate('/admin_panel/login');
                });
        });
    };

    return (
        <div className={styles.login}>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                onSubmit={(values, { setSubmitting }) => sendData(values, { setSubmitting })}
            >
                {({ values, handleSubmit, handleChange }) => (
                    <form id={'form'} onSubmit={handleSubmit} className={styles.form}>
                        <h3> {t('admin:login')} </h3>
                        <TextField
                            label={t('admin:email')}
                            name={'email'}
                            type={'text'}
                            onChange={handleChange}
                            value={values.email}
                        />
                        <TextField
                            label={t('admin:password')}
                            name={'password'}
                            type={'password'}
                            onChange={handleChange}
                            value={values.password}
                            autoComplete={false}
                        />
                        <div className={styles.actions}>
                            <Button isSubmit={true} type="gray">
                                <span className={styles.button}>{t('admin:login')}</span>
                            </Button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
}
