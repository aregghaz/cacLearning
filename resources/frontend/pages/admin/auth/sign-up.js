import React from 'react';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import TextField from '../../../components/form/text-field/text-field';
import Button from '../../../components/button/button';

import styles from './auth.module.scss';

// TODO: Pahel mi te

export default function SignUp() {
    const { t } = useTranslation();

    const sendData = (values, { setSubmitting, resetForm }) => {
        const formData = new FormData();
        setSubmitting(true);
        Object.keys(values).map((key) => {
            formData.append(key, values[key]);
        });
        // axios.post('/api/auth/signup', formData).then(response => {
        //     if (response.data === '1') {
        //         // TODO: display the success or error messages
        //         resetForm()
        //     }
        // })
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.form}>
                <h3>{t('admin:Sign Up')}</h3>
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        password_confirmation: '',
                    }}
                    onSubmit={(values, { setSubmitting, resetForm }) =>
                        sendData(values, { setSubmitting, resetForm })
                    }
                >
                    {({ values, handleSubmit, handleChange }) => (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label={t('admin:name')}
                                name={'name'}
                                type={'text'}
                                onChange={handleChange}
                                value={values.name}
                            />
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
                                type={'text'}
                                onChange={handleChange}
                                value={values.password}
                            />
                            <TextField
                                label={t('admin:password_confirmation')}
                                name={'password_confirmation'}
                                type={'text'}
                                onChange={handleChange}
                                value={values.password_confirmation}
                            />
                            <Button isSubmit={true} type="black">
                                {' '}
                                {t('admin:Sign Up')}{' '}
                            </Button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
