import React, { useEffect, useState } from 'react'
import { consultarDatabase, eliminarDocumentoDatabase } from '../config/firebase'
import { Link } from 'react-router-dom'

export const ListaProductos = () => {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    cargarProductos()
  }, [])

  const cargarProductos = async () => {
    const resultado = await consultarDatabase('lista-productos')
    setProductos(resultado)
  }

  const handleEliminar = async (id) => {
    const confirmar = window.confirm('¿Seguro que quieres eliminar este producto?')
    if (!confirmar) return

    await eliminarDocumentoDatabase('lista-productos', id)
    alert('Producto eliminado ✅')
    cargarProductos()
  }

  return (
    <div className="container mt-4">
      <h3>Lista de Productos</h3>
      <table className="table table-bordered table-striped mt-3">
        <thead className="table-dark">
          <tr>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.descripcion}</td>
              <td>{producto.cantidad}</td>
              <td>${producto.precioUnitario}</td>
              <td>
                <Link
                  to={`/productos/editar/${producto.id}`}
                  className="btn btn-sm btn-warning me-2"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleEliminar(producto.id)}
                  className="btn btn-sm btn-danger"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
