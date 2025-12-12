import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Container, Typography, Box } from '@mui/material'
import StudentTable from '../components/StudentTable'
import { studentsApi } from '../api/studentsApi'

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResults = async () => {
      const name = searchParams.get('name') || ''
      const stream = searchParams.get('stream') || ''
      
      try {
        const results = await studentsApi.searchStudents(name, stream)
        setStudents(results)
      } catch (error) {
        console.error('Error fetching search results:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [searchParams])

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Search Results
      </Typography>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <StudentTable students={students} showActions={false} />
      )}
    </Container>
  )
}

export default SearchResults
