import React from "react";
import { useHistory } from "react-router";

import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  MenuItem,
  Select,
} from "@mui/material";

import "./Header.css";

const Header = () => {
  return (
    <AppBar color="success" position="static">
      <Container>
        <Toolbar>
          <Typography className="headerPage">Crypto Monitoring</Typography>
          <Select
            defaultValue={"USD"}
            label="CURRENCY"
            variant="outlined"
            style={{ width: 100, height: 40, marginLeft: 15 }}
          >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"EUR"}>EUR</MenuItem>
            <MenuItem value={"RUB"}>RUB</MenuItem>
            <MenuItem value={"KZT"}>KZT</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
