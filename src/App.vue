<script setup>
import { SafeArea } from 'capacitor-plugin-safe-area';
import { onMounted, ref } from 'vue';
import Input from '@/components/Input.vue';
import NavBar from '@/components/NavBar.vue';

const deviceHeight = `${window.screen.height}px`;

onMounted(async () => {
  // Set fixed app height
  const setAppHeight = () => {
    const vh = window.screen.height;
    console.log(vh, 'vh');

    document.documentElement.style.setProperty('--app-height', `${window.screen.height}px`);
  };
  setAppHeight();
  window.addEventListener('resize', setAppHeight);

  // Get initial safe area insets
  const { insets } = await SafeArea.getSafeAreaInsets();
  for (const [key, value] of Object.entries(insets)) {
    document.documentElement.style.setProperty(`--safe-area-inset-${key}`, `${value}px`);
  }

  // Get status bar height (if needed)
  const { statusBarHeight } = await SafeArea.getStatusBarHeight();
  console.log(statusBarHeight, 'statusbarHeight');

  await SafeArea.removeAllListeners();

  // Listen to changes
  await SafeArea.addListener('safeAreaChanged', (data) => {
    const { insets } = data;
    for (const [key, value] of Object.entries(insets)) {
      document.documentElement.style.setProperty(`--safe-area-inset-${key}`, `${value}px`);
    }
  });
});

const exampleText = ref('');
</script>

<template>
  <div
    class="fixed flex flex-col w-screen overflow-hidden"
    :style="{ height: deviceHeight }"
    @click=""
  >
    <div class="relative h-full w-full px-6 pt-safe">
      <Input
        v-model="exampleText"
        enterkeyhint="done"
        placeholder="Example"
        label=""
        required
      />
    </div>
    <NavBar />
  </div>
</template>
