export const checkAvailability = (items) => {
    const filteredItems = items.filter(
        ({ availability_status_id }) => availability_status_id !== 1,
    );
    return !filteredItems.length;
};

export const checkDelivery = (items) => {
    const filteredItems = items.filter(({ can_be_delivered }) => can_be_delivered !== 1);
    return !filteredItems.length;
};

export const checkOnlinePayment = (items) => {
    const filteredItems = items.filter(({ can_be_paid_online }) => can_be_paid_online !== 1);
    return !filteredItems.length;
};

export const sumTotalItems = (items) =>
    items.reduce((acc, cur) => acc + cur.currentCartItem.price * cur.count, 0);
