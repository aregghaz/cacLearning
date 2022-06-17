import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import BackgroundWithTitle from "../../../components/background-with-title/background-with-title";
import Container from "../../../components/container/container";
import ServicesIcon from "../../../images/services-bg.png";
import LoaderPortal from "../../../components/loader/loader";
import CarouselWithCards from "../../../components/carousel-with-cards/carousel-with-cards";

import styles from "./services.module.scss";

const Services = () => {
    const { t, i18n } = useTranslation();
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/services-data/${i18n.language}`).then((response) => {
            setData(response.data);
            setLoading(false);
        });
    }, [i18n.language]);

    return isLoading ? (
        <LoaderPortal />
    ) : (
        <div className={styles.root}>
            <BackgroundWithTitle
                fromOne={t("homepage")}
                fromOneLink={"/"}
                image={ServicesIcon}
                title={t("SERVICES")}
                to={t("SERVICES")}
            />
            <span className={styles.title}>{t("SERVICES")}</span>
            <Container>
                <p className={styles.description}>{t("services_subtitle")}</p>
                <div className={styles.services}>
                    {/*<Container>*/}
                    {/*    <CarouselWithCards slides={data}/>*/}
                    {/*</Container>*/}
                    {data &&
                        data.map((service, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`${styles.service} ${styles.flipCard}`}
                                >
                                    <div className={`${styles.flipCardInner}`}>
                                        <div className={styles.flipCardFront}>
                                            <img
                                                className={styles.image}
                                                src={`/${service.image}`}
                                                alt=""
                                            />
                                            <p className={styles.cardTitle}>
                                                {service.name}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </Container>
        </div>
    );
};
export default Services;
