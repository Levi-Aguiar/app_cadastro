import { useState } from "react";
import {
  Alert,
  Text,
  TextInput,
  View,
  Pressable,
} from "react-native";

import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function CriarConta({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    try {
      const create = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      Alert.alert("Conta criada!", create.user.email ?? "");

      // 👉 VOLTA PARA LOGIN
      navigation.navigate("Login");

    } catch (error) {
      console.log("Erro ao criar conta", error);
      Alert.alert("Erro ao criar conta");
    }
  }

  return (
    <View style={{ marginTop: 50, padding: 10 }}>

      <Text style={{ fontSize: 20 }}>Criar Conta</Text>

      <TextInput
        placeholder="email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ borderWidth: 1, marginTop: 10, padding: 8 }}
      />

      <TextInput
        placeholder="senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginTop: 10, padding: 8 }}
      />

      <Pressable onPress={handleRegister}>
        <Text style={{ marginTop: 10 }}>Criar Conta</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Login")}>
        <Text style={{ marginTop: 10 }}>Voltar</Text>
      </Pressable>

    </View>
  );
}