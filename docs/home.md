# Home.vue Documentation
The Home.vue file plays a pivotal role in the Vue.js application for calculating Total Daily Energy Expenditure (TDEE). This document delves into the script logic, template structure, and styles, providing an in-depth understanding for developers.

## Script Logic

### Reactive Variables
```js
const age = ref("");
const height = ref("");
const weight = ref("");
const gender = ref("men");
const activityLevel = ref("0");
const BMI = ref("");
const BMR = ref(0);
const idealWeight = ref("");
```
- **Description:** These variables, employing Vue's Composition API (ref), store user inputs and calculated values like BMI, BMR, and ideal weight. Their reactivity ensures dynamic updates within the application.

### Router and Composables
```js
const router = useRouter();
const { calculateBMI } = useBMI();
const { calculateBMR } = useBMR();
const { calculateWeight } = useWeightCalculator();
```
- **Description:** The `router` variable accesses Vue Router, while composable functions from `useBMI`, `useBMR`, and `useWeightCalculator` perform crucial calculations for TDEE estimation.

### Calculation Function (calcTdee)
```js
function calcTdee() {
  BMI.value = calculateBMI(height.value, weight.value);
  BMR.value = calculateBMR(height.value, weight.value, age.value, gender.value, activityLevel.value);
  idealWeight.value = calculateWeight(height.value, gender.value);

  localStorage.setItem("idealWeight", idealWeight.value);
  localStorage.setItem("BMI", BMI.value);
  localStorage.setItem("BMR", Math.round(BMR.value));

  router.push({ name: 'result' });
}
```
- **Description:**The `calcTdee` function is invoked when the user clicks the "Calculate" button. It calculates BMI, BMR, and ideal weight, stores them in local storage, and navigates to the result page.
  
### Template Structure
```html
<template>

  <!-- TDEE Form -->
  <div class="container w-75 mt-5 pt-4 d-flex flex-column align-items-center border border-1 rounded-2 dark:bg-[#151515] ">
    <h1 class="mb-5 align-items-center">How Many Calories You Burn Every Day</h1>
    <form class="tdeeform">
      <!-- Age input -->
      <div class="d-flex flex-row mb-3">
        <label class="w-25">Age</label>
        <input v-model.number="age" class="form-control w-75" placeholder="year">
      </div>

      <!-- Weight input -->
      <div class="d-flex flex-row mb-3">
        <label class="w-25">Weight</label>
        <input v-model.number="weight" class="form-control w-75" placeholder="kg">
      </div>

      <!-- Height input -->
      <div class="d-flex flex-row mb-3">
        <label class="w-25">Height</label>
        <input v-model.number="height" class="form-control w-75" placeholder="cm">
      </div>

      <ActivityInput />
      <GenderInput />

      <!-- Submit button -->
      <button class="btn btn-lg mb-4" :class="{ 'btn-outline-light': isDark, 'btn-outline-dark': !isDark }" cl type="button" id="calculator" @click="calcTdee()">
        Calculate
      </button>
    </form>
  </div>
```
- **Description:** The template is structured to accommodate the TDEE form and information sections, promoting clarity and separation of concerns.