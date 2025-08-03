import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { consultarDatabase } from '../config/firebase';

export const ListaProductos = () => {

  const [listaProductos, setListaProductos] = useState([])

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    // console.log('Entro..!');
    const listaTemporal = await consultarDatabase('lista-productos')
    // console.log(listaTemporal);
    setListaProductos(listaTemporal)
  }

  return (
    <div>
      <h3>Lista Productos</h3>
      <hr />
      <div className="mt-5">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Precio Unitario</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>


            {
              listaProductos.map((producto, index) => {
                return (
                  <tr key={producto.id}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <input type="text" value={producto.descripcion} readonly="readonly" />
                    </td>
                    <td>{producto.cantidad}</td>
                    <td>{producto.precioUnitario}</td>
                    <td>
                      <Link to={`/productos/${producto.id}`}>
                        <button className="btn btn-info btn-sm">Editar</button>
                      </Link>
                    </td>
                  </tr>)
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
