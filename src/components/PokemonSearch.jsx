import { useState } from "react";

export function PokemonSearch({ setPokemon, label }) {
  const [query, setQuery] = useState("");

  const handleClick = () => {
    const trimmedQuery = query.trim().toLowerCase();
    if (!trimmedQuery) return;
    setPokemon(trimmedQuery);
  };

  const handleClear = () => {
    setQuery("");
    setPokemon("");
  };

  return (
    <div className="col-span-2 md:col-span-1">
      <label className="block mb-2 font-bold">
        {label === "pokemon1" ? "Pokemon 1" : "Pokemon 2"}
      </label>
      <input
        type="text"
        placeholder="Enter Pokemon Name"
        className="p-2 rounded bg-slate-200 text-gray-700 dark:bg-slate-700 dark:text-white w-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="flex gap-3">
        <button
          className="p-3 rounded-full hover:scale-110 shadow-lg bg-green-500 text-black mt-5 transition-all duration-300"
          onClick={handleClick}
        >
          🔍
        </button>
        <button
          className="p-3 rounded-full hover:scale-110 shadow-lg bg-red-500 text-black mt-5 transition-all duration-300"
          onClick={handleClear}
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
