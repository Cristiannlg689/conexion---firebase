import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { consultarDocumentoDatabase, actualizarDocumentoDatabase } from '../config/firebase';
import { toast } from 'react-toastify';
import { formatearPrecioSinPrefijo, parsearPesos } from '../functions/formatters';

const EditarProducto = () => {

    const { id } = useParams();
    const history = useHistory();
    const [producto, setProducto] = useState({ descripcion: '', cantidad: '', precioUnitario: '' });

    useEffect(() => {
        console.log(`Cargando producto con ID: ${id}`);
    }, []);
        

    /* useEffect(() => {
        const cargarProducto = async () => {
            try {
                const prod = await consultarDocumentoDatabase('lista-productos', id);
                if (prod) {
                    setProducto(prod);
                } else {
                    toast.error('Producto no encontrado');
                    history.push('/');
                }
                setCargando(false);
            } catch (error) {
                toast.error('Error al cargar el producto');
                history.push('/');
            }
        };
        cargarProducto();
    }, [id, history]); */

    const handleChange = e => {
        const { name, value } = e.target;
        if (name === 'precioUnitario') {
            const numeroLimpio = parsearPesos(value);
            setProducto({ ...producto, [name]: numeroLimpio });
        } else {
            setProducto({ ...producto, [name]: value });
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if (!producto.descripcion || !producto.cantidad || !producto.precioUnitario) {
                toast.warning('Por favor complete todos los campos');
                return;
            }
            await actualizarDocumentoDatabase('lista-productos', id, producto);
            toast.success('Producto actualizado exitosamente');
            history.push('/');
        } catch (error) {
            toast.error('Error al actualizar el producto');
            console.error(error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h3 className="mb-0">Editar Producto</h3>
                </div>
                <div className="card-body">
                    <Form onSubmit={handleSubmit}>
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
                        <div className="d-flex justify-content-between">
                            <Button variant="secondary" onClick={() => history.push('/')}>
                                Cancelar
                            </Button>
                            <Button variant="primary" type="submit">
                                Guardar Cambios
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default EditarProducto;