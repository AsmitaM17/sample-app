import { useState } from 'react'
import { Box, TextField, Button, Paper } from '@mui/material'
import { Search } from '@mui/icons-material'

const SearchForm = ({ onSearch }) => {
  const [name, setName] = useState('')
  const [stream, setStream] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch({ name, stream })
  }

  const handleClear = () => {
    setName('')
    setStream('')
    onSearch({ name: '', stream: '' })
  }

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            label="Search by Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ flex: 1, minWidth: '200px' }}
          />
          <TextField
            label="Search by Stream"
            variant="outlined"
            value={stream}
            onChange={(e) => setStream(e.target.value)}
            sx={{ flex: 1, minWidth: '200px' }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            startIcon={<Search />}
            sx={{ height: '56px' }}
          >
            Search
          </Button>
          <Button 
            variant="outlined" 
            onClick={handleClear}
            sx={{ height: '56px' }}
          >
            Clear
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}

export default SearchForm
