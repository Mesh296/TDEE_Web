<!-- Login.vue -->
<template>
  <div class="login-container">
    <h2>Login</h2>
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
      <button @click="login">Login</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router';

const email = ref("");
const password = ref("");
const router = useRouter();

const login = () => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Successfully logged in!");
      console.log(data)
      router.push("/");
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
}

</script>

<style scoped>
.login-container {
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
  background-color: #007bff;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
