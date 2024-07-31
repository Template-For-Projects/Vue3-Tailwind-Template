<script setup>
import { ref, computed } from 'vue';
import moment from 'moment';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
});

// Dummy data
const dummyOrder = ref({
  idOrder: '12345',
  orderDate: '2023-07-31T12:34:56',
  orderDetailArticles: [
    { id: 1, article: { name: 'Book 1', price: 19.99 }, quantity: 2 },
    { id: 2, article: { name: 'Book 2', price: 24.99 }, quantity: 1 }
  ]
});

// FORMATTED DATE
const formattedOrderDate = computed(() => {
  return dummyOrder.value.orderDate
    ? moment(dummyOrder.value.orderDate).format('MMMM Do YYYY, h:mm:ss a')
    : '';
});

const totalPrice = computed(() => {
  return dummyOrder.value.orderDetailArticles.reduce((total, item) => {
    return total + (item.article.price * item.quantity);
  }, 0).toFixed(2);
});

const generatePDF = () => {
  const element = document.getElementById('order-details');
  html2canvas(element).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`order-${dummyOrder.value.idOrder}.pdf`);
  });
};
</script>

<template>
  <div class="flex justify-center items-center min-h-screen">
    <div id="order-details" class="text-custom-xs w-96 rounded-xl shadow-2xl flex flex-col bg-white p-8">
      <!-- Logo -->
      <div class="flex items-center justify-center mb-6 text-desktop-xl text-black-gray font-black">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8 mr-1">
          <path
            d="M12.378 1.602a.75.75 0 0 0-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03ZM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 0 0 .372-.648V7.93ZM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 0 0 .372.648l8.628 5.033Z" />
        </svg>
        <p>Order Details</p>
      </div>

      <!-- Content -->
      <div class="w-full space-y-4">
        <div class="flex flex-col justify-center mb-4">
          <h6 class="text-xl mb-1"><strong>Order n°:</strong> {{ dummyOrder.idOrder }}</h6>
          <p class="text-xs text-dark-gray"><strong>Date:</strong> {{ formattedOrderDate }}</p>
        </div>

        <!-- ORDER DETAILS -->
        <div class="mt-4 text-dark-gray">
          <h3 class="text-black-gray text-lg font-semibold mb-2">Order Details</h3>

          <div v-for="item in dummyOrder.orderDetailArticles" :key="item.id">
            <div class="flex flex-col justify-between mb-2">
              <p class="mb-1 text-xs text-black-gray font-bold">{{ item.article.name }}</p>
              <p class="mb-1 text-xs">Quantity: {{ item.quantity }}</p>
              <p class="text-xs">Price: ${{ item.article.price }}</p>
            </div>
          </div>

          <p class="text-sm font-semibold mt-4 text-right">Total Price: ${{ totalPrice }}</p>
        </div>
      </div>

      <!-- Buttons -->
      <div class="mt-6 w-full flex">
        <button class="relative overflow-hidden bg-white mr-2 py-3 text-black-gray font-bold w-full rounded-xl shadow-xl
                       transition-all duration-300 ease-in-out
                       hover:text-white group hover:shadow-none" type="button">
          <span class="relative z-10">Back to Orders</span>
          <div
            class="absolute inset-0 bg-black-gray shadow-inner-strong transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out">
          </div>
        </button>

        <button @click="generatePDF" class="relative overflow-hidden bg-black-gray ml-2 py-3 text-white font-bold w-full rounded-xl shadow-xl
                       transition-all duration-300 ease-in-out
                       hover:text-black-gray group hover:shadow-none" type="button">
          <span class="relative z-10">Print Order</span>
          <div
            class="absolute inset-0 bg-white shadow-inner-strong transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out">
          </div>
        </button>
      </div>
    </div>
  </div>
</template>