import React, { useEffect, useState } from 'react'
import { consultarDatabase, eliminarDocumentoDatabase } from '../config/firebase'
import { ModalProducto } from './ModalProducto'
import { toast } from 'react-toastify'
import { formatearPesos } from '../functions/formatters'

export const ListaProductos = () => {
  
  const [productos, setProductos] = useState([]) // Estado para almacenar los productos
  const [abrirModal, setAbrirModal] = useState(false) // Estado para controlar el modal
  const [productoEditar, setProductoEditar] = useState(null) // Estado para el producto a editar

  useEffect(() => { 
    cargarProductos() 
  }, []) 

  const cargarProductos = async () => {
    const resultado = await consultarDatabase('lista-productos')
    console.table(resultado);
    setProductos(resultado)
  }
  
  const handleEliminar = async (id) => {
    const eliminarConfirmado = async () => {
      try {
        await eliminarDocumentoDatabase('lista-productos', id)
        toast.success('Producto eliminado exitosamente')
        await cargarProductos()
      } catch (error) {
        toast.error('Error al eliminar el producto')
        console.error(error)
      }
    };

    toast.warn(
      <>
        <p>¿Estás seguro que deseas eliminar este producto?</p>
        <div>
          <button 
            className="btn btn-danger btn-sm me-2"
            onClick={() => {
              toast.dismiss();
              eliminarConfirmado();
            }}
          >
            Eliminar
          </button>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => toast.dismiss()}
          >
            Cancelar
          </button>
        </div>
      </>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false
      }
    );
  }

  const abrirModalProducto = (producto = null) => {
    setProductoEditar(producto);
    setAbrirModal(true);
  }

  const cerrarModal = () => {
    setProductoEditar(null);
    setAbrirModal(false);
  }

  useEffect(() => {
    console.log('Modal abierto:', abrirModal);
  }, [abrirModal])
    

  return (
    <div className="container mt-4">
      
      <button 
      className='btn btn-dark fa-solid fa-plus'
        onClick={() => abrirModalProducto()}
      />

      <h3>Lista de Productos</h3>

      <table className="table table-bordered table-striped mt-3">
        <thead className="table-dark">
          <tr>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Precio Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id}>
              <td>{p.descripcion}</td>
              <td className="text-center">{p.cantidad}</td>
              <td className="text-end">{formatearPesos(p.precioUnitario)}</td>
              <td className="text-end">{formatearPesos(p.cantidad * p.precioUnitario)}</td>
              <td>
                <button
                  onClick={() => abrirModalProducto(p)}
                  className="btn btn-sm btn-warning me-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleEliminar(p.id)}
                  className="btn btn-sm btn-danger"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

          <ModalProducto
            openModal={abrirModal}
            handleClose={cerrarModal}
            onProductoGuardado={cargarProductos}
            productoEditar={productoEditar}
            />

    </div>
  )
}
