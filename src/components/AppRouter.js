import React from 'react';
import {Route, Routes} from "react-router-dom";
import DevicePage from "./pages/DevicePage";
import BasketPage from "./pages/BasketPage";
import ShopPage from "./pages/ShopPage";
import ComparePage from "./pages/ComparePage";
import FavoritesPage from "./pages/FavoritesPage";
import NotFoundPage from "./pages/NotFoundPage";
import AdminPage from "./pages/AdminPage";
import CheckoutPage from "./pages/CheckoutPage";
import CategoryPage from "./pages/CategoryPage";
import BrandPage from "./pages/BrandPage";

const AppRouter = () => {
    return (
            <Routes>
                <Route path='device' element={<DevicePage/>}/>
                <Route path='basket' element={<BasketPage/>}/>
                <Route path='' element={<ShopPage/>}/>
                <Route path='compare' element={<ComparePage/>}/>
                <Route path='favorites' element={<FavoritesPage/>}/>
                <Route path='*' element={<NotFoundPage/>}/>
                <Route path='admin' element={<AdminPage/>}/>
                <Route path='/basket/checkout' element={<CheckoutPage/>}/>
                <Route path='device/:id' element={<DevicePage/>}/>
                <Route path='/category/:category' element={<CategoryPage/>}/>
                <Route path='/:category/:brand' element={<BrandPage/>}/>
            </Routes>
    );
};

export default AppRouter;