<!-- History.vue -->

<template>
  <div>
    <NutritionTracker :uid="uid" />
  </div>
</template>

<script setup>
import NutritionTracker from '../components/history/NutritionTracker.vue';
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { ref, onMounted } from 'vue';

const uid = ref(null);

onMounted(() => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      uid.value = user.uid;
    } else {
      // User is signed out
      uid.value = null;
    }
  });
});

console.log(uid)
</script>

<style scoped></style>
