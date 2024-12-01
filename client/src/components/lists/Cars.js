import { useQuery } from "@apollo/client";
import { List } from "antd";
import { GET_CARS } from "../../graphql/queries";
import CarCard from "../listItems/CarCard";

const Cars = (props) => {
  const personId = props?.personId;
  const styles = getStyles();

  const { loading, error, data } = useQuery(GET_CARS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <List style={styles.list}>
      {data.cars
        .filter((car) => car.personId === personId)
        .map(({ id, make, model, personId, price, year }) => (
          <List.Item key={id}>
            <CarCard
              id={id}
              personId={personId}
              year={year}
              make={make}
              model={model}
              price={price}
            />
          </List.Item>
        ))}
    </List>
  );
};

const getStyles = () => ({
  list: {
    display: "flex",
    justifyContent: "center",
  },
});

export default Cars;
