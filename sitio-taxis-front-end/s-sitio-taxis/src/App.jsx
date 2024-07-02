import React, { useState } from "react";
import { Navigate, Route, Router, Routes, useNavigate } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import menuApi from "./api/menu.api";

const MenuPrincipal = () => <h1>Menu Principal</h1>;

function App() {
  const navigate = useNavigate();
  const [login, setLogin] = React.useState(null);
  const [menus, setMenus] = React.useState([]);

  React.useEffect(() => {
    const fetchMenus = async () => {
      try {
        const data = await menuApi.getMenus();
        setMenus(data);
      } catch (error) {
        console.error("Error al obtener menús:", error);
      }
    };

    fetchMenus();
  }, []);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);
  React.useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (isAuthenticated || storedToken) {
      // Si está autenticado o hay un token almacenado, redirige al dashboard
    
      setLogin(true);
    } else {
      setLogin(null);
      navigate("/login");
    }
  }, [isAuthenticated]);
  return (<>
  <Routes>
    {login === null ? (
         
            <Route path="/login" element={<Login setLogin={setLogin} />} />
        
        ) : (
          <Route path="/dashboard" element={<DashBoard />} />

        )}
        </Routes> 
  
  </>

  );
}

export default App;
