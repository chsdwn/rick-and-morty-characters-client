import React from 'react'
import PropTypes from 'prop-types'
import { Filter } from './Filter'

export const Filters = ({ filter, genders, species, statuses, types, updateFilter }) => {
  return (
    <>
      <Filter
        title='Genders'
        items={genders}
        value={filter.gender}
        handleValueChange={(value) => updateFilter('gender', value)}
      />
      <Filter
        title='Species'
        items={species}
        value={filter.species}
        handleValueChange={(value) => updateFilter('species', value)}
      />
      <Filter
        title='Statuses'
        items={statuses}
        value={filter.status}
        handleValueChange={(value) => updateFilter('status', value)}
      />
      <Filter
        title='Types'
        items={types}
        value={filter.type}
        handleValueChange={(value) => updateFilter('type', value)}
      />
    </>
  )
}

Filters.propTypes = {
  filter: PropTypes.object,
  genders: PropTypes.array,
  species: PropTypes.array,
  statuses: PropTypes.array,
  types: PropTypes.array,
  updateFilter: PropTypes.func
}
