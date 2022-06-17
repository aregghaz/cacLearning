import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "./i18n";
import { Router } from "@reach/router";

// Website
import Site from "./layouts/site/site";
import Home from "./pages/site/home/home";
import AboutUs from "./pages/site/about-us/about-us";
import Services from "./pages/site/services/services";
import Service from "./pages/site/service/service";
import ServiceGroup from "./pages/site/service-group/service-group";
import ContactUs from "./pages/site/contact-us/contact-us";
import News from "./pages/site/news/news";
import Blog from "./pages/site/blog/blog";
import BlogItemPage from "./pages/site/blog-item-page/blog-item-page";
import NewsItemPage from "./pages/site/news-item-page/news-item-page";
import PrivateRoute from "./components/private-route/private-route";

//Admin Panel
import Login from "./pages/admin/auth/login";
import SignUp from "./pages/admin/auth/sign-up";
import ServiceList from "./pages/admin/services/list";
import ServiceEdit from "./pages/admin/services/edit";
import ServiceCreate from "./pages/admin/services/create";
import AboutUsEdit from "./pages/admin/about_us/edit";
import AboutUsList from "./pages/admin/about_us/list";

import Main from "./pages/admin/main/main";

import NewsItemList from "./pages/admin/news/list";
import NewsItemCreate from "./pages/admin/news/create";
import NewsItemEdit from "./pages/admin/news/edit";
import BlogList from "./pages/admin/blog/list";
import BlogCreate from "./pages/admin/blog/create";
import BlogEdit from "./pages/admin/blog/edit";
import PartnerCreate from "./pages/admin/partners/create";
import PartnerEdit from "./pages/admin/partners/edit";
import PartnerList from "./pages/admin/partners/list";
import HomeCarouselSlideList from "./pages/admin/home_carousel_slides/list";
import HomeCarouselSlideCreate from "./pages/admin/home_carousel_slides/create";
import HomeCarouselSlideEdit from "./pages/admin/home_carousel_slides/edit";
import MetaDescriptionCreate from "./pages/admin/meta-descriptions/create";
import MetaDescriptionEdit from "./pages/admin/meta-descriptions/edit";
import MetaDescriptionList from "./pages/admin/meta-descriptions/list";
import EmailSubscriptionList from "./pages/admin/email-subscriptions/list";
/*TODO: ReactGA.initialize('UA-163381677-1')
ReactGA.pageview(window.location.pathname + window.location.search)*/
import { navigate } from "@reach/router";
import styles from "./app.module.scss";
import { useTranslation } from "react-i18next";
import axios from "axios";

export default function App() {
    const { i18n, t } = useTranslation();
    const currentPathname = window.location.pathname.replace(/\/+$/, "");
    useEffect(() => {
        console.log(currentPathname);
        if (currentPathname === "" || currentPathname === "/") {
            navigate("/hy");
        }
        if (currentPathname.search("/en") !== -1) {
            axios.get(`/api/language-change/en`).then((response) => {
                if (parseInt(response.data) === 1) {
                    i18n.changeLanguage("en");
                }
            });
        } else if (currentPathname.search("/hy") !== -1) {
            axios.get(`/api/language-change/hy`).then((response) => {
                if (parseInt(response.data) === 1) {
                    i18n.changeLanguage("hy");
                }
            });
        } else if (currentPathname.search("/ru") !== -1) {
            axios.get(`/api/language-change/ru`).then((response) => {
                if (parseInt(response.data) === 1) {
                    i18n.changeLanguage("ru");
                }
            });
        }
    }, [currentPathname]);
    return (
        <div>
            <Router className={styles.router}>
                <Site path={`/${i18n.language}`}>
                    <Home path="/" />
                    <AboutUs path={"about-us"} />
                    <Services path={"services"} />
                    <Service path="/service/:slug" />
                    <ServiceGroup path="/service-group/:slug" />
                    <ContactUs path={"contact-us"} />
                    <News path={"news"} />
                    <NewsItemPage path={"/news/:slug"} />
                    <Blog path={"/blog"} />
                    <BlogItemPage path={"/blog-item/:slug"} />
                </Site>
                <SignUp path="/sign-up" />
                <Login path="/admin_panel/login" />
                <PrivateRoute as={Main} path="/admin">
                    <ServiceList path="/services" />
                    <ServiceCreate path="/service" />
                    <ServiceEdit path="/service/:id" />

                    <AboutUsList path={"/about-us-contents"} />
                    <AboutUsEdit path={"/about-us-content/:id"} />

                    <NewsItemList path="/news-items" />
                    <NewsItemCreate path="/news-item" />
                    <NewsItemEdit path="/news-item/:id" />

                    <BlogList path="/blogs" />
                    <BlogCreate path="/blog" />
                    <BlogEdit path="/blog/:id" />

                    <PartnerList path="/partners" />
                    <PartnerCreate path="/partner" />
                    <PartnerEdit path="/partner/:id" />

                    <HomeCarouselSlideList path="/home-carousel-slides" />
                    <HomeCarouselSlideCreate path="/home-carousel-slide" />
                    <HomeCarouselSlideEdit path="/home-carousel-slide/:id" />

                    <EmailSubscriptionList path="/email-subscriptions" />

                    <MetaDescriptionList path="/meta-descriptions" />
                    <MetaDescriptionCreate path="/meta-description" />
                    <MetaDescriptionEdit path="/meta-description/:id" />
                </PrivateRoute>
            </Router>
        </div>
    );
}

if (document.getElementById("root")) {
    ReactDOM.render(<App />, document.getElementById("root"));
}
