import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  CardMedia, 
  Chip, 
  Box,
  Divider, 
  LinearProgress,
  IconButton,
  Collapse,
  Tooltip
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Pokemon } from '../interface/IPokemon';
import AssignPokemonDialog from './AssignPokemon';
import Grid from '@mui/material/Grid';

interface PokemonCardProps {
  pokemon: Pokemon;
}

const typeColors: Record<string, string> = {
  Normal: '#9EA19F',
  Feu: '#E52829',
  Eau: '#2880EE',
  Plante: '#3FA129',
  Électrik: '#FABF00',
  Glace: '#3ED8FF',
  Combat: '#FF8001',
  Poison: '#8F40CB',
  Sol: '#905120',
  Vol: '#81B8EF',
  Psy: '#EF4178',
  Insecte: '#91A119',
  Roche: '#AFA980',
  Spectre: '#70416F',
  Dragon: '#4F61E1',
  Ténèbres: '#50413E',
  Acier: '#60A0B7',
  Fée: '#EF71EF'
};

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);

  const getTypeColor = (typeName: string): string => {
    return typeColors[typeName] || '#777777';
  };

  const mainColor = pokemon.types && pokemon.types.length > 0 
    ? getTypeColor(pokemon.types[0].name) 
    : '#f44336';

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFavoriteClick = () => {
    setFavorite(!favorite);
  };
  
  const handleAssignClick = () => {
    setAssignDialogOpen(true);
  };

  const totalStats = pokemon.stats ? 
    Object.values(pokemon.stats).reduce((a, b) => a + b, 0) : 0;

  const statNames: Record<string, string> = {
    hp: "PV",
    atk: "Attaque",
    def: "Défense",
    spe_atk: "Att. Spé.",
    spe_def: "Déf. Spé.",
    vit: "Vitesse"
  };

  return (
    <>
      <Card 
        sx={{ 
          maxWidth: 345, 
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: 3,
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: 6
          }
        }}
      >
        <Box 
          sx={{ 
            bgcolor: mainColor, 
            color: 'white', 
            p: 2, 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            {pokemon.name.fr}
          </Typography>
          <Typography 
            sx={{ 
              bgcolor: 'rgba(255,255,255,0.2)', 
              px: 1, 
              borderRadius: 1,
              fontWeight: 'bold'
            }}
          >
            #{pokemon.pokedex_id.toString().padStart(3, '0')}
          </Typography>
        </Box>

        <CardMedia
          component="img"
          height="200"
          image={pokemon.sprites.regular}
          alt={pokemon.name.fr}
          sx={{ 
            backgroundColor: 'white',
            p: 2,
            objectFit: 'contain'
          }}
        />

        <CardContent sx={{ bgcolor: '#f5f5f5' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {pokemon.category}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            {pokemon.types && pokemon.types.map((type) => (
              <Chip
                key={type.name}
                label={type.name}
                avatar={
                  <Box 
                    component="img" 
                    src={type.image} 
                    alt={type.name} 
                    sx={{ width: 20, height: 20 }} 
                  />
                }
                sx={{ 
                  bgcolor: getTypeColor(type.name), 
                  color: 'white',
                  fontWeight: 'bold'
                }}
              />
            ))}
          </Box>

          <Grid container spacing={1} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Taille: {pokemon.height}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Poids: {pokemon.weight}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Génération: {pokemon.generation}
              </Typography>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <IconButton 
              onClick={handleFavoriteClick}
              color={favorite ? 'error' : 'default'}
              aria-label="ajouter aux favoris"
            >
              <FavoriteIcon />
            </IconButton>
            
            <Tooltip title="Ajouter à un dresseur">
              <IconButton
                onClick={handleAssignClick}
                aria-label="ajouter à un dresseur"
                color="success"
              >
                <AddCircleIcon />
              </IconButton>
            </Tooltip>
            
            <IconButton
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="voir plus"
              sx={{
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s'
              }}
            >
              <ExpandMoreIcon />
            </IconButton>
            
            <IconButton aria-label="informations">
              <InfoIcon />
            </IconButton>
          </Box>
        </CardContent>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent sx={{ bgcolor: '#f5f5f5' }}>
            <Divider sx={{ mb: 2 }}>
              <Chip label="Statistiques" />
            </Divider>
            
            {pokemon.stats && Object.entries(pokemon.stats).map(([stat, value]) => (
              <Box key={stat} sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">{statNames[stat] || stat}</Typography>
                  <Typography variant="body2" fontWeight="bold">{value}</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={(value / 255) * 100} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 5,
                    bgcolor: 'rgba(0,0,0,0.1)',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: value > 100 ? '#4caf50' : value > 70 ? '#ff9800' : '#f44336'
                    }
                  }}
                />
              </Box>
            ))}
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="body2">Total</Typography>
              <Typography variant="body2" fontWeight="bold">{totalStats}</Typography>
            </Box>

            <Divider sx={{ my: 2 }}>
              <Chip label="Talents" />
            </Divider>
            
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {pokemon.talents && pokemon.talents.map((talent) => (
                <Chip
                  key={talent.name}
                  label={talent.name}
                  size="small"
                  sx={{ 
                    bgcolor: talent.tc ? '#ff9800' : '#2196f3',
                    color: 'white'
                  }}
                />
              ))}
            </Box>

            {pokemon.evolution && (pokemon.evolution.pre || pokemon.evolution.next || pokemon.evolution.mega) && (
              <>
                <Divider sx={{ my: 2 }}>
                  <Chip label="Évolution" />
                </Divider>
                
                {pokemon.evolution.pre && (
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Pré-évolution :</strong> {pokemon.evolution.pre.map(p => 
                      `${p.name}${p.condition ? ` (${p.condition})` : ''}`
                    ).join(', ')}
                  </Typography>
                )}
                
                {pokemon.evolution.next && pokemon.evolution.next.length > 0 && (
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Évolution :</strong> {pokemon.evolution.next.map(n => 
                      `${n.name}${n.condition ? ` (${n.condition})` : ''}`
                    ).join(', ')}
                  </Typography>
                )}

                {pokemon.evolution.mega && pokemon.evolution.mega.length > 0 && (
                  <Typography variant="body2">
                    <strong>Méga-évolution :</strong> {pokemon.evolution.mega.map(m => m.name).join(', ')}
                  </Typography>
                )}
              </>
            )}

            {pokemon.egg_groups && pokemon.egg_groups.length > 0 && (
              <>
                <Divider sx={{ my: 2 }}>
                  <Chip label="Reproduction" />
                </Divider>
                <Typography variant="body2">
                  <strong>Groupes d'œufs :</strong> {pokemon.egg_groups.join(', ')}
                </Typography>
              </>
            )}

            {pokemon.catch_rate !== undefined && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                <strong>Taux de capture :</strong> {pokemon.catch_rate}
              </Typography>
            )}

            {pokemon.sexe && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                <strong>Ratio :</strong> {pokemon.sexe.male}% ♂ / {pokemon.sexe.female}% ♀
              </Typography>
            )}
          </CardContent>
        </Collapse>
      </Card>
      
      <AssignPokemonDialog 
        open={assignDialogOpen}
        onClose={() => setAssignDialogOpen(false)}
        pokemon={pokemon}
      />
    </>
  );
};

export default PokemonCard;