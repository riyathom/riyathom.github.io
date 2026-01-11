<template>
  <div class="container">
    <q-banner
      class="overlay-banner"
      dense
      inline-actions
      color="primary"
      text-color="white"
    >
      <div class="banner-container">
        <h4 class="banner-text">RIYA THOMAS</h4>
      </div>
    </q-banner>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
  },
};
</script>

<style></style>

<style>
.container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.banner-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
  padding-top: 2rem;
}

.banner-text {
  font-size: 2.6rem;
  font-family: Avenir, "Avenir Next", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #000000;
  margin: 0;
  letter-spacing: 0.27em;
  word-spacing: 1rem;
}
</style>
