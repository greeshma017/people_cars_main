import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PERSON, GET_PEOPLE } from "../../graphql/queries";
import { v4 as uuidv4 } from "uuid";

const AddPerson = () => {
  const styles = getStyles();
  const [form] = Form.useForm();
  const [addPerson] = useMutation(ADD_PERSON);
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { firstName, lastName } = values;
    console.log("clicked");
    
    addPerson({
      variables: {
        id: uuidv4(),
        firstName,
        lastName,
      },
      refetchQueries: [{ query: GET_PEOPLE }],
    });
  };

  return (
    <>
      <fieldset style={styles.fieldset}>
      <legend style={styles.legend}>Add Person</legend>
        <Form
          name="add-person-form"
          layout="inline"
          size="large"
          style={styles.form}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            name="firstName"
            label="First Name:"
            rules={[{ required: true, message: "Please enter first name" }]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: "Please enter last name" }]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
          <Form.Item shouldUpdate={true}>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  !form.isFieldsTouched(true) ||
                  form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                Add Person
              </Button>
            )}
          </Form.Item>
        </Form>
        </fieldset>
    </>
  );
};

const getStyles = () => ({
  form: {
    display: "flex",
    justifyContent: "center",
  },
  fieldset: {
    border: "none", 
    borderTop: "1px solid #ccc", 
    padding: "40px",
    position: "relative", 
  },
  legend: {
    fontSize: "22px",
    fontWeight: "bold",
    position: "absolute", 
    top: "-12px", 
    left: "50%", 
    transform: "translateX(-50%)", 
    background: "#fff", 
  },
});
export default AddPerson;
