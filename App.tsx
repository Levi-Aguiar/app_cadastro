import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/lib/app/login';
import CriarConta from './src/lib/app/criar_conta';
import CadPet from './src/lib/app/cad_pet';
import ListarPet from './src/lib/app/listar_pet';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CriarConta" component={CriarConta} />
        <Stack.Screen name="CadPet" component={CadPet} />
        <Stack.Screen name="ListarPet" component={ListarPet} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}