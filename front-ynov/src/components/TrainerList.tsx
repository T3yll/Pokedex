import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Avatar, 
  Paper, 
  Box, 
  Collapse, 
  IconButton,
  Chip
} from '@mui/material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { removePokemonFromTrainer } from '../features/trainers/trainerSlice';

export default function TrainerList() {
  const trainers = useSelector((state: RootState) => state.trainers.list);
  const dispatch = useDispatch();
  const [expandedTrainer, setExpandedTrainer] = useState<number | null>(null);

  const handleExpandClick = (trainerId: number) => {
    setExpandedTrainer(expandedTrainer === trainerId ? null : trainerId);
  };

  const handleRemovePokemon = (trainerId: number, pokemonId: number) => {
    dispatch(removePokemonFromTrainer({ trainerId, pokemonId }));
  };

  return (
    <Paper
      elevation={6}
      sx={{
        backgroundColor: '#ef5350',
        padding: 3,
        borderRadius: 2,
        maxWidth: 400,
        margin: '30px auto',
      }}
    >
      <Typography variant="h5" fontWeight="bold" color="white" textAlign="center" mb={2}>
        <CatchingPokemonIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
        Dresseurs Pokémon
      </Typography>

      <List>
        {trainers.map((trainer) => (
          <Box key={trainer.id} sx={{ mb: 2 }}>
            <ListItem
              sx={{
                backgroundColor: 'var(--color-red-600)',
                borderRadius: 1,
                padding: 2,
                '&:hover': {
                  backgroundColor: '#e57373',
                },
              }}
              secondaryAction={
                <>
                  <Chip 
                    label={`${trainer.pokemons.length} Pokémon(s)`} 
                    size="small" 
                    sx={{ mr: 1, bgcolor: 'white', color: '#ef5350' }} 
                  />
                  <IconButton 
                    onClick={() => handleExpandClick(trainer.id)}
                    sx={{
                      transform: expandedTrainer === trainer.id ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s',
                      color: 'white'
                    }}
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </>
              }
            >
              <Avatar sx={{ bgcolor: 'white', color: '#ef5350', mr: 2 }}>
                <CatchingPokemonIcon />
              </Avatar>
              <ListItemText
                primary={trainer.name}
                primaryTypographyProps={{
                  sx: { color: 'white', fontWeight: 'bold', fontSize: '1.2rem' },
                }}
              />
            </ListItem>
            
            <Collapse in={expandedTrainer === trainer.id} timeout="auto" unmountOnExit>
              <Paper sx={{ p: 2, mt: 1, bgcolor: '#f8f8f8' }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                  Équipe de {trainer.name}:
                </Typography>
                
                {trainer.pokemons.length === 0 ? (
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    Aucun Pokémon dans l'équipe
                  </Typography>
                ) : (
                  <List dense>
                    {trainer.pokemons.map((pokemon) => (
                      <ListItem 
                        key={pokemon.pokedex_id}
                        sx={{ 
                          border: '1px solid #ddd', 
                          borderRadius: 1, 
                          mb: 1,
                          '&:hover': { bgcolor: '#f5f5f5' }
                        }}
                        secondaryAction={
                          <IconButton 
                            edge="end" 
                            aria-label="supprimer" 
                            size="small"
                            onClick={() => handleRemovePokemon(trainer.id, pokemon.pokedex_id)}
                          >
                            <DeleteIcon fontSize="small" color="error" />
                          </IconButton>
                        }
                      >
                        <Avatar 
                          src={pokemon.sprites.regular} 
                          alt={pokemon.name.fr}
                          sx={{ mr: 2, width: 30, height: 30 }}
                        />
                        <ListItemText 
                          primary={pokemon.name.fr} 
                          secondary={`#${pokemon.pokedex_id}`}
                          primaryTypographyProps={{ fontWeight: 'medium' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Paper>
            </Collapse>
          </Box>
        ))}
      </List>
    </Paper>
  );
}