import React from 'react'
import {useTranslation} from "react-i18next";
import BackgroundWithTitle from "../../../components/background-with-title/background-with-title";
import ContactUsIcon from '../../../images/contact-us-bg.png'
import Container from '../../../components/container/container'
import {GOOGLE_API_KEY} from '../../../configs/configs'
import {GoogleApiWrapper, Map, Marker} from 'google-maps-react'
import ContactUsForm from "../../../components/contact-us-form/contact-us-form";
import Location from "-!svg-react-loader!../../../images/location-footer.svg";
import Phone from "-!svg-react-loader!../../../images/phone-footer.svg";
import Mail from "-!svg-react-loader!../../../images/mail-footer.svg";
import Time from "-!svg-react-loader!../../../images/time-footer.svg";
import {
    PHONE_NUMBER_ONE,
    PHONE_NUMBER_TWO,
    PHONE_NUMBER_FORMATTED_ONE,
    PHONE_NUMBER_FORMATTED_TWO,
    ADDRESS,
    COMPANY_EMAIL,
    TIME
} from '../../../constants/company-data';
import styles from './contact-us.module.scss';

const ContactUs = () => {
    const {t} = useTranslation();
    return (
        <div className={styles.root}>
            <BackgroundWithTitle
                fromOne={t('homepage')}
                fromOneLink={'/'}
                image={ContactUsIcon}
                title={t('CONTACT_US')}
                to={t('CONTACT_US')}
            />
           <Container>
               <div className={styles.container}>
                   <div className={styles.map}>
                       <Map
                           google={google}
                           zoom={17}
                           initialCenter={{
                               lat: 40.184610,
                               lng: 44.509524
                           }}
                       >
                           <Marker
                               position={{
                                   lat: 40.184610,
                                   lng: 44.509524
                               }}
                           />
                       </Map>
                   </div>
                    <div className={styles.form}>
                        <ContactUsForm/>
                        <div className={styles.col}>
                            <div className={styles.iconWithText}>
                                <Location/>
                                <span className={`${styles.text} ${styles.address}`}>
                                {t(ADDRESS)}
                            </span>
                            </div>
                            <div className={styles.iconWithText}>
                                <Phone/>
                                <p className={styles.text}>
                                    <span className={styles.number}>
                                        <a href={`tel:${PHONE_NUMBER_ONE}`}> {PHONE_NUMBER_FORMATTED_ONE}</a>
                                    </span>
                                    <span className={styles.number}>
                                        <a href={`tel:${PHONE_NUMBER_TWO}`}>{PHONE_NUMBER_FORMATTED_TWO}</a>
                                    </span>
                                </p>
                            </div>
                            <div className={styles.iconWithText}>
                                <Time/>
                                <span className={styles.text}>
                                {t(TIME)}
                            </span>
                            </div>

                            <div className={styles.iconWithText}>
                                <Mail/>
                                <span className={styles.text}>
                                    <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a>
                                </span>
                            </div>
                        </div>
                    </div>
               </div>
           </Container>
        </div>
    )
};
export default GoogleApiWrapper({
    apiKey: GOOGLE_API_KEY,
    language: 'en'
})(ContactUs)
