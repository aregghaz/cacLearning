import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import BackgroundWithTitle from "../../../components/background-with-title/background-with-title";
import NewsIcon from "../../../images/news-bg.png";
import axios from "axios";
import Container from "../../../components/container/container";
import NewsItem from "../../../components/news-item/news-item";
import LoaderPortal from "../../../components/loader/loader";
import MetaTags from "react-meta-tags";

import styles from "./news.module.scss";

const News = () => {
    const { t, i18n } = useTranslation();
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/news-items-data/${i18n.language}`).then((response) => {
            setData(response.data);
            setLoading(false);
        });
    }, [i18n.language]);

    return isLoading ? (
        <LoaderPortal />
    ) : (
        <div className={styles.root}>
            <MetaTags>
                <title>{`LAO ACCOUNTING - ${t("NEWS")}`}</title>
                <meta
                    property="og:title"
                    content={`LAO ACCOUNTING - ${t("NEWS")}`}
                />
                <meta
                    property="og:description"
                    content={data.meta_description}
                />
                <meta name="description" content={data.meta_description} />
            </MetaTags>
            <BackgroundWithTitle
                fromOne={t("homepage")}
                fromOneLink={"/"}
                image={NewsIcon}
                title={t("NEWS")}
                to={t("NEWS")}
            />
            <Container>
                <div className={styles.news}>
                    {data &&
                        data.news.map((news, index) => {
                            return (
                                <NewsItem
                                    key={index}
                                    img={`/${news.image}`}
                                    day={new Date(news.date * 1000).getDate()}
                                    month={new Date(
                                        news.date * 1000
                                    ).getMonth()}
                                    title={news.title}
                                    text={news.description}
                                    buttonLink={news.slug}
                                />
                            );
                        })}
                </div>
            </Container>
        </div>
    );
};
export default News;
