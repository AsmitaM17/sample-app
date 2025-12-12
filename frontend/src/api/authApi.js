import axiosClient from './axiosClient'

export const authApi = {
  login: async (username, password) => {
    const response = await axiosClient.post('/admin/login', {
      username,
      password
    })
    return response.data
  },

  logout: () => {
    // Just clear local storage (no backend call needed)
    return Promise.resolve()
  }
}
