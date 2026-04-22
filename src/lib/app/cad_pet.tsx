import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";

import { db } from "../firebase";

import { auth } from "../firebase";

import {
  addDoc,
  collection,
  serverTimestamp
} from "firebase/firestore";

export default function CadPet({ navigation }: any) {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [idade, setIdade] = useState("");

async function handleAddPet() {
  if (!nome || !tipo || !idade) {
    alert("Preencha todos os campos");
    return;
  }

  try {
    const user = auth.currentUser;

    if (!user) {
      alert("Usuário não está logado");
      return;
    }

    const docRef = await addDoc(collection(db, "pets"), {
      nome,
      tipo,
      idade,
      user: user.email,
      createdAt: serverTimestamp()
    });

    console.log("Pet salvo:", docRef.id);

    setNome("");
    setTipo("");
    setIdade("");

    alert("Pet cadastrado!");

  } catch (error) {
    console.log("Erro ao salvar:", error);
  }
}

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, marginTop: 25 }}
      behavior={Platform.select({ ios: "padding", android: "height" })}
    >
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
        
        <Text style={{ fontSize: 22, fontWeight: "700" }}>
          Cadastro de Pet
        </Text>

        <View style={{
          padding: 12,
          borderWidth: 1,
          borderRadius: 12,
          gap: 10
        }}>
          
          <TextInput
            placeholder="Nome do pet"
            value={nome}
            onChangeText={setNome}
            style={{ borderWidth: 1, borderRadius: 10, padding: 10 }}
          />

          <TextInput
            placeholder="Tipo (cachorro, gato...)"
            value={tipo}
            onChangeText={setTipo}
            style={{ borderWidth: 1, borderRadius: 10, padding: 10 }}
          />

          <TextInput
            placeholder="Idade"
            value={idade}
            onChangeText={setIdade}
            keyboardType="numeric"
            style={{ borderWidth: 1, borderRadius: 10, padding: 10 }}
          />

          <Pressable
            onPress={handleAddPet}
            style={{
              padding: 12,
              borderWidth: 1,
              borderRadius: 10,
              alignItems: "center"
            }}
          >
            <Text>Salvar Pet</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("ListarPet")}
            style={{
              padding: 12,
              borderWidth: 1,
              borderRadius: 10,
              alignItems: "center"
            }}
          >
            <Text>Ver Pets</Text>
          </Pressable>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}