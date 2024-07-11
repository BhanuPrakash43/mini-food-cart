import React, { createContext, useContext, useReducer, useState } from "react";

const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        [action.payload.person]: [
          ...state[action.payload.person],
          action.payload,
        ],
      };
    case "INCREASE_QTY":
      return {
        ...state,
        [action.payload.person]: state[action.payload.person].map((item) =>
          item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
        ),
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        [action.payload.person]: state[action.payload.person].filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case "DECREASE_QTY":
      return {
        ...state,
        [action.payload.person]: state[action.payload.person].map((item) =>
          item.id === action.payload.id ? { ...item, qty: item.qty - 1 } : item
        ),
      };
    default:
      return state;
  }
}

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    person1: [],
    person2: [],
  });
  const [selectedPerson, setSelectedPerson] = useState("person1");

  return (
    <CartContext.Provider
      value={{ state, dispatch, selectedPerson, setSelectedPerson }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

export default CartProvider;
