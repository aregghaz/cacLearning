import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Tick from "-!svg-react-loader!../../images/tick.svg";
import Input from "../../components/input/input";
import { Formik } from "formik";
import { EMAIL, NAME_SURNAME } from "../../constants/regular-expressions";
import Select from "../../components/select/select";
import Button from "../button/button";
import Modal from "react-modal";

import styles from "./request-form.module.scss";
import Close from "-!svg-react-loader!../../images/closeMenu.svg";
import Success from "-!svg-react-loader!../../images/success.svg";
import axios from "axios";

const staticKeys = ["fullName", "phoneNumber", "email", "service"];

const customStylesMobile = {
    content: {
        padding: "20px 20px",
        border: "none",
        borderRadius: "0",
        overflowY: "auto",
        height: "320px",
    },
    overlay: {
        zIndex: 400,
        backgroundColor: "rgba(0, 0, 0, 0.5",
        display: "flex",
        backdropFilter: "blur(5px)",
    },
};

const HomeRequestForm = ({ data }) => {
    const { t, i18n } = useTranslation();

    const [submitted, setSubmitted] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleModal = () => {
        setModalIsOpen(false);
    };

    const submit = (values, { setSubmitting, resetForm }) => {
        const formData = new FormData();
        setSubmitting(true);
        setModalIsOpen(true);
        staticKeys.map((key) => {
            if (key === "service") {
                if (parseInt(values[key])) {
                    formData.append(
                        key,
                        data.find((item) => item.id === parseInt(values[key]))
                            .name
                    );
                }
            } else {
                formData.append(key, values[key]);
            }
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
            <div className={`${styles.formRequest} `}>
                <Formik
                    initialValues={{
                        fullName: "",
                        phoneNumber: "",
                        email: "",
                        service: "",
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
                                    <div className={styles.selectWrapper}>
                                        <div className={styles.select}>
                                            <Select
                                                options={data}
                                                placeholder={t("service")}
                                                getOptionValue={(option) =>
                                                    option.id
                                                }
                                                getOptionLabel={(option) =>
                                                    option.name
                                                }
                                                value={values.service}
                                                setFieldValue={setFieldValue}
                                                fieldName="service"
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.buttonInside}>
                                        <Button isSubmit type={"primary"} full>
                                            <p className={styles.button}>
                                                {t("request")}
                                            </p>
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.buttonOutside}>
                                <Button isSubmit type={"primary"}>
                                    <p className={styles.button}>
                                        {t("request")}
                                    </p>
                                </Button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
            <Modal
                isOpen={modalIsOpen}
                style={customStylesMobile}
                className={styles.modal}
            >
                <Button
                    type={"blank"}
                    noPadding={true}
                    onClick={handleModal}
                    className={styles.closeButton}
                >
                    <div className={styles.iconClose}>
                        <Close />
                    </div>
                </Button>
                <div className={styles.successIcon}>
                    <Success />
                </div>

                <span className={styles.successText}>
                    {t("request_success")}
                </span>
            </Modal>
        </div>
    );
};
export default HomeRequestForm;
