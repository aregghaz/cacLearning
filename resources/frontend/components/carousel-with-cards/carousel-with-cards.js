import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import { useTranslation } from "react-i18next";
import { Link } from "@reach/router";
import Button from "../button/button";
import ArrowLeft from "-!svg-react-loader!../../images/slider-arrow-left.svg";
import ArrowRight from "-!svg-react-loader!../../images/slider-arrow-right.svg";
import styles from "./carousel-with-cards.module.scss";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const CarouselWithCards = ({ slides }) => {
    const { t } = useTranslation();

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
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                speed={1000}
                spaceBetween={30}
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
                        spaceBetween: 20,
                    },
                    1200: {
                        spaceBetween: 30,
                    },
                }}
            >
                {slides &&
                    slides.map((slide, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className={styles.slide}>
                                    <img
                                        className={styles.image}
                                        src={`/${slide.image}`}
                                        alt=""
                                    />
                                    <p className={styles.title}>{slide.name}</p>
                                </div>
                            </SwiperSlide>
                        );
                    })}
            </Swiper>
        </div>
    );
};
export default CarouselWithCards;
