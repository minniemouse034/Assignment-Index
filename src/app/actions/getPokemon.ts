"use server";

import axios from "axios";

export async function getPokemon({
  page = 1,
  limit = 1500,
}: {
  query?: string;
  page?: number;
  limit?: number;
}) {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${
        (page - 1) * 80
      }`
    );
    return response.data.results.slice(0, 80);
  } catch (error: any) {
    console.log(error.message);
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
    const response = await axios.get(
      `https://pokeapi.co/api/v2/generation/${gen}`
    );

    const pokemonData = response.data.pokemon_species.map((species: any) => {
      const pokemonId = species.url.split("/").filter(Boolean).pop();
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;

      return {
        name: species.name,
        url: pokemonUrl,
      };
    });

    return pokemonData.slice((page - 1) * limit, page * limit);
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
}
