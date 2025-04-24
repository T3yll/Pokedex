import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Trainer {
  id: number;
  name: string;
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
    addTrainer: (state, action: PayloadAction<Trainer>) => {
      if (state.list.length < 2) {
        state.list.push(action.payload);
      }
    },
    resetTrainers: (state) => {
      state.list = [];
    },
  },
});

export const { addTrainer, resetTrainers } = trainerSlice.actions;

export default trainerSlice.reducer;
