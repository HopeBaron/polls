<template>
  <div class="is-flex is-flex-direction-column m-7">
    <input
      class="input"
      v-model="username"
      type="text"
      placeholder="Username"
    />
    <input
      class="input"
      v-model="password"
      type="password"
      placeholder="Password"
    />
    <button class="button" @click="login()">Login</button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const refresh = await this.$store.state.service.authenticate(
        this.username,
        this.password
      );
      this.$store.commit("setToken", refresh);
    },
  },
});
</script>
