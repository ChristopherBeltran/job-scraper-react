import React, { useState } from "react";
import { Form, Input, Button, Radio, Switch, Typography } from "antd";
import { FormContext } from "antd/lib/form/context";

export function SearchForm() {
  const [componentSize, setComponentSize] = useState("large");

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const { Title } = Typography;

  return (
    <div>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Title level={3} justify="center">
          Enter search criteria and select sources to put Job Bot to work
        </Title>
        <Form.Item label="Job Title">
          <Input placeholder="Software Engineer" />
        </Form.Item>{" "}
        <Form.Item label="City, State">
          <Input placeholder="Los Angeles, CA" />
        </Form.Item>
        <Form.Item label="LinkedIn">
          <Switch />
        </Form.Item>{" "}
        <Form.Item label="Glassdoor">
          <Switch />
        </Form.Item>{" "}
        <Form.Item label="Indeed">
          <Switch />
        </Form.Item>{" "}
        <Form.Item label="Dice">
          <Switch />
        </Form.Item>{" "}
        <Form.Item name="date-posted" label="Date Posted">
          <Radio.Group>
            <Radio.Button value="a">Past 24hrs</Radio.Button>
            <Radio.Button value="b">Past 3 Days</Radio.Button>
            <Radio.Button value="c">Past 7 Days</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="sort-by" label="Sort By">
          <Radio.Group>
            <Radio.Button value="a">Most Relevant</Radio.Button>
            <Radio.Button value="b">Most Recent</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Button size="large" type="primary" htmlType="submit" justify="center">
          {" "}
          SUBMIT{" "}
        </Button>{" "}
      </Form>{" "}
    </div>
  );
}
