<template>
  <div class="is-flex is-flex-direction-column m-6 p-4">
    <ChoicesList :views="views" />
    <div>
      <input
        type="text"
        placeholder="Enter new proposal"
        class="button is-outlined is-fullhd is-rounded is-primary mr-3"
        v-model="newProp"
      />
      <button class="button is-link is-outlined" @click="click_button()">
        Send
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CardChoice from "./components/ChoiceCard.vue";
import ChoicesList from "./components/ChoicesList.vue";
import { Choice } from "./models/Choice";
import ChoiceView from "./views/ChoiceView";
@Options({
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
    CardChoice,
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
        .create(proposal)
        .then((choice: Choice) => this.choices.push(new ChoiceView(choice)));
    },
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
