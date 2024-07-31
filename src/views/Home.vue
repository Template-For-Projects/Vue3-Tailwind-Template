<script setup>
import { ref, onMounted } from 'vue';
import UserService from '@/services/UserService';
import ProductService from '@/services/ProductService'
import PersonalDataTable from '@/components/PersonalDataTable.vue';


const user = ref(null);
const error = ref(null);
const otherSection = ref(null);

const products = ref(null);

onMounted(async () => {
  try {
    const userData = await UserService.getUser();
    user.value = userData;
  } catch (err) {
    error.value = err;
    console.error('Failed to fetch user data:', err);
  }
});

const scrollToOtherSection = () => {
  otherSection.value.scrollIntoView({ behavior: 'smooth' });
};

onMounted(async () => {
  try {
    const data = await ProductService.getProducts();
    products.value = data;
    console.log('Concerti caricati:', products.value);
    return data;
  } catch (error) {
    console.error('Errore nel caricamento dei concerti:', error);
  }

});
</script>

<template>

  <!-- JUMBO -->
  <section
    class="h-screen w-104 flex flex-col items-center justify-center big-smartphone:flex-row big-smartphone:w-200">
    <div class="mb-6 big-smartphone:mr-10 big-smartphone:mb-0">
      <img class="w-36 laptop:w-44" src="https://cdn.pixabay.com/photo/2013/07/12/18/39/smartphone-153650_1280.png"
        alt="smartphone">
    </div>
    <!-- text and buttons -->
    <div class="flex flex-col items-center justify-center w-88 big-smartphone:items-baseline laptop:w-104">
      <h1 class="text-black-gray font-black text-3xl leading-none mb-3">Welcome!</h1>
      <h3 class="text-dark-gray font-medium text-custom-xs mb-5 laptop:text-sm">Discover a world of convenience at our
        one-stop
        online
        marketplace.
        Browse thousands of products across multiple categories, all from the comfort of your home.
        Enjoy secure transactions, fast shipping, and excellent customer service.
        Shop with confidence thanks to our easy returns policy and dedicated support team.</h3>
      <!-- BTN -->
      <div class="flex items-center justify-center w-96 big-smartphone:justify-start">
        <!-- FIRST -->
        <a href="https://github.com/saraobia" target="_blank">
          <div class="flex items-center justify-center w-40 mr-2 relative overflow-hidden bg-black-gray py-3 text-white font-bold  rounded-xl shadow-xl
           transition-all duration-300 ease-in-out
           hover:text-black-gray group hover:shadow-none">
            <span class="relative z-10">Discover </span>
            <div
              class="absolute inset-0 bg-white shadow-inner transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out">
            </div>
          </div>
        </a>
        <!-- SECOND -->
        <button @click="scrollToOtherSection" class="w-40 ml-2 relative overflow-hidden bg-white py-3 text-dark-gray font-bold rounded-xl shadow-xl
           transition-all duration-300 ease-in-out
           hover:text-white group hover:shadow-none" type="submit">
          <span class="relative z-10">Explore</span>
          <div
            class="absolute inset-0 bg-black-gray shadow-inner transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out">
          </div>
        </button>
      </div>
    </div>
  </section>

  <!-- Data table -->
  <section class="mb-10">
    <div data-aos="fade-up">
      <PersonalDataTable />
    </div>
  </section>

  <!-- Text section -->
  <section ref="otherSection" class="w-104 py-20 tablet:w-128 desktop:w-200">
    <div class="text-gray-p text-sm" data-aos="fade-up" data-aos-anchor-placement="top-center">
      <h3 class="text-black-gray text-lg font-black">Subtitle</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem unde doloribus voluptatem, dolores alias quod
        incidunt nobis hic doloremque voluptas.</p>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam illum, quos minima odit ea distinctio
        incidunt consequuntur neque ipsam quisquam deserunt velit reiciendis quibusdam excepturi sit, quo minus vitae
        exercitationem.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae esse cum, modi quis doloribus atque excepturi
        facere beatae officiis quidem perspiciatis labore in quia corporis nesciunt aliquid quam suscipit accusantium?
        Saepe, nam iste accusantium voluptatum illo sed, hic fugiat minus at itaque eaque eum tempora reprehenderit odio
        quasi porro. Quisquam ad officiis magni eos perferendis itaque veritatis dignissimos inventore, dicta repellat
        quae quidem magnam possimus saepe? Exercitationem, recusandae. Totam quas ducimus minus unde illo aut
        perspiciatis amet odio voluptates officiis illum repellendus, fugit libero minima labore veritatis, ea laborum
        inventore praesentium voluptate? A doloribus maxime veniam provident culpa error quidem!</p>
    </div>
  </section>

</template>