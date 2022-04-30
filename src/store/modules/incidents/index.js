import axios from 'axios'
export default {
  namespaced: true,
  state: {
    incidents: [],
    selectedTime: null
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
    setSelectedTime (state, payload) {
      state.selectedTime = payload ? window.dayjs(payload).valueOf() : 0
    },
    setStateData (state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    }
  }
}
