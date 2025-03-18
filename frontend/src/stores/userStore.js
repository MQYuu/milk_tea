import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: JSON.parse(localStorage.getItem("userInfo"))?.userId || null,
    email: JSON.parse(localStorage.getItem("userInfo"))?.email || null
  }),
  actions: {
    setUser(user) {
      this.userId = user.userId
      this.email = user.email
      localStorage.setItem("userInfo", JSON.stringify(user))
    },
    logout() {
      this.userId = null
      this.email = null
      localStorage.removeItem("userInfo")
    }
  }
})
