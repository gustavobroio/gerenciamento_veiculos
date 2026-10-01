import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VehicleListScreen from '../screens/VehicleListScreen';
import VehicleFormScreen from '../screens/VehicleFormScreen';
import VehicleDetailsScreen from '../screens/VehicleDetailsScreen';
import { colors } from '../constants/theme';

export type RootStackParamList = {
  VehicleList: undefined;
  VehicleCreate: undefined;
  VehicleDetails: { id: string };
  VehicleEdit: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="VehicleList"
        screenOptions={{ headerStyle: { backgroundColor: colors.primary }, headerTintColor: '#fff' }}
      >
        <Stack.Screen name="VehicleList" component={VehicleListScreen} options={{ title: 'Veículos' }} />
        <Stack.Screen name="VehicleCreate" component={VehicleFormScreen} options={{ title: 'Novo veículo' }} />
        <Stack.Screen name="VehicleDetails" component={VehicleDetailsScreen} options={{ title: 'Detalhes' }} />
        <Stack.Screen name="VehicleEdit" component={VehicleFormScreen} options={{ title: 'Editar veículo' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
