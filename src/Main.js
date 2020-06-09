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
      formData: {
        jobTitle: "",
        location: "",
        linkedIn: false,
        glassdoor: false,
        indeed: false,
        dice: false,
        datePosted: "",
        sortBy: "",
      },
    };
  }

  handleInputChange = (event) => {
    event.persist();
    const input = event.target.name;
    const value = event.target.value;
    this.setState({
      results: this.state.results,
      form: this.state.form,
      formData: {
        ...this.state.formData,
        [input]: value,
      },
    });
  };

  handleSwitch = (event) => {
    event.persist();
    const source = event.target.offsetParent.name;
    this.setState({
      results: this.state.results,
      form: this.state.form,
      formData: {
        ...this.state.formData,
        [source]: !this.state.formData[source],
      },
    });
  };

  handleRadio = (event) => {
    console.log(event);
    const radioType = event.target.name;
    const selection = event.target.value;
    this.setState({
      results: this.state.results,
      form: this.state.form,
      formData: {
        ...this.state.formData,
        [radioType]: selection,
      },
    });
  };

  apiRequest = async () => {
    try {
      const bodyData = this.state.formData;
      const settings = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      };
      const fetchResponse = await fetch(
        `http://localhost:3000/api/v1/scraper`,
        settings
      );
      const data = await fetchResponse.json();
      console.log(data);
    } catch (e) {}
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted");
  };

  render() {
    const { Title } = Typography;

    if (this.state.form) {
      return (
        <div className="form">
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
            <Form.Item label="Job Title" className="form-labels">
              <Input
                placeholder="Software Engineer"
                name="jobTitle"
                onChange={(event) => this.handleInputChange(event)}
                className="text-input-fields"
              />
            </Form.Item>{" "}
            <Form.Item label="City, State" className="form-labels">
              <Input
                name="location"
                placeholder="Los Angeles, CA"
                onChange={(event) => this.handleInputChange(event)}
                className="text-input-fields"
              />
            </Form.Item>{" "}
            <Form.Item label="LinkedIn" className="form-labels">
              <Switch
                name="linkedIn"
                checked={this.state.formData.linkedIn}
                onChange={(checked, event) => this.handleSwitch(event)}
              />
            </Form.Item>{" "}
            <Form.Item label="Glassdoor" className="form-labels">
              <Switch
                name="glassdoor"
                checked={this.state.formData.glassdoor}
                onChange={(checked, event) => this.handleSwitch(event)}
              />
            </Form.Item>{" "}
            <Form.Item label="Indeed" className="form-labels">
              <Switch
                name="indeed"
                checked={this.state.formData.indeed}
                onChange={(checked, event) => this.handleSwitch(event)}
              />
            </Form.Item>{" "}
            <Form.Item label="Dice" className="form-labels">
              <Switch
                name="dice"
                checked={this.state.formData.dice}
                onChange={(checked, event) => this.handleSwitch(event)}
              />
            </Form.Item>{" "}
            <Form.Item
              name="date-posted"
              label="Date Posted"
              className="form-labels"
            >
              <Radio.Group
                onChange={(event) => this.handleRadio(event)}
                name="datePosted"
              >
                <Radio.Button value="Past 24 hrs"> Past 24 hrs </Radio.Button>{" "}
                <Radio.Button value="Past 3 Days"> Past 3 Days </Radio.Button>{" "}
                <Radio.Button value="Past 7 Days"> Past 7 Days </Radio.Button>{" "}
              </Radio.Group>{" "}
            </Form.Item>{" "}
            <Form.Item name="sort-by" label="Sort By" className="form-labels">
              <Radio.Group
                onChange={(event) => this.handleRadio(event)}
                name="sortBy"
              >
                <Radio.Button value="Most Relevant">
                  {" "}
                  Most Relevant{" "}
                </Radio.Button>{" "}
                <Radio.Button value="Most Recent">
                  {" "}
                  Most Recent{" "}
                </Radio.Button>{" "}
              </Radio.Group>{" "}
            </Form.Item>{" "}
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              justify="center"
              id="submit-button"
              onClick={(event) => this.handleSubmit(event)}
            >
              {" "}
              SUBMIT{" "}
            </Button>{" "}
          </Form>{" "}
        </div>
      );
    } else if (this.state.results) {
      return <div className="results"></div>;
    }
  }
}
