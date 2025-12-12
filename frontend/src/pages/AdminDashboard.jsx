import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Container, 
  Typography, 
  Box, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from '@mui/material'
import { Add } from '@mui/icons-material'
import StudentTable from '../components/StudentTable'
import Notification from '../components/Notification'
import { studentsApi } from '../api/studentsApi'

const AdminDashboard = () => {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null })
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' })
  
  const navigate = useNavigate()

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    setLoading(true)
    try {
      const data = await studentsApi.getAllStudents()
      setStudents(data)
    } catch (error) {
      setNotification({
        open: true,
        message: 'Error fetching students',
        severity: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (id) => {
    navigate(`/admin/students/edit/${id}`)
  }

  const handleDeleteClick = (id) => {
    setDeleteDialog({ open: true, id })
  }

  const handleDeleteConfirm = async () => {
    try {
      await studentsApi.deleteStudent(deleteDialog.id)
      setNotification({
        open: true,
        message: 'Student deleted successfully',
        severity: 'success'
      })
      fetchStudents()
    } catch (error) {
      setNotification({
        open: true,
        message: 'Error deleting student',
        severity: 'error'
      })
    } finally {
      setDeleteDialog({ open: false, id: null })
    }
  }

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, id: null })
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Admin Dashboard
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/admin/students/new')}
        >
          Add New Student
        </Button>
      </Box>

      {loading ? (
        <Typography>Loading students...</Typography>
      ) : (
        <StudentTable 
          students={students} 
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          showActions={true}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this student? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={() => setNotification({ ...notification, open: false })}
      />
    </Container>
  )
}

export default AdminDashboard
