import axios from 'axios'

export default {
  namespaced: true,
  state: {
    logs: [],
    logsMap: []
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
    },
    async getLogsMaps ({ commit }, payload) {
      const { data: { data: logs } } = await axios.get(`${process.env.VUE_APP_SERVER}logs/brigades`)
      let dataLog = logs
      if (payload?.brigades.length) {
        dataLog = dataLog.filter(el => {
          return payload.brigades.includes(el.brigada_id)
        })
      }
      if (payload?.dateValue) {
        dataLog = dataLog.filter(el => {
          return el.ending_at > payload.dateValue > el.starting_at
        })
      }
      commit('setLogs', dataLog)
    }
  },
  mutations: {
    setLogs (state, payload) {
      state.logs = payload
    },
    setLogsMap (state, payload) {
      state.logsMap = payload
    }
  }
}
