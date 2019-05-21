<template>
  <main id="app">
    <div class="container">
      <router-view/>
    </div>
  </main>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
#app {
  background: #9b65e6;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 100vh;
}
</style>
