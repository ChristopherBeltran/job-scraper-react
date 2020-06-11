import React from "react";
import { Table, Tag, Space, Button } from "antd";

const ResultsTable = (props) => {
  console.log(props);
  const { results, jobTitle, location } = props;

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
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
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
            <a href={text}>Apply</a>
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
      footer={() => "Run another search"}
    />
  );
};

export default ResultsTable;
