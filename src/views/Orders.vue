<script setup>
import CardOrder from '@/components/CardOrder.vue';
</script>

<template>

  <section>
    <div class="w-full flex items-center border justify-center">
      <h1 class="mt-24">Page of orders</h1>
    </div>
    <div class="grid grid-cols-1 desktop:grid-cols-2 gap-9">
      <!-- v-for="order in orders" :key="order.idOrder" :order="order" -->
      <CardOrder />
    </div>
  </section>

</template>
