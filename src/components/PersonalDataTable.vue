<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import ProductService from '@/services/ProductService';

//Router to change in single page
const router = useRouter();
const Products = ref(null);
//const fields = ['id', 'item', 'item'];
const fields = ['id', 'title', 'author', 'isbn', 'publicationYear', 'availableCopies'];
const searchQuery = ref('');
const selectedField = ref('all');
const currentPage = ref(1);
const itemsPerPage = 10;
const isOpen = ref(false);

onMounted(async () => {
  try {
    const data = await ProductService.getProducts();
    Products.value = data.map(product => ({
      ...product,
      publicationYear: formatDate(product.publicationYear)
    }));
  } catch (error) {
    console.error('Error during products upload:', error);
  }
});

//Formated data
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const filteredProduct = computed(() => {
  if (!Products.value) return [];
  return Products.value.filter(product => {
    if (selectedField.value === 'all') {
      return fields.some(field =>
        product[field].toString().toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    } else {
      return product[selectedField.value].toString().toLowerCase().includes(searchQuery.value.toLowerCase());
    }
  });
});

const paginatedProducts = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  return filteredProduct.value.slice(startIndex, startIndex + itemsPerPage);
});

const totalPages = computed(() =>
  Math.ceil(filteredProduct.value.length / itemsPerPage)
);

const goToPage = (page) => {
  currentPage.value = page;
};

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectField = (field) => {
  selectedField.value = field;
  isOpen.value = false;
};

const getFieldLabel = (field) => {
  if (field === 'all') return 'All fields';
  return field.charAt(0).toUpperCase() + field.slice(1);
};

const goToProductDetail = (id) => {
  router.push({ name: 'ProductDetail', params: { id: id } });
};

</script>

<template>
  <div class="flex justify-center items-center">
    <div
      class="w-120 rounded-xl shadow-2xl flex flex-col bg-white p-12 tablet:p-20 tablet:w-200 laptop:w-240 laptop:p-20">
      <!-- Logo -->
      <div class="flex items-center justify-center mb-6 text-xl tablet:text-2xl text-black-gray font-black">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
          class="w-6 h-6 tablet:w-8 tablet:h-8 mr-1">
          <path
            d="M12.378 1.602a.75.75 0 0 0-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03ZM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 0 0 .372-.648V7.93ZM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 0 0 .372.648l8.628 5.033Z" />
        </svg>
        <p>Products</p>
      </div>

      <!-- Search field -->
      <div
        class=" mb-6 w-full items-center justify-center flex flex-col tablet:flex-row space-y-2 tablet:space-y-0 tablet:space-x-2">
        <div class="relative inline-block text-left w-72 items-center justify-center tablet:w-auto">
          <button type="button" @click="toggleDropdown"
            class="inline-flex justify-center w-72  rounded-md shadow-xl px-4 py-3 bg-white text-sm font-medium text-dark-gray hover:bg-gray-50 focus:outline-none"
            id="options-menu" aria-haspopup="true" :aria-expanded="isOpen">
            {{ getFieldLabel(selectedField) }}
            <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
              aria-hidden="true">
              <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd" />
            </svg>
          </button>

          <div v-if="isOpen"
            class="origin-top-right absolute left-0 mt-2 w-72 rounded-md shadow-lg bg-white  divide-y divide-gray-100"
            role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <div class="py-1" role="none">
              <a href="#" @click.prevent="selectField('all')"
                class="block px-4 py-2 text-sm text-dark-gray hover:bg-gray-100 hover:text-gray-900" role="menuitem">All
                fields</a>
            </div>
            <div class="py-1" role="none">
              <a href="#" v-for="field in fields" :key="field" @click.prevent="selectField(field)"
                class="block px-4 py-2 text-sm text-dark-gray hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                {{ getFieldLabel(field) }}
              </a>
            </div>
          </div>
        </div>

        <input v-model="searchQuery" type="text" placeholder="Search..."
          class="px-4 w-72 py-3 rounded-lg shadow-xl focus:outline-none">
      </div>

      <!-- Mobile table (for screens smaller than 680px) -->
      <div class="w-full overflow-x-auto rounded-lg shadow-xl tablet:hidden">
        <table class="w-full text-left">
          <thead>
            <tr>
              <th v-for="col in fields.slice(0, 3)" :key="col"
                class="p-4 border-b border-gray-200 bg-gray-100 text-black-gray">
                {{ getFieldLabel(col) }}
              </th>
            </tr>
          </thead>
          <tbody class="text-dark-gray">
            <tr v-for="product in paginatedProducts" :key="product.id" class="hover:bg-gray-100 text-custom-xs"
              @click="goToProductDetail(product.id)">
              <td v-for="col in fields.slice(0, 3)" :key="col" class="p-4 border-t border-gray-200 cursor-pointer">
                {{ product[col] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Tablet and desktop table (for screens 680px and larger) -->
      <div class="hidden tablet:block w-full overflow-x-auto rounded-lg shadow">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr>
              <th v-for="col in fields" :key="col"
                class="p-4 border-b border-gray-200 bg-gray-100 text-black-gray text-sm">
                {{ getFieldLabel(col) }}
              </th>
            </tr>
          </thead>
          <tbody class="text-dark-gray">
            <tr v-for="product in paginatedProducts" :key="product.id" class="hover:bg-gray-100"
              @click="goToProductDetail(product.id)">
              <td v-for="col in fields" :key="col" class="p-4 border-t border-gray-200 cursor-pointer">
                {{ product[col] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="mt-6 flex justify-center items-center space-x-2">
        <button v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="[
              'px-3 py-1 rounded transition-all duration-300 ease-in-out',
              currentPage === page
                ? 'bg-black-gray text-white shadow-xl'
                : 'bg-white text-black-gray border border-gray-300 hover:bg-gray-100'
            ]">
          {{ page }}
        </button>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="mt-4 text-red-500 text-center">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>