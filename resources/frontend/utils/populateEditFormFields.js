const populateEditFormFields = (fields, translatableFields, i18n, data) => {
    const values = {};
    fields.map((field) => {
        if (field.type === 'file') {
            // TODO: Think about this
            //  setExistingImage(response.data[staticKeys[i]])
            values[field.name] = { name: null };
        } else if (field.type === 'select') {
            values[`${field.name}_id`] = data[`${field.name}_id`];
            //TODO: fix this
        } else {
            values[field.name] = data[field.name];
        }
    });

    translatableFields.map((tField) => {
        i18n.options.fallbackLng.map((ln) => {
            values[`${ln}_${tField.name}`] = data[`${ln}_${tField.name}`];
        });
    });

    return values;
};

export default populateEditFormFields;
