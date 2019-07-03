# Jalapeno
This part explains the API server (Backend)

## Requirements
- NodeJS
- KnexJS installed globally
- Optional: MySQL

### Installing KnexJs
```
npm i knex -g
```

### Setting up the backend
```
git clone https://github.com/nasyarobby/jalapeno
cd jalapeno
```

Copy ```.env.example``` to ```.env``` and update the content to match your machine configuration.

Run the following command
```
npm i
knex migrate:up
npm run start
```
