import Vue from 'vue';
import Vuex, { Module } from 'vuex';
import { ethers } from 'ethers';

Vue.use(Vuex);

export interface Wallet {
  isConnected: boolean;
  account: string | null;
  provider: ethers.providers.Web3Provider | null;
  signer: ethers.Signer | null;
  balance: ethers.BigNumber | null;
}

const walletModule: Module<Wallet, any> = {

  namespaced: true,

  state: {
    isConnected: false,
    account: null,
    provider: null,
    signer: null,
    balance: null,
  } as Wallet,
  mutations: {
    setWallet(state, account) {
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      state.provider = provider;
      state.signer = provider.getSigner();
      state.account = account;
      state.isConnected = true;
    },
    setBalance(state, balance) {
      state.balance = balance;
    }
  },
  actions: {
    async updateBalance({ state, commit }) {
      if (!state.isConnected) { return }
      state.provider.getBalance(state.account).then(balance => {
        commit('setBalance', balance.toString())
      })
    },
    async connectWallet({ state, commit }) {
      if (state.isConnected) {
        return;
      }
      (window as any).ethereum.enable().then((accounts: string[]) => {
        if (accounts.length > 0) {
          commit('setWallet', accounts[0]);
        }
      });
    },
  },
};

export default walletModule;
