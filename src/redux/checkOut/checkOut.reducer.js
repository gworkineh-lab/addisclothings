import checkOutTypes from "./checkOut.types";

const INITIAL_STATE = {
    itemsInShopping: []
};

const checkoutReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case checkOutTypes.ADD_ITEM_TO_CHECK_OUT:
            return {
                ...state,
                itemsInShopping: action.payload
            };
        default:
            return state;
    }
};

export default checkoutReducer;