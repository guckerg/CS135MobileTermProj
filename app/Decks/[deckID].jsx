import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { DeckContext } from "@/context/DeckContext";
import {
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

export default function DeckInfo() {
  const { id } = useLocalSearchParams();
  const { decks, deleteDeck, updateDeck } = useContext(DeckContext);
  const router = useRouter();

  const deck = decks.find((deck) => deck.id === id) || {};

  const [deckName, setDeckName] = useState(deck.deckName || "");

  const handleDelete = () => {
    if (deck.id) {
      deleteDeck(deck.id);
      router.push("/");
    }
  };

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: "center" }}>
      {deck.id ? (
        <View>
          <Text style={styles.title}>Edit Deck</Text>
          <TextInput
            value={deckName}
            onChangeText={setDeckName}
            placeholder="Deck Name"
            style={styles.deckText}
            multiline={true}
            numberOfLines={2}
          />
          <View style={{ marginBottom: 15 }}>
            <Button
              title="Save Changes"
              color="#6A1E55"
              onPress={() => {
                updateDeck(id, { deckName });
                router.push("/");
              }}
            />
          </View>
          <View style={{ marginBottom: 15 }}>
            <Button
              title="Delete Deck"
              color="#A64D79"
              onPress={handleDelete}
            />
          </View>
        </View>
      ) : (
        <Text>Deck not found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 48,
    color: "#6A1E55",
  },
  deckText: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    borderColor: "#aaa",
    fontFamily: "Montserrat_400Regular",
    color: "#3B1C32",
    fontSize: 20,
    textAlignVertical: "top",
  },
});
