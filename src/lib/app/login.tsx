import { useState, useEffect } from "react";
import {
  Alert,
  Text,
  TextInput,
  View,
  Pressable,
} from "react-native";

import { auth } from "../firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

export default function Login({ navigation }: any) {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUserEmail(u?.email ?? null);
    });
    return unsub;
  }, []);

  async function handleLOGIN() {
    try {
      const logged = await signInWithEmailAndPassword(auth, email.trim(), password);
      Alert.alert("Login OK", logged.user.email ?? "");

      // 👉 VAI PARA CADASTRO DE PET
      navigation.navigate("CadPet");

    } catch (error) {
      console.log("Login failed ", error);
      Alert.alert("Erro no login");
    }
  }

  async function handleLogout() {
    try {
      await signOut(auth);
      Alert.alert("Logout OK");
    } catch (error) {
      console.log("Logout failed ", error);
    }
  }

  return (
    <View style={{ marginTop: 50, padding: 10 }}>

      <Text style={{ fontSize: 20 }}>Login</Text>

      <Text>Usuário: {userEmail ?? "nenhum"}</Text>

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

      <Pressable onPress={handleLOGIN}>
        <Text style={{ marginTop: 10 }}>Login</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("CriarConta")}>
        <Text style={{ marginTop: 10 }}>Criar Conta</Text>
      </Pressable>

      <Pressable onPress={handleLogout}>
        <Text style={{ marginTop: 10 }}>Logout</Text>
      </Pressable>

    </View>
  );
}