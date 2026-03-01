<template>
  <router-view :isDarkMode="isDarkMode" @toggle-dark-mode="toggleDarkMode" />
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isDarkMode: false
    }
  },
  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
      document.body.classList.toggle('dark-mode', this.isDarkMode)
    }
  }
}
</script>