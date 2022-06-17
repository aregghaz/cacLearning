import React, {useEffect, useRef, useState} from 'react'
import axios from 'axios'
import Search from "-!svg-react-loader!../../images/search-icon.svg";
import {Formik} from 'formik'
import {useTranslation} from 'react-i18next'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import TextField from '../text-field/text-field'
import Close from '-!svg-react-loader!../../images/closeMenu.svg'
import Input from '../input/input'
import Button from '../button/button'
import {Link, useLocation} from '@reach/router'
import useOnClickOutside from '../../hooks/use-on-click-outside/use-on-click-outside'
import useWindowResize from '../../hooks/use-window-resize/use-window-resize'

import styles from './autocomplete-input.module.scss'

const customStylesMobile = {
    content: {
        position: 'unset',
        width: '100%',
        padding: '20px 20px 190px',
        margin: '0 0 0 0',
        border: 'none',
        borderRadius: '0',
        overflowY: 'auto',
        height: 'auto'
    },
    overlay: {
        zIndex: 400,
        backgroundColor: 'transparent'
    }
}

Modal.setAppElement('body');

export default function AutoCompleteInput({handlerCloseInput, handlerSearchIcon, modalIsOpen}) {
    const {t} = useTranslation()
    const inputRef = useRef()
    const [suggestions, setSuggestions] = useState([])
    const [prevPathname, setPrevPathname] = useState(null)
    const [fromMode, setFormMode] = useState(0)
    const {pathname} = useLocation()
    const {width} = useWindowResize()


    useEffect(() => {
        setPrevPathname(pathname)
        if (pathname !== prevPathname && prevPathname !== null) {
            handlerCloseInput()
        }
    }, [pathname])

    useEffect(() => {

        setFormMode(1)

    },)

    useOnClickOutside(inputRef, handlerCloseInput)

    const handlerChangeInput = (event, setFieldValue) => {
        const inputValue = event.target.value
        if (inputValue.length >= 3) {
            axios
                .get(`/api/search-data/${inputValue}`)
                .then((response) => setSuggestions(response.data))
        } else {
            setSuggestions([])
        }
        setFieldValue('searchInput', inputValue)
    }


    return (
        <div className={styles.root}>

            {
                !!fromMode &&
                <Modal isOpen={modalIsOpen} style={customStylesMobile} className={styles.modal}>
                    <div className={styles.inputWrapper} ref={inputRef}>
                        <Formik
                            initialValues={{searchInput: ''}}
                            onSubmit={(values, {setSubmitting}) => {
                            }}
                        >

                            {({values, setFieldValue, handleSubmit}) => (
                                <form onSubmit={handleSubmit} className={styles.searchForm}>

                                    <Input
                                        className={styles.input}
                                        type={'text'}
                                        name={'searchInput'}
                                        onChange={(event) => handlerChangeInput(event, setFieldValue)}
                                        value={values.searchInput}
                                        placeholder={t(`site:search`)}
                                    />
                                    <div className={styles.inputClosetIcon}>
                                        <Button
                                            type={'blank'}
                                            noPadding={true}
                                            onClick={handlerSearchIcon}
                                            className={styles.closeButton}
                                        >
                                            <div className={styles.iconClose}>
                                                <Close/>
                                            </div>
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </Formik>
                        {!!suggestions.length && (
                            <div className={styles.suggestions}>
                                {suggestions.map((item) => (
                                    <Link
                                        key={item.id}
                                        className={styles.link}
                                        to={`/item_card/${item.slug}`}
                                    >
                                        <div className={styles.suggestionsItem}>
                                            <div>
                                                <img
                                                    src={`/uploads/products/${item.image}`}
                                                    alt={item.reference}
                                                />
                                            </div>
                                            <div className={styles.suggestionsText}>
                                                <p className={styles.brand}>{item.brand}</p>
                                                <p className={styles.reference}>{item.reference}</p>
                                                <p className={styles.collection}>{item.collection}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </Modal>
            }
        </div>

    )
}

AutoCompleteInput.propTypes = {
    handlerCloseInput: PropTypes.func.isRequired,
    handlerSearchIcon: PropTypes.func.isRequired,
    modalIsOpen: PropTypes.bool.isRequired
}
