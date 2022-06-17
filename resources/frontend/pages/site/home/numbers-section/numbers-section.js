import React from 'react';

import Container from "../../../../components/container/container";
import CountUp from "react-countup";
import VisibilitySensor from 'react-visibility-sensor';
import {useTranslation} from "react-i18next";

import styles from "./numbers-section.module.scss";
const NumbersSection = ( ) => {
    const {t} = useTranslation()
    return(
        <div className={styles.numbersBG}>
            <Container>
                <div className={styles.numbers}>
                    <div className={styles.numberWrapper}>
                        <p>
                            <CountUp end={7}  className={styles.number}  redraw={true}>
                                {({ countUpRef, start }) => (
                                    <VisibilitySensor onChange={start} delayedCall>
                                        <span ref={countUpRef} />
                                    </VisibilitySensor>
                                )}
                            </CountUp>
                            <sup className={styles.sup}>+</sup>
                        </p>

                        <p className={styles.numberDescription}>{t('years_in_market')}</p>
                    </div>
                    <div className={styles.numberWrapper}>
                        <p>
                            <CountUp end={300}  className={styles.number}  redraw={true}>
                                {({ countUpRef, start }) => (
                                    <VisibilitySensor onChange={start} delayedCall>
                                        <span ref={countUpRef} />
                                    </VisibilitySensor>
                                )}
                            </CountUp>
                            <sup className={styles.sup}>+</sup>
                        </p>

                        <p className={styles.numberDescription}>{t('solutions')}</p>
                    </div>
                    <div className={styles.numberWrapper}>
                        <p>
                            <CountUp end={5000}  className={styles.number}  redraw={true}>
                                {({ countUpRef, start }) => (
                                    <VisibilitySensor onChange={start} delayedCall>
                                        <span ref={countUpRef} />
                                    </VisibilitySensor>
                                )}
                            </CountUp>
                            <sup className={styles.sup}>+</sup>
                        </p>

                        <p className={styles.numberDescription}>{t('satisfied_customers')}</p>
                    </div>
                </div>
            </Container>
        </div>
    )
}
export default NumbersSection
