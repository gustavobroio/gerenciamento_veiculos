import { Text, View } from 'react-native';
import { colors } from '../constants/theme';

export default function EmptyState({ message }: { message: string }) {
  return (
    <View style={{ alignItems: 'center', padding: 40 }}>
      <Text style={{ fontSize: 40 }}>🚗</Text>
      <Text style={{ color: colors.muted, marginTop: 8, textAlign: 'center' }}>{message}</Text>
    </View>
  );
}
