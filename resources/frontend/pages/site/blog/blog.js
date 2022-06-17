import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import BackgroundWithTitle from "../../../components/background-with-title/background-with-title";
import BlogIcon from "../../../images/blog-bg.png";
import Container from "../../../components/container/container";
import BlogItem from "../../../components/blog-item/blog-item";
import LoaderPortal from "../../../components/loader/loader";
import likesHandler from "../../../utils/likesHandler";
import MetaTags from "react-meta-tags";
import styles from "./blog.module.scss";

const Blog = () => {
    const { t, i18n } = useTranslation();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [likes, setLikes] = useState(
        localStorage.likes ? JSON.parse(localStorage.likes) : []
    );

    useEffect(() => {
        axios.get(`api/blogs-data/${i18n.language}`).then((response) => {
            setData(response.data);
            setLoading(false);
        });
    }, [i18n.language]);

    useEffect(() => {
        setTimeout(() => {
            axios
                .get(`/api/blogs-data/${i18n.language}`)
                .then((response) => setData(response.data));
        }, 500);
    }, [likes]);

    const handleLike = (slug) => likesHandler(likes, setLikes, slug);

    return isLoading ? (
        <LoaderPortal />
    ) : (
        <div className={styles.root}>
            <MetaTags>
                <title>{`LAO ACCOUNTING - ${t("BLOG")}`}</title>
                <meta
                    property="og:title"
                    content={`LAO ACCOUNTING - ${t("BLOG")}`}
                />
                <meta
                    property="og:description"
                    content={data.meta_description}
                />
                <meta name="description" content={data.meta_description} />
            </MetaTags>
            <BackgroundWithTitle
                fromOne={t("homepage")}
                fromOneLink={"/"}
                image={BlogIcon}
                title={t("BLOG")}
                to={t("BLOG")}
            />
            <Container>
                <p className={styles.text} />
                <div className={styles.blog}>
                    {data &&
                        data.blogs &&
                        data.blogs.map((blog, index) => {
                            return (
                                <BlogItem
                                    key={index}
                                    link={blog.slug}
                                    img={blog.image}
                                    title={blog.title}
                                    likes={blog.likes}
                                    description={blog.description}
                                    onLike={(slug) => handleLike(slug)}
                                    liked={likes.includes(blog.slug)}
                                />
                            );
                        })}
                </div>
            </Container>
        </div>
    );
};
export default Blog;
