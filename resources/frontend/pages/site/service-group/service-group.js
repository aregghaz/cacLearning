import React, {useEffect, useState} from 'react'
import {useTranslation} from "react-i18next";
import BackgroundWithTitle from "../../../components/background-with-title/background-with-title";
import Container from "../../../components/container/container";
import axios from "axios";
import LoaderPortal from "../../../components/loader/loader";

import styles from './service-group.module.scss'

const ServiceGroup = ({ slug }) => {
    const {t, i18n} = useTranslation();

    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`/api/service-group-data/${slug}/${i18n.language}`)
            .then(response => {
                setData(response.data);
                setLoading(false);
            });
    }, [i18n.language, slug]);
    return isLoading ? <LoaderPortal /> : (
        <div>

            <BackgroundWithTitle
                fromOne={t('homepage')}
                fromOneLink={'/'}
                image={`/${data.desktop_image}`}
                title={data.title}
                to={data.title}
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
export default ServiceGroup
