const getListItemCount = (listItemQuantities, name) => {
    return listItemQuantities
        .find(item => item.name === name)
        ? listItemQuantities
            .find(item => item.name === name)
            .count
        : 1;
}

export default getListItemCount;
