import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import useOnClickOutside from "../../../../../hooks/use-on-click-outside/use-on-click-outside";
import Button from "../../../../../components/button/button";
import Rus from "-!svg-react-loader!../../../../../images/rus.svg";
import Eng from "-!svg-react-loader!../../../../../images/eng.svg";
import Arm from "-!svg-react-loader!../../../../../images/arm.svg";
import styles from "./language-picker.module.scss";
import { navigate } from "@reach/router";

export default function LanguagePicker() {
    const ref = useRef();

    const { i18n, t } = useTranslation();
    const [isPopoverOpen, setPopoverOpen] = useState(false);

    const handlePopoverToggle = () => {
        setPopoverOpen(!isPopoverOpen);
    };
    const currentPathname = window.location.pathname.replace(/\/+$/, "");
    const handleLanguageChange = (locale) => {
        setPopoverOpen(false);
        let newCurrentPathname = currentPathname;
        if (
            currentPathname.search("/en") !== -1 ||
            currentPathname.search("/hy") !== -1 ||
            currentPathname.search("/ru") !== -1
        ) {
            newCurrentPathname = currentPathname
                .replaceAll("/en", "")
                .replaceAll("/ru", "")
                .replaceAll("/hy", "");
        }
        navigate(`/${locale}${newCurrentPathname}`);
        axios.get(`/api/language-change/${locale}`).then((response) => {
            if (parseInt(response.data) === 1) {
                i18n.changeLanguage(locale);
            }
        });
    };

    useOnClickOutside(ref, () => setPopoverOpen(false));

    return (
        <div ref={ref} className={styles.languagePicker}>
            <div className={styles.buttonBlock}>
                <Button
                    noPadding
                    type="blank"
                    small
                    onClick={handlePopoverToggle}
                >

                    {i18n.language === 'en' && <Eng/>}
                    {i18n.language === 'ru' && <Rus/>}
                    {i18n.language === 'hy' && <Arm/>}
                    {/*<span className={styles.locale}>{t(i18n.language)}</span>*/}
                </Button>
            </div>
            <div className={styles.popover}>
                {i18n.languages.map((locale) => {
                    if (locale !== i18n.language) {
                        return (
                            <div className={styles.localeBlock} key={locale}>
                                <Button
                                    noPadding
                                    type="blank"
                                    onClick={() => handleLanguageChange(locale)}
                                >
                                    {locale === 'en' && <Eng/>}
                                    {locale === 'ru' && <Rus/>}
                                    {locale === 'hy' && <Arm/>}
                                    {/*<span className={styles.locale}>*/}
                                    {/*    {t(locale)}*/}
                                    {/*</span>*/}
                                </Button>
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
}
