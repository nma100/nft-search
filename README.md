TODO

Moteur recherche de nft : query, select bc, check filter

Liste tableau, (preview image ?), click détail popup : image, metadata, owner list, price

Compilation scss
----------------
npm run css-compile

Moralis endpoints
-----------------

GET /nft/search : SearchNFTs Recherche de NFTs

GET /{address}/nft : GetNFTs - All NFT by user (ERC721 ou ERC1155)
GET /{address}/nft/{token_address} : GetNFTsForContract - NFT(s) d'un user
GET /{address}/nft/transfers : GetNFTTransfers - All NFT transfers for user

GET /nft/{address} : GetAllTokenIds - NFT(s)
GET ​/nft​/{address}​/transfers : GetContractNFTTransfers - All transfers pour NFT(s)
GET ​/nft​/{address}​/lowestprice : GetNFTLowestPrice - Lowest price sur derniers jours
GET ​/nft​/{address}​/metadata : GetNFTMetadata - Metadata (Nom, contract type ...)
GET ​/nft​/{address}​/owners : GetNFTOwners - Owner list
GET ​/nft​/{address}​/trades : GetNFTTrades - Trades du NFT sur Opensea
GET ​/nft​/{address}​/{token_id} : GetTokenIdMetadata - Metadata (where available), for the given token id of the given contrac
GET ​/nft​/{address}​/{token_id}​/owners : GetTokenIdOwners - Owners pour un tokenID
GET ​/nft​/{address}​/{token_id}​/owners : ?