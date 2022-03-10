import React, { memo } from 'react'
import { character } from '../types/character'

import { Box, Image, List, ListIcon, ListItem, Text } from '@chakra-ui/react'
import { AiFillHeart } from 'react-icons/ai'
import { BsGenderAmbiguous } from 'react-icons/bs'
import { MdLocationOn } from 'react-icons/md'
import { RiAliensFill } from 'react-icons/ri'

export const Character = memo(({ character }) => {
  return (
    <Box backgroundColor='#222' width='256px' borderRadius={3} overflow='hidden' border='1px solid #11111140'>
      <Image src={character.image} alt={character.name} boxSize='256px' />
      <Text fontSize='lg' align='center' color='white'>{character.name}</Text>

      <List spacing={1} textColor='white' padding={1}>
        <ListItem>
          <ListIcon as={AiFillHeart} />
          {character.status}
        </ListItem>
        <ListItem>
          <ListIcon as={BsGenderAmbiguous} />
          {character.gender}
        </ListItem>
        <ListItem>
          <ListIcon as={RiAliensFill} />
          {character.species + (character.type && ` (${character.type})`)}
        </ListItem>
        <ListItem>
          <ListIcon as={MdLocationOn} />
          {character.location.name}
        </ListItem>
      </List>
    </Box>
  )
})

Character.propTypes = {
  character
}
