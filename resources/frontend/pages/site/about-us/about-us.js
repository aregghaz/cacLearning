import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import BackgroundWithTitle from "../../../components/background-with-title/background-with-title";
import AboutUsImage from "../../../images/about-us.jpg";
import Container from "../../../components/container/container";
import LoaderPortal from "../../../components/loader/loader";
import MetaTags from "react-meta-tags";

import styles from "./about-us.module.scss";

const AboutUs = () => {
    const { t, i18n } = useTranslation();
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/about-us-data/${i18n.language}`).then((response) => {
            setData(response.data);
            setLoading(false);
        });
    }, []);

    return isLoading ? (
        <LoaderPortal />
    ) : (
        <div className={styles.root}>
            <MetaTags>
                <title>{"LAO ACCOUNTING"}</title>
                <meta property="og:title" content={"LAO ACCOUNTING"} />
                <meta
                    property="og:description"
                    content={data.meta_description}
                />
                <meta name="description" content={data.meta_description} />
            </MetaTags>
            <BackgroundWithTitle
                fromOne={t("homepage")}
                fromOneLink={"/"}
                image={AboutUsImage}
                title={t("ABOUT_US")}
                to={t("ABOUT_US")}
            />
            <Container>
                <div
                    className={styles.content}
                    dangerouslySetInnerHTML={{ __html: data.page_content }}
                />
            </Container>
        </div>
    );
};
export default AboutUs;
