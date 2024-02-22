<script setup>
import { RouterLink, RouterView } from 'vue-router'
import DarkMode from './components/DarkMode.vue';
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import router from './router';

const isLoggedIn = ref(false);

let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});

const handleLogOut = () => {
  signOut(auth).then(() => {
    router.push("/");
  });
}

</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/nutrition">Nutrition</RouterLink>
        <RouterLink v-if="!isLoggedIn" to="/login">Log in</RouterLink>
        <RouterLink v-if="!isLoggedIn" to="/register">Register</RouterLink>
        <RouterLink v-if="isLoggedIn" to="/history">History</RouterLink>
        <RouterLink v-if="isLoggedIn" to="/profile">Profile</RouterLink>
        <button class="focus:outline-none text-white bg-red-700
        hover:bg-red-800 focus:ring-4 
        focus:ring-red-300 font-medium  text-sm px-2.5 py-1 mx-2
        dark:bg-red-600 dark:hover:bg-red-700
        dark:focus:ring-red-900" 
          @click="handleLogOut" v-if="isLoggedIn">
          Log out
        </button>
        <DarkMode />
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style >

html.dark {
  color-scheme: dark;
  
}

html.dark nav a.router-link-exact-active {
  color: rgb(187, 187, 187);
}

html.dark nav a {
  border-left: 1px solid rgba(187, 187, 187, 0.45);
}

html.dark nav a:first-of-type {
  border: 0;
}

header {
  line-height: 1.5;
  max-height: 100vh;

  display: flex;
  justify-content: right;
  align-items: center;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  
  /* background-color: blueviolet; */
}

nav a.router-link-exact-active {
  color: var(--color-text);
}


nav a.router-link-exact-active:hover {
  background-color: transparent;
}


h1 {
  color: hsla(160, 100%, 37%, 1);
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    font-size: 1rem;

    padding: 1rem 0;
    margin: .5rem 0;
  }
}
</style>
