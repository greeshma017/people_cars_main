import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, Select } from "antd";
import { GET_PEOPLE, UPDATE_CAR } from "../../graphql/queries";
import { useEffect, useState } from "react";

const UpdateCar = (props) => {
  const { id, make, model, price, year, onButtonClick } = props;
  const styles = getStyles();
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const [updateCar] = useMutation(UPDATE_CAR);
  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const onFinish = (values) => {
    const { make, model, personId, price, year } = values;
    const intYear = Number(year);
    const intPrice = Number(price);

    updateCar({
      variables: {
        id,
        year: intYear,
        make,
        model,
        personId,
        price: intPrice,
      },
    });
    onButtonClick();
  };

  return (
    <fieldset style={styles.fieldset}>
      <legend style={styles.legend}>Update Car</legend>
      <Form
        name="update-car"
        layout="inline"
        size="large"
        style={styles.form}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          label="Year"
          name="year"
          rules={[{ required: true, message: "Please enter year" }]}
        >
          <Input placeholder="Year" type="number" defaultValue={year} />
        </Form.Item>
        <Form.Item
          label="Make"
          name="make"
          rules={[{ required: true, message: "Please enter car's make" }]}
        >
          <Input placeholder="Make" defaultValue={make} />
        </Form.Item>
        <Form.Item
          label="Model"
          name="model"
          rules={[{ required: true, message: "Please enter car's model" }]}
        >
          <Input placeholder="Model" defaultValue={model} />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please enter car's price" }]}
        >
          <Input
            placeholder="Price"
            type="number"
            defaultValue={price}
          />
        </Form.Item>
        <Form.Item
          label="Person"
          name="personId"
          rules={[{ required: true, message: "Please enter person name" }]}
        >
          <Select
            placeholder="Select a person"
            style={{
              width: 160,
            }}
          >
            {data.people.map(({ id, firstName, lastName }) => (
              <Select.Option
                key={id}
                value={id}
              >{`${firstName} ${lastName}`}</Select.Option>
            ))}
          </Select>
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
export default UpdateCar;
