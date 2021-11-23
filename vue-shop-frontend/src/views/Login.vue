<template>
  <div id="LoginPage">
    <form
      method="get"
      v-on:submit.prevent="submitLogin"
      class="flex flex-col max-w-sm p-10 mx-auto mt-20 overflow-hidden rounded shadow-lg  w-75"
    >
      <h1 class="text-xl">Einloggen</h1>

      <fieldset class="block mt-5">
        <label class="inline-block w-24 text-sm" for="email">E-Mail</label>
        <input
          type="email"
          autocomplete="off"
          name="email"
          id="email"
          v-model="email"
          placeholder="Ihre E-Mail"
        />
      </fieldset>
      <fieldset class="block">
        <label class="inline-block w-24 text-sm" for="password">Passwort</label>
        <input
          type="password"
          autocomplete="off"
          name="password"
          id="password"
          v-model="password"
          placeholder="Ihr Passwort"
        />
      </fieldset>

      <loading></loading>

      <input type="submit" value="Einloggen" class="px-5 mt-3 cursor-pointer" />

      <error-renderer></error-renderer>

      <div class="flex flex-col items-center justify-content-center">
        <span>oder</span>
        <router-link :to="'register'" class="text-lightBlue-600"
          >Registrieren</router-link
        >
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

type LoginState = {
  email: string;
  password: string;
};

export default defineComponent({
  data: (): LoginState => ({
    email: "",
    password: "",
  }),
  methods: {
    async submitLogin(): Promise<void> {
      // add login trigger
      console.log("test");
    },
  },
});
</script>
