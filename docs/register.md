# Register.vue Documentation
The Register.vue file is a Vue.js component responsible for rendering the user registration form. This document provides an explanation of the template structure, script logic, and styles within the component.

## Script Logic

### Reactive Variables
```js
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
```
- **Description:** The script section uses the script setup syntax. It imports the necessary functions from Firebase, including authentication functions, Firestore functions, and the router from Vue.js.

    - The register method uses Firebase authentication to create a new user with the provided email and password.

    - It also creates a corresponding user document in Firestore with the user's UID and email.

  
### Template Structure
```html
<template>
  <div class="register-container">
    <h2>Register</h2>
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
```
- **Description:** The template includes a registration form with email and password input fields. The user can input their registration details, and the `Register` button triggers the `register` method.