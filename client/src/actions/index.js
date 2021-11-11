export const ADD_TO_CART = "ADD_TO_CART";

export const addToCart = (itemId) => {
  return {
    type: ADD_TO_CART,
    payload: {
      quantity: 1,
      itemId: itemId,
    },
  };
};
//actions 예시 템플릿
