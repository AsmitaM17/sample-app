import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  MenuItem
} from '@mui/material'
import { Save, Cancel } from '@mui/icons-material'
import { studentsApi } from '../api/studentsApi'
import Notification from '../components/Notification'

const StudentForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id

  const [formData, setFormData] = useState({
    name: '',
    stream: '',
    age: '',
    gender: '',
    college: '',
    semester: ''
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' })

  useEffect(() => {
    if (isEdit) {
      fetchStudent()
    }
  }, [id])

  const fetchStudent = async () => {
    try {
      const student = await studentsApi.getStudentById(id)
      setFormData({
        name: student.name,
        stream: student.stream,
        age: student.age,
        gender: student.gender,
        college: student.college,
        semester: student.semester
      })
    } catch (error) {
      setNotification({
        open: true,
        message: 'Error fetching student details',
        severity: 'error'
      })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.stream.trim()) newErrors.stream = 'Stream is required'
    if (!formData.age || formData.age < 15 || formData.age > 100) {
      newErrors.age = 'Age must be between 15 and 100'
    }
    if (!formData.gender) newErrors.gender = 'Gender is required'
    if (!formData.college.trim()) newErrors.college = 'College is required'
    if (!formData.semester || formData.semester < 1 || formData.semester > 8) {
      newErrors.semester = 'Semester must be between 1 and 8'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) return

    setLoading(true)
    try {
      if (isEdit) {
        await studentsApi.updateStudent(id, formData)
        setNotification({
          open: true,
          message: 'Student updated successfully',
          severity: 'success'
        })
      } else {
        await studentsApi.createStudent(formData)
        setNotification({
          open: true,
          message: 'Student created successfully',
          severity: 'success'
        })
      }
      
      setTimeout(() => navigate('/admin/dashboard'), 1500)
    } catch (error) {
      setNotification({
        open: true,
        message: `Error ${isEdit ? 'updating' : 'creating'} student`,
        severity: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {isEdit ? 'Edit Student' : 'Add New Student'}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Stream"
                name="stream"
                value={formData.stream}
                onChange={handleChange}
                error={!!errors.stream}
                helperText={errors.stream}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                error={!!errors.age}
                helperText={errors.age}
                required
                inputProps={{ min: 15, max: 100 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                error={!!errors.gender}
                helperText={errors.gender}
                required
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Semester"
                name="semester"
                type="number"
                value={formData.semester}
                onChange={handleChange}
                error={!!errors.semester}
                helperText={errors.semester}
                required
                inputProps={{ min: 1, max: 8 }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="College"
                name="college"
                value={formData.college}
                onChange={handleChange}
                error={!!errors.college}
                helperText={errors.college}
                required
              />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              startIcon={<Save />}
              disabled={loading}
              fullWidth
            >
              {loading ? 'Saving...' : (isEdit ? 'Update Student' : 'Create Student')}
            </Button>
            <Button
              variant="outlined"
              startIcon={<Cancel />}
              onClick={() => navigate('/admin/dashboard')}
              fullWidth
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>

      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={() => setNotification({ ...notification, open: false })}
      />
    </Container>
  )
}

export default StudentForm
