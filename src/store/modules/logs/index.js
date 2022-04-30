import axios from 'axios'
import getTimeInMeters from '@/utils/getTimeInMeters'

export default {
  namespaced: true,
  state: {
    logs: [],
    logsMap: []
  },
  actions: {
    async getLogs ({ commit }) {
      const { data: { data: logs } } = await axios.get(`${process.env.VUE_APP_SERVER}logs/brigades`)
      commit('setLogs', logs)
    },
    async getLogsMaps ({ commit, rootState }, payload) {
      const { data: { data: logs } } = await axios.get(`${process.env.VUE_APP_SERVER}logs/brigades`)
      let dataLog = logs.filter(el => ['on_road', 'work', 'on_road_base'].includes(el.status))
      if (payload?.brigades.length) {
        dataLog = dataLog.filter(el => {
          return payload.brigades.includes(el.brigada_id)
        })
      }
      if (payload?.dateValue) {
        const date = new Date(payload.dateValue).getTime()
        dataLog = dataLog.filter(el => {
          return el.starting_at < date && date < el.ending_at
        })
      }
      dataLog = dataLog.map(el => {
        if (el.status === 'work') {
          const reactor = rootState.directory.reactors.find(r => r.id === el.reactor_id)
          el.routes.push({
            dist: 0,
            startDate: el.starting_at,
            endDate: el.ending_at,
            isPosition: payload?.dateValue && el.starting_at < new Date(payload.dateValue).getTime() && new Date(payload.dateValue).getTime() < el.ending_at,
            points: [reactor.longitude, reactor.latitude]
          })
        } else {
          el.routes = el.routes.reduce((acc, r, index) => {
            const startDate = index === 0 ? el.starting_at : acc[index - 1].endDate
            const endDate = startDate + getTimeInMeters(parseFloat(r.distance))
            let isPosition = false
            if (payload?.dateValue) {
              const date = new Date(payload.dateValue).getTime()
              isPosition = startDate < date && date < endDate
            }
            acc.push({
              dist: r.distance,
              startDate,
              endDate,
              isPosition,
              points: [r.longitude, r.latitude]
            })
            return acc
          }, [])
        }
        return el
      })
      commit('setLogsMap', dataLog)
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
