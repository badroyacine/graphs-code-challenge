<template>
    <nav class="navbar navbar-dark bg-primary py-3 mb-3">
        <div class="container-fluid justify-content-center">
            <router-link class="navbar-brand" :to="{ name: 'Home' }">
                {{ title }}
            </router-link>
        </div>
    </nav>
</template>

<script>
export default {
    name: "TheHeader",
    props: {
        title: {
            type: String,
            default: "Code Challenge"
        }
    }
}
</script>