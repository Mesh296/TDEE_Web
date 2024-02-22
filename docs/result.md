# Result.vue Documentation
The Result.vue file is a component within the Vue.js application responsible for displaying the user's statistics, including maintenance calories, BMI (Body Mass Index) score, ideal weight, and macronutrient information. This document provides an explanation of the template structure, script logic, and the overall purpose of the component.

## Script Logic

### Reactive Variables
```js
<script setup>
import BMIScoreTable from '@/components/BMIScoreTable.vue';
import { ref, onMounted } from 'vue'

const maintainCalo = ref(0);
const BMI = ref(0);
const classBMI = ref('');
const idealWeight = ref(0);

onMounted(() => {
    // Logic to retrieve and set values from localStorage
    // ...
})
</script>
```
- **Description:** The script logic involves importing the `BMIScoreTable` component and using Vue's `ref` to define variables for maintenance calories, BMI, BMI classification, and ideal weight. The `onMounted` lifecycle hook is used to populate these variables from the values stored in the browser's `localStorage`

  
### Template Structure
```html
<template>
    <!-- body -->
    <div class="container mt-5 ">
        <div class="row">
            <!-- stat -->
            <!-- calories per day -->
            <div class="col border border-black d-flex flex-column align-items-left">
                <div>
                    <h1>
                        Your stats
                    </h1>
                </div>
                <div class="d-flex align-items-baseline">
                    <h5>Your Maintenance Calories:</h5>
                    <div class="ms-2">
                        <h5 id="BMR"> {{ maintainCalo }} calories per day</h5>
                    </div>
                </div>

                //...

                <h5 class="me-2">
                    Your BMI score: {{ BMI }}
                </h5>
                <span> Which means you are classified as <b>{{ classBMI }}</b></span>
                <!-- Macronutrients -->
                <div>
                    <h1>
                        Macronutrients
                    </h1>
                    <div class="">
                        <div class="d-flex ">
                            <h5 class="">
                                Maintenance
                            </h5>

                            <p class="macro">&nbsp;{{ maintainCalo }} calories per day</p>
                        </div>

                    //...

                    </div>
                </div>
            </div>
            <!-- BMI table -->
            <div class="col border border-black">
                <BMIScoreTable />
            </div>
        </div>
    </div>
</template>
```
- **Description:** The template is structured to accommodate the Statistics Display Section and Maintenance Calories and Macronutrients Section sections.