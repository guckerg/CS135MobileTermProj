import React, { createContext, useState, useEffect } from "react";
import cardsData from "@/data/CardsData";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CardsContext = createContext();

export const CardsProvider = ({ children }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(cardsData);
  }, []);

  useEffect(() => {
    const loadCards = async () => {
      try {
        const value = await AsyncStorage.getItem("cards");
        if (value !== null) {
          const parsedCards = JSON.parse(value);
          setCards(parsedCards);
        }
      } catch (error) {
        console.error("Error reading cards from storage:", error);
      }
    };

    loadCards();
  }, []);

  //save card logic
  const storeCards = async (cards) => {
    try {
      const jsonValue = JSON.stringify(cards);
      await AsyncStorage.setItem("CardApp", jsonValue);
    } catch (e) {
      console.error(e);
    }
  };

  //save chosen card
  const addCard = (newCard) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards, newCard];
      storeCards(updatedCards);
      return updatedCards;
    });
  };

  //update card with new card
  const updatedCard = (id, updatedCard) => {
    setCards((prevCards) => {
      const updatedCards = prevCards.map((card) =>
        card.id === id ? { ...card, ...updatedCard } : card
      );
      storeCards(updatedCards);
      return updatedCards;
    });
  };

  //remove a card
  const deleteCard = (id) => {
    setCards((prevCards) => {
      const updatedCards = prevCards.filter((card) => card.id !== id);
      storeCards(updatedCards);
      return updatedCards;
    });
  };

  //update multiples of a card
  const updateCardQty = (id, updatedCardQty) => {
    if (updatedCardQty >= 0) {
      let updatedCards;
      setCards((prevCards) => {
        if (!Array.isArray(prevCards)) {
          console.error("prevCards is not an array:", prevCards);
          return prevCards; // Avoid breaking the app
        }
        updatedCards = prevCards.map((card) =>
          card.id === id ? { ...card, quantity: updatedCardQty } : card
        );
        return updatedCards;
      });
      storeCards(updatedCards);
      return updatedCards;
    } else {
      console.warn(
        "cannot update card quantity to negative value:",
        updatedCardQty
      );
    }
  };

  return (
    <CardsContext.Provider
      value={{ cards, addCard, deleteCard, updatedCard, updateCardQty }}
    >
      {children}
    </CardsContext.Provider>
  );
};

export default CardsProvider;
