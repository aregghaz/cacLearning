export default function getSelectValue(options, value) {
    return options && value ? options.find((option) => option.id === value) : '';
}
