import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  IconButton,
  Typography
} from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'

const StudentTable = ({ students, onEdit, onDelete, showActions = false }) => {
  if (students.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          No students found
        </Typography>
      </Paper>
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Stream</strong></TableCell>
            <TableCell><strong>Age</strong></TableCell>
            <TableCell><strong>Gender</strong></TableCell>
            <TableCell><strong>College</strong></TableCell>
            <TableCell><strong>Semester</strong></TableCell>
            {showActions && <TableCell align="center"><strong>Actions</strong></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id} hover>
              <TableCell>{student.id}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.stream}</TableCell>
              <TableCell>{student.age}</TableCell>
              <TableCell>{student.gender}</TableCell>
              <TableCell>{student.college}</TableCell>
              <TableCell>{student.semester}</TableCell>
              {showActions && (
                <TableCell align="center">
                  <IconButton 
                    color="primary" 
                    onClick={() => onEdit(student.id)}
                    size="small"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton 
                    color="error" 
                    onClick={() => onDelete(student.id)}
                    size="small"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default StudentTable
