import PropTypes from 'prop-types'

export const character = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  status: PropTypes.string,
  species: PropTypes.string,
  type: PropTypes.string,
  gender: PropTypes.string,
  origin: PropTypes.shape({
    name: PropTypes.string
  }),
  location: PropTypes.shape({
    name: PropTypes.string
  }),
  image: PropTypes.string
})

export default character
