import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Box, Typography, List, ListItem, ListItemText, Avatar, Paper } from '@mui/material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';

export default function TrainerList() {
  const trainers = useSelector((state: RootState) => state.trainers.list);

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
        {trainers.map((t) => (
          <ListItem
            key={t.id}
            sx={{
              backgroundColor: 'var(--color-red-600)',
              marginBottom: 1,
              borderRadius: 1,
              padding: 2,
              '&:hover': {
                backgroundColor: '#e57373',
              },
            }}
            secondaryAction={
              <Avatar sx={{ bgcolor: 'white', color: '#ef5350' }}>
                <CatchingPokemonIcon />
              </Avatar>
            }
          >
            <ListItemText
              primary={t.name}
              primaryTypographyProps={{
                sx: { color: 'white', fontWeight: 'bold', fontSize: '1.2rem' },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
