<template>
  <a class="panel-block">
    <span class="panel-icon">
      <i class="fas fa-book" aria-hidden="true"></i>
    </span>
    {{ view.choice.proposal }}
    <div id="operations" style="margin-left: auto">
      <i class="fas fa-delete-left" @click="deleteView()"></i>
      <div id="vote-operations">
        <p>{{ score }}</p>
        <i class="fas fa-arrow-up" @click="upVote()"></i>
        <i class="fas fa-arrow-down" @click="downVote()"></i>
      </div>
    </div>
  </a>
</template>
<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
export default defineComponent({
  props: ["initalView"],
  data() {
    return {
      view: this.initalView,
    };
  },
  computed: {
    score() {
      return this.view.getScore();
    },
  },
  methods: {
    async downVote() {
      this.view.downVote();
    },

    deleteView() {
      this.view.delete();
      this.$emit("choice-delete-event", this.view);
    },

    async upVote() {
      this.view.upVote();
    },
  },
});
</script>
