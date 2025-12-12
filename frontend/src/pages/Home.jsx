import { useState } from 'react'
import { Container, Typography, Box } from '@mui/material'
import SearchForm from '../components/SearchForm'
import StudentTable from '../components/StudentTable'
import { studentsApi } from '../api/studentsApi'
import Notification from '../components/Notification'

const Home = () => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' })

  const handleSearch = async ({ name, stream }) => {
    setLoading(true)
    try {
      const results = await studentsApi.searchStudents(name, stream)
      setStudents(results)
      
      if (results.length === 0) {
        setNotification({
          open: true,
          message: 'No students found matching your search',
          severity: 'info'
        })
      }
    } catch (error) {
      setNotification({
        open: true,
        message: 'Error searching students',
        severity: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Student Search
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Search for students by name or stream
        </Typography>
      </Box>

      <SearchForm onSearch={handleSearch} />

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <StudentTable students={students} showActions={false} />
      )}

      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={() => setNotification({ ...notification, open: false })}
      />
    </Container>
  )
}

export default Home
