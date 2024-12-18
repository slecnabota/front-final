<template>
  <div class="auth">
    <div class="auth__wrapper">
      <h2>Register</h2>
      <form @submit.prevent="handleRegister">
        <input v-model="user.username" type="text" placeholder="Username" required/>
        <input v-model="user.email" type="email" placeholder="Email" required/>
        <input v-model="user.password" type="password" placeholder="Password" required/>
        <button type="submit">Register</button>
      </form>
      <p v-if="error" style="color: #f81717; margin-top: 10px; font-size: 12px; text-align: center"><b>{{ error }}</b>
      </p>
      <h4>У вас уже есть аккаунт?
        <router-link to="/login">Войти</router-link>
      </h4>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {IRegister} from "@/interfaces";
import router from "@/router";
import {TaskApp} from "@/composables";

const {register} = TaskApp()

const user = ref<IRegister>({
  username: "",
  email: "",
  createdAt: new Date().toLocaleString(),
  password: "",
})

const error = ref<string>(null)

const handleRegister = () => {
  register(user.value).then(response => {
    if (response.status === 200) {
      router.push('/login')
    } else {
      error.value = response.response.data
    }
  })
};
</script>

<style scoped>
.auth {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth__wrapper {
  backdrop-filter: blur(15px);
  padding: 100px;
  width: 500px;
  margin: auto;
  color: white;
}

a {
  color: white;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

form input {
  border: none;
  padding: 8px 10px;
  border-radius: 30px;
  font-size: 12px;
  outline: none;
}

form button {
  border: none;
  padding: 7px 10px;
  background-color: darkcyan;
  color: white;
  font-weight: 500;
  cursor: pointer;
  border-radius: 30px;
}

form button:hover {
  background-color: #027272;
}

h4 {
  text-align: center;
  margin-top: 20px;
}
</style>