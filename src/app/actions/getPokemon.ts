"use server";

import axios from "axios";

interface Pokemon {
  name: string;
  url: string;
}

interface GenerationResponse {
  pokemon_species: Pokemon[];
}
export async function getPokemon({
  page = 1,
  limit = 1500,
}: {
  query?: string;
  page?: number;
  limit?: number;
}) {
  try {
    const response = await axios.get<{ results: Pokemon[] }>(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${
        (page - 1) * 80
      }`
    );
    return response.data.results.slice(0, 80);
  } catch (error: unknown) {
    console.error("An unexpected error occurred");
    return null;
  }
}

export async function getGenerations({
  gen,
  page = 1,
  limit = 80,
}: {
  gen: number;
  page?: number;
  limit?: number;
}) {
  try {
    const response = await axios.get<GenerationResponse>(
      `https://pokeapi.co/api/v2/generation/${gen}`
    );
    const pokemonData = response.data.pokemon_species.map(
      (species: Pokemon) => {
        const pokemonId = species.url.split("/").filter(Boolean).pop();
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;

        return {
          name: species.name,
          url: pokemonUrl,
        };
      }
    );

    return pokemonData.slice((page - 1) * limit, page * limit);
  } catch (error: unknown) {
    console.error("An unexpected error occurred");
    return null;
  }
}
