import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from '../../button/button';

import styles from './single-file-upload.module.scss';

export default function SingleFileUpload({
    oldImage,
    oldVideo,
    oldName,
    onChange,
    error,
    touched,
    value,
    media,
    name,
}) {
    const { t } = useTranslation();

    return (
        <>
            {oldImage && (
                <div className={styles.existingImageBlock}>
                    <img className={styles.existingImage} src={oldImage} alt={oldName} />
                </div>
            )}
            {oldVideo && (
                <div className={styles.existingImageBlock}>
                    <video controls className={styles.existingImage} src={oldVideo} />
                </div>
            )}
            <div className={styles.uploadButtonWrapper}>
                {error && <div className={styles.error}>{error}</div>}
                {name && <p>{t(`admin:${name}`)}</p>}
                <Button type={'gray'}>
                    <span className={styles.uploadFileText}>
                        {media === 'image' ? t('admin:upload_image') : t('admin:upload_video')}
                    </span>
                    {value && <span className={styles.uploadedImage}>{value.name}</span>}
                </Button>
                <input name={name} type="file" className={styles.fileInput} onChange={onChange} />
            </div>
        </>
    );
}

SingleFileUpload.propTypes = {
    oldImage: PropTypes.string,
    oldVideo: PropTypes.string,
    oldName: PropTypes.string,
    touched: PropTypes.bool,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.shape({
        name: PropTypes.string,
    }).isRequired,
    media: PropTypes.oneOf(['image', 'video']),
    name: PropTypes.string,
};

SingleFileUpload.defaultProps = {
    oldImage: '',
    oldVideo: '',
    oldName: '',
    touched: false,
    error: '',
    media: 'image',
    name: '',
};
