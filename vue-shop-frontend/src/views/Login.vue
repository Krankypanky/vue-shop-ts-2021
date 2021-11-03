<template>
  <div id="LoginPage">
    <form
      method="get"
      v-on:submit.prevent="submitLogin"
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
      <h1 class="text-xl">Einloggen</h1>

      <fieldset class="block mt-5">
        <label class="text-sm inline-block w-24" for="email">E-Mail</label>
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
        <label class="text-sm inline-block w-24" for="password">Passwort</label>
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

      <error-renderer :errors="errors"></error-renderer>

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
import { AxiosError } from "axios";
import { defineComponent } from "vue";
import { useToast } from "vue-toastification";
import Loading from "@/components/Loading.vue";
import ErrorRenderer from "@/components/ErrorRenderer.vue";
import AuthService from "../services/AuthService";
import errorFormatter from "../helpers/error-formatter";

type LoginState = {
  errors: string[];
  email: string;
  password: string;
  loading: boolean;
};

export default defineComponent({
  components: { Loading, ErrorRenderer },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data: (): LoginState => ({
    errors: [],
    email: "",
    password: "",
    loading: false,
  }),
  methods: {
    async submitLogin(event: Event): Promise<void> {
      event.preventDefault();
      this.loading = true;
      this.errors = [];
      try {
        await AuthService.login(this.$config.apiUrl, this.email, this.password);
         this.toast.success("Login erfolgreich!", {
            timeout: 2000,
          });
        this.$router.push("/");
      } catch (e) {
        this.errors = errorFormatter(e as AxiosError);
      }
    },
  },
});
</script>
