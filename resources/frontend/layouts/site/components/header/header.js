import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Media from "react-media";
import { useLocation } from "@reach/router";
import { Link } from "@reach/router";
import {
    mediumOrNarrower,
    largeOrWider,
} from "../../../../constants/media-queries.js";
import useWindowResize from "../../../../hooks/use-window-resize/use-window-resize";
import MenuBar from "-!svg-react-loader!../../../../images/menuBar.svg";
import CloseMenu from "-!svg-react-loader!../../../../images/closeMenu.svg";
import AutoCompleteInput from "../../../../components/autocomplete-input/autocomplete-input";
import Search from "-!svg-react-loader!../../../../images/search-icon.svg";
import Logo from "-!svg-react-loader!../../../../images/header-logo.svg";
import LanguagePicker from "./language-picker/language-picker.jsx";

import styles from "./header.module.scss";
import Button from "../../../../components/button/button";

const menuItems = [
    {
        item: "HOME",
        section: "",
        link: "#home",
    },
    {
        item: "ABOUT_US",
        section: "about-us",
        link: "#about-us",
    },
    {
        item: "SERVICES",
        section: "services",
        link: "#services",
    },
    {
        item: "INFORMATION",
        section: "information",
        submenuOptions: [
            {
                item: "NEWS",
                section: "news",
                link: "#news",
            },
            {
                item: "BLOG",
                section: "blog",
                link: "#blog ",
            },
        ],
    },
    {
        item: "CONTACT_US",
        section: "contact-us",
        link: "#contact-us",
    },
];

export default function Header() {
    let location = useLocation();
    const { width } = useWindowResize();
    const { i18n, t } = useTranslation();

    const [menuOpen, setMenuOpen] = useState(false);
    const [isMenuScrolled, setIsMenuScrolled] = useState(false);
    const [isActiveInput, setActiveInput] = useState(false);

    const handlerSearchIcon = () => setActiveInput(!isActiveInput);

    const handlerCloseInput = () => setActiveInput(false);

    const handleMenu = () => {
        if (menuOpen) {
            setMenuOpen(false);
            enableScroll();
        } else {
            setMenuOpen(true);
            disableScroll();
        }
    };

    const handleScrolledMenu = () => {
        if (window.pageYOffset > 10) {
            setIsMenuScrolled(true);
        } else {
            setIsMenuScrolled(false);
        }
    };

    useEffect(() => {
        document.addEventListener("scroll", handleScrolledMenu);
    }, []);

    const disableScroll = () => {
        if (width < 767) {
            // document.body.style.overflow = "hidden";
        }
    };
    const enableScroll = () => {
        if (width < 767) {
            document.body.style.overflow = "auto";
        }
    };

    return (
        <div
            className={`${styles.header} ${
                width < 767 && !menuOpen ? styles.blur : ""
            } ${width < 767 && menuOpen ? styles.opened : ""} ${
                width > 767 && isMenuScrolled ? styles.scrolled : ""
            }`}
        >
            <div className={styles.logoDisplay}>
                <li className={styles.logoDisplayLink} data-menuanchor="home">
                    <a href={`/${i18n.language}`}>
                        <Logo />
                    </a>
                </li>
            </div>
            <div className={styles.menuItems}>
                <Media query={mediumOrNarrower}>
                    {!menuOpen ? (
                        <div className={styles.openMenu}>
                            <div onClick={handleMenu}>
                                <MenuBar />
                            </div>
                        </div>
                    ) : (
                        <div className={styles.mobileMenu}>
                            <div className={styles.closeMenu}>
                                <div onClick={handleMenu}>
                                    <CloseMenu />
                                </div>
                            </div>
                            <div className={styles.mobileMenu}>
                                <div
                                    className={`${styles.mobileMenuItems} ${
                                        menuOpen ? styles.blur : ""
                                    }`}
                                >
                                    {menuItems.map((menuItem, key) => {
                                        return (
                                            <li
                                                className={styles.menuItem}
                                                data-menuanchor={
                                                    menuItem.section
                                                }
                                                key={key}
                                                onClick={() => {
                                                    setMenuOpen(false);
                                                }}
                                            >
                                                {menuItem.link ? (
                                                    <Link
                                                        to={
                                                            "/" +
                                                            i18n.language +
                                                            "/" +
                                                            menuItem.section
                                                        }
                                                    >
                                                        {t(menuItem.item)}
                                                    </Link>
                                                ) : (
                                                    <p>{t(menuItem.item)}</p>
                                                )}

                                                {menuItem.submenuOptions && (
                                                    <div
                                                        className={
                                                            styles.submenuMobile
                                                        }
                                                    >
                                                        {menuItem.submenuOptions.map(
                                                            (
                                                                submenu,
                                                                index
                                                            ) => {
                                                                return (
                                                                    <Link
                                                                        className={
                                                                            styles.submenuItem
                                                                        }
                                                                        to={
                                                                            "/" +
                                                                            i18n.language +
                                                                            "/" +
                                                                            submenu.section
                                                                        }
                                                                    >
                                                                        {" "}
                                                                        {t(
                                                                            submenu.item
                                                                        )}
                                                                    </Link>
                                                                );
                                                            }
                                                        )}
                                                    </div>
                                                )}
                                            </li>
                                        );
                                    })}
                                    {/*{isActiveInput ? (*/}
                                    {/*    <AutoCompleteInput*/}
                                    {/*        handlerCloseInput={handlerCloseInput}*/}
                                    {/*        handlerSearchIcon={handlerSearchIcon}*/}
                                    {/*        modalIsOpen={isActiveInput}*/}
                                    {/*    />*/}
                                    {/*) : (*/}
                                    {/*    <Button*/}
                                    {/*        type={'blank'}*/}
                                    {/*        noPadding*/}
                                    {/*        className={`${styles.menuItem} ${styles.search}`}*/}
                                    {/*        onClick={handlerSearchIcon}*/}
                                    {/*    >*/}
                                    {/*        <Search/>*/}
                                    {/*    </Button>*/}
                                    {/*)}*/}
                                    <LanguagePicker />
                                </div>
                            </div>
                        </div>
                    )}
                </Media>

                <Media query={largeOrWider}>
                    <React.Fragment>
                        {menuItems.map((menuItem, key) => {
                            return (
                                <li
                                    className={`${styles.menuItem} ${
                                        menuItem.submenuOptions
                                            ? styles.hasSubmenu
                                            : ""
                                    }`}
                                    data-menuanchor={menuItem.section}
                                    key={key}
                                    onClick={() => {
                                        setMenuOpen(false);
                                    }}
                                >
                                    {menuItem.link ? (
                                        <Link
                                            to={
                                                "/" +
                                                i18n.language +
                                                "/" +
                                                menuItem.section
                                            }
                                        >
                                            {t(menuItem.item)}
                                        </Link>
                                    ) : (
                                        <p>{t(menuItem.item)}</p>
                                    )}

                                    {menuItem.submenuOptions && (
                                        <div className={styles.submenu}>
                                            {menuItem.submenuOptions.map(
                                                (submenu, index) => {
                                                    return (
                                                        <Link
                                                            className={
                                                                styles.submenuItem
                                                            }
                                                            key={index}
                                                            to={
                                                                "/" +
                                                                i18n.language +
                                                                "/" +
                                                                submenu.section
                                                            }
                                                        >
                                                            {" "}
                                                            {t(submenu.item)}
                                                        </Link>
                                                    );
                                                }
                                            )}
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                        {/*  {isActiveInput ? (
                            <>
                            <AutoCompleteInput
                                handlerCloseInput={handlerCloseInput}
                                handlerSearchIcon={handlerSearchIcon}
                                modalIsOpen={isActiveInput}
                            />
                            <Button
                                type={'blank'}
                                noPadding
                                className={`${styles.menuItem}`}
                                onClick={handlerSearchIcon}
                            >
                                <Search/>
                            </Button>
                            </>
                        ) : (
                            <Button
                                type={'blank'}
                                noPadding
                                className={`${styles.menuItem}`}
                                onClick={handlerSearchIcon}
                            >
                                <Search/>
                            </Button>
                        )}*/}
                        <LanguagePicker />
                    </React.Fragment>
                </Media>
            </div>
        </div>
    );
}
