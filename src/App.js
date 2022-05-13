import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./componets/Header";
import CoinPage from "./pages/CoinPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <div className="mainPage">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
