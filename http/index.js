import axios from 'axios';

const URL = 'https://recypoint-8c059-default-rtdb.firebaseio.com';

export async function getPuntosLimpios() {
    const response = await axios.get(`${URL}/Puntos Limpios.json`);
    console.log('Respuesta completa de Firebase:', response.data);

    const puntosLimpios = [];
    for (const key in response.data) {
        const punto = response.data[key];
        if (punto) {
            const obj = {
                id: key,
                nombre: punto.Nombre,
                Latitud: punto.Latitud,
                Longitud: punto.Longitud,
            };
            puntosLimpios.push(obj);
        }
    }

    console.log('Puntos Limpios procesados:', puntosLimpios); 
    return puntosLimpios;
}
