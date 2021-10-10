<template>
  <TheHeader />
  <router-view/>
</template>

<script>
  import TheHeader from './components/layout/TheHeader.vue'
  export default {
    components: { TheHeader },

    mounted(){
      // Load graphs available in localStorage
      const graphs =  JSON.parse(localStorage.getItem('graphs')) || []

      this.$store.dispatch({
        type: 'loadGraphs',
        graphs
      })

    }
  }
</script>

<style lang="scss">
  .btn:focus {
    box-shadow: none !important;
  }
  .btn:disabled {
    background-color: silver !important;
    cursor: not-allowed !important;
    color: #444 !important;
    outline: none !important;
    border: none !important;
  }
</style>
