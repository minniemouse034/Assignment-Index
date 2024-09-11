import { useEffect, useState } from "react";
import { useAnimation, motion } from "framer-motion";
import axios from "axios";
import Image from "next/image";
import Type from "./Type";

export interface Pokemon {
  url: string;
  name: string;
}

interface Ability {
  ability: {
    name: string;
  };
}

interface PokemonData {
  height: number;
  weight: number;
  abilities: Ability[];
  types: {
    type: { name: string };
  }[];
}

interface Props {
  pokemon: Pokemon;
}

function PokemonCard({ pokemon: pokemon }: Props) {
  const [data, setData] = useState<PokemonData | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(pokemon.url);
        if (response.status !== 200 && response.status === 500) {
          throw new Error("Server have problem. Please try again later");
        } else if (response.status !== 200 && response.status === 404) {
          throw new Error("Pokemon not found. Please try again");
        }

        const fetchedData: PokemonData = await response.data;
        setData(fetchedData);
      } catch (error) {
        console.log(error);
        return null;
      }
    };

    fetchPokemonData();
  }, [pokemon.url]);

  const getPokemonNumberFromUrl = (url: string): string | null => {
    const urlMatch = url.match(/\/(\d+)\/$/);
    return urlMatch ? urlMatch[1] : null;
  };

  const pokemonNumber = getPokemonNumberFromUrl(pokemon.url);

  const formatMeasure = (value: number, unit: string) => {
    return `${value} ${unit}`;
  };

  return (
    <div className="flex items-center justify-center flex-col relative">
      <motion.div
        className="cursor-pointer"
        animate={controls}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="bg-gray-500 flex items-center rounded-md w-20 h-48 shadow-xl"
          initial={{ rotateY: 0 }}
          variants={{ hover: { rotateY: 0 } }}
        >
          {!isFlipped ? (
            <div className="">
              <p className=" text-center text-white  bottom-2 relative font-bold text-[10px] ">
                {pokemonNumber}
              </p>
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonNumber}.png`}
                width={200}
                height={200}
                alt="pokemon image"
                className="z-[9999] "
              />
              <p className="font-bold text-[10px]  text-center pt-1 rounded-md uppercase text-white">
                {pokemon.name}
              </p>
              <div>
                {data?.types.map((type, index) => (
                  <Type
                    key={index}
                    typeName={
                      type.type.name as
                        | "normal"
                        | "fire"
                        | "water"
                        | "electric"
                        | "grass"
                        | "ice"
                        | "fighting"
                        | "poison"
                        | "ground"
                        | "flying"
                        | "psychic"
                        | "bug"
                        | "rock"
                        | "ghost"
                        | "dragon"
                        | "dark"
                        | "steel"
                        | "fairy"
                    }
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="w-[200px] h-[200px] bg-gray-500 rounded-lg flex items-center justify-center relative">
              <div className="text-white flex flex-col font-bold text-xs">
                <p className=" text-center text-white  font-bold text-[10px] text-wrap top-2 right-2  absolute">
                  {pokemonNumber}
                </p>
                <div className="flex flex-col items-center ">
                  <p className=" px-2 rounded-md text-[10px]">
                    H: {data?.height && formatMeasure(data.height / 10, "m")}
                  </p>
                  <p className=" px-2 rounded-md text-[10px]">
                    W: {data?.weight && formatMeasure(data.weight / 10, "g")}
                  </p>
                </div>
                <div className="flex flex-col text-center ">
                  <h3 className="font-bold underline p-1">Abilities</h3>
                  {data?.abilities.map((ability, index) => (
                    <span key={index} className="text-start px-1">
                      ⭐️{ability.ability.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default PokemonCard;
