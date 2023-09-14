import React, {useContext, useState} from 'react';
import {Text, View, TextInput, StyleSheet, Alert} from 'react-native';
import IUsers from '../../interfaces/IUsers';
import {Button} from '@rneui/base';
import {UsersContext} from '../../context/UsersContext';

export default function UserForms({navigation, route}) {
  const [user, setUser] = useState<IUsers>(route.params ? route.params : {});
  const textButton = route.params ? 'Editar' : 'Cadastrar';

  const {dispatch} = useContext(UsersContext);
  function confirm() {
    Alert.alert(`${textButton} Usuario`, `Deseja ${textButton} o usuario?`, [
      {
        text: 'Sim',
        onPress: () => {
          dispatch({
            type: !user.id ? 'create' : 'update',
            payload: user,
          });
          navigation.goBack()
        },
      },
      {text: 'Não'},
    ]);
  }
  return (
    <View style={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>{`${textButton} Usuarios`}</Text>
      </View>
      <View style={styles.form_control}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={user.nome}
          onChangeText={nome => setUser({...user, nome})}
        />
      </View>
      <View style={styles.form_control}>
        <TextInput
          style={styles.input}
          placeholder="Sobrenome"
          value={user.sobrenome}
          onChangeText={sobrenome => setUser({...user, sobrenome})}
        />
      </View>
      <View style={styles.form_control}>
        <TextInput
          style={styles.input}
          placeholder="Profissão"
          value={user.profissao}
          onChangeText={profissao => setUser({...user, profissao})}
        />
      </View>
      <View style={styles.form_control}>
        <TextInput
          style={styles.input}
          placeholder="Nivel Senioridade"
          value={user.nivel_senioridade}
          onChangeText={nivel_senioridade =>
            setUser({...user, nivel_senioridade})
          }
        />
      </View>
      <View style={styles.form_control}>
        <TextInput
          style={styles.input}
          placeholder="Salario"
          value={user.salario}
          onChangeText={salario => setUser({...user, salario})}
        />
      </View>
      <View style={styles.form_control}>
        <TextInput
          style={styles.input}
          placeholder="Imagems"
          value={user.imagemURL}
          onChangeText={imagemURL => setUser({...user, imagemURL})}
        />
      </View>
      <View style={styles.button_container}>
        <Button
          title={textButton}
          color={'#f4511e'}
          style={styles.button}
          onPress={() => confirm()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    marginTop: 20,
    width: '90%',
  },
  title: {
    fontSize: 24,
  },
  form_control: {
    width: '90%',
    borderBottomWidth: 0.5,
    borderColor: '#333',
    margin: 15,
  },
  input: {},
  button_container: {
    width: '90%',
  },
  button: {
    width: '90%',
  },
});
