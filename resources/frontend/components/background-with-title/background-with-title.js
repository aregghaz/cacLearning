import React from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";

import styles from "./background-with-title.module.scss";
import { useTranslation } from "react-i18next";

const BackgroundWithTitle = ({
    image,
    title,
    fromOne,
    fromOneLink,
    fromTwo,
    fromTwoLink,
    to,
}) => {
    const { i18n } = useTranslation();

    return (
        <div className={styles.root}>
            <img className={styles.image} src={image} alt={title} />
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.breadcrumbs}>
                    <Link
                        to={
                            fromOneLink === "/"
                                ? `/${i18n.language}`
                                : fromOneLink
                        }
                    >
                        {fromOne}{" "}
                    </Link>
                    <span className={styles.divider}>/</span>
                    {(fromTwo || fromTwoLink) && (
                        <Link to={fromTwoLink}>{fromTwo} </Link>
                    )}
                    {(fromTwo || fromTwoLink) && (
                        <span className={styles.divider}>/</span>
                    )}
                    <span className={styles.current}>{to}</span>
                </div>
            </div>
        </div>
    );
};
export default BackgroundWithTitle;
BackgroundWithTitle.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    fromOne: PropTypes.string.isRequired,
    fromOneLink: PropTypes.string.isRequired,
    fromTwo: PropTypes.string,
    fromTwoLink: PropTypes.string,
    to: PropTypes.string,
};
BackgroundWithTitle.defaultProps = {
    title: "",
    fromTwo: "",
    fromTwoLink: "",
    to: "",
};
