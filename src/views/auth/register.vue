<script setup>

import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const errors = ref([])
const success = ref(false)

const register = async () => {

  let formData = new FormData

    formData.append('name', name.value)
    formData.append('email', email.value)
    formData.append('password', password.value)
    formData.append('password_confirmation', password_confirmation.value)

  await axios.post('http://localhost:8000/api/register',formData)
    .then(response => {
      
      success.value = success

      setTimeout(() => {
                router.push({
                name: 'auth.login'
             })
            }, 2000)
    })
    .catch(error => {
      errors.value = error.response.data.errors
    })
}

</script>

<template>

  <v-alert v-if="success" text="Registered Successfully" color="success" class="mb-10"></v-alert>

  <v-card>

    <v-card-title>
      <h2>Register</h2>
    </v-card-title>

    <v-card-text class="mt-3">
      <v-sheet width="370" class="mx-auto">
        <v-form @submit.prevent='register()'>
          <v-text-field v-model="name" :rules="rules" label="Username"></v-text-field>
           <v-alert v-if="errors.name" type="error">
                  <span>{{ errors.name[0] }}</span>
            </v-alert>

          <v-text-field v-model="email" :rules="rules" label="Email"></v-text-field>
           <v-alert v-if="errors.email" type="error">
                  <span>{{ errors.email[0] }}</span>
            </v-alert>
            
          <v-text-field v-model="password" :rules="rules" label="Password" type="password"></v-text-field>
           <v-alert v-if="errors.password" type="error">
                  <span>{{ errors.password[0] }}</span>
            </v-alert>

          <v-text-field v-model="password_confirmation" :rules="rules" label="Password Confirmation" type="password"></v-text-field>
           <v-alert v-if="errors.password_confirmation" type="error">
                  <span>{{ errors.password_confirmation[0] }}</span>
            </v-alert>
          <v-btn type="submit" block class="mt-2">Submit</v-btn>
        </v-form>
      </v-sheet>
    </v-card-text>

  </v-card>
  
</template>
