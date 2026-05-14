import { useState, useEffect } from "react";

export function TypeComparison({ p1, p2 }) {
  if (!p1 || !p2) return null;
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
  const backcolor = (p, i) => {
    return color[p?.types?.[i]?.type?.name] || "bg-gray-500 text-white";
  };
  const [typeData, setTypeData] = useState({});

  const types1 = p1.types.map((t) => t.type.name);
  const types2 = p2.types.map((t) => t.type.name);
  const allTypes = [...new Set([...types1, ...types2])];

  useEffect(() => {
    (async () => {
      const data = {};
      for (const type of allTypes) {
        const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        data[type] = await res.json();
      }
      setTypeData(data);
    })();
  }, [allTypes.join(",")]);

  const getMultiplier = (attackTypeData, defenderTypes) => {
    if (!attackTypeData || !attackTypeData.damage_relations) return 1;
    let multiplier = 1;
    defenderTypes.forEach((defType) => {
      const relations = attackTypeData.damage_relations;
      if (relations.double_damage_to.some((t) => t.name === defType)) {
        multiplier *= 2;
      }
      if (relations.half_damage_to.some((t) => t.name === defType)) {
        multiplier *= 0.5;
      }
      if (relations.no_damage_to.some((t) => t.name === defType)) {
        multiplier *= 0;
      }
    });
    return multiplier;
  };

  if (allTypes.some((type) => !typeData[type]))
    return <div>Loading type data...</div>;

  const renderArrows = (multiplier) => {
    if (multiplier === 0) return "❌";
    if (multiplier < 1) return "⬇️";
    if (multiplier === 2) return "⬆️";
    if (multiplier === 4) return "⬆️⬆️";
  };

  return (
    <div className="mt-6 p-6 bg-green-200 dark:bg-gray-800 rounded-lg">
      <h2 className="text-center text-xl font-bold mb-6">Type Comparison</h2>
      <div className="flex justify-center items-center gap-4 text-lg flex-wrap">
        <div className="flex items-center gap-3 justify-center flex-wrap">
          <div className="flex items-center gap-3">
            {types1.map((type, i) => (
              <span key={type}>
                {i > 0}
                <span
                  className={`px-5 py-2 rounded-4xl font-bold border-2 border-black capitalize ${backcolor(p1, i)}`}
                >
                  {type}
                </span>
                {renderArrows(getMultiplier(typeData[type], types2))}
              </span>
            ))}
          </div>
          <div className="text-gray-400 font-bold">VS</div>
          <div className="flex items-center gap-3">
            {types2.map((type, i) => (
              <span key={type}>
                {i > 0}
                <span
                  className={`px-5 py-2 rounded-4xl font-bold border-2 border-black capitalize ${backcolor(p2, i)}`}
                >
                  {type}
                </span>
                {renderArrows(getMultiplier(typeData[type], types1))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
