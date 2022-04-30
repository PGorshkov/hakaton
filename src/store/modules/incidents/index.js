import axios from 'axios'
export default {
  namespaced: true,
  state: {
    incidents: []
  },
  actions: {
    async getIncidents ({ commit }) {
      const { data: { data: incidents } } = await axios.get(`${process.env.VUE_APP_SERVER}incidents`)
      commit('setStateData', {
        incidents
      })
    }
  },
  mutations: {
    setStateData (state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    }
  }
}
