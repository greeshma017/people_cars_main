import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import Cars from "../lists/Cars";
import { useState } from "react";
import UpdatePerson from "../forms/UpdatePerson";
import RemovePerson from "../buttons/RemovePerson";
import { Link } from "react-router-dom";

const PersonCard = (props) => {
  const { id, firstName, lastName } = props;
  const styles = getStyles();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div>
      {isEditing ? (
        <UpdatePerson
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={toggleEditMode}
        />
      ) : (
        <Card
          title={`${firstName} ${lastName}`}
          style={styles.card}
          actions={[
            <EditOutlined key="edit" onClick={toggleEditMode} />,
            <RemovePerson id={id} />,
          ]}
        >
          <div>
            <Cars personId={id}></Cars>
          </div>
          <Link to={`/person/${id}`}>Learn More</Link>
        </Card>
      )}
    </div>
  );
};

const getStyles = () => ({
  card: {
    width: "1200px",
  },
});

export default PersonCard;
