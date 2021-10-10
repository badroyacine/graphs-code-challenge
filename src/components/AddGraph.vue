<template>
    <Dialog>
        <template #header>
            <h5 class="modal-title">Add New Graph</h5>
            <button type="button" class="btn-close" @click="closeDialog"></button>
        </template>

        <template #body>
            <div v-if="showErrors" class="alert alert-danger">{{ errorMessage }}</div>
            <form>
                <div class="from-group mb-4">
                    <label for="name" class="label">Name</label>
                    <input type="text" class="form-control" id="name" v-model.trim="name">
                </div>
                <div class="from-group">
                    <label for="description" class="label">Description</label>
                    <textarea id="description" class="form-control" rows="5" v-model.trim="description"></textarea>
                </div>
            </form>
        </template>

        <template #actions>
            <button @click="submitForm" class="btn btn-primary">Create</button>
        </template>
    </Dialog>
</template>

<script>
import Dialog from "./ui/Dialog.vue"

export default {
    name: "AddGraph",
    components: { 
        Dialog 
    },
    emits: ['closeDialog', 'addGraph'],
    data(){
        return{
            name: '',
            description: '',
            showErrors: false,
            errorMessage: null
        }
    },
    methods: {
        closeDialog() {
            this.$emit('closeDialog');
        },
        submitForm() {
            this.showErrors = false

            if(!this.name || !this.description) {
                console.log('errooorrr', this.name, this.description)
                this.showErrors = true
                this.errorMessage = "Please fill out both fields to create the graph."
                return;
            }

            const graph = {
                id: Date.now().toString(),
                name: this.name,
                description: this.description,
                created_at: new Date(),
                updated_at: new Date(),
                nodes: {},
                edges: {},
                layouts: { nodes: {}}
            }

            this.$emit('addGraph', graph);
            this.$emit('closeDialog');
        }
    },
};
</script>