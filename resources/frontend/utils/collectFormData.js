const collectFormData = (values, fields, translatableFields, i18n) => {
    const formData = new FormData();
    fields.map(({ name, type }) => {
        formData.append(
            type === 'select' ? `${name}_id` : name,
            values[type === 'select' ? `${name}_id` : name],
        );
    });

    translatableFields.map((tField) => {
        i18n.options.fallbackLng.map((ln) => {
            formData.append(`${ln}_${tField.name}`, values[`${ln}_${tField.name}`]);
        });
    });

    return formData;
};

export default collectFormData;
