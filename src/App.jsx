import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import "./index.css";
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="/" element={<Homepage />} />
        {/* nested route for app , all of the nested routes should be displayed at sidebar*/}
        <Route path="app" element={<AppLayout />}>
          <Route path="cities" element={<p>List of Cities </p>} />
          <Route path="country" element={<p>Countries</p>} />
          <Route path="form" element={<p>Form</p>} />

          {/* now we will be using indexed route, basically if none of the route matched then 
it will be rendered */}
          <Route index element={<p>hello i am index route </p>} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
