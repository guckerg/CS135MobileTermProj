import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import { addCardToDeck } from "@/context/DeckContext";

const Card = ({ cardData }) => {
  if (!cardData) {
    return <Text style={styles.inputField}>Loading card data...</Text>;
  }
  return (
    <View style={styles.container}>
      {" "}
      <Text style={styles.name}>{cardData.name}</Text>{" "}
      <Text style={styles.type}>{cardData.type}</Text>{" "}
      <Text style={styles.text}>{cardData.text}</Text>{" "}
      <Image
        source={{ uri: cardData.imageUrl }}
        style={styles.image}
        resizeMode="contain"
      />{" "}
      <Button title="Add Card to Deck" onPress={() => addCardToDeck(card)} />{" "}
    </View>
  );
};

const styles = StyleSheet.create({
  inputField: { flex: 1, justifyContent: "center" },
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: 300, height: 400 },
  name: { fontFamily: "Montserrat_700Bold" },
  type: { fontFamily: "Montserrat_400Regular" },
  text: { fontFamily: "Montserrat_400Regular" },
});

export default Card;
