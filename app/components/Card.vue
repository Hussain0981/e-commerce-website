<template>
  <div
    @mouseenter="whenHover = true"
    @mouseleave="whenHover = false"
    class="relative flex flex-col gap-y-2 bg-white h-96 py-2 px-4 rounded-xl shadow-md"
  >
    <!--  Rating -->
    <div class="flex items-center justify-end">
      <div class="bg-amber-100 flex items-center px-2 rounded-full gap-x-1">
        <IconsStar class="h-4 w-4 fill-yellow-500 stroke-yellow-500" />
        <span class="text-sm font-bold">{{ card.rating?.rate }}</span>
      </div>
    </div>

    <!-- 📷 Product Image -->
    <div class="relative flex justify-center w-full">
      <img class="h-40 md:p-5 p-1" :src="card.image" alt="Product Image" />

      <!-- Hover Buttons -->
      <div class="right-0 -bottom-6 absolute flex flex-col gap-y-1 z-40">
        <!--  Fade Transition -->
        <Transition name="fade">
          <span v-if="whenHover" @click="goToDetails(card.id)">
            <IconsLink
              class="h-7 w-7 p-1 rounded-full bg-orange-500 text-white cursor-pointer"
            />
          </span>
        </Transition>

        <span @click="handleCard(card.id)">
          <IconsPlus
            class="h-7 w-7 p-1 rounded-full bg-orange-500 text-white cursor-pointer"
          />
        </span>
      </div>
    </div>

    <!--  Category -->
    <span class="opacity-50 border-t border-gray-300">{{ card.category }}</span>

    <!--  Title -->
    <h2 class="text-xl font-bold text-gray-800">
      {{ limitedText(card.title, 12) }}
    </h2>

    <!--  Description -->
    <p class="text-sm text-gray-700">{{ truncate(card.description, 70) }}</p>

    <!--  Price & Count -->
    <div
      class="absolute right-0 bottom-2 w-full px-3 flex justify-between items-center"
    >
      <span class="text-orange-500 font-bold text-[18px]">
        ${{ card.price }}
      </span>
      <span>Products {{ card.rating?.count }}</span>
    </div>
  </div>
</template>

<script setup>
import { truncate } from "../utils/limitedDes";
import { limitedText } from "../utils/limitedTitle";

defineProps({
  card: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(['cardList'])

const whenHover = ref(false);

// ✅ navigateTo ko function me wrap kiya
const goToDetails = (id) => {
  navigateTo(`/details/${id}`);
};

function handleCard(id){
    emit('cardList', id)
    
}
</script>

<style scoped>
/* Fade animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
