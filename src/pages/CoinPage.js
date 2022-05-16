import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";
import CoinInfo from "../componets/CoinInfo";

import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

import { numberWithCommas } from "../componets/CoinsTable";

import parse from "html-react-parser";

const ContainerCustom = styled("div")(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const SidebarCustom = styled("div")(({ theme }) => ({
  width: "30%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 25,
  borderRight: "2px solid grey",
}));

const HeadingCustom = styled("div")(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: 20,
  fontFamily: "Montserrat",
}));

const DescriptionCustom = styled("div")(() => ({
  width: "100%",
  fontFamily: "Montserrat",
  padding: 25,
  paddingBottom: 15,
  paddingTop: 0,
  textAlign: "justify",
}));

const MarketData = styled("div")(({ theme }) => ({
  alignSelf: "start",
  padding: 25,
  paddingTop: 10,
  width: "100%",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "space-around",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
  },
  [theme.breakpoints.down("xs")]: {
    alignItems: "start",
  },
}));

const CoinPage = () => {
  // id we take from App.js
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, [currency]);

  return (
    <ContainerCustom>
      <SidebarCustom>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <HeadingCustom>
          <Typography variant="h3">{coin?.name}</Typography>
        </HeadingCustom>
      </SidebarCustom>
      <DescriptionCustom>
        <Typography variant="subtitle1">
          {coin?.description.en !== undefined
            ? parse(`${coin.description.en.split(". ")[0]}`)
            : ""}
        </Typography>
        <MarketData>
          <span style={{ display: "flex" }}>
            <HeadingCustom>
              <Typography variant="h5">Rank:</Typography>
            </HeadingCustom>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {coin?.market_cap_rank !== undefined
                ? numberWithCommas(coin?.market_cap_rank)
                : ""}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <HeadingCustom>
              <Typography variant="h5">Current Price:</Typography>
            </HeadingCustom>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {coin?.market_data.current_price[currency.toLowerCase()] !==
              undefined
                ? numberWithCommas(
                    coin?.market_data.current_price[currency.toLowerCase()]
                  )
                : ""}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <HeadingCustom>
              <Typography variant="h5">Market Cap:</Typography>
            </HeadingCustom>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {coin?.market_data.market_cap[currency.toLowerCase()]
                .toString()
                .slice(0, -6) !== undefined
                ? numberWithCommas(
                    coin?.market_data.market_cap[currency.toLowerCase()]
                      .toString()
                      .slice(0, -6)
                  )
                : ""}
              M
            </Typography>
          </span>
        </MarketData>
      </DescriptionCustom>
      <CoinInfo coin={coin} />
    </ContainerCustom>
  );
};

export default CoinPage;
