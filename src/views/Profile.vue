<!-- Profile.vue -->
<template>
    <div class="profile-container">

        <div  class="h-full">
            <div class="border-b-2 block md:flex">
                <div class="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
                    <div class="flex justify-between">
                        <span class="text-xl font-semibold block">Your Profile</span>
                    </div>

                    <div class="w-full p-8 mx-2 flex justify-center">
                        <img id="showImage" class="max-w-xs w-32 items-center border"
                            src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200"
                            alt="">
                    </div>
                </div>

                <div v-if="!editMode" class="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
                    <div class="rounded  shadow p-6">

                        <div class="pb-6">
                            <label for="name" class="font-semibold text-gray-700 block pb-1">Name</label>
                            <div class="flex">
                                <input v-model="profile.name" disabled id="username"
                                    class="border-1  rounded-r px-4 py-2 w-full" type="text" />
                            </div>
                        </div>

                        <div class="pb-4">
                            <label class="font-semibold text-gray-700 block pb-1">Age (years)</label>
                            <input v-model="profile.age" disabled class="border-1  rounded-r px-4 py-2 w-full" />
                        </div>

                        <div class="pb-4">
                            <label class="font-semibold text-gray-700 block pb-1">Height (cm)</label>
                            <input v-model="profile.height" disabled class="border-1  rounded-r px-4 py-2 w-full" />
                        </div>

                        <div class="pb-4">
                            <label class="font-semibold text-gray-700 block pb-1">Weight (kg)</label>
                            <input v-model="profile.weight" disabled class="border-1  rounded-r px-4 py-2 w-full" />
                        </div>

                        <div class="pb-4">
                            <label class="font-semibold text-gray-700 block pb-1">Gender</label>
                            <input v-model="profile.gender" disabled class="border-1  rounded-r px-4 py-2 w-full" />
                        </div>
                        <button @click="toggleEditMode" class="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-4 py-2 hover:bg-gray-800">Edit</button>
                    </div>
                    
                </div>

                <div v-else class="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
                    <div class="rounded  shadow p-6">
                        <div class="pb-6">
                            <label for="name" class="font-semibold text-gray-700 block pb-1">Name</label>
                            <div class="flex">
                                <input v-model="profile.name"  id="username"
                                    class="border-1  rounded-r px-4 py-2 w-full" type="text" />
                            </div>
                        </div>

                        <div class="pb-4">
                            <label class="font-semibold text-gray-700 block pb-1">Age (years)</label>
                            <input v-model="profile.age"  class="border-1  rounded-r px-4 py-2 w-full" />
                        </div>

                        <div class="pb-4">
                            <label class="font-semibold text-gray-700 block pb-1">Height (cm)</label>
                            <input v-model="profile.height"  class="border-1  rounded-r px-4 py-2 w-full" />
                        </div>

                        <div class="pb-4">
                            <label class="font-semibold text-gray-700 block pb-1">Weight (kg)</label>
                            <input v-model="profile.weight"  class="border-1  rounded-r px-4 py-2 w-full" />
                        </div>

                        <div class="pb-4">
                            <label class="font-semibold text-gray-700 block pb-1">Gender</label>
                            <input v-model="profile.gender" class="border-1  rounded-r px-4 py-2 w-full" />
                        </div>

                        <button @click="saveProfile" type="submit" class="-mt-2 text-md font-bold text-white bg-[#00aa71] rounded-full px-4 py-2 hover:bg-[#008a5c] mr-2">Save</button>
                        <button @click="toggleEditMode" type="button" class="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-4 py-2 hover:bg-gray-800">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
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
  
<style scoped>
.profile-container {
    max-width: 900px;
    margin: 0 auto;
}

.profile-header {
    text-align: center;
    margin-bottom: 20px;
}

.profile-summary {
    margin-top: 30px;
}

.profile-info {
    text-align: left;
}</style>
