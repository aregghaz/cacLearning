import React, { useState, useEffect } from "react";
import axios from "axios";
import MetaTags from "react-meta-tags";
import { useTranslation } from "react-i18next";
import HomeCarousel from "../../../components/carousel/carousel";
import HomeRequestForm from "../../../components/request-form/request-form";
import Container from "../../../components/container/container";
import LoaderPortal from "../../../components/loader/loader";
import CarouselWithCards from "../../../components/carousel-with-cards/carousel-with-cards";
import NumbersSection from "./numbers-section/numbers-section";
import PhoneNumber from "./phone-number/phone-number";
import NewsSlider from "./news-slider/news-slider";
import BlogSlide from "./blog-slide/blog-slide";
import Partners from "./partners/partners";
import likesHandler from "../../../utils/likesHandler";

import styles from "./home.module.scss";

const Home = () => {
    const { t, i18n } = useTranslation();
    const [data, setData] = useState([]);
    const [likes, setLikes] = useState(
        localStorage.likes ? JSON.parse(localStorage.likes) : []
    );
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/home-data/${i18n.language}`).then((response) => {
            setData(response.data);
            setLoading(false);
        });
        return () => {};
    }, [i18n.language]);

    useEffect(() => {
        setTimeout(() => {
            axios
                .get(`/api/home-data/${i18n.language}`)
                .then((response) => setData(response.data));
        }, 500);
    }, [likes]);

    const handleLike = (slug) => likesHandler(likes, setLikes, slug);

    return isLoading ? (
        <LoaderPortal />
    ) : (
        <div className={styles.root}>
            {data && (
                <>
                    <MetaTags>
                        <title>{"LAO ACCOUNTING"}</title>
                        <meta property="og:title" content={"LAO ACCOUNTING"} />
                        <meta
                            property="og:description"
                            content={data.meta_description}
                        />
                        <meta
                            name="description"
                            content={data.meta_description}
                        />
                    </MetaTags>

                    <HomeCarousel slides={data.home_carousel_slides} />
                    <span className={styles.title}>{t("SERVICES")}</span>
                    <p className={styles.description}>
                        {t("services_subtitle")}
                    </p>
                    <Container>
                        <CarouselWithCards slides={data.services} />
                    </Container>
                    <Container>
                        <p className={styles.description}>
                            {t("SERVICE_REQUEST")}
                        </p>
                        <HomeRequestForm data={data.services} />
                    </Container>
                    <NumbersSection />
                    <PhoneNumber />
                    <span className={styles.title}>{t("NEWS")}</span>
                    <p className={styles.description}>{t("news_subtitle")}</p>
                    <Container>
                        <NewsSlider slides={data.news_items} />
                    </Container>
                    <span className={styles.title}>{t("BLOG")}</span>
                    <p className={styles.description}>{t("blogs_subtitle")}</p>
                    <BlogSlide
                        slides={data.blogs}
                        likes={likes}
                        handleLike={handleLike}
                    />
                    <span className={styles.title}>{t("PARTNERS")}</span>
                    <Partners slides={data.partners} />
                </>
            )}
        </div>
    );
};
export default Home;
