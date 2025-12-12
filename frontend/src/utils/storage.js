// Helper functions for JWT token storage

export const setToken = (token) => {
  localStorage.setItem('jwt_token', token)
}

export const getToken = () => {
  return localStorage.getItem('jwt_token')
}

export const removeToken = () => {
  localStorage.removeItem('jwt_token')
}

export const setUser = (user) => {
  localStorage.setItem('admin_user', JSON.stringify(user))
}

export const getUser = () => {
  const user = localStorage.getItem('admin_user')
  return user ? JSON.parse(user) : null
}

export const removeUser = () => {
  localStorage.removeItem('admin_user')
}

export const clearAuth = () => {
  removeToken()
  removeUser()
}
