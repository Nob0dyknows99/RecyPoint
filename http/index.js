import axios from 'axios';

const URL = 'https://puntoslimpios-42c75-default-rtdb.firebaseio.com';

export async function getPuntosLimpios() {
    try {
        const response = await axios.get(`${URL}/Puntos Limpios.json`);
        console.log('Respuesta completa de Firebase:', response.data);

        const puntosLimpios = [];
        for (const key in response.data) {
            const punto = response.data[key];
            if (punto && punto.Estado && punto.Nombre && punto.Latitud && punto.Longitud) {
                puntosLimpios.push({
                    id: key,
                    Estado: punto.Estado,
                    nombre: punto.Nombre,
                    Latitud: punto.Latitud,
                    Longitud: punto.Longitud,
                });
            }
        }

        console.log('Puntos Limpios procesados:', puntosLimpios); 
        return puntosLimpios;

    } catch (error) {
        console.error('Error al obtener los Puntos Limpios:', error);
        return [];
    }
}
