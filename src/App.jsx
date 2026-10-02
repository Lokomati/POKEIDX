import { useState, useEffect } from 'react'
import './App.css'
import { Button, Container } from 'react-bootstrap'

function App() {
  const [pokemon, setPokemon] = useState([])
  const [pokemonSeleccionado, setPokemonSeleccionado] = useState(null)

  const getAllPokemones = async () => {
    const response = await fetch(
      'https://pokeapi.co/api/v2/pokemon?offset=0&limit=200'
    )

    const data = await response.json()
    setPokemon(data.results)
    console.log(data.results)
  }

  const getPokemon = async (pokemon) => {
    const response = await fetch(pokemon.url)
    const data = await response.json()
    setPokemonSeleccionado(data)
    console.log(data)
  }

  useEffect(() => {
    getAllPokemones()
  }, [])

  return (
    <Container>
      <h2>Pokemon</h2>

      {pokemon.map((pokemon) => (
        <Button
          key={pokemon.name}
          className="m-2"
          onClick={() => getPokemon(pokemon)}
        >
          {pokemon.name}
        </Button>
      ))}
        {pokemonSeleccionado && (
    <div>
     <h3>{pokemonSeleccionado.name}</h3>
     <img
      src={pokemonSeleccionado.sprites.front_default}
      alt={pokemonSeleccionado.name}
     />
    </div>
   )}
    </Container>
  )
}

export default App