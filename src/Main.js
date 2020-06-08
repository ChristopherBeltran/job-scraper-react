import React, { useState } from "react";
import { Form, Input, Button, Radio, Switch, Typography } from "antd";
import { FormContext } from "antd/lib/form/context";
import { render } from "react-dom";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    //  use this to make the card to appear after the page has been rendered
    this.state = {
      results: false,
      form: true,
    };
  }

  render() {
    const { Title } = Typography;

    if (this.state.form) {
      return (
        <div class="form">
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            initialValues={{
              size: "large",
            }}
            size="large"
          >
            <Title level={3} justify="center">
              Enter search criteria and select sources to put Job Bot to work{" "}
            </Title>{" "}
            <Form.Item label="Job Title">
              <Input placeholder="Software Engineer" />
            </Form.Item>{" "}
            <Form.Item label="City, State">
              <Input placeholder="Los Angeles, CA" />
            </Form.Item>{" "}
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
                <Radio.Button value="a"> Past 24 hrs </Radio.Button>{" "}
                <Radio.Button value="b"> Past 3 Days </Radio.Button>{" "}
                <Radio.Button value="c"> Past 7 Days </Radio.Button>{" "}
              </Radio.Group>{" "}
            </Form.Item>{" "}
            <Form.Item name="sort-by" label="Sort By">
              <Radio.Group>
                <Radio.Button value="a"> Most Relevant </Radio.Button>{" "}
                <Radio.Button value="b"> Most Recent </Radio.Button>{" "}
              </Radio.Group>{" "}
            </Form.Item>{" "}
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              justify="center"
            >
              {" "}
              SUBMIT{" "}
            </Button>{" "}
          </Form>{" "}
        </div>
      );
    } else if (this.state.results) {
      return <div class="results"></div>;
    }
  }
}
