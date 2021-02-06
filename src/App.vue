<template>
  <div id="app">
    <div id="nav"><router-link to="/">Home</router-link></div>
    <router-view />
  </div>
</template>

<style>
@font-face {
  font-family: TTWPGOTT;
  src: url("./assets/VeteranTypewriter.ttf");
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  font-family: "TTWPGOTT";
  /* text-align: center; */
  /* height: 100%; */
}

#nav {
  padding: 20px;
}

#nav a {
  font-weight: bold;
  color: #000;
}
</style>
