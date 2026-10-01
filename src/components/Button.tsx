import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../constants/theme';

interface Props {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'danger' | 'outline';
  loading?: boolean;
}

export default function Button({ title, onPress, variant = 'primary', loading }: Props) {
  const outline = variant === 'outline';
  const bg = variant === 'danger' ? colors.danger : outline ? 'transparent' : colors.primary;
  return (
    <TouchableOpacity
      style={[s.btn, { backgroundColor: bg }, outline && s.outline]}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? <ActivityIndicator color="#fff" /> : (
        <Text style={[s.text, outline && { color: colors.primary }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  btn: { padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  outline: { borderWidth: 1, borderColor: colors.primary },
  text: { color: '#fff', fontWeight: '700' },
});
