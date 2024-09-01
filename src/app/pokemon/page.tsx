"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./PokemonPage.module.css";

interface PokemonList {
  count: number;
  next: string;
  previous?: string;
  results: Pokemon[];
}

interface Pokemon {
  name: string;
  url: string;
}

const getPokemonId = (url: string): number => {
  const parts = url.split("/").filter(Boolean);
  return parseInt(parts[parts.length - 1], 10);
};

export default function PokemonPage() {
  const [pokemonData, setPokemonData] = useState<PokemonList | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (url: string) => {
    try {
      setLoading(true);
      const res = await fetch(url);
      const data: PokemonList = await res.json();
      if (pokemonData) {
        // Append new results to existing data
        setPokemonData({
          ...data,
          results: [...pokemonData.results, ...data.results],
        });
      } else {
        setPokemonData(data);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData("https://pokeapi.co/api/v2/pokemon?limit=20");
  }, []);

  const loadMore = () => {
    if (pokemonData?.next) {
      fetchData(pokemonData.next);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Pokemon</h1>
      {pokemonData ? (
        <>
          <ul className={styles.pokemonList}>
            {pokemonData.results.map((p) => {
              const id = getPokemonId(p.url);
              const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`; 
              return (
                <li key={p.name} className={styles.pokemonItem}>
                  <Link href={`/pokemon/${p.name}`}>
                    <img
                      src={imageUrl}
                      alt={p.name}
                      className={styles.pokemonImage}
                    />
                    <span className={styles.pokemonName}>{p.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          {pokemonData.next && (
            <button onClick={loadMore} className={styles.loadMoreButton}>
              {loading ? "Loading..." : "Load More"}
            </button>
          )}
        </>
      ) : (
        <p>Waiting...</p>
      )}
    </div>
  );
}
