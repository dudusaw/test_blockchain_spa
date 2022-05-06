<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
    <n-layout>
      <n-layout-header bordered>
        <n-menu
          v-model:value="activeKey"
          mode="horizontal"
          :options="menuOptions"
          style="padding: 15px; font-size: 1.5rem; padding-left: 150px"
      /></n-layout-header>
      <n-layout-content content-style="padding: 24px;">
        <router-view style="margin: 0 auto; width: 80%"></router-view>
      </n-layout-content>
    </n-layout>
  </n-config-provider>
</template>

<script setup lang="ts">
import { ref, h } from "vue";
import type { GlobalThemeOverrides, MenuOption } from "naive-ui";
import {
  NMenu,
  NConfigProvider,
  NThemeEditor,
  darkTheme,
  NLayout,
  NLayoutContent,
  NLayoutHeader,
  NSpace,
} from "naive-ui";
import { RouterLink } from "vue-router";

const activeKey = ref<string | null>(null);

const themeOverrides: GlobalThemeOverrides = {};

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "changer",
          },
        },
        { default: () => "Обменник" }
      ),
    key: "changer",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "profile",
          },
        },
        { default: () => "Профиль" }
      ),
    key: "profile",
  },
];
</script>

<style>
body {
  background-color: #101014;
}
</style>
