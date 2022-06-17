const getFieldLabel = (t, label, name, requiredFields) => {
    return label
        ? `${t(`admin:${label}`)}${requiredFields.includes(name) ? '*' : ''}`
        : `${t(`admin:${name}`)}${requiredFields.includes(name) ? '*' : ''}`;
};

export default getFieldLabel;
