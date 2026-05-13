import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { DarkMode } from "./components/DarkMode";
import { PokemonSearch } from "./components/PokemonSearch";
import { PokemonCard } from "./components/PokemonCard";
import { StatsCard } from "./components/StatsCard";
import { TypeComparison } from "./components/TypeComparison";

function App() {
  const [pokemon1, setPokemon1] = useState("");
  const [pokemon2, setPokemon2] = useState("");
  const [poke1Data, setPoke1Data] = useState(null);
  const [poke2Data, setPoke2Data] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        if (!pokemon1) return;
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon1}`,
        );
        const data = await res.json();
        setPoke1Data(data);
      } catch (err) {
        setPoke1Data(null);
      }
    };
    fetchPokemon();
  }, [pokemon1]);

  // fetch pokemon 2
  useEffect(() => {
    const fetchPokemon = async () => {
      if (!pokemon2) return;

      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon2}`);

      if (res.ok) {
        const data = await res.json();
        setPoke2Data(data);
      } else {
        setPoke2Data(null);
      }
    };

    fetchPokemon();
  }, [pokemon2]);

  return (
    <div className="min-h-screen bg-yellow-100 text-black dark:bg-slate-900 dark:text-white p-6">
      <Header />

      <div className="flex justify-end mt-4">
        <DarkMode />
      </div>

      <div className="mx-20 mt-6 space-y-6">
        <div className="grid grid-cols-3 items-center gap-4 bg-green-200 dark:bg-gray-800 p-5 rounded-lg">
          <PokemonSearch setPokemon={setPokemon1} label="pokemon1" />

          <span className="text-center text-4xl font-bold">
            <span className="text-red-600">V</span>
            <span className="text-blue-600">S</span>
          </span>

          <PokemonSearch setPokemon={setPokemon2} label="pokemon2" />
        </div>

        <div className="grid grid-cols-2 gap-4 bg-green-200 dark:bg-gray-800 p-5 rounded-lg">
          <PokemonCard data={poke1Data} />
          <PokemonCard data={poke2Data} />
        </div>
        {poke1Data && poke2Data && (
          <TypeComparison p1={poke1Data} p2={poke2Data} />
        )}
        {poke1Data && poke2Data && <StatsCard p1={poke1Data} p2={poke2Data} />}
      </div>
    </div>
  );
}

export default App;
