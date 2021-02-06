<template>
  <div class="hello">
    <h3>{{ title }}</h3>
    <div class="clickable" @click="connect" v-if="!isConnected">
      <span>connect</span>
    </div>
    <div v-else>
      <vue-typed-js :typeSpeed="10" :strings="[account]">
        <span class="typing"></span>
      </vue-typed-js>
      <!-- {{ account }} with {{ balance }} -->
    </div>
    <div class="clickable" @click="add"><span>deploy</span></div>

    <div>
      <ul>
        <li v-for="(entry, index) in logEntries" v-bind:key="index">
          <vue-typed-js
            :typeSpeed="10"
            :showCursor="false"
            :strings="[entry.message]"
          >
            <span class="typing"></span>
          </vue-typed-js>
          <!-- {{ entry.id }} {{ entry.message }} -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import ityped from "ityped";
import vueTyped from "vue-ityped";
import VueTypedJs from "vue-typed-js";

Vue.use(VueTypedJs);

const wallet = namespace("wallet");

interface LogEntry {
  id: number;
  message: string;
}

@Component({
  directives: {
    ityped,
    typed: vueTyped,
  },
})
export default class Console extends Vue {
  @Prop() private title!: string;
  @wallet.State("isConnected") isConnected!: boolean;
  @wallet.State("account") account!: string | null;
  @wallet.State("balance") balance!: string | null;
  @wallet.Action("connectWallet") connectWallet!: Function;
  @wallet.Action("updateBalance") updateBalance!: Function;

  private logEntries: LogEntry[];
  private count = 0;
  private timer = 0;

  public created(): void {
    this.logEntries = [];
  }

  public mounted(): void {
    this.timer = setInterval(this.updateBalance, 1000);
  }

  public beforeDestroy(): void {
    clearInterval(this.timer);
  }

  add() {
    this.logEntries.push({ id: this.count, message: "new message" });
    this.count += 1;
    console.log(this.logEntries);
    this.$forceUpdate();
  }

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
.clickable {
  text-decoration: underline;
}
.ityped-cursor {
  font-size: 2.2rem;
  color: #888;
  opacity: 1;
  -webkit-animation: blink 0.3s infinite;
  -moz-animation: blink 0.3s infinite;
  animation: blink 0.3s infinite;
  animation-direction: alternate;
}
</style>
