import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { consultarDatabase, eliminarDocumentoDatabase } from '../config/firebase';

export const ListaProductos = () => {

  const [listaProductos, setListaProductos] = useState([])
  const [mensaje, setMensaje] = useState('') // ✅ Mensaje de éxito

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    const listaTemporal = await consultarDatabase('lista-productos')
    setListaProductos(listaTemporal)
  }

  const eliminarProducto = async (id) => {
    const confirmar = window.confirm('¿Estás seguro de eliminar este producto?')
    if (!confirmar) return

    await eliminarDocumentoDatabase('lista-productos', id)
    setMensaje('Producto eliminado correctamente ✅')

    // Oculta el mensaje después de 2.5 segundos
    setTimeout(() => setMensaje(''), 2500)

    cargarDatos()
  }

  return (
    <div>
      <h3>Lista Productos</h3>
      <hr />

      {mensaje && (
        <div className="alert alert-success" role="alert">
          {mensaje}
        </div>
      )}

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
              listaProductos.map((producto, index) => (
                <tr key={producto.id}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <input type="text" value={producto.descripcion} readOnly />
                  </td>
                  <td>{producto.cantidad}</td>
                  <td>{producto.precioUnitario}</td>
                  <td>
                    <Link to={`/productos/${producto.id}`}>
                      <button className="btn btn-info btn-sm me-2">Editar</button>
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarProducto(producto.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
