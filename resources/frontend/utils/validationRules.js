const validationRules = (values, requiredFields, fields, translatableFields, t) => {
    const errors = {};

    requiredFields.map((field) => {
        if (
            fields.length &&
            typeof fields.find((f) => f.name === field) !== 'undefined' &&
            fields.find((f) => f.name === field).type === 'file'
        ) {
            if (!values[field].name) {
                errors[field] = t('admin:field_required');
            }
        } else if (
            (typeof values[field] === 'undefined' || values[field] === '') &&
            fields.find((f) => f.name === field)
        ) {
            errors[field] = t('admin:field_required');
        } else if (
            // TODO: with all locales
            (typeof values[`ru_${field}`] === 'undefined' || values[`ru_${field}`] === '') &&
            translatableFields.find((f) => f.name === field)
        ) {
            errors[`ru_${field}`] = t('admin:field_required');
        }
    });

    return errors;
};

export default validationRules;
