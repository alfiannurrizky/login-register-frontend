<script setup>

import axios from 'axios'
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const errors = ref([])
const user = ref([])
const success = ref(false)

const login = async () => {

  let formData = new FormData

  formData.append('email', email.value)
  formData.append('password', password.value)

  await axios.post('http://localhost:8000/api/login',formData)
    .then(response => {

      success.value = success
    })
    .catch(error => {
      if(error.response.status == 401)
      {
        alert(error.response.data.message)
      }

      errors.value = error.response.data.errors
    })
}

</script>

<template>

  <v-alert v-if="success" text="Login Successfully" color="success" class="mb-10"></v-alert>

  <v-card>

    <v-card-title>
      <h2>Login</h2>
    </v-card-title>
        <v-card-text class="mt-3">
          <v-sheet width="370" class="mx-auto">
            <v-form @submit.prevent="login()">
              
              <v-text-field v-model="email" :rules="rules" label="Email"></v-text-field>
              <v-alert v-if="errors.email" type="error">
                  <span>{{ errors.email[0] }}</span>
              </v-alert>

              <v-text-field v-model="password" :rules="rules" label="Password" type="password"></v-text-field>
                <v-alert v-if="errors.password" type="error">
                  <span>{{ errors.password[0] }}</span>
                </v-alert>

              <v-btn type="submit" block class="mt-2">Submit</v-btn>
            </v-form>
          </v-sheet>
          <v-layout justify-space-between>
              <router-link :to="{ name: 'auth.register' }" class="mt-5">Don't have an account?</router-link>
            </v-layout>
        </v-card-text>

  </v-card>
  
</template>