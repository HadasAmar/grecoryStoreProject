import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import ProductList from "../components/Product/ProductList";
import OrdersListBySupplier from "../components/Order/OrderListBySupplier";
import OrderListByOwner from "../components/Order/OrderListByOwner";
import SupplierRegister from "../pages/Auth/SupplierRegister";
import SupplierLogin from "../pages/Auth/SupplierLogin";

const Routing = () => {
    return (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Login />} />
                <Route path="/SupplierRegister" element={<SupplierRegister />} />
                <Route path="/SupplierLogin" element={<SupplierLogin />} />
                <Route path="/ordersBySupplier" element={<OrdersListBySupplier />} />
                <Route path="/ordersByOwner" element={<OrderListByOwner />} />
                <Route path="/products" element={<ProductList />} />
            </Routes>
    );
};

export default Routing;
