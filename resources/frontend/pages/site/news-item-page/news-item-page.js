import React, {useEffect, useState} from 'react'
import {useTranslation} from "react-i18next";
import BackgroundWithTitle from "../../../components/background-with-title/background-with-title";
import Container from "../../../components/container/container";
import NewsItem from "../../../components/news-item/news-item";
import axios from "axios";
import NewsItemPageIcon from '../../../images/news-bg.png'
import LoaderPortal from "../../../components/loader/loader";
import timestampToDate from "../../../utils/timestampToDate";

import styles from './news-item-page.module.scss'
import MetaTags from "react-meta-tags";

const NewsItemPage = ({slug}) => {
    const {t, i18n} = useTranslation();
    const [data, setData] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`/api/news-item-data/${slug}/${i18n.language}`)
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
                image={NewsItemPageIcon}
                title={t('NEWS')}
                to={t('NEWS')}
            />
            <Container>
                {data.news_item  && data.similar_news &&
                <div className={styles.news}>
                    <MetaTags>
                        <title>{data.news_item.title}</title>
                        <meta property='og:title' content={data.news_item.title}/>
                        <meta
                            property='og:description'
                            content={data.news_item.title}
                        />
                        <meta name='description' content={data.news_item.title}/>
                    </MetaTags>
                    <div className={styles.selected}>
                        <div className={styles.content}>
                            <h4 className={styles.title}>{data.news_item.title}</h4>
                            <div
                                className={styles.text}
                                dangerouslySetInnerHTML={{ __html: data.news_item.description }}
                            />
                            <p className={styles.date}>{timestampToDate(data.news_item.date*1000)}</p>
                        </div>

                    </div>

                    <div className={styles.newsItems}>

                        {data.similar_news.map((news, index) => {
                            return (
                                index <3 &&
                                <NewsItem
                                    key={index}
                                    img={`/${news.image}`}
                                    day={new Date(news.date*1000).getDate()}
                                    month={new Date(news.date*1000).getMonth()}
                                    title={news.title}
                                    text={news.description}
                                    buttonLink={`${news.slug}`}
                                />
                            )
                        })}
                    </div>

                </div>
                            }
            </Container>
        </div>
    )
}
export default NewsItemPage
