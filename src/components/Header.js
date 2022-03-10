import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Filters } from './'
import { useDebounce } from '../hooks'

import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  SimpleGrid,
  Spinner,
  Stack
} from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'
import { MdClear, MdFilterList } from 'react-icons/md'

const INITIAL_FILTER = {
  name: '',
  gender: '',
  species: '',
  status: '',
  type: ''
}

export const Header = ({ loading, genders, species, statuses, types, setVariables }) => {
  const [filter, setFilter] = useState(INITIAL_FILTER)
  const [name, setName] = useState('')
  const debouncedName = useDebounce(name, 600)

  useEffect(() => {
    updateFilter('name', debouncedName)
    setVariables((prev) => ({
      ...prev,
      filter: {
        ...prev.filter,
        name: debouncedName
      }
    }))
    resetPage()
  }, [debouncedName])

  const updateFilter = (key, value) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value
    }))
  }

  const resetPage = () => {
    setVariables((prev) => ({
      ...prev,
      page: 1
    }))
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleFilter = () => {
    setVariables((prev) => ({
      ...prev,
      filter
    }))
    resetPage()
  }

  const handleClearFilter = () => {
    const cleanFilter = {
      ...INITIAL_FILTER,
      name: filter.name
    }

    setVariables((prev) => ({
      ...prev,
      filter: cleanFilter
    }))
    setFilter(cleanFilter)
    resetPage()
  }

  return (
    <InputGroup marginBottom={8}>
      <InputLeftElement pointerEvents='none'>
        {loading && <Spinner color='white' size='sm' />}
        {!loading && <FaSearch color='white' />}
      </InputLeftElement>
      <Input
        type='text'
        placeholder='Character name'
        color='white'
        value={name}
        onChange={handleNameChange}
        disabled={loading}
      />

      <Menu>
        <MenuButton
          as={IconButton}
          icon={<MdFilterList color='white' />}
          variant='link'
          marginLeft={2}
          aria-label='Filter Menu'
          border='1px solid white'
        />

        <MenuList backgroundColor='#333' padding={6} w='60vw'>
          <SimpleGrid minChildWidth='140px' spacing={8} textColor='white'>
            <Filters
              filter={filter}
              genders={genders}
              species={species}
              statuses={statuses}
              types={types}
              updateFilter={updateFilter}
            />
          </SimpleGrid>

          <Stack direction='row' spacing={4} marginTop={6}>
            <Button
              onClick={handleFilter}
              disabled={loading}
              leftIcon={<MdFilterList />}
            >
              Filter
            </Button>
            <Button
              onClick={handleClearFilter}
              disabled={loading}
              colorScheme='red'
              leftIcon={<MdClear />}
            >
              Clear
            </Button>
          </Stack>

        </MenuList>
      </Menu>
    </InputGroup>
  )
}

Header.propTypes = {
  loading: PropTypes.bool,
  genders: PropTypes.array,
  species: PropTypes.array,
  statuses: PropTypes.array,
  types: PropTypes.array,
  setVariables: PropTypes.func
}
