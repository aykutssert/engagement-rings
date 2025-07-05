import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  try {

    const myHeaders = new Headers();
    myHeaders.append("x-access-token", process.env.GOLDAPI_KEY);
    myHeaders.append("Content-Type", "application/json");

    const goldResponse = await fetch("https://www.goldapi.io/api/XAU/USD", {
      method: 'GET',
      headers: myHeaders,
    });
    
    const goldData = await goldResponse.json();
    const goldPrice = goldData.price_gram_24k;

    const filePath = path.join(process.cwd(), 'public', 'products.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const products = JSON.parse(fileContents);
    
    const productsWithPrices = products.map(product => ({
      ...product,
      price: Math.round((product.popularityScore + 1) * product.weight * goldPrice * 100) / 100,
      popularityRating: Math.round(product.popularityScore * 5 * 10) / 10
    }));
    
    res.status(200).json(productsWithPrices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}