<!-- LayerFields.vue -->
<template>
  <div class="layer-fields">
    <div class="field">
      <label for="month">Month:</label>
      <input type="number" id="month" v-model="month" min="1" max="12" />
    </div>
    <div class="field">
      <label for="year">Year:</label>
      <input type="number" id="year" v-model="year" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const month = ref<number | null>(null);
const year = ref<number | null>(null);
</script>

<style scoped>
.layer-fields {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  margin-left: -10px;
}

.field {
  display: flex;
  align-items: center;
  height: 1.5rem;
}

.field label {
  margin-right: 5px;
  line-height: 1;
  vertical-align: top;
}

input {
  width: 60px;
  padding: 5px;
  height: 30px;
  box-sizing: border-box;
  margin: 0;
}
</style>
