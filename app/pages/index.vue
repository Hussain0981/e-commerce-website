<template>
    <section>

        <div
            class="h-screen flex flex-col md:flex-row md:justify-between justify-center items-center  bg-[url('/assets/images/bg.png')] md:px-10 px-2 bg-cover bg-top">
            <!-- left div -->
            <div class="md:flex-1 ">
                <div class="flex flex-col gap-6">
                    <h1 class="text-4xl leading-normal">Buying and selling goods online through digital <span
                            class=" text-orange-500 font-bold px-1 rounded-md">platforms</span> and websites.</h1>
                    <div>
                        <button class="bg-orange-500 text-white rounded-full  p-3 flex items-center gap-x-1">
                            <span class="cursor-pointer">Latest products</span>
                            <span class="bg-white p-1 rounded-full ml-2">
                                <IconsBag class="h-4 w-4 cursor-pointer text-black" />
                            </span>
                            <span class="bg-white p-1 rounded-full">
                                <IconsDotsArrow class="h-4 w-4 cursor-pointer rotate-40 text-black" />
                            </span>
                        </button>

                    </div>
                    <div>
                        <p>We provide a seamless e-commerce experience where customers can explore, shop, and securely
                            purchase
                            products online with ease. Our platform offers convenience, variety, and trusted service to
                            meet
                            the
                            needs of modern shoppers.</p>
                    </div>
                </div>
            </div>
            <!-- right div -->
            <div class="md:flex-1">
            </div>
        </div>

        <!--  -->
        <div class="py-10 md:px-10 px-2">
            <div class="flex flex-col">
                <h1 class="text-2xl font-bold capitalize">Our Products</h1>
                <span class="mt-2 h-1 rounded-full bg-gradient-to-r from-orange-500 to-white w-[200px]"></span>
            </div>
            <div class="py-10">
                <div class="grid md:grid-cols-3 xl:grid-cols-5 gap-6">
                    <Card v-for="item in products" :key="item.id" :card="item" @cardList="handleList" />
                </div>
            </div>
            <div v-if="showCart">
                <div class="z-40 bg-black/50 h-screen w-full fixed inset-0">

                </div>
                <CartList class="min-h-screen w-full md:w-1/2 fixed bg-white z-50 top-0 right-0 " />
            </div>
        </div>
    </section>
</template>
<script setup>
const { showCart } = useToShowList()

const products = ref(null);
const loading = ref(false);
const cardItems = ref([]);
const { $axios } = useNuxtApp()
async function handleProducts() {
    try {
        loading.value = true;
        const res = await $axios.get('products')
        if (res.data) {
            products.value = res.data
        }

    } catch (err) {
        console.log(err);

    }
}
import { useCartStore } from '~/store/useCartStore';
const cartStore = useCartStore()

function handleList(id) {
    const product = products.value.find(e => e.id === id)
    cartStore.addToCart(product)
}

onMounted(() => {
    handleProducts()
})

</script>