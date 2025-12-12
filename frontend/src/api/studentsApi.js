import axiosClient from './axiosClient'

export const studentsApi = {
  // Public search
  searchStudents: async (name = '', stream = '') => {
    const params = new URLSearchParams()
    if (name) params.append('name', name)
    if (stream) params.append('stream', stream)
    
    const response = await axiosClient.get(`/search?${params.toString()}`)
    return response.data
  },

  // Admin CRUD operations
  getAllStudents: async () => {
    const response = await axiosClient.get('/students')
    return response.data
  },

  getStudentById: async (id) => {
    const response = await axiosClient.get(`/students/${id}`)
    return response.data
  },

  createStudent: async (studentData) => {
    const response = await axiosClient.post('/students', studentData)
    return response.data
  },

  updateStudent: async (id, studentData) => {
    const response = await axiosClient.put(`/students/${id}`, studentData)
    return response.data
  },

  deleteStudent: async (id) => {
    const response = await axiosClient.delete(`/students/${id}`)
    return response.data
  }
}
