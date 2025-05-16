# Pokédex & Dresseurs App - Rémi LEROI B3 Dev A

![Pokémon Banner](https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png)

Une application React qui permet de consulter le Pokédex et de créer des équipes de dresseurs Pokémon.

## 📋 Fonctionnalités

- **Consultation du Pokédex** : Accès à la liste complète des Pokémon avec leurs détails
- **Gestion des dresseurs** : Créer jusqu'à 2 dresseurs
- **Constitution d'équipes** : Ajouter et retirer des Pokémon à l'équipe de chaque dresseur
- **Visualisation des détails** : Consulter les statistiques, talents, évolutions et autres informations détaillées sur chaque Pokémon
- **Interface responsive** : Expérience utilisateur optimisée sur tous les appareils

## 🖥️ Screenshots

<table>
  <tr>
    <td>
      <img src="https://cdn.discordapp.com/attachments/497784569530155039/1372481626231275570/Capture_decran_2025-05-15_a_09.51.56.png?ex=6826ee9f&is=68259d1f&hm=494f3be6bbdd7e34b0c493985b373f7888b41544c2cb78910ab3f998807cbdff&" alt="Page Dresseurs" />
      <p align="center">Page des Dresseurs</p>
    </td>
    <td>
      <img src="https://cdn.discordapp.com/attachments/497784569530155039/1372481687392620544/Capture_decran_2025-05-15_a_09.52.10.png?ex=6826eead&is=68259d2d&hm=30fa41ee15847c83c851cf22ce7110d77d117f01399f97851381d952a14444c7&" alt="Pokédex" />
      <p align="center">Pokédex</p>
    </td>
  </tr>
</table>

## 🚀 Installation

1. Clonez ce dépôt
```bash
git clone https://github.com/votre-utilisateur/pokedex-dresseurs-app.git
cd pokedex-dresseurs-app
```

2. Installez les dépendances
```bash
npm install
```

3. Lancez l'application en mode développement
```bash
npm start
```

L'application sera disponible à l'adresse [http://localhost:5173](http://localhost:5173)

## 🛠️ Technologies utilisées

- **React** - Bibliothèque pour créer l'interface utilisateur
- **TypeScript** - Pour une meilleure sécurité du typage
- **Redux Toolkit** - Gestion de l'état global
- **React Router** - Navigation entre les pages
- **Material UI** - Framework de composants UI
- **TyraDeX API** - API Pokémon française pour les données

## 📁 Structure du projet

```
src/
├── components/       # Composants réutilisables
│   ├── Button.tsx
│   ├── PokemonCard.tsx
│   ├── AssignPokemon.tsx
│   ├── TrainerForm.tsx
│   └── TrainerList.tsx
├── containers/       # Composants de pages
│   └── PokedexPage.tsx
├── features/         # Fonctionnalités Redux
│   └── trainers/
│       └── trainerSlice.ts
├── interface/        # Interfaces TypeScript
│   └── IPokemon.ts
├── services/         # Services API
│   └── pokemonService.ts
├── store/            # Configuration du store Redux
│   └── store.ts
└── App.tsx           # Point d'entrée de l'application
```

## 🔄 Flux de données

1. Les données des Pokémon sont récupérées depuis l'API TyraDeX
2. Les dresseurs et leurs équipes sont gérés via Redux
3. L'utilisateur peut naviguer entre la liste des dresseurs et le Pokédex
4. Depuis le Pokédex, l'utilisateur peut ajouter des Pokémon à l'équipe d'un dresseur

## 🧩 Fonctionnalités principales

### Gestion des dresseurs
- Création de dresseurs (maximum 2)
- Affichage de la liste des dresseurs
- Visualisation de l'équipe de chaque dresseur

### Pokédex
- Affichage de tous les Pokémon
- Filtrage par type, génération, etc.
- Consultation des détails de chaque Pokémon

### Équipes de Pokémon
- Ajout de Pokémon à l'équipe d'un dresseur
- Suppression de Pokémon de l'équipe d'un dresseur
