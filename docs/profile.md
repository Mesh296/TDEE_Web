# Profile.vue Documentation
The Profile.vue file is a Vue.js component responsible for rendering the user profile information. This document provides an explanation of the template structure, script logic, and styles within the component.

## Script Logic

### Reactive Variables
```js
<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';

const auth = getAuth();
const db = getFirestore();

const userId = ref(null);
const profile = ref({
    name: '',
    age: '',
    height: '',
    weight: '',
    gender: '',
});

const editMode = ref(false);
let originalProfile = null;

const toggleEditMode = () => {
    if (editMode.value) {
        // Cancel editing, restore original values
        profile.value = { ...originalProfile };
        originalProfile = null;
    } else {
        // Enter editing mode, store the original values
        originalProfile = { ...profile.value };
    }

    editMode.value = !editMode.value;
};

const saveProfile = async () => {
    try {
        // Update user document in Firestore
        const usersCollection = doc(db, 'users', userId.value);
        await updateDoc(usersCollection, profile.value);

        console.log('Profile saved:', profile.value);
        originalProfile = { ...profile.value };
        toggleEditMode(); // Exit edit mode after saving
    } catch (error) {
        console.error('Error saving user profile:', error);
    }
};

const fetchUserProfile = async () => {
    try {
        const usersCollection = doc(db, 'users', userId.value);
        const docSnap = await getDoc(usersCollection);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            profile.value = { ...userData };
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
};

// Listen for changes in authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        userId.value = user.uid;
        fetchUserProfile();
    }
});

// Watch for changes in user ID and fetch the profile
watchEffect(() => {
    if (userId.value) {
        fetchUserProfile();
    }
});
</script>

</script>
```
- **Description:** The script section uses the script setup syntax. It imports necessary functions from Firebase, including authentication functions and Firestore functions.

    - The `toggleEditMode` method toggles between the editable and non-editable modes of the user profile.

    - The `saveProfile` method updates the user document in Firestore with the edited profile information.

    - The `fetchUserProfile` method retrieves the user's profile information from Firestore.
  
### Template Structure
```html
<template>
    <div class="profile-container">
        <!-- ... (Omitted for brevity) ... -->

        <div v-if="!editMode" class="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
            <!-- ... (Omitted for brevity) ... -->
        </div>

        <div v-else class="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
            <!-- ... (Omitted for brevity) ... -->
        </div>
    </div>
</template>
```
- **Description:** The template section includes a user profile display with editable fields. It provides the user's `name`, `age`, `height`, `weight`, and `gender`. The profile is initially displayed in a non-editable mode. When the user clicks the `Edit` button, the fields become editable, and the `Save` and `Cancel` buttons appear.