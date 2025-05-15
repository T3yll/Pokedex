import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar, 
  Typography,
  Button
} from '@mui/material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { addPokemonToTrainer } from '../features/trainers/trainerSlice';
import { RootState } from '../store/store';
import { Pokemon } from '../interface/IPokemon';

interface AssignPokemonDialogProps {
  open: boolean;
  onClose: () => void;
  pokemon: Pokemon;
}

const AssignPokemonDialog = ({ open, onClose, pokemon }: AssignPokemonDialogProps) => {
  const dispatch = useDispatch();
  const trainers = useSelector((state: RootState) => state.trainers.list);
  const [success, setSuccess] = useState<string | null>(null);

  const handleAssign = (trainerId: number) => {
    dispatch(addPokemonToTrainer({ trainerId, pokemon }));
    setSuccess(`${pokemon.name.fr} a été ajouté à l'équipe du dresseur !`);
    
    setTimeout(() => {
      setSuccess(null);
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ bgcolor: '#ef5350', color: 'white' }}>
        Ajouter {pokemon.name.fr} à un dresseur
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        {success ? (
          <Typography color="success.main" textAlign="center" my={2}>
            {success}
          </Typography>
        ) : trainers.length === 0 ? (
          <Typography variant="body1" textAlign="center" my={2}>
            Aucun dresseur n'est enregistré. Veuillez en créer un d'abord !
          </Typography>
        ) : (
          <>
            <Typography variant="body2" mb={2}>
              Choisissez un dresseur pour ajouter {pokemon.name.fr} à son équipe :
            </Typography>
            <List>
              {trainers.map((trainer) => (
                <ListItem 
                  key={trainer.id}
                  component="button"
                  onClick={() => handleAssign(trainer.id)}
                  sx={{
                    border: '1px solid #ddd',
                    borderRadius: 1,
                    mb: 1,
                    textAlign: 'left',
                    '&:hover': {
                      bgcolor: '#f5f5f5'
                    }
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#ef5350' }}>
                      <CatchingPokemonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={trainer.name} 
                    secondary={`${trainer.pokemons.length} Pokémon(s)`}
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}
        
        <Button 
          variant="contained" 
          color="inherit" 
          onClick={onClose}
          fullWidth
          sx={{ mt: 2, bgcolor: '#ddd' }}
        >
          Fermer
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AssignPokemonDialog;