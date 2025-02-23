import React, { useState } from "react";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-gray-300 min-h-screen flex flex-col md:flex-row p-4 gap-4">
      <button
        className="md:hidden p-2 w-full bg-blue-500 text-white rounded self-start z-50"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? "Close" : "Menu"}
      </button>

      <div className="flex-1 mt-5">
        <LeftSide />
      </div>

      <div
        className={`fixed inset-y-0 right-0 w-fit bg-gray-100 shadow-lg md:relative md:translate-x-0 transform rounded-lg mt-5 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-40 md:z-0 overflow-y-auto`}
      >
        <RightSide />
      </div>
    </div>
  );
};

export default App;
