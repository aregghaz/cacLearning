import React from "react";
import { useTranslation } from "react-i18next";
import Arrow from "-!svg-react-loader!../../images/read-more-arrow.svg";
import { Link } from "@reach/router";

import styles from "./news-item.module.scss";

const NewsItem = ({ img, day, month, title, text, buttonLink }) => {
    const { t, i18n } = useTranslation();
    return (
        <Link
            to={`/${i18n.language}/news/${buttonLink}`}
            className={styles.newsItem}
        >
            <img className={styles.image} src={`${img}`} alt="" />
            <div className={styles.content}>
                <div className={styles.date}>
                    <p className={styles.day}>
                        {parseInt(day) > 9 ? day : `0${day}`}
                    </p>
                    <p className={styles.month}>
                        {parseInt(month) > 8
                            ? t(`month_${parseInt(month) + 1}`)
                            : t(`month_0${parseInt(month) + 1}`)}
                    </p>
                </div>
                <p className={styles.title}>{title}</p>
                <p className={styles.text}>{text}</p>
                <div className={styles.button}>
                    <span className={styles.readMore}>{t("read_more")}</span>
                    <div className={styles.icon}>
                        <Arrow />
                    </div>
                </div>
            </div>
        </Link>
    );
};
export default NewsItem;
