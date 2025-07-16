import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import "./index.css";
import Login from "./pages/Login";
import CityList from "./components/City/CityList";
import React from "react";
import { useEffect } from "react";

const Base_Url = "http://localhost:8000/cities";

export default function App() {
  //state for fetching cities from api
  const [cities, setCities] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(function () {
    async function fetchCities() {
      //console.log("fetching cities");
      try {
        setLoading(true);
        const response = await fetch(`${Base_Url}`);
        if (!response.ok) {
          throw new Error("Something went wrong,please try again later.....");
        }
        const data = await response.json();
        setCities(data);
        //console.log("data", data);
        setLoading(false);
      } catch (error) {
        console.error("error", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="/" element={<Homepage />} />
        {/* nested route for app , all of the nested routes should be displayed at sidebar*/}
        <Route path="app" element={<AppLayout />}>
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={loading} />}
          />
          <Route path="country" element={<p>Countries</p>} />
          <Route path="form" element={<p>Form</p>} />

          {/* now we will be using indexed route, basically if none of the route matched then 
it will be rendered */}
          <Route
            index
            element={<CityList cities={cities} isLoading={loading} />}
          />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
