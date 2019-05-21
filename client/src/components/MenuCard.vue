<template>
  <div class="menu-card">
    <font-awesome-icon :icon="icone"></font-awesome-icon>
    <h2>
      <router-link :to="{ name: url }">{{titulo}}</router-link>
    </h2>
  </div>
</template>

<script>
export default {
  props: ["titulo", "url", "icone"]
};
</script>

<style lang="scss">
.menu-card {
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 5px;

  svg {
    height: 56px;
    width: 56px !important;
  }

  h2 a {
    color: black;
  }
}
</style>
