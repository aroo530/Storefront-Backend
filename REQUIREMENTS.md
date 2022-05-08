# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

-   Index '/products'
-   Show '/products/:name'
-   Create [token required] '/products'
-   Update [token required] '/products/'
-   Destroy [token required] '/products/:name'
<!-- - [OPTIONAL] Top 5 most popular products  -->
-   [OPTIONAL] Products by category (args: product category) '/products/category/:category'

#### Users

-   Index [token required] '/users'
-   Show [token required] '/users/:first_name'
-   Create '/users/signup'
-   login '/users/login'
-   Update [token required] '/users'
-   Destroy [token required] '/users/:first_name'

#### Orders

-   Current Order by user (args: user id)[token required] '/orders/:user_id'
-   Create [token required] '/orders'
-   Update [token required] '/orders/:order_id'
-   Destroy [token required] '/orders/:order_id'
-   Add product to order [token required] '/orders/:order_id/products/:product_id'

<!-- - [OPTIONAL] Completed Orders by user (args: user id)[token required]  -->
<!-- done -->

## Data Shapes

#### Product

-   id
-   name
-   price
-   [OPTIONAL] category
<!-- done -->

#### User

-   id
-   firstName
-   lastName
-   password
<!-- DONE -->

#### Orders

-   id
-   id of each product in the order
<!-- this is better be in the product then imported here as a forign key -->
-   quantity of each product in the order
-   user_id
-   status of order (active or complete)
