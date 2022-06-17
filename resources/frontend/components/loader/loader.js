import React from 'react';
import ReactDOM from 'react-dom';
import styles from './loader.module.scss';

const Loader = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.block}>
                <div key="bar1" className={styles.loaderBar} />
                <div key="bar2" className={styles.loaderBar} />
                <div key="bar3" className={styles.loaderBar} />
                <div key="bar4" className={styles.loaderBar} />
                <div key="bar5" className={styles.loaderBar} />
                <div key="ball" className={styles.loaderBall} />
            </div>
        </div>
    );
};

const LoaderPortal = () =>
    ReactDOM.createPortal(<Loader />, document.getElementById('loader-portal'));

export default LoaderPortal;
