<template>
  <n-card title="Конвертер валют" size="medium">
    <n-space vertical size="medium">
      <n-input-group>
        <n-select
          v-model:value="firstSelect"
          :style="{ width: '200px' }"
          :options="(supportedCurrencies as any)"
          placeholder="Валюта"
          @update:value="onSecondValueChange"
        />
        <n-input
          v-model:value="firstInputField"
          :style="{ width: '33%' }"
          placeholder="Значение перевода"
          :loading="firstInputLoading"
          @update:value="onFirstValueChange"
        />
      </n-input-group>
      <n-input-group>
        <n-select
          v-model:value="secondSelect"
          :style="{ width: '200px' }"
          :options="(supportedCurrencies as any)"
          placeholder="Валюта"
          @update:value="onFirstValueChange"
        />
        <n-input
          v-model:value="secondInputField"
          :loading="secondInputLoading"
          :style="{ width: '33%' }"
          placeholder="Значение перевода"
          @update:value="onSecondValueChange"
        />
      </n-input-group>
      <n-statistic label="Результат" style="margin-top: 16px">
        <span v-if="firstSelect && secondSelect">
          {{
            `${(+firstInputField).toFixed(
              3
            )} ${firstSelect} = ${(+secondInputField).toFixed(
              3
            )} ${secondSelect}`
          }}</span
        >
        <span v-else>Не выбрано валют</span>
      </n-statistic></n-space
    >
  </n-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  convertCurrency,
  SupportedCurreciesIds,
  supportedCurrencies,
} from "../plugins/currency";

const firstSelect = ref<string>();
const secondSelect = ref<string>();

const firstInputField = ref<string>("");
const secondInputField = ref<string>("");

const firstInputLoading = ref(false);
const secondInputLoading = ref(false);

const onFirstValueChange = async () => {
  if (
    firstSelect.value &&
    firstInputField.value.length > 0 &&
    secondSelect.value
  ) {
    secondInputLoading.value = true;
    const res = await convertCurrency(
      firstSelect.value as SupportedCurreciesIds,
      +firstInputField.value,
      secondSelect.value as SupportedCurreciesIds
    );
    secondInputField.value = res.toString();
    secondInputLoading.value = false;
  }
};
const onSecondValueChange = async () => {
  if (
    secondSelect.value &&
    secondInputField.value.length > 0 &&
    firstSelect.value
  ) {
    firstInputLoading.value = true;
    const res = await convertCurrency(
      secondSelect.value as SupportedCurreciesIds,
      +secondInputField.value,
      firstSelect.value as SupportedCurreciesIds
    );
    firstInputField.value = res.toString();
    firstInputLoading.value = false;
  }
};
</script>

<style scoped></style>
