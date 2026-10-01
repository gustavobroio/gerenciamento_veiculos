import { useCallback, useMemo, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getVehicles } from '../services/vehicleService';
import { getErrorMessage } from '../services/api';
import { Vehicle } from '../types/Vehicle';
import { colors } from '../constants/theme';
import VehicleCard from '../components/VehicleCard';
import EmptyState from '../components/EmptyState';
import Loading from '../components/Loading';
import Input from '../components/Input';
import Button from '../components/Button';

type Props = NativeStackScreenProps<RootStackParamList, 'VehicleList'>;

export default function VehicleListScreen({ navigation }: Props) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busca, setBusca] = useState('');
  const [marca, setMarca] = useState('');
  const [ano, setAno] = useState('');

  const load = useCallback(async () => {
    try {
      setError('');
      setVehicles(await getVehicles());
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  // Recarrega sempre que a tela ganha foco (após cadastrar, editar ou excluir)
  useFocusEffect(useCallback(() => { load(); }, [load]));

  const filtered = useMemo(() => {
    const b = busca.trim().toLowerCase();
    const m = marca.trim().toLowerCase();
    const a = ano.trim();
    return vehicles.filter((v) =>
      (!b || v.placa.toLowerCase().includes(b) || v.modelo.toLowerCase().includes(b)) &&
      (!m || v.marca.toLowerCase().includes(m)) &&
      (!a || String(v.ano).includes(a)));
  }, [vehicles, busca, marca, ano]);

  const hasFilter = !!(busca || marca || ano);
  const limpar = () => { setBusca(''); setMarca(''); setAno(''); };

  if (loading) return <Loading />;

  return (
    <View style={s.container}>
      <View style={s.filters}>
        <Input label="Pesquisar (placa ou modelo)" value={busca} onChangeText={setBusca} placeholder="Ex.: Corolla" />
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <View style={{ flex: 2 }}><Input label="Marca" value={marca} onChangeText={setMarca} placeholder="Toyota" /></View>
          <View style={{ flex: 1 }}><Input label="Ano" value={ano} onChangeText={setAno} placeholder="2023" keyboardType="numeric" maxLength={4} /></View>
        </View>
        {hasFilter && <Button title="Limpar filtros" variant="outline" onPress={limpar} />}
      </View>

      {error ? (
        <View style={s.errorBox}>
          <Text style={s.errorText}>{error}</Text>
          <Button title="Tentar novamente" onPress={() => { setLoading(true); load(); }} />
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(v) => v.id}
          renderItem={({ item }) => (
            <VehicleCard vehicle={item} onPress={() => navigation.navigate('VehicleDetails', { id: item.id })} />
          )}
          refreshControl={<RefreshControl refreshing={false} onRefresh={load} />}
          ListEmptyComponent={<EmptyState message="Nenhum veículo encontrado." />}
          contentContainerStyle={{ paddingBottom: 90, paddingTop: 8 }}
        />
      )}

      <TouchableOpacity style={s.fab} onPress={() => navigation.navigate('VehicleCreate')}>
        <Text style={s.fabText}>+ Novo veículo</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  filters: { paddingHorizontal: 12, paddingBottom: 4 },
  errorBox: { margin: 16, padding: 16, backgroundColor: '#fee2e2', borderRadius: 10 },
  errorText: { color: colors.danger, textAlign: 'center' },
  fab: { position: 'absolute', right: 16, bottom: 24, backgroundColor: colors.primary, paddingHorizontal: 20, paddingVertical: 14, borderRadius: 30, elevation: 5 },
  fabText: { color: '#fff', fontWeight: '700' },
});
