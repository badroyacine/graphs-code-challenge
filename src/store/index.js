import { createStore } from 'vuex'
import graphsModule from './modules/graphs/index.js'

export default createStore({
  modules: {
    graphs: graphsModule
  }
})
