# History.vue Documentation
The History.vue file is a Vue.js component responsible for rendering the user's nutrition history. This document provides an explanation of the template structure, script logic, and the overall purpose of the component.

## Script Logic

### Reactive Variables
```js
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

```
- **Description:** The script section uses the `script setup` syntax. It imports the `NutritionTracker` component and Firebase authentication functions. It defines a `ref` named `uid` to store the user ID.

    - The `onMounted` lifecycle hook is used to asynchronously fetch the user's ID once the component is mounted.

    - Inside the `onAuthStateChanged` callback, the user's ID is assigned to the `uid` variable if the user is authenticated; otherwise, it sets `uid` to null.

  
### Template Structure
```html
<template>
  <div>
    <NutritionTracker :uid="uid" />
  </div>
</template>
```
- **Description:** The template includes a single div element that encapsulates the NutritionTracker component. It passes the uid (user ID) as a prop to the NutritionTracker component for fetching and displaying the user's nutrition history.