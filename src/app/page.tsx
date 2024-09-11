import { getPokemon } from "./actions/getPokemon";
import LoadingPokemon from "./components/LoadingPokemon";

const Page = async () => {
  const pokemon = await getPokemon({ query: "" });

  return (
    <div className=" max-w-[1400px] w-95% items-center mx-auto">
      <LoadingPokemon intialPokemon={pokemon} />
    </div>
  );
};
export default Page;
