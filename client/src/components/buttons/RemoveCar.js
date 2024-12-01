import { useMutation } from "@apollo/client";
import { GET_CARS, REMOVE_CAR } from "../../graphql/queries";
import { DeleteOutlined } from "@ant-design/icons";
import filter from "lodash.filter";

const RemoveCar = (props) => {
  const { id } = props;
  const [removeCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { removeCar } }) {
      const { cars } = cache.readQuery({ query: GET_CARS });
      cache.writeQuery({
        query: GET_CARS,
        data: {
          cars: filter(cars, (c) => {
            return c.id !== removeCar.id;
          }),
        },
      });
    },
  });

  const handleDeleteButton = () => {
    let confirmDeletion = window.confirm(
      "Are you sure you want to delete this car?"
    );

    if (confirmDeletion) {
      removeCar({
        variables: {
          id,
        },
      });
    }
  };

  return (
    <DeleteOutlined
      key="delete"
      style={{ color: "red" }}
      onClick={handleDeleteButton}
    />
  );
};

export default RemoveCar;
