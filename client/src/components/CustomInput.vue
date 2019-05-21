<template>
  <div class="custom-input">
    <label :for="name">{{label}}</label>
    <input type="text" :id="name" :value="value" @change="$emit('inputValue', $event.target)">
  </div>
</template>

<script>
export default {
  props: ["name", "label", "value"]
};
</script>

<style lang="scss">
.custom-input {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  label {
    color: white;
    font-weight: bold;
  }

  input {
    width: 50%;
    padding: 5px;
  }
}
</style>
