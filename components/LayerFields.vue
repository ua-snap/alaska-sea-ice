<template>
  <div class="layer-fields">
    <div class="field">
      <button @click="decreaseYear" class="arrow-button">≪</button>
      <button @click="decreaseMonth" class="arrow-button"><</button>
    </div>

    <div class="field">
      <label for="month">Month:</label>
      <select v-model="month" id="month">
        <option
          v-for="(monthName, index) in monthNames"
          :key="index"
          :value="index + 1"
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

    <div class="field">
      <button @click="increaseMonth" class="arrow-button">></button>
      <button @click="increaseYear" class="arrow-button">≫</button>
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

const month = ref<number>(1);
const year = ref<number>(2020);

const submit = () => {
  emit("submitLayerConfig", { month: month.value, year: year.value });
};

const decreaseYear = () => {
  year.value -= 1;
  submit();
};

const decreaseMonth = () => {
  if (month.value === 1) {
    month.value = 12;
    year.value -= 1;
  } else {
    month.value -= 1;
  }
  submit();
};

const increaseMonth = () => {
  if (month.value === 12) {
    month.value = 1;
    year.value += 1;
  } else {
    month.value += 1;
  }
  submit();
};

const increaseYear = () => {
  year.value += 1;
  submit();
};
</script>

<style scoped>
.layer-fields {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
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
  width: 70px;
  padding: 5px;
  height: 30px;
  box-sizing: border-box;
  margin: 0;
  text-align: center;
}

.arrow-button {
  background-color: #444;
  color: white;
  border: none;
  width: 35px;
  height: 35px;
  font-size: 18px;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 5px;
}

.arrow-button:hover {
  background-color: #666;
}

.button {
  height: 35px;
  padding: 5px 10px;
}
</style>
