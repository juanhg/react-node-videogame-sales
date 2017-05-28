React-Node Videogame Sales
--------------------------------

REQUIRES

Node.js should be installed in your system.

MongoDB should be installed in your system.


INSTALL

Create videogames mongodb collection: mongoimport -d videogamesdb -c videogames --type csv --file vgsales.csv --headerline

npm install

RUN 

Run mongodb: mongodb

Run the server: node server.js

Run start script: npm start 

Open http://localhost:8080/ in your browser
