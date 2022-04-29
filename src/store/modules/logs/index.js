import axios from 'axios'

export default {
  namespaced: true,
  state: {
    logs: {}
  },
  actions: {
    async getLogs ({ commit }) {
      const { data: { data: logs } } = await axios.get(`${process.env.VUE_APP_SERVER}logs/brigades`)
      // const logsData = window._(logs).groupBy('brigada_id').value()
      const logsData = logs.reduce((acc, el) => {
        if (!acc[el.brigada_id]) {
          acc[el.brigada_id] = {
            brigadeColor: '#FFFFFF',
            brigadeName: 'Бригада',
            steps: []
          }
        }
        // [el.longitude, el.latitude]
        acc[el.brigada_id].steps.push([el.longitude, el.latitude])
        return acc
      }, {})
      commit('setLogs', logsData)
    }
  },
  mutations: {
    setLogs (state, payload) {
      state.logs = payload
    }
  }
}
