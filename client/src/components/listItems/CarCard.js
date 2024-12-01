import { useState } from "react";
import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import UpdateCar from "../forms/UpdateCar";
import RemoveCar from "../buttons/RemoveCar";

const CarCard = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const styles = getStyles();
  const { id, make, model, personId, price, year } = props;

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div>
      {isEditing ? (
        <UpdateCar
          id={id}
          make={make}
          model={model}
          personId={personId}
          year={year}
          price={price}
          onButtonClick={toggleEditMode}
        />
      ) : (
        <Card
        title={
            <div style={{ backgroundColor: '#f0f2f5', padding: '10px' }}>
              {`${year} ${make} ${model} -> $${price}`}
            </div>
          }
          style={styles.card}
          actions={[
            <EditOutlined key="edit" onClick={toggleEditMode} />,
            <RemoveCar id={id} />,
          ]}
        ></Card>
      )}
    </div>
  );
};

const getStyles = () => ({
  card: {
    width: "1100px",
  },
});

export default CarCard;
