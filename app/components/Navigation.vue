<template>
  <nav
    class="flex justify-between items-center h-16 px-6 fixed top-0 left-0 w-full z-50 transition-colors duration-300"
    :class="[position ? 'bg-gray-200 shadow' : 'bg-transparent']"
  >
    <!-- Logo -->
    <div>
      <h1 class="text-2xl font-bold text-orange-500">Clone 3...</h1>
    </div>

    <!-- Desktop Menu -->
    <ul class="hidden md:flex gap-x-6">
      <li class="cursor-pointer border-b py-1" :class="[isActive('/') ? ' border-orange-600' : 'border-transparent']">Home</li>
      <li class="cursor-pointer  border-b py-1" :class="[isActive('/shop') ? ' border-orange-600' : 'border-transparent']">Shop</li>
      <li class="cursor-pointer  border-b py-1" :class="[isActive('/contact') ? ' border-orange-600' : 'border-transparent']">Contact</li>
    </ul>

    <!-- Right Side -->
    <div class="flex items-center gap-x-6">
      <!-- Cart -->
      <li class="cursor-pointer relative list-none" @click="handleCart">
        <IconsShop class="h-7 w-7" />
        <div
          class="absolute -top-2 -right-3 h-5 w-5 rounded-full text-xs grid place-items-center z-30 text-white bg-orange-400"
        >
          <span>{{ cartStore.cardItems.length }}</span>
        </div>
      </li>

      <!-- Login -->
      <button
        class="px-4 py-1 rounded-full border border-gray-500 hover:border-transparent transition-all cursor-pointer hover:bg-orange-500 hover:text-white"
      >
        Login
      </button>

      <!-- Hamburger Icon (Mobile) -->
      <button class="md:hidden" @click="showMenu = !showMenu">
        <svg
          v-if="!showMenu"
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <transition name="slide">
      <div
        v-if="showMenu"
        class="fixed top-0 left-0 w-3/4 h-full bg-white z-40 flex flex-col items-start p-6 shadow-lg md:hidden"
      >
        <li class="cursor-pointer py-2 list-none">Home</li>
        <li class="cursor-pointer py-2 list-none">Shop</li>
        <li class="cursor-pointer py-2 list-none">Contact</li>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useCartStore } from "~/store/useCartStore";

const showMenu = ref(false);
const route = useRoute()

function isActive(path) {
  return route.path === path
}

const { showCart } = useToShowList();
function handleCart() {
  showCart.value = true;
  console.log(showCart.value);
}

const cartStore = useCartStore();

const position = ref(false);
onMounted(() => {
  window.addEventListener("scroll", handleNav);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleNav);
});

function handleNav() {
  position.value = window.scrollY > 50;
}
</script>

<style>
.slide-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
</style>
