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

<style>
</style>
