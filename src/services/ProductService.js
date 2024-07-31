import axiosIstance from '@/api';

const ProductService = {
  async getProducts() {
    try {
      const response = await axiosIstance.get('/books/');
      console.log('Risposta API:', response);
      return response.data.data;
    } catch (error) {
      console.error('ProductService: Error getting concert data', error);
      throw error;
    }
  },
};
export default ProductService;
