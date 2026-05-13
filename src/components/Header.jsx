export function Header() {
  return (
    <div>
      <h1 className="font-bold text-center text-4xl mb-8 text-red-600 flex items-center justify-center gap-2">
        Pokemon{" "}
        <span className="text-blue-400 dark:text-yellow-500">Versus</span>{" "}
        <img
          src="/favicon.svg"
          alt="Pokemon Versus"
          className="w-10 h-10 mx-2"
        />
      </h1>
      <p className="text-center text-lg text-gray-600 dark:text-gray-300">
        Choose two pokemon whose stats needs to be compared.
      </p>
    </div>
  );
}
