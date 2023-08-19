import React, { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Col, Row, Card, Input } from "antd";
import { useGetCrptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

function Cryptocurrences({ simplified }) {
  const count = simplified ? 10 : 100;
  const { data: crptosList, isFetching } = useGetCrptosQuery(count);
  const [crptos, setCrptos] = useState([]);
  const [searchterm, setSearhTerm] = useState("");

  useEffect(() => {
    const filterCoin = crptosList?.data?.coins.filter((item) =>
      item.name.toLowerCase().includes(searchterm)
    );
    setCrptos(filterCoin);
  }, [crptosList, searchterm]);

  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Enter the Name of Coin"
            value={searchterm}
            onChange={(e) => setSearhTerm(e.target.value.toLowerCase())}
          />
        </div>
      )}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {crptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            key={currency.uuid}
            className="crypto-card"
          >
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank} ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change:{millify(currency.change)}% </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Cryptocurrences;
