import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import Pokemon from "./components/Pokemon"

function App() {

   const [allPokemons, setAllPokemons] = useState([])
   const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')

   const getAllPokemons = async () => {
      const res = await fetch(loadMore)
      const data = await res.json()

      setLoadMore(data.next)

      function pokemonsObject(result) {
         result.forEach(async (pokemons) => {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemons.name}`)
            const data = await res.json()
            setAllPokemons(currentList => [...currentList, data])

         });
      }

      pokemonsObject(data.results)
      await console.log(allPokemons)
   }

   useEffect(() => {
      getAllPokemons()
   }, [])
   return (
      <div className="app-container">
         <h1>Pokemons Evolution</h1>
         <div className="pokemon-container">
            <div className="all-container">
               {allPokemons.map((pokemons, index) => {
                  return (
                     <Pokemon
                        id={pokemons.id}
                        name={pokemons.name}
                        image={pokemons.sprites.other.dream_world.front_default}
                        type={pokemons.types[0].type.name}
                        key={index}
                     />
                  )
               })}
            </div>
         </div>
         <Button className="load-more" onClick={()=> getAllPokemons()}>Load More</Button>
      </div>
   )
}

export default App