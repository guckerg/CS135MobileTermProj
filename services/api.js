import axios from "axios";

export const fetchCard = async (cardName) => {
  try {
    const response = await axios.get(
      "https://api.magicthegathering.io/v1/cards",
      {
        params: { name: cardName },
      }
    );

    if (response.data.cards.length > 0) {
      const card = response.data.cards[0];
      const imageUrl = `https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${card.multiverseid}&type=card`;
      return { ...card, imageUrl };
    }
    return null;
  } catch (error) {
    console.error("Error fetching the card", error);
    throw error;
  }
};
