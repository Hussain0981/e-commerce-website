<template>
  <div class="px-20 h-screen">
    <div class="p-5 h-screen" v-if="loading">Loading...</div>
    <div v-else class="grid pr-5 md:grid-cols-2 gap-4 items-center">
      <!-- 🖼️ Product Image -->
      <div class="flex justify-center">
        <img
          :src="details?.image"
          :alt="details?.title"
          class="rounded-xl shadow-lg w-full max-w-sm object-contain p-10"
        />
      </div>

      <!-- 📋 details? Info -->
      <div class="space-y-4">
        <!-- Category -->
        <span
          class="text-sm uppercase tracking-wide text-gray-500 bg-gray-100 px-3 py-1 rounded-full"
        >
          {{ details?.category }}
        </span>

        <!-- Title -->
        <h1 class="text-2xl md:text-3xl font-bold text-gray-800">
          {{ details?.title }}
        </h1>

        <!-- Rating -->
        <div class="flex items-center gap-2">
          <span class="text-yellow-500">⭐</span>
          <span class="font-medium">{{ details?.rating.rate }}</span>
          <span class="text-gray-500 text-sm">({{ details?.rating.count }} reviews)</span>
        </div>

        <!-- Description -->
        <p class="text-gray-600 leading-relaxed">
          {{ details?.description }}
        </p>

        <!-- Price -->
        <div class="text-3xl font-bold text-orange-500">
          ${{ details?.price }}
        </div>

        <!-- Actions -->
        <div class="flex gap-4 mt-6">
          <button
            class="px-6 py-3 rounded-xl bg-orange-500 text-white font-semibold shadow-md hover:bg-orange-600 transition"
          >
            Add to Cart
          </button>
          <button
            class="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
const { $axios } = useNuxtApp()
const details = ref(null)
const loading = ref(false)
const route = useRoute()

definePageMeta({
  layout: 'auth'
})

// Function to fetch product details
async function handleDetails(id) {
  loading.value = true
  try {
    const res = await $axios.get(`products/${id}`)
    details.value = res?.data
    console.log(details.value);
    
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

// Watch for route param changes
watch(
  () => route.params.id,
  (newVal) => {
    if (newVal) {
      handleDetails(newVal)
      console.log("Current ID:", newVal)
    }
  },
  { immediate: true }
)
</script>
