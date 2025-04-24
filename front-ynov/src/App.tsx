import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TrainerForm from './components/TrainerForm';
import TrainerList from './components/TrainerList';
import PokedexPage from './containers/PokedexPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-red-500 flex flex-col items-center justify-center p-8 font-pokemon">
            <h1 className="text-4xl text-white font-bold mb-8 font-pokemon drop-shadow-lg">
              Pokédex
            </h1>

            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md">
              <TrainerForm />
              <TrainerList />

              <div className="mt-4 text-center">
              <Link 
                to="/pokedex" 
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-1 px-4 rounded-full flex items-center shadow-md no-underline"
              >
                Voir le Pokédex
              </Link>
              </div>
            </div>
          </div>
        } />

        <Route path="/pokedex" element={<PokedexPage />} />
      </Routes>
    </Router>
  );
}