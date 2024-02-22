<!-- Register.vue -->
<template>
  <div class="register-container">
    <h2>Register</h2>
      <!-- <div class="form-group">
        <label for="username">Username:</label>
        <input v-model="username" type="text" id="username" required />
      </div> -->
      <div class="form-group">
        <label for="email">Email:</label>
        <input v-model="email" type="text" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input v-model="password" type="password" required />
      </div>
      <button @click="register">Register</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router';
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";
import db from '../main'

const email = ref("");
const password = ref("");
const router = useRouter();

const register = async () => {
  try {
    const data = await createUserWithEmailAndPassword(getAuth(), email.value, password.value);
    console.log("Successfully registered!");
    console.log(data.user.uid);
    console.log(data.user.email);

    const usersCollection = collection(db, 'users');

    const userDocRef = doc(usersCollection, data.user.uid);

    await setDoc(userDocRef, {
      uid: data.user.uid,
      email: data.user.email,
    });
    router.push("/");

  } catch (error) {
    console.log(error.code);
    alert(error.message);
  }
}

</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  margin-bottom: 10px;
}

button {
  background-color: #28a745;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
