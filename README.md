good day sir
let's get into it
first of all I implemented put and delete methods feel free to ignore them
I changed index and show to getX and getXs methods made more sense

there are a lot of endpoints so use the postman link to test them:
https://www.getpostman.com/collections/aa6cae252931d33c7298
from postman: 
    import
    link 
    then -> continue
    import 

I won't upload he dotenv file to github
I used ESLINT but found weird errors so I turned it off
important to note that I used jasmine not jasmine-ts you'll notice the difference in the test script

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
