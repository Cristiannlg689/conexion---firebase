import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { guardarDatabase, actualizarDocumentoDatabase } from '../config/firebase';
import { toast } from 'react-toastify';
import { formatearPrecioSinPrefijo, parsearPesos } from '../functions/formatters';

export const ModalProducto = ({openModal, handleClose, onProductoGuardado, productoEditar}) => {
    
    const [producto, setProducto] = useState({ 
        descripcion: '', 
        cantidad: '', 
        precioUnitario: '' 
    });

    const handleChange = e => {
        const { name, value } = e.target;
        if (name === 'precioUnitario') {
            const numeroLimpio = parsearPesos(value);
            setProducto({ ...producto, [name]: numeroLimpio });
        } else {
            setProducto({ ...producto, [name]: value });
        }
    };

    // Cargar datos del producto si estamos en modo edición
    useEffect(() => {
        if (productoEditar) {
            setProducto(productoEditar);
        }
    }, [productoEditar]);

    // Limpiar el formulario cuando se cierra el modal
    useEffect(() => {
        if (!openModal) {
            setProducto({ descripcion: '', cantidad: '', precioUnitario: '' });
        }
    }, [openModal]);

    const handleSubmit = async () => {
        try {
            if (!producto.descripcion || !producto.cantidad || !producto.precioUnitario) {
                toast.warning('Por favor complete todos los campos');
                return;
            }

            if (productoEditar?.id) {
                // Modo edición
                await actualizarDocumentoDatabase('lista-productos', productoEditar.id, producto);
                toast.success('Producto actualizado exitosamente');
            } else {
                // Modo creación
                await guardarDatabase('lista-productos', producto);
                toast.success('Producto agregado exitosamente');
            }
            
            if (onProductoGuardado) onProductoGuardado();
            handleClose();
        } catch (error) {
            toast.error(productoEditar ? 'Error al actualizar el producto' : 'Error al agregar el producto');
            console.error(error);
        }
    };

    return (
        <Modal show={openModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{productoEditar ? 'Editar Producto' : 'Agregar Nuevo Producto'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            type="text"
                            name="descripcion"
                            value={producto.descripcion}
                            onChange={handleChange}
                            placeholder="Ingrese la descripción del producto"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control
                            type="number"
                            name="cantidad"
                            value={producto.cantidad}
                            onChange={handleChange}
                            placeholder="Ingrese la cantidad"
                            min="0"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Precio Unitario</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control
                                type="text"
                                name="precioUnitario"
                                value={formatearPrecioSinPrefijo(producto.precioUnitario)}
                                onChange={handleChange}
                                placeholder="Ingrese el precio unitario"
                            />
                        </InputGroup>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    {productoEditar ? 'Guardar Cambios' : 'Guardar Producto'}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
