import React, {useContext} from 'react';
import {
  Alert,
  FlatList,
  GestureResponderEvent,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from 'react-native';
import IUsers from '../../interfaces/IUsers';
import {ListItem, Avatar} from '@rneui/base';
import {Button} from '@rneui/themed';
import Icon from 'react-native-vector-icons/Feather';
import {UsersContext} from '../../context/UsersContext';

export default function UserList({navigation}) {
  const {state, dispatch} = useContext(UsersContext);

  function confirm(user: IUsers) {
    Alert.alert('Excluir Usuario', 'Deseja excluir o usuario?', [
      {
        text: 'Sim',
        onPress: () => {
          dispatch({
            type: 'delete',
            payload: user,
          });
        },
      },
      {text: 'Não'},
    ]);
  }
  return (
    <View>
      <FlatList
        data={state.Users}
        keyExtractor={user => user.id.toString()}
        renderItem={({item}: ListRenderItemInfo<IUsers>) => (
          <ListItem bottomDivider key={item.id}>
            <Avatar rounded source={{uri: item.imagemURL}} />
            <ListItem.Content>
              <ListItem.Title style={styles.title}>
                {item.nome + ' ' + item.sobrenome}
              </ListItem.Title>
              <ListItem.Subtitle>{item.profissao}</ListItem.Subtitle>
            </ListItem.Content>
            <Button
              onPress={() => navigation.navigate('Form', item)}
              type="clear"
              icon={<Icon name="edit-2" size={25} color="#f4511e" />}
            />
            <Button
              onPress={() => confirm(item)}
              type="clear"
              icon={<Icon name="trash" size={25} color="#ff0000" />}
            />
          </ListItem>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  },
});
