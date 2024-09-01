"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from './PokemonDetailPage.module.css';

interface PokemonDetail {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  stats: { stat: { name: string }; base_stat: number }[];
}

export default function PokemonDetailPage() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);

  useEffect(() => {
    const getPokemonDetail = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data: PokemonDetail = await response.json();
        setPokemon(data);
      } catch (err) {
        console.error(err);
      }
    };
    getPokemonDetail();
  }, [name]);

  if (!pokemon) {
    return <p className={styles.loading}>Loading...</p>;
  }

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`;

  return (
    <div className={styles.container}>
        <div className={styles.detailsBox}>
      <h1 className={styles.name}>{pokemon.name}</h1>
      <img className={styles.sprite} src={imageUrl} alt={pokemon.name} />
      <div className={styles.info}>
        <div className={styles.detail}>
        <p>Height: {pokemon.height / 10} m</p>
        <p>Weight: {pokemon.weight / 10} kg</p>
        <p>Type: {pokemon.types.map(t => t.type.name).join(', ')}</p>
        <p>Ability: {pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
        </div>
        <div className={styles.stats}>
          <h2>Stats</h2>
          <ul>
            {pokemon.stats.map(statInfo => {
              const statName = statInfo.stat.name;
              const baseStat = statInfo.base_stat;
              return (
                <li key={statName}>
                  {statName}: {baseStat}
                  <div className={`${styles.progressBar} ${styles[statName]}`} style={{ width: `${baseStat}%` }}></div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      </div>
      <div className={styles.backButton}>
        <a href="/pokemon" className={styles.btnBack}>Back</a>
      </div>
    </div>
  );
}
