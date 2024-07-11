import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";

const App = () => {
  return (
    <div className="bg-gray-300 flex">
      <LeftSide />
      <RightSide />
    </div>
  );
};

export default App;
