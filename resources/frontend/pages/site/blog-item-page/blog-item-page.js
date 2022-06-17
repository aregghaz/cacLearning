import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import BackgroundWithTitle from "../../../components/background-with-title/background-with-title";
import BlogItemPageIcon from "../../../images/blog-bg.png";
import BlogItem from "../../../components/blog-item/blog-item";
import Container from "../../../components/container/container";
import LoaderPortal from "../../../components/loader/loader";
import axios from "axios";
import Button from "../../../components/button/button";
import Heart from "-!svg-react-loader!../../../images/heart.svg";
import SharePopup from "../../../components/share-popup/share-popup";
import FullHeart from "-!svg-react-loader!../../../images/full-heart.svg";
import likesHandler from "../../../utils/likesHandler";

import styles from "./blog-item-page.module.scss";
import MetaTags from "react-meta-tags";

const BlogItemPage = ({ slug }) => {
    const { t, i18n } = useTranslation();
    const [data, setData] = useState("");
    const [isLoading, setLoading] = useState(true);
    const [likes, setLikes] = useState(
        localStorage.likes ? JSON.parse(localStorage.likes) : []
    );

    useEffect(() => {
        axios
            .get(`/api/blog-data/${slug}/${i18n.language}`)
            .then((response) => {
                setData(response.data);
                setLoading(false);
            });
    }, [i18n.language, slug]);

    useEffect(() => {
        setTimeout(() => {
            axios
                .get(`/api/blog-data/${slug}/${i18n.language}`)
                .then((response) => setData(response.data));
        }, 500);
    }, [likes]);

    const handleLike = (slug) => likesHandler(likes, setLikes, slug);

    return isLoading ? (
        <LoaderPortal />
    ) : (
        <div className={styles.root}>
            <MetaTags>
                <title>{data.blog_item.title}</title>
                <meta property="og:title" content={data.blog_item.title} />
                <meta
                    property="og:description"
                    content={data.blog_item.title}
                />
                <meta name="description" content={data.blog_item.title} />
            </MetaTags>
            <BackgroundWithTitle
                fromOne={t("homepage")}
                fromOneLink={"/"}
                image={BlogItemPageIcon}
                title={t("BLOG")}
                to={t("BLOG")}
            />
            <Container>
                {data.blog_item && data.similar_blogs && (
                    <div className={styles.blog}>
                        <div className={styles.selected}>
                            <div className={styles.imageWrapper}>
                                <img
                                    className={styles.image}
                                    src={`/${data.blog_item.image}`}
                                    alt=""
                                />
                            </div>
                            <div className={styles.content}>
                                <h4 className={styles.title}>
                                    {data.blog_item.title}
                                </h4>
                                <div
                                    className={styles.text}
                                    dangerouslySetInnerHTML={{
                                        __html: data.blog_item.description,
                                    }}
                                />
                                {data.blog_item.author && (
                                    <p className={styles.author}>
                                        -{data.blog_item.author}
                                    </p>
                                )}
                                {data.blog_item.position && (
                                    <p className={styles.position}>
                                        {data.blog_item.position}
                                    </p>
                                )}
                                <div className={styles.actions}>
                                    <Button
                                        type={"blank"}
                                        onClick={() =>
                                            handleLike(data.blog_item.slug)
                                        }
                                        noPadding
                                        className={styles.like}
                                    >
                                        {likes.includes(data.blog_item.slug) ? (
                                            <FullHeart />
                                        ) : (
                                            <Heart />
                                        )}
                                        <span className={styles.likes}>
                                            {data.blog_item.likes}
                                        </span>
                                    </Button>
                                    <SharePopup
                                        link={`https://${location.hostname}/${i18n.language}/blog-item/${data.blog_item.slug}`}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.blogItems}>
                            {data.similar_blogs.map((blog, index) => {
                                return (
                                    index < 3 && (
                                        <BlogItem
                                            key={index}
                                            link={blog.slug}
                                            img={`/${blog.image}`}
                                            title={blog.title}
                                            likes={blog.likes}
                                            description={blog.description}
                                            onLike={(slug) => handleLike(slug)}
                                            liked={likes.includes(blog.slug)}
                                        />
                                    )
                                );
                            })}
                        </div>
                    </div>
                )}
            </Container>
        </div>
    );
};
export default BlogItemPage;
