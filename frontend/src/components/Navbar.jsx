import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { Home, Login, Dashboard, Logout } from '@mui/icons-material'

const Navbar = () => {
  const { admin, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          College Management System
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            color="inherit" 
            component={Link} 
            to="/"
            startIcon={<Home />}
          >
            Home
          </Button>

          {isAuthenticated() ? (
            <>
              <Button 
                color="inherit" 
                component={Link} 
                to="/admin/dashboard"
                startIcon={<Dashboard />}
              >
                Dashboard
              </Button>
              <Button 
                color="inherit" 
                onClick={handleLogout}
                startIcon={<Logout />}
              >
                Logout ({admin?.username})
              </Button>
            </>
          ) : (
            <Button 
              color="inherit" 
              component={Link} 
              to="/admin/login"
              startIcon={<Login />}
            >
              Admin Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
