Shopify Product Fetcher - Anatta Demo by Kadin Schermers
==
### Overview ###
This Node.js script is a command-line utility for fetching and displaying Shopify product variants using the Shopify Storefront GraphQL API. It allows searching products by name, retrieving detailed variant information, and sorting results by price.
#### Prerequisites: ####
Before using this script, ensure you have the following:

- Node.js (v14 or later)
- A Shopify store with Storefront API access
- Shopify Storefront Access Token

### Installation ###
1. Clone the repository
2. Install dependencies:
`npm install axios dotenv`

3. Create a `.env` file in the project root with the following variables:
`SHOPIFY_SHOP_NAME=your_shop_name`  
`STOREFRONT_TOKEN=your_storefront_access_token`


### Usage ###
Run the script from the command line using:
`node app.js -name "Product Search Term"`

#### Examples ####

Search for all products with "shirt" in the name:
`node app.js -name shirt`

Search for a specific product:
`node app.js -name "Summer T-Shirt"`


### Features ###
- Searches Shopify products using Storefront API
- Retrieves comprehensive product and variant details
- Supports product name search with partial matching
- Sorts results by price (lowest to highest)
- Displays product availability status
- Provides detailed error logging

### Output Format ###
Each product result displays:
- Product Title
- Variant Title
- Price (in USD)

#### Example output: ####
Summer T-Shirt - Medium, Blue - price $24.99  
Summer T-Shirt - Large, Red - price $26.50  

### Error Handling ###
- Displays an error message if no products are found
- Provides usage instructions if command-line arguments are incorrect
- Logs detailed error information for debugging

### Configuration ###
Key configuration options in the script:

- `first: 10` in GraphQL query limits the number of products/variants returned
- Modify GraphQL query to add or remove retrieved fields as needed
- API version is set to '2024-01' (update as Shopify releases new versions)

### Storefront API Considerations ###
- Uses Storefront Access Token for authentication
- Requires read access to products
- Supports public app and custom app scenarios

### Security Notes ###
- Never commit your .env file to version control
- Protect your Storefront Access Token
- Limit API access to minimum required permissions

### Troubleshooting ###
- Verify Storefront API token is correct
- Ensure shop name matches your Shopify store
- Check network connectivity
- Validate GraphQL query structure
- Update dependencies regularly

### Dependencies ###
- axios: HTTP client for API requests
- dotenv: Environment variable management
