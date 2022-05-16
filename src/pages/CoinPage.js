import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";

const CoinPage = () => {
  // id we take from App.js
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };
  //
  console.log(coin);

  useEffect(() => {
    fetchCoin();
  }, [currency]);

  return <div>CoinPage</div>;
};

export default CoinPage;
