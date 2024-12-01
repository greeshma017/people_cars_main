import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_PERSON } from "../../graphql/queries";
import { Button, Form, Input } from "antd";

const UpdatePerson = (props) => {
  const { id, firstName, lastName, onButtonClick } = props;
  const styles = getStyles();
  const [, forceUpdate] = useState();
  const [form] = Form.useForm();
  const [updatePerson] = useMutation(UPDATE_PERSON);

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { firstName, lastName } = values;
    updatePerson({
      variables: {
        id,
        firstName,
        lastName,
      },
    });
    onButtonClick();
  };

  return (
    <>
      <fieldset style={styles.fieldset}>
        <legend style={styles.legend}>Update Person</legend>
        <Form
          name="update-person"
          layout="inline"
          size="large"
          style={styles.form}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            name="firstName"
            rules={[{ required: true, message: "Please enter a first name" }]}
          >
            <Input defaultValue={firstName} value={firstName} />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[{ required: true, message: "Please enter a last name" }]}
          >
            <Input defaultValue={lastName} />
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
                Update
              </Button>
            )}
          </Form.Item>
          <Form.Item shouldUpdate={false}>
            <Button type="dashed" onClick={onButtonClick}>
              Cancel
            </Button>
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
export default UpdatePerson;
