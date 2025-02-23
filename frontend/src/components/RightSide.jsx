import React from "react";
import { useCart } from "../contexts/CartProvider";

function RightSide() {
  const { state, selectedPerson, setSelectedPerson, dispatch } = useCart();

  function removeItem(id) {
    dispatch({ type: "REMOVE_ITEM", payload: { id, person: selectedPerson } });
  }

  function increaseQty(id) {
    dispatch({ type: "INCREASE_QTY", payload: { id, person: selectedPerson } });
  }

  function decreaseQty(id, qty) {
    if (qty === 1) {
      dispatch({
        type: "REMOVE_ITEM",
        payload: { id, person: selectedPerson },
      });
    } else {
      dispatch({
        type: "DECREASE_QTY",
        payload: { id, person: selectedPerson },
      });
    }
  }

  const getTotalAmount = (items) => {
    return items.reduce((total, item) => total + item.price * item.qty, 0);
  };

  const renderPersonCart = (person) => {
    const items = state[person];
    const totalAmount = getTotalAmount(items);

    return (
      <div className="mt-4 w-full">
        <div className="w-full flex justify-between items-center p-2 mb-4 bg-gray-200 rounded-lg shadow">
          <h3 className="text-lg font-semibold capitalize">
            {person} Total Amount: ${totalAmount.toFixed(2)}
          </h3>
        </div>
        {items.map(({ id, title, price, qty }) => (
          <div
            key={id}
            className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center p-2 mb-2 bg-gray-200 rounded-lg shadow"
          >
            <div className="mb-2 sm:mb-0">
              <p className="text-lg font-semibold">{title}</p>
              <p className="text-gray-700">
                ${price.toFixed(2)} x {qty} = ${(price * qty).toFixed(2)}
              </p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => decreaseQty(id, qty)}
                className="p-2 border border-gray-300 rounded-md mr-2"
              >
                -
              </button>
              <p className="mx-2">{qty}</p>
              <button
                onClick={() => increaseQty(id)}
                className="p-2 border border-gray-300 rounded-md ml-2"
              >
                +
              </button>
              <button
                onClick={() => removeItem(id)}
                className="p-2 text-red-600 border border-red-600 rounded-md hover:bg-red-600 hover:text-white ml-8"
              >
                x
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-full p-5 overflow-y-auto">
      <div className="w-full flex flex-col items-center rounded-lg mb-5 bg-white">
        <div className="p-4 w-full">
          <h2 className="text-2xl text-center font-semibold capitalize">
            Select meal for passenger
          </h2>
        </div>
        <button
          onClick={() => setSelectedPerson("person1")}
          className={`w-full p-4 text-lg font-medium text-center rounded-t-lg ${
            selectedPerson === "person1"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Person 1
        </button>
        <button
          onClick={() => setSelectedPerson("person2")}
          className={`w-full p-4 text-lg font-medium text-center rounded-b-lg ${
            selectedPerson === "person2"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Person 2
        </button>
      </div>

      {selectedPerson === "person1" && renderPersonCart("person1")}
      {selectedPerson === "person2" && renderPersonCart("person2")}
    </div>
  );
}

export default RightSide;
