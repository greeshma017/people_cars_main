import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { GET_PERSON } from "../../graphql/queries";
import { Card } from "antd";
import Cars from "../lists/Cars";

const Show = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PERSON, {
    variables: { id },
  });
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <Card title={`${data.person.firstName} ${data.person.lastName}`}>
        <div>
          <Cars personId={id}></Cars>
        </div>
      </Card>
      <Link to={`/`}>Back</Link>
    </div>
  );
};

export default Show;
