import React from "react";
import { Table, Tag, Space, Button } from "antd";

const ResultsTable = (props) => {
  console.log(props);
  const { results, jobTitle, location, handleTableButton } = props;

  const colorHandler = (source) => {
    var color = "";
    switch (source) {
      case "LinkedIn":
        color = "blue";
        break;
      case "Glassdoor":
        color = "green";
        break;
      case "Indeed":
        color = "geekblue";
        break;
      case "Dice":
        color = "red";
        break;
    }
    return color;
  };

  const columns = [
    {
      title: "Job Title",
      dataIndex: "position",
      key: "position",
      sorter: (a, b) => {
        if (a.position < b.position) {
          return -1;
        }
        if (a.position > b.position) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      sorter: (a, b) => {
        if (a.company < b.company) {
          return -1;
        }
        if (a.company > b.company) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      sorter: (a, b) => {
        if (a.location < b.location) {
          return -1;
        }
        if (a.location > b.location) {
          return 1;
        }
        return 0;
      },
    },
    {
      title: "Source",
      key: "source",
      dataIndex: "source",
      sorter: (a, b) => {
        if (a.source < b.source) {
          return -1;
        }
        if (a.source > b.source) {
          return 1;
        }
        return 0;
      },
      render: (source) => (
        <span>
          <Tag color={colorHandler(source)} key={source}>
            {source.toUpperCase()}
          </Tag>
        </span>
      ),
    },
    {
      title: "Link",
      key: "link",
      dataIndex: "link",
      render: (text, link) => (
        <Space size="middle">
          <Button type="primary" shape="round" size="large">
            <a href={text} target="_blank">
              Apply
            </a>
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={results}
      bordered
      title={() => `Showing results for "${jobTitle}" in ${location}`}
      footer={() => {
        return (
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            onClick={(event) => handleTableButton(event)}
          >
            Run Another Search
          </Button>
        );
      }}
    />
  );
};

export default ResultsTable;
