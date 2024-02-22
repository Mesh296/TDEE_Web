# Nutrition.vue Documentation
The Nutrition.vue file is a component within the Vue.js application responsible for presenting nutrition information for various foods. This document provides a breakdown of the template structure, script logic, and style considerations for developers.

## Script Logic

### Imports and Composables
```js
import { useNutritionInfo } from '@/composables/useNutritionInfo';
import FoodSearch from '.././components/nutrition/FoodSearch.vue';
import NutritionInfo from '.././components/nutrition/NutritionInfo.vue';

const { food, nutritionInfo, getNutritionInfo } = useNutritionInfo();

const getFoodName = async (foodName) => {
  await getNutritionInfo(foodName);
};
```
```js
//useNutritionInfo.js
import { ref } from 'vue';
import axios from 'axios';

const apiKey = 'e5FpDu9gY6PdfuHUlvHyrHKvPfnKr0U4DkaFlYrX';

export function useNutritionInfo() {
  const food = ref("");
  const nutritionInfo = ref({});

  async function getNutritionInfo(foodName) {
    const apiUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${foodName}&api_key=${apiKey}`;
    try {
      const response = await axios.get(apiUrl);
      const data = response.data;

      if (data.foods && data.foods.length > 0) {
        const food = data.foods[0];
        const nutrients = food.foodNutrients;
        nutritionInfo.value = {
          calories: nutrients.find(n => n.nutrientName === "Energy")?.value || 0,
          protein: nutrients.find(n => n.nutrientName === "Protein")?.value || 0,
          fat: nutrients.find(n => n.nutrientName === "Total lipid (fat)")?.value || 0,
          carbs: nutrients.find(n => n.nutrientName === "Carbohydrate, by difference")?.value || 0,
        };
      } else {
        console.log("No nutrition information found for", foodName);
      }
    } catch (error) {
      console.error('Error sending API request: ', error);
    }
  }

  return { food, nutritionInfo, getNutritionInfo };
}
```
- **Description:** This section imports necessary components and composables, including `useNutritionInfo` for managing nutritional data. It also defines the `getFoodName` function to retrieve nutrition information based on the entered food name.
  
### Template Structure
```html
<template>
  <div class="container">
    <h1 class="nutrition-header">Nutrition Infomation</h1>
    <span>This tool provides nutrition information for various foods based on data from the </span>
    <a href="https://api.nal.usda.gov" target="_blank" rel="noopener noreferrer" class="text-blue-500">USDA FoodData Central API</a>.
    <span>All nutritional values are calculated per 100 grams of the respective food.</span>
  </div>
  <div class="flex flex-col">
    <FoodSearch :getFoodName="getFoodName" />
    <NutritionInfo :foodName="food" :nutritionInfo="nutritionInfo" />
  </div>

  <!-- Understanding Nutrition -->
  <div class="container mt-5 p-4 bg-gray-100 dark:bg-[#1a1a1a]">
      <h2 class="text-2xl font-semibold mb-3">Understanding Nutrition</h2>

      <p class="mb-4">
        <strong>Macronutrients (Macros):</strong> In the context of health and fitness, macronutrients are chemical compounds that provide bulk energy. They include carbohydrates, proteins, and fats. This calculator focuses on daily carbohydrate, protein, and fat needs.
      </p>

      <p class="mb-4">
        <strong>Micronutrients:</strong> Another essential part of human nutrition consisting of vitamins and dietary minerals such as Vitamin A, copper, iron, and iodine. Micronutrients are needed in smaller quantities compared to macronutrients.
      </p>

      <h3 class="text-xl font-semibold mb-2">Protein</h3>
      <p class="mb-4">
        Proteins are organic compounds comprised of amino acids, essential to well-being. Sources include both animal (meat, dairy) and plant-based (beans, legumes, nuts).
      </p>

      <h3 class="text-xl font-semibold mb-2">Carbohydrates (Carbs)</h3>
      <p class="mb-4">
        Carbohydrates are classified as sugar, starch, or fiber. They are essential for energy, with complex carbohydrates (from vegetables, fruits, whole grains) being beneficial.
      </p>

      <h3 class="text-xl font-semibold mb-2">Fat</h3>
      <p class="mb-4">
        Fats, though typically viewed as unhealthy, have structural and metabolic functions. Healthy fats include monounsaturated, polyunsaturated, and omega-3 fatty acids.
      </p>

      <h2 class="text-2xl font-semibold mb-3">Daily Calorie Needs</h2>
      <p class="mb-4">
        The number of calories a person needs daily is based on factors like height, weight, age, and activity level. The calculator estimates daily caloric needs using BMR/RDEE and activity factors.
      </p>

      <p class="mb-4">
        <strong>General recommendations:</strong> Limit saturated fat, avoid trans fats, and replace them with healthier fats. Daily caloric needs vary based on factors like gender and activity level.
      </p>

      <p class="mb-4">
        <strong>Average daily caloric needs:</strong> Men: 2000-3000, Women: 1600-2400. Actual needs depend on individual factors.
      </p>
    </div>
 
</template>
```
- **Description:** The template is structured to accommodate the Introduction Section and Food Search and Nutrition Info Sections sections.