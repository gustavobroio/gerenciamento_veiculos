import { api } from './api';
import { Vehicle, VehicleInput } from '../types/Vehicle';

export const getVehicles = async (): Promise<Vehicle[]> =>
  (await api.get<Vehicle[]>('/veiculos')).data;

export const getVehicleById = async (id: string): Promise<Vehicle> =>
  (await api.get<Vehicle>(`/veiculos/${id}`)).data;

export const createVehicle = async (data: VehicleInput): Promise<Vehicle> =>
  (await api.post<Vehicle>('/veiculos', data)).data;

export const updateVehicle = async (id: string, data: VehicleInput): Promise<Vehicle> =>
  (await api.put<Vehicle>(`/veiculos/${id}`, data)).data;

export const deleteVehicle = async (id: string): Promise<void> => {
  await api.delete(`/veiculos/${id}`);
};
