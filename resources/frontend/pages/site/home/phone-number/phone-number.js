import React from 'react';
import TypingComponent from "../../../../components/typing/typing";
import Phone from "-!svg-react-loader!../../../../images/phone-icon.svg";
import styles from './phone-number.module.scss'
import {useTranslation} from "react-i18next";

const PhoneNumber = () => {
    const {t} = useTranslation();
    return (
        <div className={styles.root}>
            <div className={styles.icon}>
                <Phone/>
            </div>

            <div className={styles.title}><TypingComponent textToType="+374 10 50 60 05" delay={300} loop={true} /></div>
            <p className={styles.description}>{t('call_us_for_the_best_solutions')}</p>
            <a href='tel:+37410506005' className={styles.button}>{t('call')}</a>
        </div>
    )
}
export default PhoneNumber
