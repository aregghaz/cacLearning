const timestampToDate = (date) => {
    const year = new Date(date).getFullYear();
    const monthRaw = new Date(date).getMonth();
    const monthFormatted = parseInt(monthRaw) > 8 ? parseInt(monthRaw) + 1 : `0${parseInt(monthRaw)+1}`;
    const dayRaw = new Date(date).getDate();
    const day = parseInt(dayRaw) > 9 ? parseInt(dayRaw) : `0${dayRaw}`;

    return `${day}.${monthFormatted}.${year}`;
};

export default timestampToDate;
