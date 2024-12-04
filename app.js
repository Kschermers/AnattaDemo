const axios = require('axios');
require('dotenv').config();

class ShopifyProductFetcher {
  constructor() {
    this.shopName = process.env.SHOPIFY_SHOP_NAME;
    this.storefrontToken = process.env.SHOPIFY_STOREFRONT_TOKEN;
    this.endpoint = `https://${this.shopName}.myshopify.com/api/2024-10/graphql.json`;
  }

  async fetchProductsByNames(productNames) {
    const query = `
      query searchProducts($query: String!) {
        products(first: 10, query: $query) {
          edges {
            node {
              id
              title
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    availableForSale
                  }
                }
              }
            }
          }
        }
      }
    `;

    try {
      const allVariants = [];
      for (const name of productNames) {
        const response = await axios.post(this.endpoint, 
          { 
            query, 
            variables: { query: `title:${name}*` } 
          },
          { 
            headers: { 
              'Content-Type': 'application/json',
              'X-Shopify-Storefront-Access-Token': this.storefrontToken 
            } 
          }
        );

        const variants = response.data.data.products.edges.flatMap(({ node }) => 
          node.variants.edges.map(({ node: variant }) => ({
            productTitle: node.title,
            variantTitle: variant.title,
            price: parseFloat(variant.price),
            availableForSale: variant.availableForSale
          }))
        );

        allVariants.push(...variants);
      }

      // Sort all variants by price
      return allVariants.sort((a, b) => a.price - b.price);
    } catch (error) {
      console.error('Error fetching products:', error.response ? error.response.data : error.message);
      throw error;
    }
  }

  printProducts(variants) {
    if (variants.length === 0) {
      console.log('No products found matching the search criteria.');
      return;
    }

    variants.forEach(variant => {
      console.log(`${variant.productTitle} - ${variant.variantTitle} - price $${variant.price.toFixed(2)}`);
    });
  }
}

async function main() {
  // Parse command line arguments
  const args = process.argv.slice(2);
  const nameIndex = args.indexOf('-name');
  
  if (nameIndex === -1 || !args[nameIndex + 1]) {
    console.error('Usage: node app.js -name <product_name>');
    process.exit(1);
  }

  const productName = args[nameIndex + 1];
  
  const fetcher = new ShopifyProductFetcher();

  try {
    console.log(`Searching for products matching: ${productName}`);
    const products = await fetcher.fetchProductsByNames([productName]);
    fetcher.printProducts(products);
  } catch (error) {
    console.error('Error in main execution:', error);
  }
}

// Run the main function
main();

module.exports = ShopifyProductFetcher;