import React, { useState, useEffect } from "react";
import axios from "axios";
import MealFilterTag from "./MealFilterTag";
import MealList from "./MealList";

function LeftSide() {
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [selectedTag, setSelectedTag] = useState("all");
  const [selectedDrink, setSelectedDrink] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5500/api/meals")
      .then((response) => {
        setMeals(response.data);
        setFilteredMeals(response.data); // Initialize with all meals
      })
      .catch((error) => {
        console.error("There was an error fetching the meals!", error);
      });
  }, []);

  // Function to filter meals based on selected tag
  const filterMeals = (tag) => {
    if (tag === "all") {
      setFilteredMeals(meals); // Show all meals
    } else {
      setFilteredMeals(meals.filter((meal) => meal.labels.includes(tag)));
    }
    setSelectedTag(tag); // Set the selected tag
  };

  // Function to handle drink selection for a specific meal
  const selectDrink = (mealId, drinkId) => {
    setSelectedDrink((prevSelectedDrink) => ({
      ...prevSelectedDrink,
      [mealId]: drinkId,
    }));
  };

  return (
    <div className="w-2/3 h-full rounded-lg bg-white p-4 mt-5 ml-12 mb-5 mr-8">
      {/* Render the MealFilterTag component and pass filterMeals function */}
      <div>
        <MealFilterTag filterMeals={filterMeals} selectedTag={selectedTag} />
      </div>

      {/* Render the MealList component and pass necessary props */}
      <div className="mt-10">
        <MealList
          meals={filteredMeals}
          selectDrink={selectDrink}
          selectedTag={selectedTag}
        />
      </div>
    </div>
  );
}

export default LeftSide;
