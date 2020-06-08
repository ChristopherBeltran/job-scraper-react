import React from "react";
import logo from "./logo.svg";
import { PageHeader, Button, Descriptions } from "antd";
import Main from "./Main.js";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          ghost={false}
          title="Job Bot"
          subTitle="A simple solution for your job searching needs"
        >
          <Descriptions size="small" column={3}>
            <Descriptions.Item label="Built On">
              Node.js, React, Ant Design, Puppeteer, Cheerio
            </Descriptions.Item>
          </Descriptions>
        </PageHeader>
      </div>
      <Main></Main>
    </div>
  );
};

export default App;
