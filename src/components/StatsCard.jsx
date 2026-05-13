import { useEffect, useState } from "react";

export function StatsCard({ p1, p2 }) {
  if (!p1 || !p2) return null;

  const statsList = [
    "hp",
    "attack",
    "defense",
    "special-attack",
    "special-defense",
    "speed",
  ];

  const getStats = (poke) => {
    const stats = {};
    poke.stats.forEach((s) => {
      stats[s.stat.name] = s.base_stat;
    });
    return stats;
  };

  const s1 = getStats(p1);
  const s2 = getStats(p2);

  const compare = (stat) => {
    if (s1[stat] > s2[stat]) return "p1";
    if (s1[stat] < s2[stat]) return "p2";
    return "equal";
  };

  return (
    <div className="mt-6 p-6 bg-green-200 dark:bg-gray-800 rounded-lg">
      <h2 className="text-center text-xl font-bold mb-6">Stats Comparison</h2>

      {statsList.map((stat) => {
        const winner = compare(stat);
        const left = s1[stat];
        const right = s2[stat];
        const max = Math.max(left, right);
        const leftWidth = (left / max) * 100;
        const rightWidth = (right / max) * 100;

        return (
          <div key={stat} className="mb-5">
            <div className="text-sm text-gray-300 mb-1 uppercase ">
              {stat.replace("-", " ")}
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 bg-red-500/30 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-red-500 h-3"
                  style={{ width: `${leftWidth}%` }}
                />
              </div>

              <div className="w-16 text-center">
                {left}
                {winner === "p1" && (
                  <span className="text-green-400 ml-1">↑</span>
                )}
                {winner === "p2" && (
                  <span className="text-red-400 ml-1">↓</span>
                )}
              </div>
              <div className="text-gray-400 font-bold">VS</div>

              <div className="w-16 text-center">
                {right}
                {winner === "p2" && (
                  <span className="text-green-400 ml-1">↑</span>
                )}
                {winner === "p1" && (
                  <span className="text-red-400 ml-1">↓</span>
                )}
              </div>
              <div className="flex-1 bg-blue-500/30 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-blue-500 h-3 ml-auto"
                  style={{ width: `${rightWidth}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
