<template>
    <div>
        <table class="table" v-if="graphs.length > 0">
            <thead class="table-light">
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Actions</th>
            </thead>
            <tbody>
                <tr v-for="graph in graphs" :key="graph.id">
                    <td>{{ graph.name }}</td>
                    <td>{{ graph.description }}</td>
                    <td>
                        <router-link :to="{ name: 'GraphDetails', params: { id: graph.id } }">
                            View graph
                        </router-link>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="text-center display-6" v-else>
            You have no graphs yet
        </div>
    </div>
</template>

<script>
export default {
    name: "GraphList",
    props: ['graphs']
}
</script>

<style scoped>
    a {
        text-decoration: none !important;
    }
</style>