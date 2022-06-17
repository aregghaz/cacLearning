import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import Tick from "-!svg-react-loader!../../images/tick.svg";
import Input from "../../components/input/input";
import { Formik } from "formik";
import { EMAIL, NAME_SURNAME } from "../../constants/regular-expressions";
import Button from "../button/button";
import axios from "axios";

import styles from "./contact-us-form.module.scss";

const staticKeys = ["fullName", "email", "phoneNumber", "subject", "message"];
const ContactUsForm = () => {
    const { t } = useTranslation();

    const [submitted, setSubmitted] = useState(false);

    const submit = (values, { setSubmitting, resetForm }) => {
        const formData = new FormData();
        setSubmitting(true);
        staticKeys.map((key) => {
            formData.append(key, values[key]);
        });
        axios.post(`/api/send-email`, formData).then((response) => {
            if (response.data) {
                resetForm();
                setSubmitted(false);
            }
        });
    };

    const validate = (values) => {
        const errors = {};

        if (!values.fullName) {
            errors.fullName = t("required");
        } else if (!NAME_SURNAME.test(values.fullName)) {
            errors.fullName = t("required");
        }

        if (!values.email) {
            if (!values.email) {
                errors.email = t("required");
            }
        }
        if (values.email && !EMAIL.test(values.email)) {
            errors.email = t("wrong");
        }

        return errors;
    };

    return (
        <div className={styles.container}>
            <div className={styles.formRequest}>
                {submitted && (
                    <div className={styles.success}>
                        {" "}
                        <Tick />{" "}
                        <p className={styles.successText}>
                            Your request was submitted successfully!
                        </p>{" "}
                    </div>
                )}

                <Formik
                    initialValues={{
                        fullName: "",
                        phoneNumber: "",
                        email: "",
                        subject: "",
                        message: "",
                    }}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        return submit(values, { setSubmitting, resetForm });
                    }}
                    validateOnChange={true}
                    validateOnBlur={true}
                    validate={(values) => validate(values)}
                >
                    {({
                        values,
                        errors,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <div className={styles.form}>
                                <div className={styles.inputWrapper}>
                                    <div className={styles.input}>
                                        <Input
                                            className={styles.inputBase}
                                            name="fullName"
                                            placeholder={t("fullName")}
                                            onChange={handleChange}
                                            value={values.fullName}
                                            error={errors.fullName}
                                        />
                                    </div>
                                    <div className={styles.input}>
                                        <Input
                                            className={styles.inputBase}
                                            name="email"
                                            placeholder={t("email")}
                                            type="email"
                                            onChange={handleChange}
                                            value={values.email}
                                            error={errors.email}
                                        />
                                    </div>
                                    <div className={styles.input}>
                                        <Input
                                            pattern="^[\d ()+]+$"
                                            className={styles.inputBase}
                                            name="phoneNumber"
                                            placeholder={t("phoneNumber")}
                                            onChange={(e) => {
                                                setFieldValue(
                                                    "phoneNumber",
                                                    e.target.validity.valid
                                                        ? e.target.value
                                                        : values.phoneNumber
                                                );
                                            }}
                                            value={values.phoneNumber}
                                            // error={errors.phoneNumber}
                                        />
                                    </div>
                                    <div className={styles.input}>
                                        <Input
                                            className={styles.inputBase}
                                            name="subject"
                                            placeholder={t("Subject")}
                                            onChange={handleChange}
                                            value={values.subject}
                                            // error={errors.subject}
                                        />
                                    </div>
                                    <div className={styles.textarea}>
                                        <textarea
                                            className={styles.textareaBase}
                                            name="message"
                                            id="message"
                                            cols="30"
                                            rows="10"
                                            placeholder={t("message")}
                                            onChange={handleChange}
                                            value={values.message}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={styles.buttonWrapper}>
                                <Button isSubmit className={styles.button} full>
                                    <p className={styles.request}>
                                        {t("request")}
                                    </p>
                                </Button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};
export default ContactUsForm;
