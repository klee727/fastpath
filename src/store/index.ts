import Vuex from 'vuex';

import walletModule from './wallet';

export default new Vuex.Store({
  modules: {
    wallet: walletModule,
  },
});
