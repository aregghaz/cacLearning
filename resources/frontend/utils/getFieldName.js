const getFieldName = (locale, name, type) => {
    switch (type) {
        case "select":
            return `${name}_id`;
        case "multiselect":
            return `${name}_ids`;
        default:
            return locale ? `${locale}_${name}` : name;
    }
};

export default getFieldName;
