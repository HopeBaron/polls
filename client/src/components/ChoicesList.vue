<template>
  <nav class="panel">
    <p class="panel-heading">Choices</p>
    <div class="panel-block">
      <slot></slot>
    </div>
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
      v-on:choice-delete-event="onChoiceDelete"
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
    initialViews: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      search_input: "",
      views: this.initialViews,
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
    onChoiceDelete(choiceView: ChoiceView) {
      const index = this.views.indexOf(choiceView);
      this.views.splice(index, 1);
    },
  },
  components: {
    ChoiceCard,
  },
});
</script>
