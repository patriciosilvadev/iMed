<template>
  <div class="custom-button">
    <button :type="type" @change="$emit('buttonSubmit')">{{label}}</button>
  </div>
</template>

<script>
export default {
  props: ["type", "label"]
};
</script>

<style lang="scss">
.custom-button {
  display: flex;
  justify-content: flex-end;

  button {
    border: none;
    padding: 5px 20px;
    font-weight: bold;

    &:hover,
    &:focus {
      opacity: 0.8;
    }
  }
}
</style>
