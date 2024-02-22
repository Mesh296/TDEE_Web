# Login.vue Documentation
The Login.vue file is a Vue.js component responsible for rendering the user login form. This document provides an explanation of the template structure, script logic, and styles within the component.

## Script Logic

### Reactive Variables
```js
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
```
- **Description:** The script section uses the `script setup` syntax. It imports the necessary functions from Firebase, including authentication functions and the router from Vue.js.

    - The `login` method uses Firebase authentication to sign in the user with the provided email and password.

  
### Template Structure
```html
<template>
  <div class="login-container">
    <h2>Login</h2>
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
```
- **Description:** The template includes a login form with email and password input fields. The user can input their credentials, and the Login button triggers the login method.