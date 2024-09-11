const generations = [
  { name: "All Generation", generation: "" },
  { name: "Generation I", generation: "1" },
  { name: "Generation II", generation: "2" },
  { name: "Generation III", generation: "3" },
  { name: "Generation IV", generation: "4" },
  { name: "Generation V", generation: "5" },
  { name: "Generation VI", generation: "6" },
  { name: "Generation VII", generation: "7" },
  { name: "Generation VIII", generation: "8" },
];

function SelectGeneration({
  onGenerationChange,
}: {
  onGenerationChange: (gen: string) => void;
}) {
  const handleGenerationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedGen = event.target.value;
    onGenerationChange(selectedGen);
  };

  return (
    <div>
      <select
        className="rounded-lg text-center font-medium w-44"
        onChange={handleGenerationChange}
      >
        <option value="">Select a Generation</option>
        {generations.map((gen) => (
          <option key={gen.generation} value={gen.generation}>
            {gen.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectGeneration;
