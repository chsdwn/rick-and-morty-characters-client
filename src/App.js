import React, { useCallback, useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { Characters, Header } from './components'
import { GET_CHARACTERS } from './graphql/queries'

import { Box, Button, filter } from '@chakra-ui/react'

const CHARACTERS_PER_PAGE = 20
const INITIAL_FILTER = {
  name: '',
  gender: '',
  species: '',
  status: '',
  type: ''
}

function App () {
  const [fetchCharacters, { data, loading }] = useLazyQuery(GET_CHARACTERS)

  const [variables, setVariables] = useState({
    page: 1,
    filter: INITIAL_FILTER
  })

  const [characters, setCharacters] = useState([])
  const [genders, setGenders] = useState([])
  const [species, setSpecies] = useState([])
  const [statuses, setStatuses] = useState([])
  const [types, setTypes] = useState([])

  const updatePage = (page) => {
    setVariables((prev) => ({
      ...prev,
      page
    }))
  }

  const fetchCharactersAsync = useCallback(async () => {
    await fetchCharacters({ variables })
  }, [fetchCharacters, variables])

  useEffect(() => {
    fetchCharactersAsync()
  }, [fetchCharactersAsync])

  useEffect(() => {
    if (loading) return

    const characters = data?.characters?.results
    if (!characters) {
      const isFiltered = Object.values(filter).some((value) => value)
      if (isFiltered) setCharacters([])
    }

    if (characters) {
      const gendersSet = new Set([
        ...genders,
        ...characters.map((character) => character.gender)
      ])
      const speciesSet = new Set([
        ...species,
        ...characters.map((character) => character.species)
      ])
      const statusesSet = new Set([
        ...statuses,
        ...characters.map((character) => character.status)
      ])
      const typesSet = new Set([
        ...types,
        ...characters
          .filter((character) => character.type)
          .map((character) => character.type)
      ])

      setCharacters((prevCharacters) => {
        if (variables.page === 1) return characters
        return [...prevCharacters, ...characters]
      })
      setGenders([...gendersSet].sort())
      setSpecies([...speciesSet].sort())
      setStatuses([...statusesSet].sort())
      setTypes([...typesSet].sort())
    }
  }, [data])

  const handleLoadMoreClick = () => {
    updatePage(variables.page + 1)
  }

  return (
    <Box maxW='100vw' minH='100vh' backgroundColor='#333' padding={8}>
      <Header
        loading={loading}
        genders={genders}
        species={species}
        statuses={statuses}
        types={types}
        setVariables={setVariables}
      />

      <Characters characters={characters} />

      {(characters.length !== 0 && characters.length % CHARACTERS_PER_PAGE === 0) && (
        <Box width='100%' display='flex' justifyContent='center' marginTop={6}>
          <Button onClick={handleLoadMoreClick} isLoading={loading} variant='link' color='white'>
            Load More
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default App
