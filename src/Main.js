import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Switch,
  Typography,
  Spin,
  Row,
  Col,
} from "antd";
import ResultsTable from "./ResultsTable";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    // use this to make the card to appear after the page has been rendered
    this.state = {
      loading: false,
      results: {
        complete: false,
        data: {},
      },
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
      formErrors: [],
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

  handleLoading = () => {
    this.setState({
      loading: true,
      results: this.state.results,
      form: false,
      formData: {
        ...this.state.formData,
      },
    });
  };

  formatData = (data) => {
    const formattedArr = [];
    for (const topArr of data) {
      for (var i = 0; i < topArr.length; i++) {
        for (const obj of topArr[i].data) {
          let newObj = {};
          newObj["company"] = obj.attributes.company;
          if (obj.attributes.source === "Indeed") {
            newObj["link"] = `https://indeed.com${obj.attributes.link}`;
          } else {
            newObj["link"] = obj.attributes.link;
          }
          newObj["location"] = obj.attributes.location;
          newObj["position"] = obj.attributes.position;
          newObj["source"] = obj.attributes.source;
          formattedArr.push(newObj);
        }
      }
    }
    return formattedArr;
  };

  endpointHandler = async (requestSettings) => {
    const sources = [];
    const data = [];

    sources.push({ linkedin: this.state.formData.linkedIn });
    sources.push({ glassdoor: this.state.formData.glassdoor });
    sources.push({ indeed: this.state.formData.indeed });
    sources.push({ dice: this.state.formData.dice });

    for (let source of sources) {
      const key = Object.keys(source);
      if (source[key[0]]) {
        const fetchResponse = await fetch(
          `https://job-bot-scraper-api.herokuapp.com/api/v1/${key[0]}`,
          requestSettings
        );
        const res = await fetchResponse.json();
        data.push(res);
      }
    }
    const formatted = this.formatData(data);
    this.setState({
      loading: false,
      results: {
        complete: true,
        data: formatted,
      },
      form: false,
      formData: {
        ...this.state.formData,
      },
    });
  };

  apiRequest = async () => {
    try {
      const bodyData = {
        jobTitle: this.state.formData.jobTitle,
        location: this.state.formData.location,
        datePosted: this.state.formData.datePosted,
        sortBy: this.state.formData.sortBy,
      };
      const settings = {
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: {
          "Content-Type": "application/json",
          //"Access-Control-Allow-Origin": "https://localhost:3001",
        },
      };
      this.endpointHandler(settings);
    } catch (e) {
      console.log(e);
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.handleLoading();
    this.apiRequest();
  };

  handleJobTitleValidation = () => {
    const format = new RegExp("^[a-zA-Z-][a-zA-Z -]*$/i");

    if (this.state.formData.jobTitle === "") {
      return "Job Title cannot be blank!";
    }

    if (!format.test(this.state.formData.jobTitle)) {
      return "Job Title must only contain alphabet characters!";
    }
  };
  handleLocationFieldValidation = (value) => {
    const format = new RegExp("^[a-zA-Z]*, ?[a-zA-Z]*/i");
  };

  handleFormValidation = () => {
    const job = this.handleJobTitleValidation(this.state.formData.jobTitle);
    const location = this.handleLocationFieldValidation(
      this.state.formData.location
    );
  };

  handleTableButton = (event) => {
    event.preventDefault();
    this.setState({
      loading: false,
      results: {
        complete: false,
        data: {},
      },
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
      formErrors: [],
    });
  };

  render() {
    const { Title } = Typography;

    if (this.state.form) {
      return (
        <div className="form">
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            initialValues={{ size: "large" }}
            size="large"
          >
            <Title level={3} justify="center">
              Enter search criteria and select sources to put Job Bot to work{" "}
            </Title>{" "}
            <br></br>
            <Form.Item
              label="Job Title"
              className="form-labels"
              justify="center"
            >
              <Input
                placeholder="Software Engineer"
                name="jobTitle"
                onChange={(event) => this.handleInputChange(event)}
                className="text-input-fields"
              />
            </Form.Item>{" "}
            <Form.Item
              label="City, State"
              className="form-labels"
              justify="center"
            >
              <Input
                name="location"
                placeholder="Los Angeles, CA"
                onChange={(event) => this.handleInputChange(event)}
                className="text-input-fields"
              />
            </Form.Item>{" "}
            <Form.Item
              label="LinkedIn"
              className="form-labels"
              justify="center"
            >
              <Switch
                name="linkedIn"
                checked={this.state.formData.linkedIn}
                onChange={(checked, event) => this.handleSwitch(event)}
              />
            </Form.Item>{" "}
            <Form.Item
              label="Glassdoor"
              className="form-labels"
              justify="center"
            >
              <Switch
                name="glassdoor"
                checked={this.state.formData.glassdoor}
                onChange={(checked, event) => this.handleSwitch(event)}
              />
            </Form.Item>{" "}
            <Form.Item label="Indeed" className="form-labels" justify="center">
              <Switch
                name="indeed"
                checked={this.state.formData.indeed}
                onChange={(checked, event) => this.handleSwitch(event)}
              />
            </Form.Item>{" "}
            <Form.Item label="Dice" className="form-labels" justify="center">
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
              justify="center"
            >
              <Radio.Group
                onChange={(event) => this.handleRadio(event)}
                name="datePosted"
              >
                <Radio.Button value="Past 24 hrs">Past 24 hrs</Radio.Button>{" "}
                <Radio.Button value="Past 3 Days">Past 3 Days</Radio.Button>{" "}
                <Radio.Button value="Past 7 Days">Past 7 Days</Radio.Button>{" "}
              </Radio.Group>{" "}
            </Form.Item>{" "}
            <Form.Item
              name="sort-by"
              label="Sort By"
              className="form-labels"
              justify="center"
            >
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
            <Form.Item padding="10px" justify="center">
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                id="submit-button"
                onClick={(event) => this.handleSubmit(event)}
              >
                {" "}
                SUBMIT{" "}
              </Button>{" "}
            </Form.Item>
          </Form>{" "}
        </div>
      );
    } else if (this.state.loading) {
      return (
        <div className="loading-spinner">
          <Title level={2}>
            Fetching "{this.state.formData.jobTitle}" jobs in "{" "}
            {this.state.formData.location}", this may take a few minutes...
          </Title>
          <br></br>
          <Spin size="large" />
        </div>
      );
    } else if (this.state.results.complete) {
      return (
        <ResultsTable
          results={this.state.results.data}
          jobTitle={this.state.formData.jobTitle}
          location={this.state.formData.location}
          handleTableButton={this.handleTableButton}
        ></ResultsTable>
      );
    }
  }
}
