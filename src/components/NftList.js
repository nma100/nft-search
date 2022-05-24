
import React, { useState } from 'react';
import * as bootstrap from 'bootstrap';
import NftModal from './NftModal'; 
import prepareNFTs from './NftUtil';

function NftList(props) {

    const [searchResult, setSearchResult] = useState(props.searchResult);
    const [nftList, setNftList] = useState(prepareNFTs(props.searchResult.result));
    const [selectedNft, setSelectedNft] = useState();
    const [loadingMore, setLoadingMore] = useState();

    function openModal(nftId) {
        console.log('openModal', nftId);
        setSelectedNft(nftList.find(nft => nft.id === nftId));
        const modal = new bootstrap.Modal('#nft-modal');
        modal.show();
    }

    async function loadMore() {
        setLoadingMore(true);
        let nextPage = await searchResult.next();
        setLoadingMore(false);
        setSearchResult(nextPage);
        setNftList(list => list.concat(prepareNFTs(nextPage.result)));
        console.log('nextPage', nextPage);
    }

    function onImageLoaded(nftId) {
      document.getElementById('spinner-'+ nftId).style.display = 'none';
      document.getElementById('preview-'+ nftId).style.display = 'block';
    }

    function onImageError(nftId) {
      document.getElementById('preview-'+ nftId).src = 'https://caer.univ-amu.fr/wp-content/uploads/default-placeholder.png';
      //document.getElementById('preview-'+ nftId).src = 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png';
    }

    return (
        <React.Fragment>
        <NftModal nft={selectedNft} />
        <div className="bg-light fs-5 d-flex align-items-center sticky-top shadow-sm mb-4 px-3 py-2">
          <div>
            Search : <span className='text-muted'>{props.searchQuery}</span>
            <strong className="px-3">·</strong> 
            Blockchain : <span className='text-muted'>{props.blockchain}</span>
            <strong className="px-3">·</strong> 
            Results : <span className='text-muted'>{props.searchResult.total}</span>
          </div>
          <a href="/" type="button" className="btn btn-primary ms-auto">
            <i className="bi bi-arrow-clockwise"></i> New search
          </a>
        </div>  
        <div id="result" className="row row-cols-4 g-3 mb-5">
          {nftList && nftList.map(nft => 
            <div className="col nft-card" key={nft.id} onClick={() => openModal(nft.id)}>
              <div className="card h-100 shadow-sm">
                { nft.metadata_obj &&
                <img id={'preview-' + nft.id} src={nft.metadata_obj.image_url} 
                    className="card-img-top" 
                    onLoad={ () => onImageLoaded(nft.id) }  
                    onError={ () => onImageError(nft.id) } 
                    style={{ display: 'none' }}
                    alt="NFT" />
                }
                <div className="card-body">
                  <div id={'spinner-' + nft.id} className="bg-light text-center py-5 mb-3">
                    <div className="spinner-border text-white" style={{width: '5rem', height: '5rem'}}  role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                  <h5 className="card-title mb-2">{nft.metadata_name}</h5>
                </div>
                <div className="card-footer">
                  <div className="d-flex justify-content-between">
                    <small className="text-muted" title={'#' + nft.token_id}>#{nft.token_id_mini}</small>
                    <small className="text-muted">{nft.contract_type}</small>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="d-grid mb-5">
          {loadingMore 
            ? <button id="more-button" className="btn btn-primary btn-lg" type="button" disabled>
                  <div className="spinner-border spinner-border-sm me-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>Loading
              </button>
            : <button id="more-button" className="btn btn-primary btn-lg" type="button" onClick={loadMore}>More <i className="bi bi-caret-down-fill ms-1"></i></button>
          }
        </div>
        </React.Fragment>
    );
}
    
export default NftList;