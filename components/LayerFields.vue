<template>
  <div class="layer-fields">
    <div class="field">
      <label for="month">Month:</label>
      <select v-model="month" id="month">
        <option
          v-for="(monthName, index) in monthNames"
          :key="index"
          :value="index"
        >
          {{ monthName }}
        </option>
      </select>
    </div>

    <div class="field">
      <label for="year">Year:</label>
      <input type="number" id="year" v-model="year" />
    </div>

    <div class="field">
      <button @click="submit" class="button is-primary">Submit</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";

const emit = defineEmits<{
  (
    event: "submitLayerConfig",
    payload: { month: number | null; year: number | null },
  ): void;
}>();

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const month = ref<number | null>(null);
const year = ref<number | null>(null);

const submit = () => {
  emit("submitLayerConfig", { month: month.value, year: year.value });
};
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

button {
  height: 30px;
}
</style>
