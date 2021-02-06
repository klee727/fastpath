<template>
  <div class="home">
    <Console title="Console" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Console from "@/components/Console.vue"; // @ is an alias to /src

@Component({
  components: {
    Console,
  },
})
export default class Home extends Vue {}
</script>
