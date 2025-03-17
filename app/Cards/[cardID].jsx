import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { CardContext } from "@/context/CardContext";
import { Montserrat_400Regular } from "@expo-google-fonts/montserrat";

export default function CardInfo() {
  const { id } = useLocalSearchParams();
  const { cards, deleteCard, updateCard } = useContext(CardContext);
  const router = useRouter();

  const card = cards.find((card) => card.id === id) || {};

  const [cardName, setCardName] = useState(card.cardName || "");

  const handleDelete = () => {
    if (card.id) {
      deleteCard(card.id);
      router.push("/");
    }
  };

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: "center" }}>
      {card.id ? (
        <View>
          <Text style={styles.title}>Edit Card</Text>
          <TextInput
            value={cardName}
            onChangeText={setCardName}
            placeholder="Card Name"
            style={styles.cardText}
            multiline={true}
            numberOfLines={2}
          />
          <View style={{ marginBottom: 15 }}>
            <Button
              title="Save Changes"
              color="#6A1E55"
              onPress={() => {
                updateCard(id, { cardName });
                router.push("/");
              }}
            />
          </View>
          <View style={{ marginBottom: 15 }}>
            <Button
              title="Delete Card"
              color="#A64D79"
              onPress={handleDelete}
            />
          </View>
        </View>
      ) : (
        <Text>Card not found</Text>
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
  cardText: {
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
