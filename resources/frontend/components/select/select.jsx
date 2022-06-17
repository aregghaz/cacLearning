import React from 'react'
import PropTypes from 'prop-types'
import ReactSelect from 'react-select'
import { Field } from 'formik'
import getSelectValue from '../../utils/getSelectValue'

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        color: '#86898B',
        backgroundColor: state.isSelected ? '#fff' : '#fff',
        cursor: 'pointer',
        fontSize: '13px',
        overflow: 'hidden',
        '&:active': {
            backgroundColor: '#fff',
        },
        '&:hover': {
            backgroundColor: '#fff',
        },
    }),
    menu: provided => ({
        ...provided,
        boxShadow: 'none',
        borderTop: 'none',
        borderRadius: '0 0 5px 5px',
        fontSize: '15px',
        marginTop: '-10px',
        cursor: 'pointer',
        zIndex: '4',
        backgroundColor: 'transparent',
        overflow: 'hidden',
        "@media only screen and (max-width: 768px)": {
            width: '100%',

        }

    }),
    indicatorContainer: provided => ({
        ...provided,
        transform: 'scale(1.5)',
        padding: '8px 10px',
        width: '50px',
    }),
    indicatorsContainer: provided => ({
        ...provided,
        width: '50px',
    }),
    container: provided => ({
        ...provided,
        width: '100%',
        cursor: 'pointer',

    }),
    placeholder: provided => ({
        ...provided,
        color: '#86898B',
        paddingLeft: '5px',
    }),
    dropdownIndicator: (provided, state) => ({
        ...provided,
        color: '#86898B',
        transition: 'all .2s ease',
        zoom: '1.5',
        transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
        '&:hover': {
            color: '#86898B',
        },
    }),
    valueContainer: (provided) => ({
        ...provided,
        padding: '2px 13px',
        "@media only screen and (max-width: 768px)": {
            display: "flex",
            justifyContent: "center",
            paddingRight: "0",
            paddingLeft: "50px",
        },
    }),
    control: (provided, state) => ({
        ...provided,
        height: '61px',
        backgroundColor: '#fff',
        textAlign: 'center',
        border: '1px solid #fff',
        fontSize: '15px',
        color: '#86898B',
        cursor: 'pointer',
        borderBottom: state.selectProps.menuIsOpen ? 'none' : null,
        borderRadius: state.selectProps.menuIsOpen ? '5px 5px 0 0' : '5px',
        // This line disables the blue border
        boxShadow: state.isFocused ? 0 : 0,
        '&:hover': {
            border: '1px solid #fff',
            borderBottom: state.selectProps.menuIsOpen ? 'none' : null,
            borderRadius: state.selectProps.menuIsOpen ? '5px 5px 0 0' : '5px',
        },
        "@media only screen and (max-width: 1470px)": {
            height: '60px'
        }
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1
        const transition = 'opacity 300ms'
        const color = 'color white'

        return { ...provided, opacity, transition, color }
    }

}

const getStyles = divider => {
    if (!divider) {
        return customStyles
    } else {
        return {
            ...customStyles,
            option: (provided, state) => {
                if (state.data.id === divider) {
                    return {
                        ...provided,
                        color: '#86898B',
                        backgroundColor: state.isSelected ? '#fff' : '#fff',
                        cursor: 'pointer',
                        borderBottom: '1px solid #fff',
                    }
                }
                return {
                    ...provided,
                    color: '#86898B',
                    backgroundColor: state.isSelected ? '#fff' : '#fff',
                    cursor: 'pointer',
                }
            },
        }
    }
}

export default function Select({
    isSearchable,
    placeholder,
    options,
    fieldName,
    value,
    divider,
    setFieldValue
}) {
    return (
        <>
            <Field
                component={ReactSelect}
                styles={getStyles(divider)}
                options={options}
                components={{
                    IndicatorSeparator: () => null,
                }}
                value={getSelectValue(options, value)}
                getOptionValue={option => option.id}
                getOptionLabel={option => option.name}
                isSearchable={isSearchable}
                onChange={option => setFieldValue(fieldName, option.id)}
                placeholder={placeholder}
            />
        </>
    )
}
Select.propTypes = {
    isSearchable: PropTypes.bool,
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.number,
        })
    ).isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fieldName: PropTypes.string.isRequired,
    divider: PropTypes.number,
    setFieldValue: PropTypes.func.isRequired,
}
Select.defaultProps = {
    isSearchable: false,
    placeholder: '',
    value: '',
    divider: 0,
}
