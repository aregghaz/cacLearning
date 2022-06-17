import React from 'react';
import PropTypes from 'prop-types';
import Select, { components } from 'react-select';
import { Field } from 'formik';

import styles from './multi-select.module.scss';

const MultiSelect = ({ options, onChange, placeholder, values }) => {

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            padding: '5px 0',
            backgroundColor: '#fff',
            border: 'none',
            minHeight: '40px',
            fontSize: '15px',
            color: '#336983',
        }),
        option: (provided, state) => ({
            ...provided,
            color: '#000000',
            backgroundColor: state.isSelected ? '#fff' : '#fff',
            cursor: 'pointer',
            fontSize: '15px',
            '&:active': {
                backgroundColor: '#fff',
            },
            '&:hover': {
                backgroundColor: '#fff',
            },
        }),
        container: (provided) => ({
            ...provided,
            width: '100%',
            cursor: 'pointer',
            border: '1px solid #ced4da',
            borderRadius: '4px',
        }),
        menu: (provided, state) => ({
            ...provided,
            fontSize: '15px',
            marginTop: '-5px',
            cursor: 'pointer',
            zIndex: '4',
            boxShadow: state.selectProps.menuIsOpen
                ? ' 0px 25px 20px 0px rgba(34, 41, 97, 0.03)'
                : null,
            backgroundColor: '#fff',
            border: state.selectProps.menuIsOpen ? '1px solid #ced4da' : null,
            width: '100%',
            height: '300px',
            overflowY: 'auto',
        }),
        menuList: (provided, state) => ({
            ...provided,
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr'
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            color: '#A4B0C3',
            zoom: '0.7',
            transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
        }),
        indicatorSeparator: (provided) => ({
            ...provided,
            display: 'none',
        }),
        multiValue: (provided) => ({
            ...provided,
            background: 'transparent',
            '& div:nth-of-type(1)': {
                paddingLeft: '3px',
            },
            '& div:nth-of-type(2)': {
                display: 'none',
            },
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#757575',
        }),
    };

    const Option = (props) => {
        return (
            <div className={styles.option}>
                <components.Option {...props}>
                    <input
                        id={props.label}
                        type="checkbox"
                        checked={props.isSelected}
                        onChange={() => null}
                    />{' '}
                    <label htmlFor={props.label} onClick={(e) => e.preventDefault()}>
                        {props.label}
                    </label>
                </components.Option>
            </div>
        );
    };

    return (
        <div className={styles.field}>
            <Field
                component={Select}
                styles={customStyles}
                isMulti
                options={options}
                value={values}
                onChange={onChange}
                placeholder={placeholder}
                hideSelectedOptions={false}
                closeMenuOnSelect={false}
                components={{ Option }}
            />
        </div>
    );
}

MultiSelect.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
        }),
    ).isRequired,
    values: PropTypes.array,
    placeholder: PropTypes.string.isRequired,
};

MultiSelect.defaultProps = {
    value: [],
};

export default MultiSelect;
