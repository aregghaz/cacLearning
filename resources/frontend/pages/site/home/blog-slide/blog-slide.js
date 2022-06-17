import React, { useState } from "react";
import Arrow from "-!svg-react-loader!../../../../images/read-more-arrow.svg";
import ArrowLeft from "-!svg-react-loader!../../../../images/arrow-left.svg";
import ArrowRight from "-!svg-react-loader!../../../../images/arrow-right.svg";
import Heart from "-!svg-react-loader!../../../../images/heart.svg";
import FullHeart from "-!svg-react-loader!../../../../images/full-heart.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, EffectFade } from "swiper";
import Button from "../../../../components/button/button";
import { useTranslation } from "react-i18next";
import Container from "../../../../components/container/container";
import SharePopup from "../../../../components/share-popup/share-popup";

import styles from "./blog-slide.module.scss";

SwiperCore.use([Navigation, EffectFade]);

const BlogSlide = ({ slides, likes, handleLike }) => {
    const { t, i18n } = useTranslation();
    const [activeSlide, setActiveSlide] = useState(0);

    return (
        <Container>
            <div className={styles.root}>
                <div className={styles.navigation}>
                    <Button type={"blank"} className={styles.swiperButtonPrev}>
                        <div className={styles.arrow}>
                            <ArrowLeft />
                        </div>
                    </Button>
                    <span className={styles.pagination}>
                        {slides && `${activeSlide} / ${slides.length}`}
                    </span>

                    <Button type={"blank"} className={styles.swiperButtonNext}>
                        <div className={styles.arrow}>
                            <ArrowRight />
                        </div>
                    </Button>
                </div>

                <Swiper
                    spaceBetween={0}
                    slidesPerView={1}
                    watchSlidesVisibility
                    effect="fade"
                    navigation={{
                        nextEl: `.${styles.swiperButtonNext}`,
                        prevEl: `.${styles.swiperButtonPrev}`,
                    }}
                >
                    {slides &&
                        slides.map((slide, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    {({ isVisible }) => {
                                        !!isVisible &&
                                            setTimeout(() => {
                                                setActiveSlide(index + 1);
                                            }, 0);
                                        return (
                                            <div className={styles.slide}>
                                                <div
                                                    className={
                                                        styles.imageWrapper
                                                    }
                                                >
                                                    <img
                                                        className={styles.image}
                                                        src={`/${slide.image}`}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className={styles.content}>
                                                    <p className={styles.text}>
                                                        {slide.description}
                                                    </p>
                                                    {slide.author && (
                                                        <p
                                                            className={
                                                                styles.author
                                                            }
                                                        >
                                                            -{slide.author}
                                                        </p>
                                                    )}
                                                    {slide.position && (
                                                        <p
                                                            className={
                                                                styles.title
                                                            }
                                                        >
                                                            {slide.position}
                                                        </p>
                                                    )}
                                                    <div
                                                        className={
                                                            styles.actions
                                                        }
                                                    >
                                                        <Button
                                                            onClick={() =>
                                                                handleLike(
                                                                    slide.slug
                                                                )
                                                            }
                                                            type={"blank"}
                                                            noPadding
                                                            className={
                                                                styles.like
                                                            }
                                                        >
                                                            {likes.includes(
                                                                slide.slug
                                                            ) ? (
                                                                <FullHeart />
                                                            ) : (
                                                                <Heart />
                                                            )}
                                                            <span
                                                                className={
                                                                    styles.likes
                                                                }
                                                            >
                                                                {slide.likes}
                                                            </span>
                                                        </Button>
                                                        <SharePopup
                                                            link={`https://${location.hostname}/${i18n.language}/blog-item/${slide.slug}`}
                                                        />
                                                    </div>
                                                    <a
                                                        href={`/${i18n.language}/blog-item/${slide.slug}`}
                                                        className={
                                                            styles.button
                                                        }
                                                    >
                                                        <span
                                                            className={
                                                                styles.readMore
                                                            }
                                                        >
                                                            {t("read_more")}
                                                        </span>
                                                        <div
                                                            className={
                                                                styles.icon
                                                            }
                                                        >
                                                            <Arrow />
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        );
                                    }}
                                </SwiperSlide>
                            );
                        })}
                </Swiper>
            </div>
        </Container>
    );
};
export default BlogSlide;

//FIXME: PropTypes
