import { Pokemon } from '../interface/IPokemon';

const API_URL = 'https://tyradex.app/api/v1/pokemon';

export const fetchPokemons = async (): Promise<Pokemon[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch pokemons');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching pokemons:", error);
    throw error;
  }
};
