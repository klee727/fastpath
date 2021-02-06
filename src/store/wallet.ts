import Vue from 'vue';
import Vuex, { Module } from 'vuex';
import { ethers } from 'ethers';

Vue.use(Vuex);

export interface Wallet {
  isConnected: boolean
  account: string | null
  provider: ethers.providers.Web3Provider | null
  signer: ethers.Signer | null
}

const module: Module<Wallet, any> = {

  namespaced: true,

  state: {
    isConnected: false,
    account: null,
    provider: null,
    signer: null
  } as Wallet,
  mutations: {
    connect(state, accounts) {
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      state.provider = provider;
      state.signer = provider.getSigner();
      state.account = accounts[0];
      state.isConnected = true;

      console.log(state.account)
    }
  },
  actions: {
    async connectWallet({ state, commit }) {
      if (state.isConnected) {
        return;
      }
      (window as any).ethereum.enable().then((accounts: string[]) => {
        commit("connect", accounts)
      })
    }
  },
}


export default new Vuex.Store({
  modules: {
    wallet: module
  },
});
