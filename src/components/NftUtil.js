function minimize(value, len = 3, max = 8) {
    if (value.length <= max) return value;
    return value.substring(0, len) + '...' + value.substring(value.length-len);
}

function prepareNFTs(nftList) {
    nftList.forEach(nft => {
        nft.id = `${nft.token_address}-${nft.token_id}`
        nft.token_id_mini = minimize(nft.token_id);
        nft.token_address_mini = minimize(nft.token_address, 4);
        nft.date_formatted = nft.createdAt ? new Date(nft.createdAt).toLocaleString() : '';
        nft.metadata_obj = JSON.parse(nft.metadata);
        if (nft.metadata_obj) {
            if (nft.metadata_obj.image) {
                nft.metadata_obj.image_url = nft.metadata_obj.image;
                nft.metadata_obj.image_url = nft.metadata_obj.image_url.replace("ipfs://ipfs/", "https://ipfs.io/ipfs/");
                nft.metadata_obj.image_url = nft.metadata_obj.image_url.replace("ipfs://", "https://ipfs.io/ipfs/");
            }
            if (nft.metadata_obj.attributes) {
                nft.metadata_obj.attributes_formatted = JSON.stringify(nft.metadata_obj.attributes, null, 2)
            }
        }
    });
    console.log('prepareNFTs', nftList);
    return nftList;
}

export default prepareNFTs;