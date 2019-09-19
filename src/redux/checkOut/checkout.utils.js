const addItemToCheckout = (cartItems) => {

    if (cartItems) {
        return cartItems.map(cartItem => (
            cartItem
        ));
    }

    return [...cartItems]
};
export default addItemToCheckout;
