good day <3 <br>

Project Summary<br>
Imagine that you are a web developer at a small company. The company stakeholders have decided they want to set up an online store to make their great product ideas available for purchase -- and they want you and your co-worker to build it.
<br>
The stakeholders have put together a list of requirements for this online store. Your co-worker will be building the frontend and you will be supplying the JavaScript API. The requirements have been collected into requirements document.
<br>
Your job is to architect the database, its tables and columns to fulfill the data requirements and craft a RESTful API that exposes that information to the frontend developer.
<br>
Your application needs to be ready for beta tests, so it needs to have tests, keep user information secure, and provide user authentication tokens that are ready to integrate with the frontend.
<br><br>
there are a lot of endpoints so use the postman link to test them:
<br>
access the public workspace (I know that I shouldn't leave the token in the workspace but this is an educational project)
https://postman.com/science-geoscientist-29544415/workspace/projects

https://www.getpostman.com/collections/aa6cae252931d33c7298
from postman: 
    import
    link 
    then -> continue
    import

I won't upload he dotenv file to github
important to note that I used jasmine not jasmine-ts you'll notice the difference in the test script

### database setup and endpoints
in psql run the following:

database:
        CREATE USER aroo WITH PASSWORD '0096';
        CREATE DATABASE shop;
        CREATE DATABASE shop_test;
        GRANT ALL PRIVILEGES ON DATABASE shop TO aroo;
        GRANT ALL PRIVILEGES ON DATABASE shop_test TO aroo;
    host and port:
        host = 'localhost';
        port = 5432;
endpoints:
    USERS:
        get all users GET: http://localhost:3000/users
        get user by first_name GET: http://localhost:3000/users/:first_name
        create user POST: http://localhost:3000/users/signup
        login POST: http://localhost:3000/users/login
        edit user password PUT: http://localhost:3000/users
        delete user DELETE: http://localhost:3000/users/:first_name
    
    PRODUCTS:
        get product by name GET: http://localhost:3000/products/:name
        get all products GET: http://localhost:3000/products/
        get product by category GET: http://localhost:3000/products/category/:category
        create product POST: http://localhost:3000/products/
        edit product PUT: (name cannot be changed) http://localhost:3000/products
        delete product DELETE: http://localhost:3000/products/:name
        
    Orders:
        get order by user first_name GET: http://localhost:3000/orders/:user_id
        get all orders GET: http://localhost:3000/orders
        create order POST: http://localhost:3000/orders
        add a product to an order using user's first name POST: http://localhost:3000/orders/:user_id/products
        edit status of order PUT: http://localhost:3000/orders
        delete order DELETE: http://localhost:3000/orders/:user_id

### database schema and relationships
#### buisness rules:
    we have one many to many relationship between orders and products carts was created
    
    every user has one order
    every order has one user
    every order has one or more products
    every product has one or more orders
    every product has one category
    every category has one or more products

    USERS:
        id SERIAL PRIMARY KEY
        first_name VARCHAR(255) NOT NULL
        last_name VARCHAR(255) NOT NULL
        password VARCHAR(255) NOT NULL
    PRODUCTS:
        id SERIAL PRIMARY KEY
        name VARCHAR(255) NOT NULL
        price INTEGER NOT NULL
        category VARCHAR(255)
    ORDERS:
        id SERIAL PRIMARY KEY
        user_id INTEGER NOT NULL
        status VARCHAR(255) NOT NULL
        FOREIGN KEY (user_id) REFERENCES users(id)
    CARTS:
        id SERIAL PRIMARY KEY
        FOREIGN KEY (order_id) REFERENCES orders(id)
        FOREIGN KEY (product_id) REFERENCES products(id)
        quantity INTEGER NOT NULL

### don't forget the "yarn" command to install the packages
    create migrations:
    db-migrate --env dev up
    reset migrations:
    db-migrate --env dev reset
    "scripts": {
        "watch": "tsc-watch --esModuleInterop src/server.ts --outDir ./dist --onSuccess \"node ./dist/server.js\"",
        "tsc": "tsc",
        "test": "set ENV= test && db-migrate --env test reset && db-migrate --env test up && npm run build && jasmine && db-migrate --env test reset",
        "jasmine-init": "jasmine init",
        "jasmine": "jasmine",
        "build": "npx tsc",
        "TSstart": "nodemon src/server.ts",
        "JSstart": "npm run build && nodemon build/server.js",
        "lint": "eslint src/**/*.ts",
        "prettier": "prettier --config .prettierrc.json src/**/*.ts --write"
    }

project tree:

    ├───.github
    │   └───workflows
    ├───build
    │   ├───handlers
    │   ├───middleware
    │   ├───models
    │   ├───services
    │   └───tests
    │       ├───handlers
    │       ├───helpers
    │       └───models
    ├───migrations
    │   └───sqls
    ├───spec
    │   └───support
    └───src
        ├───handlers
        ├───middleware
        ├───models
        ├───services
        └───tests
            ├───handlers
            ├───helpers
            └───models
