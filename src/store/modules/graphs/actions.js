export default {
    loadGraphs(context, payload) {
        context.commit('loadGraphs', payload)
    },

    addGraph(context, payload) {
        context.commit('addGraph', payload)
        localStorage.setItem('graphs', JSON.stringify(context.state.graphs));
    },

    editGraph(context, payload) {
        context.commit('editGraph', payload)
        localStorage.setItem('graphs', JSON.stringify(context.state.graphs));
    },

    deleteGraph(context, payload) {
        context.commit('deleteGraph', payload)
        localStorage.setItem('graphs', JSON.stringify(context.state.graphs));
    }
}