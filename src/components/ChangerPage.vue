<template>
  <n-space vertical size="large">
    <CurrencyExchanger></CurrencyExchanger>
    <CurrencyHistory></CurrencyHistory>
  </n-space>
</template>

<script setup lang="ts">
import CurrencyExchanger from "./CurrencyExchanger.vue";
import CurrencyHistory from "./CurrencyHistory.vue";
</script>

<style scoped></style>
