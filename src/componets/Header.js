import React from "react";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  MenuItem,
  Select,
  createTheme,
  ThemeProvider,
} from "@mui/material";

import "./Header.css";
import { CryptoState } from "../CryptoContext";

const Header = () => {
  let navigate = useNavigate();
  const { currency, setCurrency } = CryptoState();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" color="transparent" enableColorOnDark>
        <Container>
          <Toolbar>
            <Typography
              onClick={() => {
                navigate("./");
              }}
              className="headerPage"
              style={{ fontFamily: "Montserrat" }}
            >
              Track Cryptocurrency
            </Typography>
            <Select
              defaultValue={"USD"}
              label="CURRENCY"
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
                color: "white",
                borderColor: "white",
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"EUR"}>EUR</MenuItem>
              <MenuItem value={"RUB"}>RUB</MenuItem>
              <MenuItem value={"BTC"}>BTC</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
