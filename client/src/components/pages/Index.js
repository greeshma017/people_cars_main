import Title from "../layout/Title";
import AddPerson from "../forms/AddPerson";
import AddCar from "../forms/AddCar";
import Cars from "../lists/Cars";
import People from "../lists/People";

const Index = () => {
  return (
    <div className="App">
      <Title />
      <AddPerson />
      <AddCar />
      <People />
      <Cars />
    </div>
  );
};
export default Index;
