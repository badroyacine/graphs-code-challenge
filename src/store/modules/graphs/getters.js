export default {
    getGraphs(state) {
        return state.graphs
    },
    getGraph: (state) => (id) => {
        return state.graphs.find(el => el.id === id)
    }
}