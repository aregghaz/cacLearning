import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@reach/router";
import Location from "-!svg-react-loader!../../../../images/location-footer.svg";
import Phone from "-!svg-react-loader!../../../../images/phone-footer.svg";
import Mail from "-!svg-react-loader!../../../../images/mail-footer.svg";
import Linkedin from "-!svg-react-loader!../../../../images/linkedin-footer.svg";
import Facebook from "-!svg-react-loader!../../../../images/fb-footer.svg";
import GooglePlus from "-!svg-react-loader!../../../../images/google-plus.svg";
import Instagram from "-!svg-react-loader!../../../../images/instagram.svg";
import FullHeart from "-!svg-react-loader!../../../../images/full-heart.svg";
import {
    FACEBOOK_ACCOUNT,
    GOOGLE_PLUS_ACCOUNT,
    LINKEDIN_ACCOUNT,
    INSTA_ACCOUNT,
    PHONE_NUMBER_ONE,
    PHONE_NUMBER_TWO,
    PHONE_NUMBER_FORMATTED_ONE,
    PHONE_NUMBER_FORMATTED_TWO,
    ADDRESS,
    COMPANY_EMAIL,
} from "../../../../constants/company-data";

import styles from "./footer.module.scss";
import Container from "../../../../components/container/container";
import Input from "../../../../components/input/input";
import Button from "../../../../components/button/button";
import axios from "axios";
import { EMAIL } from "../../../../constants/regular-expressions";

const menuItems = [
    {
        item: "ABOUT_US",
        section: "about-us",
        link: "#about-us",
    },
    {
        item: "SERVICES",
        section: "services",
        link: "#services",
    },
    {
        item: "INFORMATION",
        section: "news",
        link: "#information",
    },
    {
        item: "CONTACT_US",
        section: "contact-us",
        link: "#contact-us",
    },
];
const newDate = new Date();
const year = newDate.getFullYear();
export default function Footer() {
    const { t } = useTranslation();
    const [newsletter, setNewsletter] = useState("");
    const [error, setError] = useState("");
    const handleSubscribe = () => {
        if (EMAIL.test(newsletter)) {
            setError("");
            axios
                .post(`/api/email-subscription-data`, { email: newsletter })
                .then((response) => {
                    if (response.data) {
                        setNewsletter("");
                    }
                });
        } else {
            setError(t("wrong"));
        }
    };
    return (
        <div id="footer" className={styles.footer}>
            <Container>
                <div className={styles.container}>
                    <div className={styles.col}>
                        {menuItems.map((menuItem, index) => {
                            return (
                                <div key={index} className={styles.linkWrapper}>
                                    <Link
                                        className={styles.link}
                                        to={"/" + menuItem.section}
                                    >
                                        <span>{t(menuItem.item)}</span>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                    <div className={styles.col}>
                        <div className={styles.iconWithText}>
                            <Location />
                            <span
                                className={`${styles.text} ${styles.address}`}
                            >
                                {t(ADDRESS)}
                            </span>
                        </div>
                        <div className={styles.iconWithText}>
                            <Phone />
                            <span className={styles.text}>
                                <a href={`tel:${PHONE_NUMBER_ONE}`}>
                                    {" "}
                                    {PHONE_NUMBER_FORMATTED_ONE}
                                </a>

                                <br />
                                <a href={`tel:${PHONE_NUMBER_TWO}`}>
                                    {PHONE_NUMBER_FORMATTED_TWO}
                                </a>
                            </span>
                        </div>
                        <div className={styles.iconWithText}>
                            <Mail />
                            <span className={styles.text}>
                                <a href={`mailto:${COMPANY_EMAIL}`}>
                                    {COMPANY_EMAIL}
                                </a>
                            </span>
                        </div>
                    </div>
                    <div className={styles.col}>
                        <span className={styles.subscribeText}>
                            {t("subscribe_for_news")}
                        </span>
                        <div className={styles.newsletter}>
                            <Input
                                value={newsletter}
                                onChange={(e) => setNewsletter(e.target.value)}
                                name="newsletter"
                                className={styles.input}
                                placeholder={t("email")}
                                error={error}
                            />
                            <Button
                                type={"secondary"}
                                noPadding
                                onClick={handleSubscribe}
                            >
                                <span className={styles.button}>
                                    {t("subscribe")}
                                </span>
                            </Button>
                        </div>
                        <div className={styles.socials}>
                            <span>{t("follow_us")}</span>
                            <div>
                                <a
                                    target={"_blank"}
                                    href={LINKEDIN_ACCOUNT}
                                    className={styles.socialIcon}
                                >
                                    <Linkedin />
                                </a>
                                <a
                                    target={"_blank"}
                                    href={FACEBOOK_ACCOUNT}
                                    className={styles.socialIcon}
                                >
                                    <Facebook />
                                </a>
                                <a
                                    target={"_blank"}
                                    href={INSTA_ACCOUNT}
                                    className={styles.socialIcon}
                                >
                                    <Instagram />
                                </a>
                                <a
                                    target={"_blank"}
                                    href={GOOGLE_PLUS_ACCOUNT}
                                    className={styles.socialIcon}
                                >
                                    <GooglePlus />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <p className={styles.reserved}>
                © {year} {t("all_rights_reserved")}
            </p>
            {/*<a href="https://neen.am" target="_blank" className={styles.created}><p>Created with</p>*/}
            {/*    <div className={styles.heart}>*/}
            {/*        <FullHeart/>*/}
            {/*    </div>*/}
            {/*    <p>from Neen</p></a>*/}
        </div>
    );
}
