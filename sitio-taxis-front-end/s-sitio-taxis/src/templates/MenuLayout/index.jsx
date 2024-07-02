import {
  Box,
  Button,
  Checkbox,
  Chip,
  Fab,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputLabel,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import menuApi from "../../api/menu.api";
import {
  DataGrid,
  GridActionsCellItem,
  GridCellEditStopReasons,
  GridCellModes,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
const CheckCell = ({ data }) => {
  /**
   * Renderiza un icono de verificación si el valor de data es verdadero,
   * o un icono de cruz si el valor de data es falso.
   *
   * @returns {JSX.Element} - Elemento JSX que representa el icono de verificación o cruz.
   */
  if (data) {
    return (
      <IconButton aria-label="check" size="small">
        <CheckIcon fontSize="inherit" color="success" />
      </IconButton>
    );
  } else {
    return (
      <IconButton aria-label="check" size="small">
        <ClearIcon fontSize="inherit" sx={{ color: "red" }} />
      </IconButton>
    );
  }
};

const SubMenuChip = ({ data }) => {
  /**
   * Renderiza un icono de verificación si el valor de data es verdadero,
   * o un icono de cruz si el valor de data es falso.
   *
   * @returns {JSX.Element} - Elemento JSX que representa el icono de verificación o cruz.
   */

  return (
    <>
      {data.map((submenu, index) => (
        <Chip
          key={index}
          label={submenu.title}
          size="small"
          variant="outlined"
        />
      ))}
    </>
  );
};

function MenuLayout() {
  const [menus, setMenus] = React.useState([]);
  const [showElement, setElement] = React.useState({
    Grid: true,
    Form: false,
  });
  const [formDataFromInputs, setFormDataFromInputs] = React.useState({
    title: "",
    link: "",
    icon: "",
    submenus: [],
    active: false,
  });
  const [subMenuBox, setSubMenuBox] = React.useState([]);
  console.log(subMenuBox);
  const handleAddSubMenuBox = () => {
    // Agregamos un nuevo número al estado subMenuBox
    setSubMenuBox((prevBoxes) => [...prevBoxes, subMenuBox.length + 1]);
  };

  const handleChangeCheckbox = (e) => {
    const { name, checked } = e.target;

    // Actualiza el estado de verificationInputs utilizando la función de actualización previa
    /* setVerificationInputs((prev) => ({
      ...prev,
      [name]: checked,
    })); */

    // Actualiza el estado de formDataFromInputs utilizando el spread operator
    setFormDataFromInputs({
      ...formDataFromInputs,
      [name]: checked,
    });
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    // Actualiza el estado de verificationInputs utilizando la función de actualización previa y un switch
    /*  setVerificationInputs((prev) => {
      switch (name) {
        case "name":
          return {
            ...prev,
            [name]: !!value,
            nameInput: value.length > 0 ? true : false,
          };
  
        case "process":
          return {
            ...prev,
            [name]: value !== "0",
            processInput: value !== "0",
          };
        
        // Agrega más casos según sea necesario
  
        default:
          return prev;
      }
    }); */

    // Actualiza el estado de formDataFromInputs utilizando el spread operator
    setFormDataFromInputs({
      ...formDataFromInputs,
      [name]: value,
    });
  };

  const handleClickOpenNewMenu = () => {
    setElement((prevState) => ({
      ...prevState,
      Grid: false,
      Form: true,
    }));
  };

  /**
   * Componente funcional que representa una barra de herramientas personalizada para un DataGrid.
   *
   * @component
   * @example
   * // Uso en un DataGrid
   * <DataGrid components={{ Toolbar: CustomToolbar }} />
   */
  function CustomToolbar() {
    /**
     * Renderiza una barra de herramientas con botones para gestionar las columnas, filtros, densidad y exportación de un DataGrid.
     *
     * @returns {JSX.Element} - Elemento JSX que representa la barra de herramientas personalizada.
     */

    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton color="secondary" />
        <GridToolbarFilterButton color="secondary" />
        <GridToolbarDensitySelector color="secondary" />
        <GridToolbarExport color="secondary" />
        <Button
          color="secondary"
          startIcon={<AddIcon />}
          onClick={handleClickOpenNewMenu}
          size="small"
        >
          Agregar Nuevo Menu
        </Button>
      </GridToolbarContainer>
    );
  }
  const fetchData = async () => {
    try {
      // Aquí deberías hacer tu solicitud de red para obtener los datos
      // Reemplaza 'TU_URL_DE_DATOS' con la URL real de tus datos
      const response = await menuApi.getMenus();

      // Agrega el campo 'id_tarea' a cada fila usando el índice como valor único si no no se ven en la datagrid
      const rowsWithId = response.map((row, index) => ({
        ...row,
        id: index.toString(),
      }));

      setMenus(rowsWithId);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const buildColumns = () => {
    const columns = [
      {
        field: "_id",
        renderHeader: () => (
          <strong style={{ color: "#5EBFFF" }}>{"Id"}</strong>
        ),
        width: 250,
        editable: true,
      },
      {
        field: "title",
        renderHeader: () => (
          <strong style={{ color: "#5EBFFF" }}>{"Nombre"}</strong>
        ),
        width: 120,
        editable: true,
      },
      {
        field: "link",
        renderHeader: () => (
          <strong style={{ color: "#5EBFFF" }}>{"Link"}</strong>
        ),
        width: 100,
        editable: true,
      },
      {
        field: "icon",
        renderHeader: () => (
          <strong style={{ color: "#5EBFFF" }}>{"Icono"}</strong>
        ),
        width: 100,
        editable: true,
      },
      {
        field: "active",
        renderHeader: () => (
          <strong style={{ color: "#5EBFFF" }}>{"Estado"}</strong>
        ),
        type: "boolean",
        width: 80,
        align: "left",
        headerAlign: "left",
        editable: true,
        renderCell: (params) => <CheckCell data={params.row.active} />,
      },
      {
        field: "createdAt",
        renderHeader: () => (
          <strong style={{ color: "#5EBFFF" }}>{"Fecha de creación"}</strong>
        ),

        editable: true,
        width: 150,
      },

      {
        field: "submenus",
        renderHeader: () => (
          <strong style={{ color: "#5EBFFF" }}>{"SubMenus"}</strong>
        ),

        editable: true,
        width: 150,
        renderCell: (params) => <SubMenuChip data={params.row.submenus} />,
      },
    ];

    return columns;
  };

  const handleDeleteSubMenu = (id) => {
    setSubMenuBox((prevBoxes) =>
      prevBoxes.filter((submenu) => submenu.id !== id)
    );
  };

  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
        ".css-196n7va-MuiSvgIcon-root": {
          fill: "white",
        },
      }}
    >
      {showElement.Grid && (
        <DataGrid
          rows={menus}
          columns={buildColumns()}
          slots={{ toolbar: CustomToolbar }}
          localeText={{
            toolbarColumns: "Columnas",
            toolbarFilters: "Filtros",
            toolbarDensity: "Tamaño Celda",
            toolbarExport: "Exportar",
          }}
        />
      )}

      {showElement.Form && (
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
          }}
          noValidate
          autoComplete="on"
        >
          <Grid container spacing={2} sx={{ height: "100%" }}>
            <Grid item xs={6} sx={{ display: "flex", flexDirection: "column" }}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Datos del menu
                </Typography>
                <FormControl variant="standard">
                  <InputLabel htmlFor="component-helper">Titulo</InputLabel>
                  <Input
                    name="title"
                    id="component-helper"
                    defaultValue=""
                    aria-describedby="component-helper-text"
                    onChange={handleChangeInput}
                    value={formDataFromInputs.title}
                  />
                  <FormHelperText id="component-helper-text">
                    Some important helper text
                  </FormHelperText>
                </FormControl>

                <FormControl variant="standard">
                  <InputLabel htmlFor="component-helper">Link</InputLabel>
                  <Input
                    name="link"
                    id="component-helper"
                    defaultValue=""
                    aria-describedby="component-helper-text"
                    onChange={handleChangeInput}
                    value={formDataFromInputs.link}
                  />
                  <FormHelperText id="component-helper-text">
                    Some important helper text
                  </FormHelperText>
                </FormControl>

                <FormControl variant="standard">
                  <InputLabel htmlFor="component-helper">Icon</InputLabel>
                  <Input
                    name="icon"
                    id="component-helper"
                    defaultValue=""
                    aria-describedby="component-helper-text"
                    onChange={handleChangeInput}
                    value={formDataFromInputs.icon}
                  />
                  <FormHelperText id="component-helper-text">
                    Some important helper text
                  </FormHelperText>
                </FormControl>

                <FormControlLabel
                  required
                  control={
                    <Checkbox name="active" onChange={handleChangeCheckbox} />
                  }
                  label="Estado"
                />

                <Button variant="contained">Contained</Button>
              </Paper>
            </Grid>
            <Grid item xs={6} sx={{ display: "flex", flexDirection: "column" }}>
              {" "}
              <Fab
                size="small"
                color="secondary"
                aria-label="add"
                onClick={handleAddSubMenuBox}
              >
                <AddIcon />
              </Fab>
              <Box sx={{ overflow: "auto", height: "300px", width: "100%" }}>
                {subMenuBox.map((number, index) => (
                  <Paper
                    elevation={2}
                    key={index}
                    sx={{
                      mt: 1,
                      ml: 1,
                      p: 2,
                      width: "300px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      <Typography variant="h5" gutterBottom>
                        Datos del SubMenu
                      </Typography>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDeleteSubMenu(submenu.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>{" "}
                    {/* Agregar un margen superior */}
                    <FormControl variant="standard">
                      <InputLabel htmlFor="component-helper">Titulo</InputLabel>
                      <Input
                        name="title"
                        id="component-helper"
                        defaultValue=""
                        aria-describedby="component-helper-text"
                        onChange={handleChangeInput}
                        value={formDataFromInputs.title}
                      />
                      <FormHelperText id="component-helper-text">
                        Some important helper text
                      </FormHelperText>
                    </FormControl>
                    <FormControl variant="standard">
                      <InputLabel htmlFor="component-helper">Link</InputLabel>
                      <Input
                        name="link"
                        id="component-helper"
                        defaultValue=""
                        aria-describedby="component-helper-text"
                        onChange={handleChangeInput}
                        value={formDataFromInputs.link}
                      />
                      <FormHelperText id="component-helper-text">
                        Some important helper text
                      </FormHelperText>
                    </FormControl>
                    <FormControl variant="standard">
                      <InputLabel htmlFor="component-helper">Icon</InputLabel>
                      <Input
                        name="icon"
                        id="component-helper"
                        defaultValue=""
                        aria-describedby="component-helper-text"
                        onChange={handleChangeInput}
                        value={formDataFromInputs.icon}
                      />
                      <FormHelperText id="component-helper-text">
                        Some important helper text
                      </FormHelperText>
                    </FormControl>
                    <FormControlLabel
                      required
                      control={
                        <Checkbox
                          name="active"
                          onChange={handleChangeCheckbox}
                        />
                      }
                      label="Estado"
                    />
                  </Paper>
                ))}
              </Box>
            </Grid>
          </Grid>
          {/*  <FormControl variant="standard">
          <InputLabel htmlFor="component-helper">Name</InputLabel>
          <Input
            id="component-helper"
            defaultValue=""
            aria-describedby="component-helper-text"
          />
          <FormHelperText id="component-helper-text">
            Some important helper text
          </FormHelperText>
        </FormControl> */}
        </Box>
      )}
    </Box>
  );
}

export default MenuLayout;
