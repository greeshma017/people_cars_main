import { useQuery } from "@apollo/client";
import { GET_PEOPLE } from "../../graphql/queries";
import { List, Typography } from "antd";
import PersonCard from "../listItems/PersonCard";

const People = () => {
  const styles = getStyles();

  const { loading, error, data } = useQuery(GET_PEOPLE);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <Typography.Text style={styles.title}>Records</Typography.Text>
      <List style={styles.list}>
        {data.people.map(({ id, firstName, lastName }) => (
          <List.Item key={id}>
            <PersonCard id={id} firstName={firstName} lastName={lastName} />
          </List.Item>
        ))}
      </List>
    </div>
  );
};

const getStyles = () => ({
  list: {
    display: "flex",
    justifyContent: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    display: "block",
    textAlign: "center",
    marginBottom: "10px",
    borderBottom: "1px solid #ccc",
    paddingBottom: "10px",
  },
});

export default People;
