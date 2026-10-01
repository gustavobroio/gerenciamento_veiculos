import { StyleSheet, Text, TextInput, TextInputProps } from 'react-native';
import { colors } from '../constants/theme';

interface Props extends TextInputProps {
  label: string;
  error?: string;
}

export default function Input({ label, error, ...rest }: Props) {
  return (
    <>
      <Text style={s.label}>{label}</Text>
      <TextInput style={[s.input, !!error && { borderColor: colors.danger }]} placeholderTextColor={colors.muted} {...rest} />
      {error ? <Text style={s.error}>{error}</Text> : null}
    </>
  );
}

const s = StyleSheet.create({
  label: { marginTop: 12, marginBottom: 4, fontWeight: '600', color: colors.text },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 12, color: colors.text },
  error: { color: colors.danger, marginTop: 4 },
});
