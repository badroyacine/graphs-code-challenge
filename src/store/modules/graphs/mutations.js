export default {
    loadGraphs(state, payload) {
        state.graphs = payload.graphs
    },
    addGraph(state, payload) {
        state.graphs.unshift(payload.graph)
    },
    editGraph(state, payload) {
        state.graphs = state.graphs.map(el => {

            if(el.id !== payload.graph.id) return el

            return {
                ...el,
                nodes: payload.graph.nodes,
                edges: payload.graph.edges,
                layouts: payload.graph.layouts,
                updated_at: new Date()
            }
        })
    },
    deleteGraph(state, payload) {
        state.graphs = state.graphs.filter(el => el.id !== payload.id)
    }
}