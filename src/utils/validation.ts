import { FormErrors, VehicleFormValues } from '../types/Vehicle';

// Aceita padrão antigo (ABC-1234 / ABC1234) e Mercosul (ABC1D23)
const PLACA_REGEX = /^[A-Z]{3}-?\d[A-Z0-9]\d{2}$/;

export function validateVehicle(v: VehicleFormValues): FormErrors {
  const errors: FormErrors = {};
  const placa = v.placa.trim().toUpperCase();
  const ano = v.ano.trim();
  const anoMax = new Date().getFullYear() + 1;

  if (!placa) errors.placa = 'A placa é obrigatória.';
  else if (!PLACA_REGEX.test(placa)) errors.placa = 'Placa inválida. Ex.: ABC1D23 ou ABC-1234.';

  if (!v.marca.trim()) errors.marca = 'A marca é obrigatória.';
  if (!v.modelo.trim()) errors.modelo = 'O modelo é obrigatório.';

  if (!ano) errors.ano = 'O ano é obrigatório.';
  else if (!/^\d+$/.test(ano)) errors.ano = 'O ano deve ser numérico.';
  else if (ano.length !== 4 || Number(ano) < 1900 || Number(ano) > anoMax)
    errors.ano = `Informe um ano válido (1900 a ${anoMax}).`;

  if (!v.cor.trim()) errors.cor = 'A cor é obrigatória.';
  return errors;
}
