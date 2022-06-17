import React from 'react';
import PropTypes from 'prop-types';
import {Link, navigate} from '@reach/router';
import { useTranslation } from 'react-i18next';
import Close from '-!svg-react-loader!../../images/closeMenu.svg';
import MenuBar from '-!svg-react-loader!../../images/menuBar.svg';
import Account from '-!svg-react-loader!../../images/account.svg';

import Logout from '-!svg-react-loader!../../images/logout.svg';
import Button from "../button/button";
import styles from './drawer.module.scss';

const menuItemsFirst = [
    {
        item: 'services',
        page: '/services',
    },
    {
        item: 'about_us_content',
        page: '/about-us-contents'
    },
    {
        item: 'news',
        page: '/news-items'
    },
    {
        item: 'blogs',
        page: '/blogs'
    },
    {
        item: 'partners',
        page: '/partners'
    },
    {
        item: 'home_carousel_slides',
        page: '/home-carousel-slides'
    },
    {
        item: 'email_subscriptions',
        page: '/email-subscriptions'
    },
    {
        item: 'meta_descriptions',
        page: '/meta-descriptions'
    },
];

export default function Drawer({ toggleable, isOpen, handleToggle }) {
    const { t } = useTranslation();

    return (
        <>
            <nav className={styles.headerNav}>
                <div className={styles.account}>
                    <span className={styles.icon}><Account /></span>
                    <span>Admin</span>
                </div>
                <div className={styles.icons}>
                    <div
                        key={"logout"}
                        className={styles.iconBlock}
                    >
                        <Button
                            type={'blank'}
                            onClick={() => {
                                localStorage.access_token = '';
                                navigate('/admin_panel/login');

                            }}
                            noPadding
                        >
                        <span className={styles.icon}>
                            <Logout/>
                        </span>
                        </Button>
                    </div>
                </div>
            </nav>
            <nav
                className={`${styles.root} ${!toggleable ? styles.fixed : ''}`}
                style={{
                    width: toggleable && isOpen ? '280px' : (toggleable ? '50px' : '280px'),
                    transition: '0.5s'
                }}
            >
                {toggleable &&
                <Button
                    type={'blank'}
                    onClick={handleToggle}
                    noPadding
                >
                    {isOpen ? (
                        <span className={styles.closeIcon}>
                                <Close />
                            </span>
                    ) : (
                        <span className={styles.openIcon}>
                                <MenuBar />
                            </span>
                    )}
                </Button>
                }
                <ul className={styles.list}>
                    {menuItemsFirst.map(
                        (li) =>
                            (isOpen || !toggleable) && (
                                <li key={`first-${li.item}`}>
                                    <Link to={`/admin${li.page}`} className={styles.link}>
                                        {t(`admin:${li.item}`)}
                                    </Link>
                                </li>
                            ),
                    )}

                    {/*                    {isOpen && (
                        <li key="jewelry-dropdown">
                            <Dropdown title={t('admin:jewelries')}>
                                {jewelryMenuItems.map(({ item, page }) => {
                                    return (
                                        <li key={item}>
                                            <Link
                                                to={page}
                                                className={`${styles.link} ${styles.secondaryLink}`}
                                            >
                                                {t(`admin:${item}`)}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </Dropdown>
                        </li>
                    )}
                    {isOpen && (
                        <li key="accessory-dropdown">
                            <Dropdown title={t('admin:accessories')}>
                                {accessoryMenuItems.map(({ item, page }) => {
                                    return (
                                        <li key={item}>
                                            <Link
                                                to={page}
                                                className={`${styles.link} ${styles.secondaryLink}`}
                                            >
                                                {t(`admin:${item}`)}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </Dropdown>
                        </li>
                    )}
                    {menuItemsSecond.map(
                        (li) =>
                            isOpen && (
                                <li key={`second-${li.item}`}>
                                    <Link to={li.page} className={styles.link}>
                                        {t(`admin:${li.item}`)}
                                    </Link>
                                </li>
                            ),
                    )}
                    {isOpen && (
                        <li key="characteristics-dropdown">
                            <Dropdown title={t('admin:product_characteristics')}>
                                {characteristicsMenuItems.map(({ item, page }) => {
                                    return (
                                        <li key={item}>
                                            <Link
                                                to={page}
                                                className={`${styles.link} ${styles.secondaryLink}`}
                                            >
                                                {t(`admin:${item}`)}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </Dropdown>
                        </li>
                    )}
                    {isOpen && (
                        <li key="content-dropdown">
                            <Dropdown title={t('admin:page_contents')}>
                                {contentMenuItems.map(({ item, page }) => {
                                    return (
                                        <li key={item}>
                                            <Link
                                                to={page}
                                                className={`${styles.link} ${styles.secondaryLink}`}
                                            >
                                                {t(`admin:${item}`)}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </Dropdown>
                        </li>
                    )}
                    {isOpen && (
                        <li key="boutique-service-dropdown">
                            <Dropdown title={t('admin:boutiques_and_service')}>
                                {boutiqueServiceMenuItems.map(({ item, page }) => {
                                    return (
                                        <li key={item}>
                                            <Link
                                                to={page}
                                                className={`${styles.link} ${styles.secondaryLink}`}
                                            >
                                                {t(`admin:${item}`)}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </Dropdown>
                        </li>
                    )}*/}
                </ul>
            </nav>
        </>
    );
}

Drawer.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleToggle: PropTypes.func.isRequired,
    toggleable: PropTypes.bool,
};
Drawer.defaultProps = {
    toggleable: true,
};
