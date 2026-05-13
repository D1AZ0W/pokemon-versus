export function PokemonCard({ data }) {
  const color = {
    fire: "bg-[oklch(0.55_0.18_40)] text-white",
    water: "bg-[oklch(0.5_0.18_240)] text-white",
    grass: "bg-[oklch(0.55_0.18_145)] text-white",
    electric: "bg-[oklch(0.78_0.18_95)] text-black",
    psychic: "bg-[oklch(0.6_0.2_350)] text-white",
    flying: "bg-[oklch(0.6_0.14_275)] text-white",
    bug: "bg-[oklch(0.6_0.16_130)] text-white",
    normal: "bg-[oklch(0.55_0.04_90)] text-white",
    poison: "bg-[oklch(0.5_0.16_320)] text-white",
    ground: "bg-[oklch(0.6_0.13_70)] text-white",
    rock: "bg-[oklch(0.5_0.08_70)] text-white",
    fighting: "bg-[oklch(0.5_0.18_25)] text-white",
    ghost: "bg-[oklch(0.4_0.14_300)] text-white",
    ice: "bg-[oklch(0.78_0.1_210)] text-black",
    dragon: "bg-[oklch(0.5_0.2_265)] text-white",
    dark: "bg-[oklch(0.3_0.04_280)] text-white",
    steel: "bg-[oklch(0.65_0.04_240)] text-white",
    fairy: "bg-[oklch(0.78_0.12_350)] text-black",
  };

  if (!data) {
    return (
      <div className="p-5 rounded-lg shadow-lg bg-gray-200 dark:bg-gray-700 mt-5">
        <p className="text-center text-gray-500">No Pokemon Selected</p>
      </div>
    );
  }

  const backcolor = color[data?.types?.[0]?.type?.name];

  return (
    <div className={`p-5 rounded-lg shadow-lg ${backcolor} mt-5`}>
      <div className="text-center">
        <h2 className="text-3xl font-semibold mb-2 capitalize">{data.name}</h2>

        <img
          src={data.sprites.front_default}
          alt={data.name}
          className="mx-auto mb-2 w-32 h-32"
        />

        <div className="grid grid-cols-2 gap-6 text-black border-2 border-gray-700 p-4 ">
          <div>
            <p className="font-semibold">Height</p>
            <p>{data.height}</p>
          </div>

          <div>
            <p className="font-semibold">Weight</p>
            <p>{data.weight}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
