import { useCallback, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { deleteVehicle, getVehicleById } from '../services/vehicleService';
import { getErrorMessage } from '../services/api';
import { Vehicle } from '../types/Vehicle';
import { colors } from '../constants/theme';
import Loading from '../components/Loading';
import Button from '../components/Button';

type Props = NativeStackScreenProps<RootStackParamList, 'VehicleDetails'>;

export default function VehicleDetailsScreen({ route, navigation }: Props) {
  const { id } = route.params;
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  // Recarrega ao voltar da edição, mostrando os dados atualizados
  useFocusEffect(useCallback(() => {
    setError('');
    getVehicleById(id).then(setVehicle).catch((e) => setError(getErrorMessage(e)));
  }, [id]));

  const confirmDelete = () =>
    Alert.alert('Excluir veículo', 'Tem certeza que deseja excluir este veículo?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir', style: 'destructive',
        onPress: async () => {
          try {
            setDeleting(true);
            await deleteVehicle(id);
            Alert.alert('Sucesso', 'Veículo excluído com sucesso.', [{ text: 'OK', onPress: () => navigation.goBack() }]);
          } catch (e) {
            Alert.alert('Erro ao excluir', getErrorMessage(e));
          } finally {
            setDeleting(false);
          }
        },
      },
    ]);

  if (error) {
    return (
      <View style={s.container}>
        <Text style={{ color: colors.danger, textAlign: 'center' }}>{error}</Text>
        <Button title="Voltar" variant="outline" onPress={() => navigation.goBack()} />
      </View>
    );
  }
  if (!vehicle) return <Loading />;

  const rows: [string, string][] = [
    ['Placa', vehicle.placa], ['Marca', vehicle.marca], ['Modelo', vehicle.modelo],
    ['Ano', String(vehicle.ano)], ['Cor', vehicle.cor],
  ];

  return (
    <ScrollView style={{ backgroundColor: colors.bg }} contentContainerStyle={s.container}>
      <View style={s.card}>
        {rows.map(([k, v]) => (
          <View key={k} style={s.row}>
            <Text style={s.label}>{k}</Text>
            <Text style={s.value}>{v}</Text>
          </View>
        ))}
      </View>
      <Button title="Editar" onPress={() => navigation.navigate('VehicleEdit', { id })} />
      <Button title="Excluir" variant="danger" loading={deleting} onPress={confirmDelete} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { padding: 16 },
  card: { backgroundColor: colors.card, borderRadius: 10, padding: 16, elevation: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: colors.border },
  label: { color: colors.muted, fontWeight: '600' },
  value: { color: colors.text, fontWeight: '700' },
});
