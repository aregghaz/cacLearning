import React, {useEffect, useState} from 'react'
import {useTranslation} from "react-i18next";
import axios from "axios";
import Container from "../../../components/container/container";
import BackgroundWithTitle from "../../../components/background-with-title/background-with-title";
import ServiceIcon from '../../../images/service-bg.png'
import LoaderPortal from "../../../components/loader/loader";

import styles from './service.module.scss'

const Service = ({ slug }) => {
    const {t, i18n} = useTranslation();

    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`/api/service-data/${slug}/${i18n.language}`)
            .then(response => {
                setData(response.data);
                setLoading(false);
            });
    }, [i18n.language, slug]);

    return isLoading ? <LoaderPortal /> : (
        <div className={styles.root}>
            <BackgroundWithTitle
                fromOne={t('homepage')}
                fromOneLink={'/'}
                fromTwo={t('services')}
                fromTwoLink={'/services'}
                image={ServiceIcon}
                title={data.name}
                to={data.name}
            />
            <Container>
                <div
                    className={styles.text}
                    dangerouslySetInnerHTML={{ __html: data.description }}
                />
            </Container>

        </div>
    )
}
export default Service
