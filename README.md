React-Node Videogame Sales
--------------------------------

### Prerequisites

* Node.js

* MongoDB


### Installing

Create videogames mongodb collection: 
```
mongo import -d videogamesdb -c videogames --type csv --file vgsales-clean.csv --headerline
``` 

Install node_modules: 
``` 
npm install
```

## Running

Run mongodb, the node server, and the start script: 
```
mongod
node server.js
npm start 
```

Open http://localhost:8080/ in your browser
