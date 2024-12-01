import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Button, Form, Input, Select, Row, Col } from "antd";
import { ADD_CAR, GET_CARS, GET_PEOPLE } from "../../graphql/queries";
import { v4 as uuidv4 } from "uuid";

const AddCar = () => {
  const styles = getStyles();
  const [form] = Form.useForm();
  const [addCar] = useMutation(ADD_CAR);
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const onFinish = (values) => {
    const { make, model, personId, price, year } = values;

    addCar({
      variables: {
        id: uuidv4(),
        year: parseInt(year),
        make,
        model,
        personId,
        price: parseFloat(price),
      },
      update: (cache, { data: { addCar } }) => {
        const data = cache.readQuery({ query: GET_CARS });
        console.log(data);

        cache.writeQuery({
          query: GET_CARS,
          data: {
            ...data,
            cars: [...data.cars, addCar],
          },
        });
      },
    });
  };

  return (
    <fieldset style={styles.fieldset}>
      <legend style={styles.legend}>Add Car</legend>
      <Form
        name="add-car-form"
        size="large"
        style={styles.form}
        form={form}
        onFinish={onFinish}
      >
        <Row gutter={1}>
          <Col span={4}>
            <Form.Item
              name="year"
              label="Year"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 9 }}
              rules={[{ required: true, message: "Please enter year" }]}
            >
              <Input placeholder="Year" type="number" maxLength={4} count={4} />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              name="make"
              label="Make"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 15 }}
              rules={[{ required: true, message: "Please enter car's make" }]}
            >
              <Input placeholder="Make" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              name="model"
              label="Model"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 15 }}
              rules={[{ required: true, message: "Please enter car's model" }]}
            >
              <Input placeholder="Model" />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              name="price"
              label="Price"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 9 }}
              rules={[{ required: true, message: "Please enter car's price" }]}
            >
              <Input placeholder="Price" type="number" prefix="$" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              name="personId"
              label="Person"
              rules={[{ required: true, message: "Please enter person name" }]}
            >
              <Select
                placeholder="Select a person"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
              >
                {data.people.map(({ id, firstName, lastName }) => (
                  <Select.Option
                    key={id}
                    value={id}
                  >{`${firstName} ${lastName}`}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={3}>
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
                  Add Car
                </Button>
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </fieldset>
  );
};

const getStyles = () => ({
  form: {
    display: "flex",
    justifyContent: "center",
  },
  formItem: {
    marginBottom: "20px",
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
export default AddCar;
