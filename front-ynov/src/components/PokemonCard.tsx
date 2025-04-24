import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  CardMedia, 
  Chip, 
  Box, 
  Grid, 
  Divider, 
  LinearProgress,
  IconButton,
  Collapse
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import { Pokemon } from '../interface/IPokemon';

// Interface pour les props du composant
interface PokemonCardProps {
  pokemon: Pokemon;
}

// Map des couleurs pour les types
const typeColors: Record<string, string> = {
  Normal: '#A8A77A',
  Feu: '#EE8130',
  Eau: '#6390F0',
  Plante: '#7AC74C',
  Électrik: '#F7D02C',
  Glace: '#96D9D6',
  Combat: '#C22E28',
  Poison: '#A33EA1',
  Sol: '#E2BF65',
  Vol: '#A98FF3',
  Psy: '#F95587',
  Insecte: '#A6B91A',
  Roche: '#B6A136',
  Spectre: '#735797',
  Dragon: '#6F35FC',
  Ténèbres: '#705746',
  Acier: '#B7B7CE',
  Fée: '#D685AD'
};

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [favorite, setFavorite] = useState(false);

  // Fonction pour déterminer la couleur de fond basée sur le type principal
  const getTypeColor = (typeName: string): string => {
    return typeColors[typeName] || '#777777';
  };

  // Définir la couleur principale basée sur le premier type
  const mainColor = pokemon.types && pokemon.types.length > 0 
    ? getTypeColor(pokemon.types[0].name) 
    : '#f44336';

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFavoriteClick = () => {
    setFavorite(!favorite);
  };

  // Calculer la valeur totale des stats
  const totalStats = pokemon.stats ? 
    Object.values(pokemon.stats).reduce((a, b) => a + b, 0) : 0;

  // Mapping des noms de statistiques pour l'affichage
  const statNames: Record<string, string> = {
    hp: "PV",
    atk: "Attaque",
    def: "Défense",
    spe_atk: "Att. Spé.",
    spe_def: "Déf. Spé.",
    vit: "Vitesse"
  };

  return (
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
      {/* En-tête de la carte avec le nom et l'ID */}
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

      {/* Image du Pokémon */}
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

      {/* Information sur le Pokémon */}
      <CardContent sx={{ bgcolor: '#f5f5f5' }}>
        {/* Catégorie */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {pokemon.category}
        </Typography>

        {/* Types */}
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

        {/* Infos de base */}
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

        {/* Boutons d'action */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <IconButton 
            onClick={handleFavoriteClick}
            color={favorite ? 'error' : 'default'}
            aria-label="ajouter aux favoris"
          >
            <FavoriteIcon />
          </IconButton>
          
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

      {/* Section extensible */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ bgcolor: '#f5f5f5' }}>
          <Divider sx={{ mb: 2 }}>
            <Chip label="Statistiques" />
          </Divider>
          
          {/* Stats */}
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

          {/* Talents */}
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

          {/* Évolution */}
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

          {/* Groupes d'œufs si disponible */}
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

          {/* Taux de capture si disponible */}
          {pokemon.catch_rate !== undefined && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              <strong>Taux de capture :</strong> {pokemon.catch_rate}
            </Typography>
          )}

          {/* Ratio mâle/femelle si disponible */}
          {pokemon.sexe && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              <strong>Ratio :</strong> {pokemon.sexe.male}% ♂ / {pokemon.sexe.female}% ♀
            </Typography>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default PokemonCard;