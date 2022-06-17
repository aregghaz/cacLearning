import React from "react";
import Arrow from "-!svg-react-loader!../../../../images/read-more-arrow.svg";
import ArrowLeft from "-!svg-react-loader!../../../../images/slider-arrow-left.svg";
import ArrowRight from "-!svg-react-loader!../../../../images/slider-arrow-right.svg";
import Button from "../../../../components/button/button";
import { Link } from "@reach/router";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";

import styles from "./news-slider.module.scss";

SwiperCore.use([Navigation, Pagination]);

const getDate = (timestamp) => {
    const date_raw = new Date(timestamp * 1000).getDate();
    return parseInt(date_raw) > 9 ? date_raw : `0${date_raw}`;
};
const getMonth = (timestamp) => {
    const date_raw = new Date(timestamp * 1000).getMonth();
    return parseInt(date_raw) > 8
        ? parseInt(date_raw) + 1
        : `0${parseInt(date_raw) + 1}`;
};
const getYear = (timestamp) => {
    const date_raw = new Date(timestamp * 1000).getFullYear();
    return parseInt(date_raw) > 8
        ? parseInt(date_raw) + 1
        : `0${parseInt(date_raw) + 1}`;
};

const NewsSlider = ({ slides }) => {
    const { t, i18n } = useTranslation();
    return (
        <div className={styles.root}>
            <Button type={"blank"} className={styles.swiperButtonPrev}>
                <div className={styles.arrow}>
                    <ArrowLeft />
                </div>
            </Button>

            <Button type={"blank"} className={styles.swiperButtonNext}>
                <div className={styles.arrow}>
                    <ArrowRight />
                </div>
            </Button>
            <Swiper
                loop={true}
                spaceBetween={15}
                slidesPerView={3}
                slidesPerGroup={3}
                navigation={{
                    nextEl: `.${styles.swiperButtonNext}`,
                    prevEl: `.${styles.swiperButtonPrev}`,
                }}
                pagination={{ clickable: true }}
                breakpoints={{
                    // when window width is >= 640px
                    320: {
                        spaceBetween: 20,
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                    },
                    768: {
                        spaceBetween: 10,
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                    },
                    992: {
                        spaceBetween: 15,
                    },
                }}
            >
                {slides &&
                    slides.map((slide, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <Link
                                    to={`/${i18n.language}/news/${slide.slug}`}
                                    className={styles.slide}
                                >
                                    <img
                                        className={styles.image}
                                        src={`/${slide.image}`}
                                        alt={slide.title}
                                    />
                                    <div className={styles.content}>
                                        <div className={styles.date}>
                                            <p className={styles.day}>
                                                {getDate(slide.date)}
                                            </p>
                                            <p className={styles.month}>
                                                {t(
                                                    `month_${getMonth(
                                                        slide.date
                                                    )}`
                                                )}
                                            </p>
                                            <p className={styles.year}>{getYear(slide.date)}</p>
                                        </div>
                                        <p className={styles.title}>
                                            {slide.title}
                                        </p>
                                        <p className={styles.text}>
                                            {slide.description}
                                        </p>
                                        <div className={styles.button}>
                                            <span className={styles.readMore}>
                                                {t("read_more")}
                                            </span>
                                            <div className={styles.icon}>
                                                {" "}
                                                <Arrow />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        );
                    })}
            </Swiper>
        </div>
    );
};
export default NewsSlider;
