<template>
  <div class="is-flex is-flex-direction-column m-5 p-4">
    <ChoicesList :initialViews="views">
      <input
        type="text"
        placeholder="Enter new proposal"
        class="button is-fullwidth is-outlined mr-3"
        v-model="newProp"
      />
      <button class="button is-link is-outlined" @click="click_button()">
        Send
      </button>
    </ChoicesList>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import ChoiceView from "./ChoiceView";
import { Choice } from "../models/Choice";
import ChoicesList from "../components/ChoicesList.vue";

export default defineComponent({
  data() {
    return {
      views: [] as ChoiceView[],
      newProp: "",
    };
  },
  mounted() {
    this.get_choices(0, 100);
  },
  components: {
    ChoicesList,
  },
  methods: {
    click_button() {
      this.submit_choice(this.newProp);
      this.newProp = "";
    },
    get_choices(offset: number, limit: number) {
      this.$store.state.service
        .list(offset, limit)
        .then((choices: Choice[]) => {
          const map = choices.map((value) => new ChoiceView(value));
          this.views.push(...map);
        });
    },

    submit_choice(proposal: string) {
      this.$store.state.service
        .create(proposal, this.$store.state.token!)
        .then((choice: Choice) => this.views.push(new ChoiceView(choice)));
    },
  },
});
</script>
