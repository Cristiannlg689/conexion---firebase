import { useState } from 'react';
import './App.css';
import { actualizarDocumentoDatabase, consultarDatabase, consultarDocumentoDatabase, crearUsuario, datosUsuario, eliminarDocumentoDatabase, guardarDatabase, loginUsuario, logOutUsuario, usuario } from './config/firebase';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { ListaProductos } from './components/ListaProductos';
import { Producto } from './components/Producto';


function App() {

  const [listaProductos, setListaProductos] = useState([])

  const handleClick = async () => {
    // console.log('Entro');

    // const usuario = {
    //   nombre: 'santiago',
    //   edad: 30
    // }

    // CRUD => CREATE, READ, UPDATE, DELETE
    //  CREAR, LEER, ACTUALIZAR, BORRAR

    // Guardar en base de datos
    // guardarDatabase('usuarios', usuario);

    // Obtener todos los documentos de la colleccion
    // consultarDatabase('usuarios')
    // console.log(await consultarDatabase('usuarios'));

    // Obtener un documento id=CEqaCqjBFnI0SQKRj0tI
    // consultarDocumentoDatabase('usuarios', 'CEqaCqjBFnI0SQKRj0tI')

    // const usuarioDos = {
    //   nombre: 'sofia',
    //   edad: 15
    // }

    // Actualizacion documento  id=CEqaCqjBFnI0SQKRj0tI
    // actualizarDocumentoDatabase('usuarios', 'CEqaCqjBFnI0SQKRj0tI', usuarioDos)

    // Eliminar documento  id=CEqaCqjBFnI0SQKRj0tI
    // eliminarDocumentoDatabase('usuarios', 'CEqaCqjBFnI0SQKRj0tI', usuarioDos)

    // Creacion Usuario
    // crearUsuario('darkklitos@gmail.com', '123456')

    // Login
    // await loginUsuario('darkklitos@gmail.com', '123456')
    // console.log('datos usuario: ', usuario);

    //  salir -> LogOut
    // logOutUsuario()

    //  Datos Usuario
    // datosUsuario()


  }



  const handleGuardarDatos = async () => {
    // lista-productos
    const listaProductos = [
      {
        descripcion: 'Fuente de corriente',
        cantidad: 12,
        precioUnitario: 44000
      },
      {
        descripcion: 'Audifonos',
        cantidad: 8,
        precioUnitario: 65000
      },
      {
        descripcion: 'Parlantes',
        cantidad: 29,
        precioUnitario: 17000
      },
      {
        descripcion: 'Mouse',
        cantidad: 95,
        precioUnitario: 19500
      },
      {
        descripcion: 'Teclados',
        cantidad: 88,
        precioUnitario: 22000
      }
    ]

    listaProductos.forEach((producto) => guardarDatabase('lista-productos', producto))

  }


  const handleCargarDatos = async () => {
    const listaTemporal = await consultarDatabase('lista-productos')
    console.log(listaTemporal);
    setListaProductos(listaTemporal)
  }


  return (
    <div className="App container mt-5">
      <h1>Integracion Firebase</h1>
      <hr />
      <button
        onClick={handleClick}
        className="btn btn-outline-success"
      >Click</button>
      <button
        onClick={handleGuardarDatos}
        className="btn btn-outline-info"
      >Guardar Datos</button>
      <button
        onClick={handleCargarDatos}
        className="btn btn-outline-primary"
      >Cargar Datos</button>
      <hr />

      <Router>

        <Switch>

          {/* <Route to="/productos/:id">
            <Producto />
          </Route> */}

          <Route to="/productos">
            <ListaProductos />
          </Route>

          <Route to="/" exact>

          </Route>


        </Switch>



      </Router>

    </div>
  );
}

export default App;
