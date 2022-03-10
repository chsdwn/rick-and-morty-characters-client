import React from 'react'
import PropTypes from 'prop-types'
import { Box, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'

export const Filter = ({ title, items, value, handleValueChange }) => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      h='128px'
      w='100%'
    >
      <Text marginBottom={2} textAlign='center' fontSize='lg' textDecoration='underline'>{title}</Text>
      <RadioGroup
        value={value}
        onChange={handleValueChange}
        overflowY='auto'
      >
        <Stack direction='column'>
          {items.map((item) => (
            <Radio key={item} value={item}>{item}</Radio>
          ))}
        </Stack>
      </RadioGroup>
    </Box>
  )
}

Filter.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  value: PropTypes.string,
  handleValueChange: PropTypes.func
}
