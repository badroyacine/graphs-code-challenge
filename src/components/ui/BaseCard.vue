<template>
    <div class="base-card">
        <div class="base-card-title">
            <slot name="title">
                <h5 class="modal-title">Card title</h5>
            </slot>
        </div>
        <div class="base-card-body">
            <slot name="body">
                <p>Card body text goes here.</p>
            </slot>
        </div>
    </div>
</template>

<style scoped>
    .base-card {
        padding: 1rem;
        border: 1px solid silver;
        border-radius: 4px;
    }

</style>