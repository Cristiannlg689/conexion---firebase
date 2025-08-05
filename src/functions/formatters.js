// Función para formatear a pesos colombianos
export const formatearPesos = (valor) => {
    if (!valor) return '';
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(valor);
};

// Función para convertir de string con formato a número
export const parsearPesos = (valorString) => {
    if (!valorString) return '';
    return valorString.replace(/[^\d]/g, '');
};

// Función para formatear precio sin el prefijo 'COP'
export const formatearPrecioSinPrefijo = (valor) => {
    if (!valor) return '';
    return formatearPesos(valor).replace('COP', '').trim();
};
