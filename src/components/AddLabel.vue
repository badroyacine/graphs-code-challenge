<template>
    <Dialog>
        <template #header>
            <h5 class="modal-title">Add Node Label</h5>
            <button type="button" class="btn-close" @click="closeDialog"></button>
        </template>

        <template #body>
            <div v-if="showErrors" class="alert alert-danger">{{ errorMessage }}</div>
            <form>
                <div class="from-group mb-4">
                    <label for="label" class="label">Label</label>
                    <input type="text" class="form-control" id="label" v-model.trim="label">
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
    name: "AddLabel",
    components: { 
        Dialog 
    },
    emits: ['closeDialog', 'addLabel'],
    data(){
        return{
            label: '',
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

            if(!this.label) {
                this.showErrors = true
                this.errorMessage = "Please enter a label to create the node."
                return;
            }

            this.$emit('addLabel', this.label);
            this.$emit('closeDialog');
        }
    },
};
</script>