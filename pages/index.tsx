import { useState, useEffect } from 'react';
import ProductCarousel from '../components/ProductCarousel';

export default function Home() {
 const [products, setProducts] = useState([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
   fetch('/api/products')
     .then(res => res.json())
     .then(data => {
       setProducts(data);
       setLoading(false);
     })
     .catch(error => {
       console.error('Error fetching products:', error);
       setLoading(false);
     });
 }, []);

 if (loading) return <div className="text-center p-8">Loading...</div>;

 return (
   <div className="container mx-auto mt-20 px-4">
     <h1 style={{ 
       fontFamily: 'Avenir', 
       fontWeight: 300, 
       fontSize: '45px', 
       textAlign: 'center', 
       marginBottom: '32px', 
       marginTop: '32px'
     }}>
       Product List
     </h1>
     <ProductCarousel products={products} />
   </div>
 );
}