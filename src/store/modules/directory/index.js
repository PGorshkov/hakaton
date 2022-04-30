import axios from 'axios'
const COLOR = [
  {
    baloon: 'darkOrange',
    line: 'ff8c00'
  },
  {
    baloon: 'night',
    line: '0c1445'
  },
  {
    baloon: 'darkBlue',
    line: ''
  },
  {
    baloon: 'pink',
    line: 'FFC0CB'
  },
  {
    baloon: 'brown',
    line: '964B00'
  },
  {
    baloon: 'darkGreen',
    line: '023020'
  },
  {
    baloon: 'violet',
    line: '7f00ff'
  },
  {
    baloon: 'yellow',
    line: 'FFFF00'
  },
  {
    baloon: 'orange',
    line: 'FFA500'
  },
  {
    baloon: 'lightBlue',
    line: 'ADD8E6'
  }
]
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
        brigades: brigades.map((el, index) => ({
          ...el,
          color: index > 9 ? COLOR[index - 1] : COLOR[index]
        }))
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
