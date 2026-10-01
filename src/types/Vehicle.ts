export interface Vehicle {
  id: string;
  placa: string;
  marca: string;
  modelo: string;
  ano: number;
  cor: string;
}

export type VehicleInput = Omit<Vehicle, 'id'>;

// Valores do formulário (tudo texto, convertido ao salvar)
export interface VehicleFormValues {
  placa: string; marca: string; modelo: string; ano: string; cor: string;
}

export type FormErrors = Partial<Record<keyof VehicleFormValues, string>>;
