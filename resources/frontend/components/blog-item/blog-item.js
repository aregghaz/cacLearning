import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import MetaTags from "react-meta-tags";
import { Link } from "@reach/router";
import Button from "../button/button";
import Heart from "-!svg-react-loader!../../images/heart.svg";
import FullHeart from "-!svg-react-loader!../../images/full-heart.svg";

import styles from "./blog-item.module.scss";
import SharePopup from "../share-popup/share-popup";

const BlogItem = ({ link, img, title, likes, description, onLike, liked }) => {
    const { t, i18n } = useTranslation();

    return (
        <div className={styles.blogItem}>
            <MetaTags>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:image" content={img} />
            </MetaTags>

            <Link to={`/${i18n.language}/blog-item/${link}`}>
                {" "}
                <img className={styles.image} src={`/${img}`} alt="" />
            </Link>

            <Link
                to={`/${i18n.language}/blog-item/${link}`}
                className={styles.title}
            >
                {title}
            </Link>

            <div className={styles.actions}>
                <Button
                    type={"blank"}
                    onClick={() => {
                        onLike(link);
                    }}
                    noPadding
                    className={styles.like}
                >
                    {liked ? <FullHeart /> : <Heart />}

                    <span className={styles.likes}>{likes}</span>
                </Button>
                <SharePopup
                    link={`https://${location.hostname}/${i18n.language}/blog-item/${link}`}
                />
            </div>
        </div>
    );
};
export default BlogItem;
