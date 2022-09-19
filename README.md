# Innowise-Lab-Internship-Level-2-On-chain-DAO-with-custom-UI
## Task
You can find the terms of reference [here](https://docs.google.com/document/d/1NBscuqhNERUN7iiYTgQaqjYAcXlhrHXJ1MQpDCFylI0).

## How to run the app
### Clone the repo
```sh
git clone https://github.com/volokitty/Innowise-Lab-Internship-Level-2-On-chain-DAO-with-custom-UI.git
cd Innowise-Lab-Internship-Level-2-On-chain-DAO-with-custom-UI
```

### Install dependencies
```sh
npm install
```

### Run local blockchain node and deploy smart contratcts to it
```sh
./runChain.sh
```

### Run React dev server
```sh
npm start
```

### Note
If you restart local blockchain you need to reset your Metamask account.
```sh
Settings -> Advanced -> Reset Account
```

## Application structure
Web3.js library was used to interact with smart contracts. Application contain smart contracts addresses in config file, creates instance of web3 and smart contracts and calls their methods.

## Application stack

### Solidity Dependencies
1. open-zeppelin/contracts

### Frontend Dependencies
1. React
2. TypeScript
3. web3.js
4. react-router-dom
5. ESLint
6. Prettier

### Project architecture
Feature-slices design architecture was used in frontend app development.

File structure
1. ```app``` Contains the highest-level application logic such as context providers initialization
2. ```artifacts``` Contains hardhat blockchain bytecode etc.
3. ```pages``` Contains application pages, the highest abstraction after app.
4. ```widgets``` This is usually where independent and complex page widgets are located, composing the underlying layers.
5. ```features``` The feature contains code that implements one useful functionality for the user. Use cases.
6. ```shared``` Contains UI kit, configs, contexts and libs that are used over the whole application.
