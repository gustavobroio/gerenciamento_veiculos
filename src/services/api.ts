import axios from 'axios';
import { API_URL } from '../constants/api';

export const api = axios.create({ baseURL: API_URL, timeout: 8000 });

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return 'Não foi possível conectar à API. Verifique se o JSON Server está rodando e se o IP está correto.';
    }
    if (error.response.status === 404) return 'Registro não encontrado.';
    return `Erro no servidor (${error.response.status}).`;
  }
  return 'Ocorreu um erro inesperado.';
}
