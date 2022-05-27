# NFT Search

This application allows the search of NFTs on a blockchain by name, description, metadata.

The NFTs corresponding to the criteria are returned with the possibility of seeing the detail in a popup.

## How the application works

The app relies on the [Moralis Web3 API](https://docs.moralis.io/moralis-dapp/web3-api/nft-api) to fetch NFTs data. This API is able to fetch different information such as block info, transaction info, NFT metadata, token prices, user balances from the main blockchains. 

Others frameworks used on this development are :
* [React](https://reactjs.org) : JavaScript library developed by Facebook which facilitates the creation of single-page web applications
* [Bootstrap](https://getbootstrap.com) : CSS framework for responsive front-end development.

## Build

Install dependencies :
```
npm install
```

Create production build :
```
npm run build
```

Start development server :
```
npm start
```
