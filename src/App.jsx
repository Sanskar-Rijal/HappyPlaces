import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import "./index.css";
import Login from "./pages/Login";
import CityList from "./components/City/CityList";
import CountryList from "./components/Country/CountryList";
import City from "./components/City/City";
import Form from "./components/Form/Form";
import { CitiesProvider } from "./contexts/CitiesContexts";

export default function App() {
  return (
    //using context API for managind states and prop drilling
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="/" element={<Homepage />} />
          {/* nested route for app , all of the nested routes should be displayed at sidebar*/}
          <Route path="app" element={<AppLayout />}>
            <Route path="cities" element={<CityList />} />

            {/* creating new route for storing data in URL  */}
            <Route path="cities/:id" element={<City />} />

            <Route path="country" element={<CountryList />} />

            <Route path="form" element={<Form />} />

            {/* now we will be using indexed route, basically if none of the route matched then 
it will be rendered , navigate to will navigate us to cities page*/}
            <Route index element={<Navigate to="cities" replace />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}
