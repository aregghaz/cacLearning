import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
    Navigation,
    Pagination,
    Autoplay,
    EffectFade,
} from "swiper";
import { useTranslation } from "react-i18next";
import Media from "react-media";
import Button from "../button/button";
import {
    mediumOrNarrower,
    largeOrWider,
} from "../../constants/media-queries.js";

import styles from "./carousel.module.scss";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const HomeCarousel = ({ slides }) => {
    const { t } = useTranslation();

    return (
        <div className={styles.root}>
            <Swiper
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                speed={1000}
                loop={true}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
            >
                {slides &&
                    slides.map((slide, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className={styles.slide}>
                                    <Media query={mediumOrNarrower}>
                                        <img
                                            className={styles.image}
                                            src={`/${slide.mobile_image}`}
                                            alt={slide.title}
                                        />
                                    </Media>
                                    <Media query={largeOrWider}>
                                        <img
                                            className={styles.image}
                                            src={`/${slide.desktop_image}`}
                                            alt={slide.title}
                                        />
                                    </Media>
                                    <div className={styles.about}>
                                        <p className={styles.title}>
                                            {slide.title}
                                        </p>
                                        <p className={styles.text}>
                                            {slide.sub_title}
                                        </p>
                                        <div>
                                            <Button
                                                type={"blank"}
                                                to={`service-group/${slide.slug}`}
                                                noPadding
                                            >
                                                <span className={styles.button}>
                                                    {t("read_more")}
                                                </span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
            </Swiper>
        </div>
    );
};
export default HomeCarousel;
