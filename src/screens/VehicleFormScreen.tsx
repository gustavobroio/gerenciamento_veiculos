import { useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { createVehicle, getVehicleById, updateVehicle } from '../services/vehicleService';
import { getErrorMessage } from '../services/api';
import { FormErrors, VehicleFormValues } from '../types/Vehicle';
import { validateVehicle } from '../utils/validation';
import { colors } from '../constants/theme';
import Input from '../components/Input';
import Button from '../components/Button';
import Loading from '../components/Loading';

type Props = NativeStackScreenProps<RootStackParamList, 'VehicleCreate' | 'VehicleEdit'>;

const EMPTY: VehicleFormValues = { placa: '', marca: '', modelo: '', ano: '', cor: '' };

// Mesma tela para cadastro (sem id) e edição (com id)
export default function VehicleFormScreen({ route, navigation }: Props) {
  const id = (route.params as { id?: string } | undefined)?.id;
  const [values, setValues] = useState<VehicleFormValues>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    getVehicleById(id)
      .then((v) => setValues({ placa: v.placa, marca: v.marca, modelo: v.modelo, ano: String(v.ano), cor: v.cor }))
      .catch((e) => Alert.alert('Erro ao carregar', getErrorMessage(e), [{ text: 'OK', onPress: () => navigation.goBack() }]))
      .finally(() => setLoading(false));
  }, [id, navigation]);

  const set = (key: keyof VehicleFormValues) => (text: string) => {
    setValues((p) => ({ ...p, [key]: key === 'placa' ? text.toUpperCase() : text }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const save = async () => {
    const found = validateVehicle(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const data = {
      placa: values.placa.trim().toUpperCase(), marca: values.marca.trim(),
      modelo: values.modelo.trim(), ano: Number(values.ano.trim()), cor: values.cor.trim(),
    };
    try {
      setSaving(true);
      if (id) await updateVehicle(id, data);
      else await createVehicle(data);
      Alert.alert('Sucesso', id ? 'Veículo atualizado com sucesso.' : 'Veículo cadastrado com sucesso.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (e) {
      Alert.alert(id ? 'Erro ao atualizar' : 'Erro ao cadastrar', getErrorMessage(e));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <ScrollView style={{ backgroundColor: colors.bg }} contentContainerStyle={{ padding: 16 }} keyboardShouldPersistTaps="handled">
      <Input label="Placa *" value={values.placa} onChangeText={set('placa')} error={errors.placa} placeholder="ABC1D23" autoCapitalize="characters" maxLength={8} />
      <Input label="Marca *" value={values.marca} onChangeText={set('marca')} error={errors.marca} placeholder="Toyota" />
      <Input label="Modelo *" value={values.modelo} onChangeText={set('modelo')} error={errors.modelo} placeholder="Corolla" />
      <Input label="Ano *" value={values.ano} onChangeText={set('ano')} error={errors.ano} placeholder="2023" keyboardType="numeric" maxLength={4} />
      <Input label="Cor *" value={values.cor} onChangeText={set('cor')} error={errors.cor} placeholder="Prata" />
      <Button title={id ? 'Salvar alterações' : 'Cadastrar'} onPress={save} loading={saving} />
      <Button title="Cancelar" variant="outline" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
}
