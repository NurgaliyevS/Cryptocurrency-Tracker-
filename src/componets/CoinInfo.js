import React, { useEffect, useState } from "react";
import axios from "axios";
import { HistoricalChart } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { CircularProgress, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { chartDays } from "../config/data";

const CoinInfo = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);

  const { currency } = CryptoState();

  const fetchHistoricData = async () => {
    const { data }  = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricalData(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
  }, [days]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const ContainerCustom = styled("div")(({ theme }) => ({
    width: "75%",
    display: "flex",
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      padding: 0,
    },
  }));
  


  return (
    <ThemeProvider theme={darkTheme}>
      <ContainerCustom>
        {!historicalData ? (
            <CircularProgress 
            style={{ color: "gold"}} 
            size={250}
            thickness={1}
            />
        ): ( 
        <>
        <Line
        data={{
          labels: historicalData.map((coin => {
            let date = new Date(coin[0]);
            let time = date.getHours() > 12
              ? `${date.getHours() - 12}:${date.getMinutes()} PM`
              : `${date.getHours()}:${date.getMinutes()} AM`;

          return days === 1 ? time : date.toLocaleDateString()
          }),
          ),
          datasets: [{
            data: historicalData.map((coin) => coin[1]),
            label: `Price ( Past ${days} Days) in ${currency}`,
            borderColor: '#EEBC1D'
          }]
        }}
        />
        <div>
          {chartDays.map((day) => {
          <button>{day.label}</button>
        })}
        </div>
        </>
        )}
      </ContainerCustom>
    </ThemeProvider>
  );
};

export default CoinInfo;
