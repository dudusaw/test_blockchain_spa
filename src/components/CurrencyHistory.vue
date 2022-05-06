<template>
  <n-card title="Изменения валют за 14 дней" size="medium">
    <n-space vertical size="large">
      <n-select
        v-model:value="coinIdSet"
        :options="searchableCurrencies"
        multiple
        :max-tag-count="3"
        @update:value="onSelectChange" />
      <canvas id="myChart" width="400" height="200"></canvas
    ></n-space>
  </n-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";
import { chartColors, searchableCurrencies } from "../plugins/currency";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const coinIdSet = ref(["bitcoin"]);
let myChart: null | InstanceType<typeof Chart> = null;
const onSelectChange = (val: string[]) => {
  coinIdSet.value = val;
  updateChart(val);
};

const updateChart = (idSet: string[]) => {
  type ReturnHistoryType = {
    prices: number[][];
    id: string;
  };
  const promises: Promise<ReturnHistoryType>[] = [];
  idSet.forEach((id) => {
    promises.push(
      axios
        .get<ReturnHistoryType>(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=14`
        )
        .then((res) => {
          res.data.id = id;
          return res.data;
        })
    );
  });
  Promise.all(promises).then((res) => {
    const datasets: any = [];
    const labels: any = [];
    res.forEach((el, index) => {
      datasets.push({
        label: el.id,
        data: el.prices.map((el) => el[1]),
        fill: false,
        ...chartColors[index],
        tension: 0.4,
      });
    });
    if (res.length > 0) {
      labels.push(
        ...res[0].prices.map((el) => new Date(el[0]).toLocaleDateString())
      );
    }
    if (myChart) {
      myChart.data.datasets = datasets;
      myChart.data.labels = labels;
      myChart.update();
    }
  });
};

onMounted(() => {
  const ctx = "myChart";
  myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [],
    },
    options: {
      elements: {
        point: {
          radius: 0,
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (item) => {
              return `${item.dataset.label} ${item.parsed.y.toFixed(4)} USD`;
            },
          },
        },
      },
      interaction: {
        mode: "nearest",
        intersect: false,
        axis: "x",
      },
      responsive: true,
      scales: {
        x: {
          grid: {
            color: "#363636",
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 20,
          },
        },
        y: {
          grid: {
            color: "#363636",
          },
        },
      },
    },
  });
  updateChart(coinIdSet.value);
});
</script>

<style scoped></style>
