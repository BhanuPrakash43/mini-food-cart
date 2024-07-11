import React, { useEffect, useState } from "react";
import axios from "axios";

const MealFilterTag = ({ filterMeals, selectedTag }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5500/api/labels")
      .then((response) => {
        setTags(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the tags!", error);
      });
  }, []);

  return (
    <div className="flex flex-wrap gap-4 border-b-2 border-gray-300 pb-10">
      <button
        onClick={() => filterMeals("all")}
        className={`border-2 py-2 px-8 text-center rounded-full hover:bg-gray-200 ${
          selectedTag === "all"
            ? "bg-gray-200 ring-1 ring-blue-500"
            : "bg-white"
        } focus:outline-none`}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => filterMeals(tag.id)}
          className={`border-2 py-2 px-8 text-center rounded-full hover:bg-gray-200 ${
            selectedTag === tag.id
              ? "bg-gray-200 ring-1 ring-blue-500"
              : "bg-white"
          } focus:outline-none`}
        >
          {tag.label}
        </button>
      ))}
    </div>
  );
};

export default MealFilterTag;
