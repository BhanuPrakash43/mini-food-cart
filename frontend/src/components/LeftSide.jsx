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
        setFilteredMeals(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the meals!", error);
      });
  }, []);

  const filterMeals = (tag) => {
    if (tag === "all") {
      setFilteredMeals(meals);
    } else {
      setFilteredMeals(meals.filter((meal) => meal.labels.includes(tag)));
    }
    setSelectedTag(tag);
  };

  // Function to handle drink selection for a specific meal
  const selectDrink = (mealId, drinkId) => {
    setSelectedDrink((prevSelectedDrink) => ({
      ...prevSelectedDrink,
      [mealId]: drinkId,
    }));
  };

  return (
    <div className="w-full h-fit rounded-lg bg-white p-5">
      <div>
        <MealFilterTag filterMeals={filterMeals} selectedTag={selectedTag} />
      </div>

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
