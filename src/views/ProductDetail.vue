<script setup>
import PaymentForm from '@/components/PaymentForm.vue';
</script>

<template>
  <h1>SinglePage of details</h1>
  <section class="flex flex-col items-center justify-center tablet:flex-row">
    <div class="mx-6 w-80 h-104 bg-white flex flex-col items-center justify-center rounded-lg shadow-2xl ">
      <h1>Product details</h1>
      <p>Product details</p>
    </div>
    <div class="py-20">
      <PaymentForm />
    </div>
  </section>
</template>
