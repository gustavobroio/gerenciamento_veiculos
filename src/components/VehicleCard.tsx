import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/theme';
import { Vehicle } from '../types/Vehicle';

export default function VehicleCard({ vehicle, onPress }: { vehicle: Vehicle; onPress: () => void }) {
  return (
    <TouchableOpacity style={s.card} onPress={onPress}>
      <View style={s.header}>
        <Text style={s.title}>{vehicle.marca} {vehicle.modelo}</Text>
        <Text style={s.plate}>{vehicle.placa}</Text>
      </View>
      <Text style={s.sub}>Ano: {vehicle.ano}  •  Cor: {vehicle.cor}</Text>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  card: { backgroundColor: colors.card, marginHorizontal: 12, marginBottom: 10, padding: 16, borderRadius: 10, elevation: 2 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 17, fontWeight: '700', color: colors.text, flexShrink: 1 },
  plate: { backgroundColor: colors.primary, color: '#fff', fontWeight: '700', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, overflow: 'hidden' },
  sub: { marginTop: 6, color: colors.muted },
});
