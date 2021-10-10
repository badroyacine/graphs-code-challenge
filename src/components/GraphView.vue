<template>

    <div class="container" v-if="graph">
        <div class="mb-3 text-right">
            <router-link class="btn btn-primary" :to="{ name: 'Home' }">Graphs List</router-link>
        </div>
        <div class="my-3">
            <div><span class="fw-bold">Name:</span> {{ graph.name }}</div>
            <div><span class="fw-bold">Description:</span> {{ graph.description }}</div>
        </div>

        <div class="mt-2">
            <button class="btn btn-secondary me-2" @click="goToStats">Statistiques</button>
            <button class="btn btn-warning me-2" @click="goToEdit">Edit graph</button>
            <button class="btn btn-danger" @click="toggleDeleteDialog(true)">Delete graph</button>
        </div>
    </div>

    <ConfirmationDialog v-if="showConfirmationDialog" @closeDialog="toggleDeleteDialog(false)" @confirm="confirmDelete"
        title="Delete graph" 
        body="Do you really want to delete this graph ?" 
        color="btn-danger" 
    />
    
    <router-view/>
</template>

<script>
import ConfirmationDialog from './ui/ConfirmationDialog.vue'

export default {
    name: "GraphView",
    components: { ConfirmationDialog },
    props: ['id'],

    data(){
        return {
            showConfirmationDialog: false
        }
    },

    computed: {
        graph(){
            return this.$store.getters.getGraph(this.id) || this.$router.push({ name: 'NotFound', params: {notFound: this.id} })
        }
    },
    methods: {
        goToEdit(){
            this.$router.push({ name: 'EditGraph', params: { id: this.id } })
        },
        goToStats(){
            this.$router.push({ name: 'GraphStatistics', params: { id: this.id } })
        },
        toggleDeleteDialog(value){
            this.showConfirmationDialog = value
        },
        confirmDelete(){
            return this.$store.dispatch({
                type: 'deleteGraph',
                id: this.id
            }).then(() => this.$router.push({ name: 'Home' }))
        },
    },
}
</script>