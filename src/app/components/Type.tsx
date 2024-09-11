const typeColors = {
  fire: "bg-red-500",
  grass: "bg-green-500",
  electric: "bg-yellow-500",
  water: "bg-blue-500",
  ground: "bg-stone-500",
  rock: "bg-gray-400",
  fairy: "bg-pink-500",
  poison: "bg-purple-500",
  bug: "bg-lime-500",
  dragon: "bg-indigo-500",
  psychic: "bg-pink-300",
  flying: "bg-sky-500",
  fighting: "bg-orange-200",
  normal: "bg-white",
  ghost: "bg-purple-500",
  ice: "bg-sky-500",
  dark: "bg-violet-400",
  steel: "bg-gray-300",
};

interface TypeProps {
  typeName: keyof typeof typeColors;
}
function Type({ typeName }: TypeProps) {
  const bgColor = typeColors[typeName] || "bg-gray-500";
  return (
    <div className="flex justify-center p-[0.1rem] ">
      <p
        className={`inline-block rounded-full px-[0.35rem]  font-bold text-[10px] ${bgColor}`}
      >
        {typeName}
      </p>
    </div>
  );
}

export default Type;
