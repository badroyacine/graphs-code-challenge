<template>
    <Dialog>
        <template #header>
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="btn-close" @click="closeDialog"></button>
        </template>

        <template #body>
            <div>{{ body }}</div>
        </template>

        <template #actions>
            <button @click="confirm" class="btn" :class="color">
                Confirm
            </button>
        </template>
    </Dialog>
</template>

<script>
import Dialog from "./Dialog.vue"

export default {
    name: "ConfirmationDialog",
    components: { Dialog },
    emits: ['closeDialog', 'confirm'],
    props: ['title', 'body', 'color'],

    methods: {
        closeDialog() {
            this.$emit('closeDialog');
        },
        confirm() {
            this.$emit('confirm');
            this.$emit('closeDialog');
        }
    },
};
</script>
