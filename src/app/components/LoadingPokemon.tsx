"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getPokemon, getGenerations } from "../actions/getPokemon";
import SelectGeneration from "./SelectGeneration";
import PokemonCard, { Pokemon } from "./PokemonCard";
import ClipLoader from "react-spinners/ClipLoader";

function LoadingPokemon() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { inView, ref } = useInView();
  const [selectedGeneration, setSelectedGeneration] = useState<string>("");
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const loadMorePokemon = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setError(null);

    try {
      await delay(1000);
      const nextPage = page + 1;
      const newPokemon = selectedGeneration
        ? await getGenerations({
            gen: parseInt(selectedGeneration),
            page: nextPage,
          })
        : await getPokemon({ page: nextPage });

      if (newPokemon.length === 0) {
        setHasMore(false);
      } else {
        setPage(nextPage);
        setPokemon((prevPokemon) => {
          if (!prevPokemon) return newPokemon; // null || undefined
          const uniquePokemon = newPokemon.filter(
            (pokemon: Pokemon) =>
              !prevPokemon.some((poke) => poke.name === pokemon.name)
          );
          return [...prevPokemon, ...uniquePokemon];
        });
      }
    } catch (err) {
      setError("Failed to load more Pokémon. Please try again later.");
      setHasMore(false);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (inView) {
      loadMorePokemon();
    }
  }, [inView]);

  useEffect(() => {
    const fetchPokemon = async () => {
      setIsLoading(true);
      setError(null);
      setHasMore(true);
      setPage(1);

      try {
        const data =
          selectedGeneration === ""
            ? await getPokemon({ page: 1 })
            : await getGenerations({
                gen: parseInt(selectedGeneration),
                page: 1,
              });
        setPokemon(data);
      } catch (err: any) {
        handleFetchError(err);
      }

      setIsLoading(false);
    };

    fetchPokemon();
  }, [selectedGeneration]);

  const handleFetchError = (err: any) => {
    if (err.response) {
      if (err.response.status === 404) {
        setError("Pokemon not found.");
      } else if (err.response.status === 500) {
        setError("Server have problem. Please try again later.");
      }
    } else {
      setError("Network error. Please check your connection.");
    }
    setHasMore(false);
  };

  return (
    <div>
      <div className="flex justify-end text-sm pb-4">
        <SelectGeneration onGenerationChange={setSelectedGeneration} />
      </div>

      {error && (
        <div className="text-slate-200 text-center text-6xl mb-4">{error}</div>
      )}

      <div className="mx-0 grid grid-cols-6 sm:grid-cols-16 gap-8  ">
        {pokemon?.map((poke: Pokemon) => (
          <PokemonCard key={poke.url} pokemon={poke} />
        ))}
      </div>
      {isLoading && (
        <div ref={ref} className="flex justify-center items-center p-4">
          <ClipLoader color="white" />
        </div>
      )}

      {hasMore && pokemon && pokemon.length >= 80 && !isLoading && (
        <div ref={ref} className="flex justify-center items-center p-4">
          <ClipLoader color="white" />
        </div>
      )}
    </div>
  );
}

export default LoadingPokemon;
