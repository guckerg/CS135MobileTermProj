import React, { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { fetchCard } from "../services/api";
import Card from "../components/CardDisplay";

const HomeScreen = () => {
  //track user input and manage fetched API data
  const [cardData, setCardData] = useState(null);
  const [input, setInput] = useState("");

  //fetch card from user's search name
  const handleSearch = async () => {
    if (input.trim() === "") {
      Alert.alert("Error", "Please enter a card name.");
      return;
    }
    try {
      const card = await fetchCard(input);
      if (card) {
        setCardData(card);
      } else {
        //error if api succeeds, but no result is found
        Alert.alert("Not Found", "Card not found. Try another name.");
      }
    } catch (error) {
      //error if api fails
      Alert.alert("Error", "Failed to fetch card data.");
    }
  };

  return (
    <View style={styles.container}>
      {/* input for user to add card name */}
      <TextInput
        style={styles.input}
        placeholder="Enter card name"
        value={input}
        onChangeText={setInput}
      />
      {/* button to search for input card name */}
      <Button title="Search" onPress={handleSearch} />
      <Card cardData={cardData} />
    </View>
  );
};

//homescreen styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default HomeScreen;
