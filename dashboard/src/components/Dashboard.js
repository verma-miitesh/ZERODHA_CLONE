import React,{ useState, useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";

import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";
import GeneralContext from "./GeneralContext"; // ✅ Adjust the path if needed



const Dashboard = () => {
  const { openBuyWindow } = useContext(GeneralContext);
  const handleBuyClick = (uid) => {
    openBuyWindow(uid); 
  };
  const [allHoldings, setAllHoldings] = useState([]);

  const fetchHoldings = () => {
    axios.get("http://localhost:3002/allHoldings").then((res) => {
      setAllHoldings(res.data);
    });
  };

  useEffect(() => {
    fetchHoldings(); 
  }, []);
  return (
    <div className="dashboard-container">
      <GeneralContextProvider fetchHoldings={fetchHoldings}>
        <WatchList />
      </GeneralContextProvider>
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Summary />} />
          <Route path="/orders" element={<Orders />} />
          {/* <Route path="/holdings" element={<Holdings />} /> */}
          <Route path="/holdings" element={<Holdings allHoldings={allHoldings} />} />

          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/apps" element={<Apps />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
