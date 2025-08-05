import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { consultarDatabase, actualizarDocumentoDatabase } from '../config/firebase';

const EditarProducto = () => {
    const { id } = useParams();
    const history = useHistory();
    const [producto, setProducto] = useState({ descripcion: '', cantidad: '', precioUnitario: '' });
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        consultarDatabase('lista-productos').then(productos => {
            const prod = productos.find(p => p.id === id);
            if (prod) setProducto(prod);
            setCargando(false);
        });
    }, [id]);

    const handleChange = e => setProducto({ ...producto, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        await actualizarDocumentoDatabase('lista-productos', id, producto);
        alert('Producto actualizado ✅');
        history.push('/');
    };

    if (cargando) return <div>Cargando...</div>;

    return (
        <div className="container mt-4">
            <h3>Editar Producto</h3>
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <input type="text" className="form-control" name="descripcion" value={producto.descripcion} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Cantidad</label>
                    <input type="number" className="form-control" name="cantidad" value={producto.cantidad} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Precio Unitario</label>
                    <input type="number" className="form-control" name="precioUnitario" value={producto.precioUnitario} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-success">Guardar Cambios</button>
            </form>
        </div>
    );
};

export default EditarProducto;