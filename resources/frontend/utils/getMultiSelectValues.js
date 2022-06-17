export default function getMultiSelectValues(options, values) {
    return options && values.length ? options.filter((option) => values.includes(option.id)) : '';
}
