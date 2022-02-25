<template>
  <nav class="panel">
    <p class="panel-heading">suggestions</p>
    <div class="panel-block">
      <p class="control has-icons-left">
        <input
          class="input"
          type="text"
          placeholder="Search"
          v-model="search_input"
        />
        <span class="icon is-left">
          <i class="fas fa-search" aria-hidden="true"></i>
        </span>
      </p>
    </div>
    <ChoiceCard
      v-for="item in filterAndSort(this.views)"
      :key="item.id"
      :initalView="item"
    />
  </nav>
</template>
<script lang="ts">
import ChoiceCard from "./ChoiceCard.vue";
import { defineComponent } from "@vue/runtime-core";
import ChoiceView from "../views/ChoiceView";

export default defineComponent({
  props: {
    views: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      search_input: "",
    };
  },
  methods: {
    sortByScore(a: ChoiceView, b: ChoiceView) {
      const aScore = a.getScore();
      const bScore = b.getScore();
      if (aScore > bScore) return -1;
      else if (aScore == bScore) return 0;
      else return 1;
    },
    filterAndSort(list: ChoiceView[]) {
      return list
        .filter((view) =>
          view
            .getProposal()
            .toLowerCase()
            .includes(this.search_input.toLowerCase())
        )
        .sort((a, b) => this.sortByScore(a, b));
    },
  },
  components: {
    ChoiceCard,
  },
});
</script>
