import React, { useState } from "react";
import { useCart } from "../contexts/CartProvider";

const MealList = ({ meals, selectDrink }) => {
  const { state, dispatch, selectedPerson } = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDrinks, setSelectedDrinks] = useState({});
  const mealsPerPage = 4;

  const addToCart = (meal) => {
    const { id, title, starter, dessert, img, price } = meal;
    const selectedDrinkId = selectedDrinks[id];
    const drinkPrice = selectedDrinkId
      ? meal.drinks.find((drink) => drink.id === selectedDrinkId).price
      : 0;
    const totalPrice = price + drinkPrice;

    const cartItem = {
      id,
      title,
      starter,
      dessert,
      img,
      price: totalPrice,
      qty: 1,
      person: selectedPerson,
    };

    const found = state[selectedPerson].find((item) => item.id === id);
    if (found) {
      alert("Item already added.");
      return;
    }

    dispatch({ type: "ADD_ITEM", payload: cartItem });
  };

  const handleDrinkChange = (mealId, drinkId) => {
    setSelectedDrinks((prevSelectedDrinks) => ({
      ...prevSelectedDrinks,
      [mealId]: drinkId,
    }));
    selectDrink(mealId, drinkId);
  };

  // This is the logic for the pagination
  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = meals.slice(indexOfFirstMeal, indexOfLastMeal);

  const totalPages = Math.ceil(meals.length / mealsPerPage);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentMeals.map((meal) => (
          <div
            key={meal.id}
            className="bg-white rounded-lg border-2 shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex">
              <div className="w-2/5 mt-5">
                <img
                  src={meal.img}
                  alt={meal.title}
                  className="w-full h-auto"
                />
              </div>
              <div className="w-3/5 p-4">
                <h3 className="text-lg font-semibold mb-2">{meal.title}</h3>
                <p className="text-gray-700 mb-2">Starter: {meal.starter}</p>
                <p className="text-gray-700 mb-2">Dessert: {meal.desert}</p>
                <p className="text-gray-700 mb-2">Price: ${meal.price}</p>
                <select
                  onChange={(e) => handleDrinkChange(meal.id, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                >
                  <option value="">Select a drink</option>
                  {meal.drinks.map((drink) => (
                    <option key={drink.id} value={drink.id}>
                      {drink.title} - ${drink.price}
                    </option>
                  ))}
                </select>
                <button
                  className="mt-4 w-full p-2 border border-gray-300 rounded-md hover:bg-gray-200"
                  onClick={() => addToCart(meal)}
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          className={`px-4 py-2 mx-1 border rounded-lg hover:bg-gray-300 ${
            currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-white"
          }`}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              className={`px-4 py-2 mx-1 border rounded-lg hover:bg-gray-300 ${
                currentPage === pageNumber
                  ? "bg-blue-500 text-white"
                  : "bg-white"
              }`}
              onClick={() => setCurrentPage(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        )}
        <button
          className={`px-4 py-2 mx-1 border rounded-lg hover:bg-gray-300 ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-white"
          }`}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MealList;
