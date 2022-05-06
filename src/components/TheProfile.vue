<template>
  <n-card title="Профиль" size="medium">
    <n-grid x-gap="12" cols="1 m:2" responsive="screen">
      <n-gi>
        <n-space vertical size="large">
          <template v-for="currency in supportedCurrencies">
            <div>
              <n-input-group>
                <n-input-group-label style="width: 100px">{{
                  currency.label
                }}</n-input-group-label>
                <n-input-group-label style="min-width: 100px">
                  {{
                    (store.currencyBalance[currency.value]
                      ? store.currencyBalance[currency.value]
                      : 0
                    ).toFixed(3)
                  }}
                </n-input-group-label>
                <n-input-number
                  v-model:value="inputNumbers[currency.value]"
                  :style="{ width: '150px' }"
                  placeholder="Добавить"
                  :show-button="false"
                  clearable
                />
                <n-button
                  type="primary"
                  @click="
                    currencyValueChanged(
                      currency.value,
                      inputNumbers[currency.value]
                    )
                  "
                >
                  +
                </n-button>
                <n-button
                  type="primary"
                  ghost
                  @click="
                    currencyValueChanged(
                      currency.value,
                      -inputNumbers[currency.value]
                    )
                  "
                >
                  -
                </n-button>
              </n-input-group>
            </div>
          </template>
          <n-statistic label="Баланс портфеля в USD" style="margin: 16px 0">
            {{ `$${balanceSummedToUSD.toFixed(3)}` }}
          </n-statistic>
        </n-space>
      </n-gi>
      <n-gi
        ><canvas
          id="currencyBalanceChart"
          width="200"
          height="200"
          style="opacity: 0.8"
        ></canvas> </n-gi
    ></n-grid>
  </n-card>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { chartColors, supportedCurrencies } from "../plugins/currency";
import { useStore } from "../plugins/store";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const store = useStore();
const inputNumbers = reactive<{
  [p: string]: number;
}>({});

let currencyBalanceChart: null | InstanceType<typeof Chart> = null;

const balanceSummedToUSD = ref(0);
const updateBalanceSum = () => {
  store.sumAllBalanceToUSD().then((res) => (balanceSummedToUSD.value = res));
};
updateBalanceSum();

const currencyValueChanged = (id: string, value: number) => {
  store.addToBalance(id, value);
  updateChart();
  updateBalanceSum();
};

onMounted(() => {
  const ctx = "currencyBalanceChart";
  currencyBalanceChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: [],
      datasets: [],
    },
    options: {
      responsive: true,
      animation: {
        animateRotate: false,
      },
    },
  });
  updateChart();
});

const updateChart = () => {
  if (currencyBalanceChart) {
    currencyBalanceChart.data.labels = Object.entries(
      store.currencyBalance
    ).map((el) => el[0]);
    currencyBalanceChart.data.datasets = [
      {
        data: Object.entries(store.currencyBalance).map((el) => el[1]),
        backgroundColor: chartColors.map((el) => el.backgroundColor),
      },
    ];
    currencyBalanceChart.update();
  }
};
</script>

<style scoped></style>
