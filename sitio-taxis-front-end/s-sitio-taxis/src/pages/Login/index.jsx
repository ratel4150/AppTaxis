import React from 'react'
import { loginFailure, loginStart, loginSuccess } from '../../features/auth/authSlice';
import { Box, Button, Paper, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import authApi from '../../api/auth';

function Login() {
  const dispatch = useDispatch();
  const [getCredentials, setCredentials] = React.useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };


  
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticated);

  const handleLogin = async() => {
    
    // Aquí puedes realizar la lógica de inicio de sesión utilizando las credenciales en `credentials`
    try {
      dispatch(loginStart());
      // Simulación de la llamada a la API para iniciar sesión
      // Reemplaza esto con la lógica de tu aplicación
      const response = await authApi.login(getCredentials)

      dispatch(loginSuccess({ user: response.username, token: response.token }));

     if (isAuthenticated) {
        console.log('Inicio de sesión exitoso');
        // Puedes realizar acciones adicionales o redirigir aquí
        // history.push('/dashboard');
      } 
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
      dispatch(loginFailure(error));
    }
  };

  const imageStyle = {
    height: "100vh",

    width: "100%",
    backgroundColor: "orange",
    backgroundImage:
      "url('https://media.admagazine.com/photos/6255f958b4e9a9f5ded6ed47/16:9/w_2560%2Cc_limit/GettyImages-638920569.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white", // Color del texto, ajusta según tus necesidades

    flexDirection: "column",
  };
  return (
    <>
    <Box sx={imageStyle}>
      <Box sx={{ width: "100%", height: "5%", backgroundColor: "orange" }}>
        {""}
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "90%",
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Paper
          elevation={24}
          sx={{
            width: "30%",
            margin: "2rem",
            border: "2px solid orange",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <TextField
            sx={{ width: "90%", margin: "1rem" }}
            id="standard-basic"
            label="Usuario"
            variant="standard"
            color="warning"
            name="email"
            onChange={handleInputChange}
            value={getCredentials.email}
          />
          <TextField
            sx={{ width: "90%", margin: "1rem" }}
            id="standard-basic"
            label="Contraseña"
            variant="standard"
            color="warning"
            name="password"
            onChange={handleInputChange}
            value={getCredentials.password}
          />
          <Button
            sx={{ width: "90%", margin: "1rem", backgroundColor: "orange" }}
            variant="contained"
            onClick={handleLogin}
          >
            Iniciar Sesión
          </Button>
        </Paper>
      </Box>
      <Box sx={{ width: "100%", height: "5%", backgroundColor: "orange" }}>
        {""}
      </Box>
    </Box>
  </>
  )
}

export default Login