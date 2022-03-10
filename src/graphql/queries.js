import { gql } from '@apollo/client'

// type FilterCharacter {
//   name: String
//   status: String
//   species: String
//   type: String
//   gender: String
// }

export const GET_CHARACTERS = gql`
  query getCharacters($page: Int!, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      results {
        id
        name
        status
        species
        type
        gender
        origin {
          name
        }
        location {
          name
        }
        image
      }
    }
  }
`
