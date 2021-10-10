<template>
    <teleport to='body'>
        <div class="modal show">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <slot name="header">
                            <h5 class="modal-title">Modal title</h5>
                            <button type="button" class="btn-close" @click="closeDialog"></button>
                        </slot>
                    </div>
                    <div class="modal-body">
                        <slot name="body">
                            <p>Modal body text goes here.</p>
                        </slot>
                    </div>
                    <div class="modal-footer">
                        <slot name="actions">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save</button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script>
export default {
  methods: {
    closeDialog() {
      this.$emit('closeDialog');
    },
  },
};
</script>

<style scoped>
    .modal.show {
        display: block;
        background-color: rgba(0,0,0,.4);
    }
</style>