import { ActivityIndicator, View } from 'react-native';
import { colors } from '../constants/theme';

export default function Loading() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 }}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}
