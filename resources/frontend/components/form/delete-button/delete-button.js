import React, { useState } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';
import axios from 'axios';
import Button from '../../button/button';
import { useTranslation } from 'react-i18next';
import TrashIcon from '-!svg-react-loader!../../../images/trash.svg';

import styles from './delete-button.module.scss';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export default function DeleteButton({ id, crudKey, setCurrentData }) {
    const [activeModal, setActiveModal] = useState(0);

    const handleDelete = (id) => {
        setActiveModal(id);
    };

    const deleteAction = (id) => {
        axios.delete(`/api/${pluralize(crudKey)}/${id}`).then((response) => {
            if (response.data === '1') {
                axios.get(`/api/${pluralize(crudKey)}`).then((response) => {
                    setCurrentData([...response.data]);
                });
            }
        });
    };

    const { t } = useTranslation();

    const closeModal = () => {
        setActiveModal(0);
    };

    return (
        <>
            <Button
                type={'blank'}
                onClick={() => handleDelete(id)}
                className={styles.mainButton}
            >
                <span className={styles.icon}>
                    <TrashIcon />
                </span>
            </Button>
            {activeModal === id && (
                <Modal
                    isOpen={activeModal === id}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Modal"
                >
                    <div className={styles.content}>
                        <Button
                            type={'blank'}
                            noPadding
                            onClick={closeModal}
                            className={styles.close}
                        >
                            &times;
                        </Button>
                        <div>{t('admin:delete_question')}</div>
                        <Button
                            type={'gray'}
                            onClick={() => deleteAction(id)}
                            className={styles.button}
                        >
                            {t('admin:yes')}
                        </Button>
                    </div>
                </Modal>
            )}
        </>
    );
}

DeleteButton.propTypes = {
    id: PropTypes.number.isRequired,
    crudKey: PropTypes.string.isRequired,
    setCurrentData: PropTypes.func.isRequired,
};
