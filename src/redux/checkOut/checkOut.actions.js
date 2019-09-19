import checkOutTypes from "./checkOut.types";

const addItemToCheckout = cartItems => ({
    type: checkOutTypes.ADD_ITEM_TO_CHECK_OUT,
    payload: cartItems
});

export default addItemToCheckout;