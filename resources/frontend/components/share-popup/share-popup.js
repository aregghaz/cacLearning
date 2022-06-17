import React, {useState, useRef} from 'react'
import {useTranslation} from "react-i18next";
import Share from "-!svg-react-loader!../../images/share.svg";
import {FacebookShareButton, LinkedinShareButton, TwitterShareButton} from "react-share";
import FB from "-!svg-react-loader!../../images/fb.svg";
import Linkedin from "-!svg-react-loader!../../images/linkedin.svg";
import Twitter from "-!svg-react-loader!../../images/tweeter.svg";
import Button from "../button/button";
import useOnClickOutside from "../../hooks/use-on-click-outside/use-on-click-outside";

import styles from './share-popup.module.scss'

const SharePopup = ({link}) => {
    const {t} = useTranslation();

    const ref = useRef();
    const [isPopupOpen, setIsPopupOpen] = useState(false)


    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen)
    }

    const copyLink = async copyMe => {
        try {
            await navigator.clipboard.writeText(copyMe);
        } catch (err) {
            false
        }
    };

    useOnClickOutside(ref, () => setIsPopupOpen(false));
    return (
        <div className={styles.root}>
            <div onClick={()=>{togglePopup()}} className={styles.share}>
                <Share/>
            </div>
            {isPopupOpen &&
            <div className={styles.popup} ref={ref}>
                <p className={styles.shareText}>{t('share_post')}</p>
                <div className={styles.shareIcons}>
                    <FacebookShareButton className={styles.shareButton} size={32} url={link} ><FB/></FacebookShareButton>
                    <LinkedinShareButton className={styles.shareButton} size={32} url={link}><Linkedin/></LinkedinShareButton>
                    <TwitterShareButton className={styles.shareButton} size={32} url={link}><Twitter/></TwitterShareButton>
                </div>
                <div className={styles.copy}>
                    <div className={styles.copyLink}>{link} </div>
                    <Button noPadding type={'blank'} onClick={()=>{copyLink(link)}}>
                        <span className={styles.copyButton}>copy</span>
                    </Button>
                </div>

            </div>
            }
        </div>
    )
}
export default SharePopup
