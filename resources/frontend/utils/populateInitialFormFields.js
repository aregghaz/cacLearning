const populateInitialFormFields = (fields, translatableFields, i18n) => {
    const initialValues = {};

    fields.forEach((field) => {
        if (field.type === 'input') {
            initialValues[field.name] = field.value ? field.value : '';
        } else if (field.type === 'select') {
            initialValues[`${field.name}_id`] = field.value ? field.value : '';
            //TODO: fix this
        } else if (field.type === 'multiSelect') {
            initialValues[`${field.name}_id[]`] = field.value.length ? field.value : [];
        } else if (field.type === 'richText') {
            initialValues[field.name] = field.value ? field.value : '';
        } else if (field.type === 'checkboxGroup') {
            initialValues[field.name] = field.value ? field.value : [];
        } else if (field.type === 'checkbox') {
            initialValues[field.name] = field.value ? field.value : false;
        } else if (field.type === 'file') {
            initialValues[field.name] = field.value ? field.value : { name: '' };
        } else {
            initialValues[field.name] = field.value ? field.value : '';
        }
    });

    translatableFields.map((tField) =>
        i18n.options.fallbackLng.map((ln) => initialValues[`${ln}_${tField.name}`], ''),
    );

    return initialValues;
};

export default populateInitialFormFields;
