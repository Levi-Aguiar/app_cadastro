import { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";

import { db } from "../firebase";

import { auth } from "../firebase";
import { where } from "firebase/firestore";

import {
  collection,
  getDocs,
  query,
  orderBy
} from "firebase/firestore";

type Pet = {
  id: string;
  nome: string;
  tipo: string;
  idade: string;
};

export default function ListarPet({ navigation }: any) {
  const [pets, setPets] = useState<Pet[]>([]);

  async function carregarPets() {
    try {
        const user = auth.currentUser;

        const q = query(
        collection(db, "pets"),
        where("user", "==", user?.email)
);

      const snapshot = await getDocs(q);

      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        nome: doc.data().nome ?? "",
        tipo: doc.data().tipo ?? "",
        idade: doc.data().idade ?? ""
      }));

      setPets(lista);

      console.log("Pets carregados:", lista.length);

    } catch (error) {
      console.log("Erro ao carregar pets:", error);
    }
  }

  useEffect(() => {
    carregarPets();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, marginTop: 25 }}
      behavior={Platform.select({ ios: "padding", android: "height" })}
    >
      <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>

        <Text style={{ fontSize: 22, fontWeight: "700" }}>
          Lista de Pets
        </Text>

        <Pressable
          onPress={carregarPets}
          style={{
            padding: 10,
            borderWidth: 1,
            borderRadius: 10,
            alignItems: "center"
          }}
        >
          <Text>Recarregar</Text>
        </Pressable>

        <View style={{ gap: 10 }}>
          {pets.map((pet) => (
            <View
              key={pet.id}
              style={{
                borderWidth: 1,
                borderRadius: 10,
                padding: 10
              }}
            >
              <Text>Nome: {pet.nome}</Text>
              <Text>Tipo: {pet.tipo}</Text>
              <Text>Idade: {pet.idade}</Text>
            </View>
          ))}
        </View>

        <Pressable
          onPress={() => navigation.navigate("CadPet")}
          style={{
            padding: 12,
            borderWidth: 1,
            borderRadius: 10,
            alignItems: "center",
            marginTop: 10
          }}
        >
          <Text>Voltar para cadastro</Text>
        </Pressable>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}