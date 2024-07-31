<script setup>
import { ref, onMounted, computed } from 'vue';
import ProductService from '@/services/ProductService';

const concerts = ref(null);
const fields = ['id', 'band', 'city', 'reply', 'date', 'price', 'place'];
const searchQuery = ref('');
const selectedField = ref('all');
const currentPage = ref(1);
const itemsPerPage = 10;
const isOpen = ref(false);

onMounted(async () => {
  try {
    const data = await ProductService.getProducts();
    concerts.value = data;
    console.log('Concerti caricati:', concerts.value);
  } catch (error) {
    console.error('Errore nel caricamento dei concerti:', error);
  }
});

const filteredConcerts = computed(() => {
  if (!concerts.value) return [];
  return concerts.value.filter(concert => {
    if (selectedField.value === 'all') {
      return fields.some(field =>
        concert[field].toString().toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    } else {
      return concert[selectedField.value].toString().toLowerCase().includes(searchQuery.value.toLowerCase());
    }
  });
});

const paginatedConcerts = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  return filteredConcerts.value.slice(startIndex, startIndex + itemsPerPage);
});

const totalPages = computed(() =>
  Math.ceil(filteredConcerts.value.length / itemsPerPage)
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
  if (field === 'all') return 'Tutti i campi';
  return field.charAt(0).toUpperCase() + field.slice(1);
};
</script>

<template>

  <!-- Logo -->
  <div class="flex items-center justify-center mb-10 text-xl text-gray-800 font-black">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 mr-1">
      <path
        d="M12.378 1.602a.75.75 0 0 0-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03ZM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 0 0 .372-.648V7.93ZM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 0 0 .372.648l8.628 5.033Z" />
    </svg>
    <p>Concerts</p>
  </div>

  <!-- Campo di ricerca e selettore del campo stilizzato -->
  <div class="mb-4 w-full max-w-md flex space-x-2">
    <div class="relative inline-block text-left">
      <div>
        <button type="button" @click="toggleDropdown"
          class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          id="options-menu" aria-haspopup="true" aria-expanded="true">
          {{ getFieldLabel(selectedField) }}
          <!-- Heroicon name: solid/chevron-down -->
          <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
            aria-hidden="true">
            <path fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <div v-if="isOpen"
        class="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
        role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <div class="py-1" role="none">
          <a href="#" @click.prevent="selectField('all')"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Tutti i
            campi</a>
        </div>
        <div class="py-1" role="none">
          <a href="#" v-for="field in fields" :key="field" @click.prevent="selectField(field)"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
            {{ getFieldLabel(field) }}
          </a>
        </div>
      </div>
    </div>

    <input v-model="searchQuery" type="text" placeholder="Cerca concerti..."
      class="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
  </div>

  <!-- Tabella per dispositivi mobili -->
  <div class="w-104 rounded-2xl bg-white shadow-2xl tablet:hidden text-custom-xs">
    <table class="w-full text-left border-collapse">
      <!-- ... (thead come prima) ... -->
      <tbody class="text-custom-xs">
        <tr v-for="concert in paginatedConcerts" :key="concert.id" class="hover:bg-gray-50">
          <td v-for="col in fields.slice(0, 3)" :key="col" class="p-4 border-t border-gray-200">
            {{ concert[col] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Tabella per tablet e desktop -->
  <div class="w-200 hidden rounded-2xl bg-white shadow-2xl tablet:block">
    <table class="w-full text-left border-collapse">
      <!-- ... (thead come prima) ... -->
      <tbody class="text-custom-xs">
        <tr v-for="concert in paginatedConcerts" :key="concert.id" class="hover:bg-gray-50">
          <td v-for="col in fields" :key="col" class="p-4 border-t border-gray-200">
            {{ concert[col] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Paginazione -->
  <div class="mt-4 flex justify-center items-center space-x-2">
    <button v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="[
          'px-3 py-1 rounded',
          currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        ]">
      {{ page }}
    </button>
  </div>
</template>