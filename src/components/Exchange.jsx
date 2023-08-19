import React, { useEffect } from "react";
import millify from "millify";
import { Typography, Col, Row, Card, Statistic } from "antd";
import { useGetExchangeDataQuery } from "../services/cryptoApi";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const { Title } = Typography;

const Exchange = () => {
  const { data: StatsData, isFetching } = useGetExchangeDataQuery();

  if (isFetching) return <Loader />;

  return (
    <section style={{ padding: "1rem" }}>
      <Title level={2} className="heading">
        {" "}
        Some Global Stats
      </Title>
      <Row gutter={[32, 32]} className="">
        <Col span={12}>
          <Statistic
            title={"Totol Markets"}
            value={millify(parseInt(StatsData?.data?.totalMarkets))}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title={"Total Trade Volume"}
            value={millify(parseInt(StatsData?.data?.total24hVolume))}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title={"  Total Coins"}
            value={millify(StatsData?.data?.totalCoins)}
          />
        </Col>
      </Row>

      <div>
        <Title level={2}>New Coins in Market</Title>
      </div>

      <Row gutter={[24, 24]}>
        {StatsData?.data?.newestCoins.map((item) => (
          <Link to={`/crypto/${item.uuid}`}>
            <Col xs={24} sm={12} lg={8} className="exchange-card">
              <Card
                hoverable
                key={item.uuid}
                title={item.name}
                extra={
                  <img src={item.iconUrl} className="exchange-card-image" />
                }
              >
                <p>{item.symbol}</p>
                <a href={item.coinrankingUrl}>Check Ranking</a>
              </Card>
            </Col>
          </Link>
        ))}
      </Row>
      <div>
        <Title level={2}>Top 3 Best Coins</Title>
      </div>
      <Row gutter={[24, 24]}>
        {StatsData?.data?.bestCoins.map((item) => (
          <Link to={`/crypto/${item.uuid}`}>
            <Col
              xs={24}
              sm={12}
              lg={8}
              className="exchange-card"
              key={item.uuid}
            >
              <Card
                hoverable
                title={item.name}
                extra={
                  <img src={item.iconUrl} className="exchange-card-image" />
                }
              >
                <p>{item.symbol}</p>
                <a href={item.coinrankingUrl}>Check Ranking</a>
              </Card>
            </Col>
          </Link>
        ))}
      </Row>
    </section>
  );
};

export default Exchange;
