import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addTrainer } from '../features/trainers/trainerSlice';
import { RootState } from '../store/store';
import { Box, TextField, Typography, Alert } from '@mui/material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import Button from './Button';

export default function TrainerForm() {
  const dispatch = useDispatch();
  const trainers = useSelector((state: RootState) => state.trainers.list);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Le nom ne peut pas être vide.");
      return;
    }
    if (trainers.length >= 2) {
      setError("Maximum 2 dresseurs !");
      return;
    }

    dispatch(addTrainer({ id: Date.now(), name }));
    setName('');
    setError('');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        backgroundColor: '#ef5350',
        padding: 3,
        borderRadius: 2,
        boxShadow: 5,
        maxWidth: 400,
        margin: 'auto',
      }}
    >
      <Typography variant="h5" fontWeight="bold" color="white" textAlign="center">
        <CatchingPokemonIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
        Enregistrer un Dresseur
      </Typography>

      <TextField
        label="Nom du dresseur"
        variant="filled"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={!!error}
        helperText={error}
        sx={{
          backgroundColor: 'white',
          borderRadius: 1,
        }}
      />

      <Button
        type="submit"
        disabled={trainers.length >= 2}
      >
        Ajouter le Dresseur
      </Button>

      {trainers.length >= 2 && (
        <Alert severity="info">Tu ne peux ajouter que deux dresseurs maximum !</Alert>
      )}
    </Box>
  );
}
