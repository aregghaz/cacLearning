import React from 'react';
import PropTypes from 'prop-types';
import Header from './components/header/header';
import Footer from './components/footer/footer';
//import Loader from '../../components/loader/loader';
//TODO: import { YMInitializer } from 'react-yandex-metrika'
// import { ToastContainer } from 'react-toastify';
import {PHONE_NUMBER_ONE} from "../../constants/company-data";
import useScrollTop from '../../hooks/use-scroll-top/use-scroll-top';
import Icon from '../../images/callIcon.png'
import styles from './site.module.scss';

export default function Site({  isLoading, children }) {
    useScrollTop();

    return (
        <>
            <Header />
            <main className={styles.main}>
                {/*<ToastContainer />*/}
                {children}
                {/*{isLoading.isLoading && <Loader />}*/}
            </main>
            <Footer />
            <a className={styles.call} href={`tel:${PHONE_NUMBER_ONE}`}><img src={Icon} alt="icon"/></a>
        </>
    );
}

Site.propTypes = {
    children: PropTypes.node.isRequired,
};


