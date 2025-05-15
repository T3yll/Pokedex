import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pokemon } from '../../interface/IPokemon';

interface Trainer {
  id: number;
  name: string;
  pokemons: Pokemon[];
}

interface TrainerState {
  list: Trainer[];
}

const initialState: TrainerState = {
  list: [],
};

export const trainerSlice = createSlice({
  name: 'trainers',
  initialState,
  reducers: {
    addTrainer: (state, action: PayloadAction<Omit<Trainer, 'pokemons'>>) => {
      if (state.list.length < 2) {
        state.list.push({
          ...action.payload,
          pokemons: []
        });
      }
    },
    addPokemonToTrainer: (state, action: PayloadAction<{trainerId: number, pokemon: Pokemon}>) => {
      const { trainerId, pokemon } = action.payload;
      const trainer = state.list.find(t => t.id === trainerId);
      if (trainer) {
        // Vérifier si le pokémon n'est pas déjà dans l'équipe
        const isPokemonAlreadyAdded = trainer.pokemons.some(
          p => p.pokedex_id === pokemon.pokedex_id
        );
        
        if (!isPokemonAlreadyAdded) {
          trainer.pokemons.push(pokemon);
        }
      }
    },
    removePokemonFromTrainer: (state, action: PayloadAction<{trainerId: number, pokemonId: number}>) => {
      const { trainerId, pokemonId } = action.payload;
      const trainer = state.list.find(t => t.id === trainerId);
      if (trainer) {
        trainer.pokemons = trainer.pokemons.filter(p => p.pokedex_id !== pokemonId);
      }
    },
    resetTrainers: (state) => {
      state.list = [];
    },
  },
});

export const { addTrainer, resetTrainers, addPokemonToTrainer, removePokemonFromTrainer } = trainerSlice.actions;

export default trainerSlice.reducer;