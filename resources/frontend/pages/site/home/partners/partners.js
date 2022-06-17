import React from "react";
import styles from "./partners.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";

SwiperCore.use([Autoplay]);

const Partners = ({ slides }) => {
    return (
        <div className={styles.root}>
            <Swiper
                loop={true}
                spaceBetween={30}
                slidesPerView={5}
                autoplay
                breakpoints={{
                    // when window width is >= 640px
                    320: {
                        slidesPerView: 3,
                    },
                    768: {
                        slidesPerView: 4,
                    },
                    992: {
                        slidesPerView: 5,
                    },
                }}
            >
                {slides &&
                    slides.map((slide, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className={styles.logo}>
                                    <img
                                        className={styles.image}
                                        src={`/${slide.image}`}
                                        alt=""
                                    />
                                </div>
                            </SwiperSlide>
                        );
                    })}
            </Swiper>
        </div>
    );
};
export default Partners;
