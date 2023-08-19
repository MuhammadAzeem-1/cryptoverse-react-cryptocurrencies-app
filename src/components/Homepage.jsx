import React, { useEffect } from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCrptosQuery } from "../services/cryptoApi";
import { Cryptocurrences, News } from "../components";
import Loader from "./Loader";

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCrptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return <Loader />;

  return (
    <section style={{ padding: "1rem" }}>
      <Title level={2} className="heading">
        {" "}
        Global Crpto Stats
      </Title>
      <Row gutter={[32, 32]}>
        <Col span={12}>
          <Statistic
            title="Total Crptocurrencies"
            value={millify(globalStats.total)}
          />{" "}
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchange"
            value={millify(globalStats.totalExchanges)}
          />{" "}
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={millify(globalStats.totalMarketCap)}
          />{" "}
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={millify(globalStats.total24hVolume)}
          />{" "}
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markers"
            value={millify(globalStats.totalMarkets)}
          />{" "}
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 CrptoCurrencies of the world
        </Title>
        <Title level={3} className="show-more">
          <Link to={"/cryptocurrencies"}>Show More</Link>
        </Title>
      </div>
      <Cryptocurrences simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest News
        </Title>
        <Title level={3} className="show-more">
          <Link to={"/news"}>Show More</Link>
        </Title>
      </div>
      <News simplified />
    </section>
  );
};

export default Homepage;
