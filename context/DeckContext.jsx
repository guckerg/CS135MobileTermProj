import AsyncStorage from "@react-native-async-storage/async-storage";

const DECK_KEY = "user_deck";

// Fetch the deck from local storage
export const getDeck = async () => {
  try {
    const deck = await AsyncStorage.getItem(DECK_KEY);
    return deck ? JSON.parse(deck) : [];
  } catch (error) {
    console.error("Error fetching deck from local storage", error);
    return [];
  }
};

//Save the deck to local storage
export const saveDeck = async (deck) => {
  try {
    await AsyncStorage.setItem(DECK_KEY, JSON.stringify(deck));
  } catch (error) {
    console.error("Error saving deck to local storage", error);
  }
};
//Add a card to the deck
export const addCardToDeck = async (card) => {
  try {
    const deck = await getDeck();
    deck.push(card);
    // Add card to the deck array
    await saveDeck(deck);
  } catch (error) {
    console.error("Error adding card to deck", error);
  }
};
