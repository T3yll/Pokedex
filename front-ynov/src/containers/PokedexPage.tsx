import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pokemon } from '../interface/IPokemon';
import { fetchPokemons } from '../services/pokemonService';
import PokemonCard from '../components/PokemonCard';

export default function PokedexPage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pokemonsPerPage = 12;

  const pokemonTypes = [
    'Normal', 'Feu', 'Eau', 'Plante', 'Électrik', 'Glace', 
    'Combat', 'Poison', 'Sol', 'Vol', 'Psy', 'Insecte', 
    'Roche', 'Spectre', 'Dragon', 'Ténèbres', 'Acier', 'Fée'
  ];

  useEffect(() => {
    const getPokemons = async () => {
      try {
        const data = await fetchPokemons();
        console.log("Pokemons fetched successfully:", data);
        const filteredData = data
          .filter(poke => poke.pokedex_id !== 0)
          .sort((a, b) => a.pokedex_id - b.pokedex_id);
        
        setPokemons(filteredData);
        setFilteredPokemons(filteredData);
      } catch (error) {
        console.error("Failed to fetch pokemons", error);
        setError("Erreur lors de la récupération des pokémons");
      } finally {
        setLoading(false);
      }
    };

    getPokemons();
  }, []);

  useEffect(() => {
    let result = pokemons;
    
    if (searchTerm) {
      result = result.filter(pokemon => 
        pokemon.name.fr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pokemon.pokedex_id.toString().includes(searchTerm)
      );
    }
    
    if (typeFilter !== 'all') {
      result = result.filter(pokemon => 
        pokemon.types && pokemon.types.some(type => type.name === typeFilter)
      );
    }
    
    setFilteredPokemons(result);
    setCurrentPage(1);
  }, [searchTerm, typeFilter, pokemons]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
  const totalPages = Math.ceil(filteredPokemons.length / pokemonsPerPage);

  const pageNumbers = [];
  const maxPageButtons = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
  
  if (endPage - startPage + 1 < maxPageButtons) {
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-red-500 flex flex-col items-center justify-center p-8 font-pokemon">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
        <p className="text-white mt-4 font-bold">Chargement du Pokédex...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-red-500 flex flex-col items-center justify-center p-8 font-pokemon">
        <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl">
          <div className="bg-red-100 border-l-4 border-red-600 p-4 mb-4">
            <p className="text-red-600 font-bold">{error}</p>
            <p className="text-gray-700">Veuillez rafraîchir la page ou réessayer plus tard.</p>
          </div>
          <div className="text-center mt-4">
            <Link to="/" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-red-500 py-8 font-pokemon">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <Link 
            to="/" 
            className="bg-yellow-400 hover:bg-yellow-500 text-red-600 font-bold py-1 px-4 rounded-full flex items-center shadow-md"
          >
            &larr; Retour
          </Link>
          <h1 className="text-3xl md:text-4xl text-white font-bold drop-shadow-lg text-center">
            Pokédex National
          </h1>
          <div className="w-20"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Rechercher par nom ou numéro"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
              >
                <option value="all">Tous les types</option>
                {pokemonTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-3 mb-6">
            <p className="text-gray-700">
              <span className="font-bold text-red-600">{filteredPokemons.length}</span> Pokémon{filteredPokemons.length > 1 ? 's' : ''} trouvé{filteredPokemons.length > 1 ? 's' : ''}
            </p>
          </div>

          {filteredPokemons.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                {currentPokemons.map((pokemon) => (
                    <div key={pokemon.pokedex_id} className="transform hover:scale-105 transition-transform duration-200">
                    <PokemonCard pokemon={pokemon} />
                    </div>
                ))}
                </div>
              
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <nav className="inline-flex rounded-md shadow-sm">
                    <button 
                      onClick={() => handlePageChange(1)}
                      disabled={currentPage === 1}
                      className={`px-3 py-2 rounded-l-md border border-gray-300 ${
                        currentPage === 1 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      &laquo;
                    </button>
                    
                    <button 
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-3 py-2 border-t border-b border-gray-300 ${
                        currentPage === 1 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      &lsaquo;
                    </button>
                    
                    {pageNumbers.map(number => (
                      <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={`px-3 py-2 border-t border-b border-gray-300 ${
                          currentPage === number
                            ? 'bg-red-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {number}
                      </button>
                    ))}
                    
                    <button 
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-2 border-t border-b border-gray-300 ${
                        currentPage === totalPages 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      &rsaquo;
                    </button>
                    
                    <button 
                      onClick={() => handlePageChange(totalPages)}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-2 rounded-r-md border border-gray-300 ${
                        currentPage === totalPages 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      &raquo;
                    </button>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 text-center">
              <p className="font-bold text-yellow-700">Aucun Pokémon ne correspond à votre recherche</p>
              <p className="text-gray-600 mt-2">Essayez de modifier vos critères de recherche</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}