<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  height: 100vh;
  width: 100%;
  background-image: url('assets/bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
  background-position: center center;
}

.p-select-list-container {
  background: grey !important;
}

.p-datepicker-panel {
  background-color: grey !important;
}

.p-datepicker-input, .p-select-label.p-placeholder, .p-inputnumber-input {
  border: 1px solid black !important;
  padding: 5px 10px !important;
  border-radius: 10px !important;
}

.p-select-label.p-placeholder {
  margin-right: 10px;
}

</style>
