import axios from 'axios'

export default {
  namespaced: true,
  state: {
    logs: {}
  },
  actions: {
    async getLogs ({ commit }) {
      const { data: { data: logs } } = await axios.get(`${process.env.VUE_APP_SERVER}logs/brigades`)
      // const logsDataLodash = window._(logs).groupBy('brigada_id').groupBy('log_id').value()
      // console.log(logsDataLodash)
      // const logsData = logs.reduce((acc, el) => {
      //   if (!acc[el.brigada_id]) {
      //     acc[el.brigada_id] = {
      //       brigadeColor: '#FFFFFF',
      //       brigadeName: 'Бригада',
      //       steps: {}
      //     }
      //   }
      //
      //   if (!acc[el.brigada_id].steps[el.log_id]) {
      //     acc[el.brigada_id].steps[el.log_id] = []
      //   }
      //
      //   // [el.longitude, el.latitude]
      //   acc[el.brigada_id].steps[el.log_id].push({
      //     startTime: 0,
      //     endTime: 0,
      //     points: [parseFloat(el.longitude), parseFloat(el.latitude)]
      //   })
      //   return acc
      // }, {})
      commit('setLogs', logs)
    }
  },
  mutations: {
    setLogs (state, payload) {
      state.logs = payload
    }
  }
}
