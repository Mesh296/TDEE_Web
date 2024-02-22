<!-- NutritionTracker.vue -->
<template>
  <div class="flex row items-start">
    <h1 class="nutrition-header ml-16 mb-4">Nutrition Tracker</h1>
    <div class="container col-3 ">
      <div class="form-group">
        <label for="foodInput">Enter Food:</label>
        <input class="form-control" v-model="food" id="foodInput" />
      </div>
      <div class="form-group">
        <label for="foodAmount">Amount (g):</label>
        <input class="form-control" v-model.number="foodAmount" type="number" id="foodAmount" />
      </div>
      <div>
        <button class="btn btn-sm py-2 px-3 add-food-btn mt-2"
          :class="{ 'btn-outline-light': isDark, 'btn-outline-dark': !isDark }" type="button" @click="addFood">
            Add food</button>
      </div>
    </div>

    <div class="col-4">
      <h3 class=" text-[#282828] dark:text-[#bbbbbb]">Eaten Food List</h3>
      <ul class="eaten-list">
        <li v-for="(eatenFood, index) in eatenFoods" :key="index" class="eaten-item flex">
          <div class="eaten-info ">
            {{ eatenFood.name }}: {{ eatenFood.amount }} g - {{ eatenFood.calories }} kcal - {{ eatenFood.date }}
          </div>
          <button @click="deleteFood(index)" class="btn btn-sm btn-outline-danger ml-auto">Delete</button>
        </li>
      </ul>
    </div>


    <div class="col-4">
      <h3 class="text-[#282828] dark:text-[#bbbbbb]">Daily Calorie Total</h3>
      <div class="daily-total" v-for="(total, date) in dailyCalorieTotal" :key="date">
        <h5 class="text-[#008a5c]">{{ date }}: {{ total }} kcal</h5>
      </div>
    </div>

  </div>
</template>
  
<script>
import { ref, onMounted, watchEffect } from 'vue';
import { useNutritionInfo } from '@/composables/useNutritionInfo';
import { isDark } from '@/services/DarkModeService';
import db from '../../main'
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  getDocs,
  setDoc
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default {

  setup() {
    const auth = getAuth();
    const { food, nutritionInfo, getNutritionInfo } = useNutritionInfo();
    const dailyCalorieTotal = ref({});
    const eatenFoods = ref([]);
    const foodAmount = ref(100);

    // Get the current user ID
    const userId = ref(getAuth().currentUser?.uid);

    // Watch for changes in authentication state
    onAuthStateChanged(auth, (user) => {
      userId.value = user?.uid;
    });

    // Fetch data when userId changes
    watchEffect(() => {
      if (userId.value) {
        const eatenFoodsCollection = collection(db, `users/${userId.value}/eatenFoods`);
        const dailyTotalCollection = collection(db, `users/${userId.value}/dailyTotal`);

        onSnapshot(eatenFoodsCollection, (snapshot) => {
          eatenFoods.value = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              date: doc.date,
              ...data,
            };
          });
        });

        onSnapshot(dailyTotalCollection, (snapshot) => {
          dailyCalorieTotal.value = {};
          snapshot.docs.forEach((doc) => {
            const date = doc.data().date;
            if (!dailyCalorieTotal.value[date]) {
              dailyCalorieTotal.value[date] = 0;
            }
            dailyCalorieTotal.value[date] += doc.data().total;
          });
        });
      }
    });


    async function addFood() {
      await getNutritionInfo(food.value);

      if (nutritionInfo.value.calories === 0) {
        alert("Please type the name of the food first!");
        return;
      }

      // Get the current user ID
      const userId = getAuth().currentUser.uid;

      alert("Food has been added successfully!");
      const calories = calculateCalories(nutritionInfo.value.calories, foodAmount.value);
      const currentDate = getCurrentDate();

      // Save eaten food to Firestore and capture the document ID
      const eatenFoodRef = await addDoc(collection(db, `users/${userId}/eatenFoods`), {
        name: food.value,
        amount: foodAmount.value,
        calories: calories,
        date: currentDate,
      });
      const newFoodId = eatenFoodRef.id;

      // Save daily total calories to Firestore
      await calculateDailyCalorieTotal(calories, currentDate);
    }

    async function calculateDailyCalorieTotal(calories, currentDate) {
      // Get the current user ID
      const userId = getAuth().currentUser.uid;

      // Check if there's an existing document for the current date
      const dailyTotalCollection = collection(db, `users/${userId}/dailyTotal`);
      const querySnapshot = await getDocs(dailyTotalCollection);
      const existingDoc = querySnapshot.docs.find((doc) => doc.data().date === currentDate);

      if (existingDoc) {
        // Update the total calories if the document for today already exists
        const docRef = doc(db, `users/${userId}/dailyTotal`, existingDoc.id);
        await setDoc(docRef, { total: existingDoc.data().total + calories }, { merge: true });
      } else {
        // Add a new document for the current date if it doesn't exist
        await addDoc(collection(db, `users/${userId}/dailyTotal`), {
          date: currentDate,
          total: calories,
        });
      }
    }

    function calculateCalories(caloriesPer100g, amount) {
      const result = (caloriesPer100g * amount) / 100;
      return Math.round(result);
    }

    function getCurrentDate() {
      const now = new Date();
      const formattedDate = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
      return formattedDate;
    }

    async function deleteFood(index) {
      const userId = getAuth().currentUser.uid;
      const eatenFoodId = eatenFoods.value[index].id; // Assuming there is an "id" property in your eatenFood objects

      console.log("eaten food ID: ", eatenFoodId)
      console.log("userID: ", userId)
      // Delete the eatenFood document from Firestore
      const eatenFoodRef = doc(db, `users/${userId}/eatenFoods`, eatenFoodId);
      deleteDoc(eatenFoodRef);

      // Update the daily total calories in Firestore
      const caloriesToRemove = eatenFoods.value[index].calories;
      const currentDate = eatenFoods.value[index].date;
      calculateDailyCalorieTotal(-caloriesToRemove, currentDate);

      // Remove the deleted item from the local eatenFoods array
      eatenFoods.value.splice(index, 1);
    }

    return { food, nutritionInfo, addFood, deleteFood, dailyCalorieTotal, eatenFoods, foodAmount, isDark };
  },
};
</script>
  
<style scoped>
.input-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.form-group {
  margin-right: 10px;
}

.add-food-btn {
  cursor: pointer;
}

.eaten-list {
  list-style: none;
  padding: 0;
}

.eaten-item {
  margin-bottom: 5px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.daily-total {
  margin-bottom: 10px;
}
</style>
  