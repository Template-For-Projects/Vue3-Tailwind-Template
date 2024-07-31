import axiosIstance from '@/api';

//Modify
const OrderService = {
  async getOrders() {
    try {
      const response = await axiosIstance.get('/orders/');
      console.log('Risposta API:', response);
      return response.data.data;
    } catch (error) {
      console.error('OrderService: Error getting concert data', error);
      throw error;
    }
  },
};
export default OrderService;
