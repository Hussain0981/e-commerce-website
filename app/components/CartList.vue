<template>
  <div class="flex flex-col h-screen">
    <!-- Header -->
    <div class="relative flex items-center text-white bg-orange-400">
      <span class="absolute top-5 left-2 cursor-pointer" @click="handleClose">
        <IconsLeftArrow class="h-7 w-7 font-bold" />
      </span>
      <h1 class="text-center font-bold text-2xl py-4 justify-center flex items-center w-full">
        Cart List Items
      </h1>
    </div>

    <!-- Cart List (Scrollable if > 100vh) -->
    <div class="flex-1 overflow-y-auto">
      <div
        v-for="item in listStore.cardItems"
        :key="item.id"
        class="h-28 px-4 py-2 border-b"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-start gap-x-2">
            <div class="h-20 w-20">
              <img
                class="h-full w-full object-cover object-center"
                :src="item.image"
                alt=""
              />
            </div>
            <div>
              <h1 class="text-sm font-semibold">{{ item.title }}</h1>
              <div class="flex flex-col text-sm">
                <span>$ {{ item.price }} Price</span>
                <span>$ {{ tofixed(item.price, item.count) }} Subtotal</span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-x-3">
            <button
              @click="cartStore.increase(item.id)"
              class="text-2xl font-bold"
            >
              +
            </button>
            <span>{{ item.count }}</span>
            <button
              @click="cartStore.decrease(item.id)"
              class="text-2xl font-bold"
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="p-4 bg-white shadow-md">
      <div class="bg-black text-white flex justify-center mb-2 py-2 rounded">
        <span>$ {{ totalPrice.toFixed(2) }}</span>
      </div>
      <div class="flex gap-x-2 justify-center">
        <button
          @click="handleClear"
          class="text-sm font-bold px-4 py-2 bg-gray-300 hover:text-white rounded-md hover:bg-orange-500 transition-all duration-200 cursor-pointer"
        >
          Clear List
        </button>
        <button
          class="text-sm font-bold px-4 py-2 bg-gray-300 hover:text-white rounded-md hover:bg-orange-500 transition-all duration-200 cursor-pointer"
        >
          Print Bill
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "~/store/useCartStore";
import { tofixed } from "../utils/tofixed";

const cartStore = useCartStore();

const totalPrice = computed(() => {
  return cartStore.cardItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );
});

const { showCart } = useToShowList();

function handleClear() {
  cartStore.clearCart();
  showCart.value = false;
}

const listStore = useCartStore();

function handleClose() {
  showCart.value = false;
}
</script>
