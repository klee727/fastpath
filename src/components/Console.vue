<template>
  <div class="hello">
    <h3>{{ title }}</h3>
    <a @click="connect" v-if="!isConnected">connect</a>
    <div v-else>{{ account }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const wallet = namespace("wallet");

@Component
export default class Console extends Vue {
  @Prop() private title!: string;
  @wallet.State("isConnected") isConnected!: boolean;
  @wallet.State("account") account!: string | null;
  @wallet.Action("connectWallet") connectWallet!: Function;

  connect() {
    this.connectWallet();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  padding: 20px;
}
</style>
