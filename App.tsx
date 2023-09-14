import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserForms from './views/form/UserForms';
import UserList from './views/list/UserList';
import {Button} from '@rneui/base';
import Icon from 'react-native-vector-icons/Feather';
import UsersProvider from './context/UsersContext';
const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  return (
    <UsersProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="List" screenOptions={screenOptions}>
          <Stack.Screen
            name="Form"
            component={UserForms}
            options={{
              animation: 'slide_from_right',
              title: 'Formulario de Usuarios',
            }}
          />
          <Stack.Screen
            name="List"
            component={UserList}
            options={({navigation}) => {
              return {
                title: 'Lista De Usuarios',
                headerRight: () => (
                  <Button
                    onPress={() => navigation.navigate('Form')}
                    type="clear"
                    icon={<Icon name="user-plus" size={25} color="white" />}
                  />
                ),
              };
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UsersProvider>
  );
}

const screenOptions = {
  headerStyle: {
    backgroundColor: '#f4511e',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};
export default App;
