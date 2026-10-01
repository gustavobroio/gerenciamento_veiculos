import Constants from 'expo-constants';

// ÚNICO lugar para configurar a API.
// Deixe vazio para detecção automática (Expo Go usa o IP do PC; fallback 10.0.2.2 do emulador).
// Ou force um valor, ex.: '192.168.0.10' (celular físico) ou '10.0.2.2' (emulador Android).
const API_HOST_OVERRIDE = '192.168.0.124';

const detectedHost = Constants.expoConfig?.hostUri?.split(':')[0];

export const API_HOST = API_HOST_OVERRIDE || detectedHost || '10.0.2.2';
export const API_URL = `http://${API_HOST}:3000`;