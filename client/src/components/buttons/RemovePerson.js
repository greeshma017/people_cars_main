import { useMutation } from "@apollo/client";
import { GET_PEOPLE, REMOVE_PERSON } from "../../graphql/queries";
import { DeleteOutlined } from "@ant-design/icons";
import filter from "lodash.filter";

const RemovePerson = (props) => {
  const { id } = props
  const [removePerson] = useMutation(REMOVE_PERSON, {
    update(cache, { data: { removePerson } }) {
      const { people } = cache.readQuery({ query: GET_PEOPLE });
      cache.writeQuery({
        query: GET_PEOPLE,
        data: {
          people: filter(people, (p) => {
            return p.id !== removePerson.id;
          }),
        },
      });
    },
  });

  const handleDeleteButton = () => {
    let confirmDeletion = window.confirm(
      "Are you sure you want to delete this person from the list?"
    );

    if (confirmDeletion) {
      removePerson({
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

export default RemovePerson;
