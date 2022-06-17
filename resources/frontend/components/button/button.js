import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import styles from './button.module.scss';

export default function Button({
                                   type,
                                   onClick,
                                   to,
                                   isSubmit,
                                   small,
                                   full,
                                   round,
                                   flex,
                                   noPadding,
                                   isNative,
                                   className,
                                   children,
                               }) {
    let styleName;
    switch (type) {
        case 'primary':
            styleName = styles.primary;
            break;
        case 'white':
            styleName = styles.white;
            break;
        case 'secondary':
            styleName = styles.secondary;
            break;
        case 'gray':
            styleName = styles.gray;
            break;
        case 'green':
            styleName = styles.green;
            break;
        case 'blank':
            styleName = styles.blank;
            break;
        default:
            styleName = styles.gray;
            break;
    }

    return (
        <>
            {isNative ? (
                <a
                    href={to}
                    onClick={onClick}
                    className={`
		    		    ${styleName} ${small ? styles.small : ''}
		    		    ${full ? styles.full : ''}
		    		    ${flex ? styles.flex : ''}
		    		    ${noPadding ? styles.noPadding : ''}
		    		    ${round ? styles.round : ''}
                        ${className ? className : ''}
                    `}
                >
                    {children}
                </a>
            ) : (
                <>
                    {to ? (
                        <Link
                            to={to}
                            onClick={onClick}
                            className={`
                            ${styleName}
                            ${styles.link}
                            ${noPadding ? styles.noPadding : ''}
                            ${full ? styles.full : ''}
                            ${round ? styles.round : ''}
                            ${className ? className : ''}
                        `}
                        >
                            {children}
                        </Link>
                    ) : (
                        <button
                            type={isSubmit ? 'submit' : 'button'}
                            onClick={onClick}
                            className={`
		    			    ${styleName} ${small ? styles.small : ''}
		    			    ${full ? styles.full : ''}
		    			    ${flex ? styles.flex : ''}
		    			    ${noPadding ? styles.noPadding : ''}
		    			    ${round ? styles.round : ''}
                            ${className ? className : ''}
                        `}
                        >
                            {children}
                        </button>
                    )}
                </>
            )}
        </>
    );
}
Button.propTypes = {
    type: PropTypes.string,
    to: PropTypes.string,
    isSubmit: PropTypes.bool,
    small: PropTypes.bool,
    full: PropTypes.bool,
    round: PropTypes.bool,
    flex: PropTypes.bool,
    noPadding: PropTypes.bool,
    isNative: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};
Button.defaultProps = {
    type: 'primary',
    to: '',
    small: false,
    full: false,
    round: false,
    flex: false,
    noPadding: false,
    isNative: false,
    isSubmit: false,
    isDisabled: false,
    className: '',
};
