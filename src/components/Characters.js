import React from 'react'
import PropTypes from 'prop-types'
import { Character } from './Character'
import character from '../types/character'

import { SimpleGrid } from '@chakra-ui/react'

export const Characters = ({ characters }) => {
  return (
    <SimpleGrid minChildWidth='256px' spacing={8}>
      {characters.map((character) => (
        <Character key={character.id} character={character} />
      ))}
    </SimpleGrid>
  )
}

Characters.propTypes = {
  characters: PropTypes.arrayOf(character)
}
