import axios from 'axios'
export default {
  namespaced: true,
  state: {
    brigades: [],
    reactors: []
  },
  actions: {
    async getDirectory ({ commit }) {
      const { data: { data: reactors } } = await axios.get(`${process.env.VUE_APP_SERVER}reactors`)
      const { data: { data: brigades } } = await axios.get(`${process.env.VUE_APP_SERVER}brigades`)
      commit('setStateData', {
        reactors,
        brigades
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
