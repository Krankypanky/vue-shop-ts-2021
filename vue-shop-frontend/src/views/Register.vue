<template>
  <div id="RegisterPage">
    <form
      action="post"
      v-on:submit.prevent="submitRegister"
      class="
        flex flex-col
        w-75
        mx-auto
        mt-20
        max-w-sm
        rounded
        overflow-hidden
        shadow-lg
        p-10
      "
    >
      <h1 class="text-xl">Registrierung</h1>
      <fieldset class="block mt-5">
        <label class="text-sm inline-block w-24" for="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          v-model="name"
          placeholder="Ihr Name"
          autocomplete="off"
        />
      </fieldset>
      <fieldset class="block">
        <label class="text-sm inline-block w-24" for="email">E-Mail</label>
        <input
          type="email"
          name="email"
          id="email"
          v-model="email"
          placeholder="Ihre E-Mail"
          autocomplete="off"
        />
      </fieldset>
      <fieldset class="block">
        <label class="text-sm inline-block w-24" for="password">Passwort</label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="password"
          placeholder="Ihr Passwort"
          autocomplete="off"
        />
      </fieldset>
      <fieldset class="block">
        <label class="text-sm inline-block w-24" for="password_confirmation"
          >Passwort Wiederholung</label
        >
        <input
          type="password"
          name="password_confirmation"
          id="password_confirmation"
          v-model="passwordConfirmation"
          placeholder="Ihr Passwort"
          autocomplete="off"
        />
      </fieldset>

      <loading></loading>

      <input
        type="submit"
        value="Registrieren"
        class="px-5 mt-8 cursor-pointer"
      />

      <error-renderer :errors="errors"></error-renderer>

      <div class="flex flex-col items-center justify-content-center">
        <span>oder</span>
        <router-link :to="'login'" class="text-lightBlue-600">Einloggen</router-link>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { AxiosError } from "axios";
import { defineComponent } from "vue";
import Loading from "@/components/Loading.vue";
import ErrorRenderer from "@/components/ErrorRenderer.vue";
import AuthService from "../services/AuthService";
import errorFormatter from "../helpers/error-formatter";

type RegisterState = {
  errors: string[];
  loading: boolean;

  email: string;
  password: string;
  name: string;
  passwordConfirmation: string;
};

export default defineComponent({
  components: { Loading, ErrorRenderer },
  data: (): RegisterState => ({
    // state
    errors: [],
    loading: false,

    // form state
    password: "111111",
    name: "Sean Moghadam",
    passwordConfirmation: "111111",
    email: "mogahdam@live.at",
  }),
  methods: {
    async submitRegister(event: Event): Promise<void> {
      event.preventDefault();

      this.loading = true;
      this.errors = [];
      try {
        const token = await AuthService.register(
          this.$config.apiUrl,
          this.email,
          this.password,
          this.passwordConfirmation,
          this.name
        );
        if (token) {
          // this.$toast.success("I'm an info toast!");
          this.$router.push("login");
        }
      } catch (e) {
        console.error(e);
        this.errors = errorFormatter(e as AxiosError);
      }
    },
  },
});
</script>
