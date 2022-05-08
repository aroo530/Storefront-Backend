good day sir/mam
let's get into it
first of all I implemented put and delete methods feel free to ignore them

I changed index and show to getX and getXs methods made more sense

there are a lot of endpoints so use the postman link to test them:

access the public workspace (I know that I shouldn't leave the token in the workspace but this is an educational project)
https://www.postman.com/science-geoscientist-29544415/workspace/project-2

https://www.getpostman.com/collections/aa6cae252931d33c7298
from postman: 
    import
    link 
    then -> continue
    import

I won't upload he dotenv file to github
I used ESLINT but found weird errors so I turned it off
important to note that I used jasmine not jasmine-ts you'll notice the difference in the test script
### database setup
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


### don't forget the "yarn" command to install the packages

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
