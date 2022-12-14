import { HashRouter, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/navBar/Navbar";

import AdminPrincipal from "./views/admin/AdminPrincipal";

import AdminProductos from "./views/admin/adminProductos/AdminProductos";
import AdminProductosCrear from "./views/admin/adminProductos/AdminProductosCrear";

import AdminRecetas from "./views/admin/recetas/AdminRecetas";
import AdminRecetasCrear from "./views/admin/recetas/AdminRecetasCrear";

import AdminRestaurantes from "./views/admin/restaurantes/AdminRestaurantes";
import AdminRestaurantesCrear from "./views/admin/restaurantes/AdminRestaurantesCrear";

import AdminCategoriaCrear from "./views/admin/categorias/AdminCategoriaCrear";
import AdminCategoria from "./views/admin/categorias/AdminCategoria";
import AdminCategoriaEditar from "./views/admin/categorias/AdminCategoriaEditar";

import Landing from "./views/Landing";
import LoginView from "./views/LoginView";
import NosotrosView from "./views/NosotrosView";
import RegistroView from "./views/RegistroView";
import Restaurantes from "./views/RestaurantesView";
import Products from "./views/productos/Products.jsx";
import DetalleProducto from "./views/productos/DetalleProducto.jsx";

import axios from "axios";

import Cart from "./components/shoppingCart/Cart";
import { useCart } from "./context/CartContext";
import AdminRestaurantesEditar from "./views/admin/restaurantes/AdminRestaurantesEditar";
import AdminRecetasEditar from "./views/admin/recetas/AdminRecetasEditar";
import AdminProductosEditar from "./views/admin/adminProductos/AdminProductosEditar";
import ProductosRestaurantesView from "./views/ProductosRestaurantesView";
import AdminHome from "./views/admin/AdminHome";
import ProductosView from "./views/ProductosView";
import RecetasView from "./views/RecetasView";
import AdminCocinaCrear from "./views/admin/adminCocina/AdminCocinaCrear";
import AdminCocina from "./views/admin/adminCocina/AdminCocina";
import AdminCocinaEditar from "./views/admin/adminCocina/AdminCocinaEditar";
import AdminCocinaAsistencia from "./views/admin/adminCocina/AdminCocinaAsistencia";

//Revisar los cambios en estas líneas, son parámetros definidos para las peticiones
// axios.defaults.baseURL = "http://127.0.0.1:8000";
// axios.defaults.baseURL = "http://acomertipico.herokuapp.com";
// axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.baseURL = "https://acomertipico-production-c2ff.up.railway.app";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";

axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // eslint-disable-next-line
  const { cartItems } = useCart();

  useEffect(() => {
    const productArr = [];
    const fetchData = async () => {
      setIsLoading(true);
      try {
        //Cambiar la api por la de acomertipico
        // const res = await fetch("http://localhost:8000/api/products");
        const res = await fetch("https://acomertipico-production-c2ff.up.railway.app/api/products");
        // const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        const response = await data.product;
        console.log(response);
        setIsLoading(false);
        response.map((item) => {
          productArr.push({
            id: item.id,
            nombre_producto: item.nombre_producto,
            descripcion_producto: item.descripcion_producto,
            category_name: item.category_name,
            precio_producto: item.precio_producto,
            imagen_producto: item.imagen_producto,
          });
          return item;
        });
        setError(null);
      } catch (err) {
        setIsLoading(false);
        setError("Could not fetch the data");
        console.error(err.message);
      }
      setProducts(productArr);
    };
    fetchData();
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Landing />} />

          <Route
            path="productos-cart"
            element={
              <Products
                products={products}
                isLoading={isLoading}
                error={error}
              />
            }
          />

          <Route
            path="productos"
            element={
              <ProductosView
                products={products}
                isLoading={isLoading}
                error={error}
              />
            }
          />

          <Route
            path="/products/:id"
            element={<DetalleProducto products={products} />}
          />

          <Route path="restaurantes" element={<Restaurantes />} />

          <Route
              path="productos-restaurante"
              element={
                <ProductosRestaurantesView
                  isLoading={isLoading}
                  error={error}
                />
              }
          />
          

          <Route path="recetas" element={<RecetasView />} />
          <Route path="nosotros" element={<NosotrosView />} />
          <Route path="registro" element={<RegistroView />} />
          <Route path="login" element={<LoginView />} />
        </Route>

        <Route path="/admin/dashboard" element={<AdminPrincipal />}>
          {/* <Route index element={<AdminContenido />} /> */}
          <Route index element={<AdminHome />} />
          {/* <Route path="notificaciones" element={<AdminNotificaciones />} /> */}

          <Route path="productos" element={<AdminProductos />} />
          <Route path="productos/crear" element={<AdminProductosCrear />} />
          <Route path="productos/editar" element={<AdminProductosEditar />} />

          <Route path="restaurantes" element={<AdminRestaurantes />} />
          <Route path="restaurantes/crear" element={<AdminRestaurantesCrear />} />
          <Route path="restaurantes/editar" element={<AdminRestaurantesEditar />} />

          <Route path="recetas" element={<AdminRecetas />} />
          <Route path="recetas/crear" element={<AdminRecetasCrear />} />
          <Route path="recetas/editar" element={<AdminRecetasEditar />} />

          <Route path="categoria" element={<AdminCategoria />} />
          <Route path="categoria/crear" element={<AdminCategoriaCrear />} />
          <Route path="categoria/editar" element={<AdminCategoriaEditar />} />

          <Route path="cocina" element={<AdminCocina />} />
          <Route path="cocina/crear" element={<AdminCocinaCrear />} />
          <Route path="cocina/editar" element={<AdminCocinaEditar />} />
          <Route path="cocina/asistencia" element={<AdminCocinaAsistencia />} />

        </Route>
      </Routes>
      <Cart products={products} />
    </HashRouter>
  );
}

export default App;
