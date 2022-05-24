import React, { useState } from 'react';
import { useMoralisWeb3Api } from 'react-moralis';
import NftList from './NftList'; 

const mode = {
  search: 0,
  result: 1
}

function App() {

  const Web3Api = useMoralisWeb3Api();

  const [screenMode, setScreenMode] = useState(mode.search);
  const [blockchain, setBlockchain] = useState();
  const [searchQuery, setSearchQuery] = useState();
  const [searchResult, setSearchResult] = useState();
  const [searching, setSearching] = useState();

  const PER_PAGE = 8;

  async function process(e) {
    e.preventDefault();

    let query = document.getElementById('input-search').value;
    let chain = document.getElementById('select-chain').value;
    if (!query) return;

    setSearchQuery(query);
    setBlockchain(chain);

    let options = {
      chain : chain,
      q : query,
      filter: 'global',
      limit : PER_PAGE
    };
    console.log('Searching', options);
    setSearching(true);
    let rs = await Web3Api.token.searchNFTs(options);
    console.log('searchResult', rs);
    setSearching(false);
    setSearchResult(rs);
    setScreenMode(mode.result)
  }

  return (
    <React.Fragment>
    <div className='container'>
    { screenMode === mode.search &&
    <div id="search"  className="d-flex justify-content-center p-5">
      <div className="w-75">
        <div className="text-center mb-5">
          <h1 className="fs-1">NFT Search</h1>
        </div>
        <form className="row g-3" onSubmit={process}>
          <div className="col-8">
            <input type="text" id="input-search" className="form-control" placeholder="Search NFTs by name/description/attributes ..." autoComplete="off"/>
          </div>
          <div className="col-4">
            <select id="select-chain" className="form-select" style={{ cursor: 'pointer' }}>
                <option value="eth">Blockchain : Ethereum</option>
                <option value="bsc">Blockchain : Binance</option>
                <option value="polygon">Blockchain : Polygon </option>
                <option value="avalanche">Blockchain : Avalanche</option>
                <option value="fantom">Blockchain : Fantom</option>
              </select>
          </div>
          <div className="col-12">              
            <div className="d-grid col-6 mx-auto my-4">
            {searching 
              ? <button type="submit" className="btn btn-primary" disabled>          
                  <div className="spinner-border spinner-border-sm me-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                  </div>Searching
                </button>
              : <button type="submit" className="btn btn-primary">Search NFTs</button>
            }
            </div>
          </div>
        </form>
    </div>
    </div>
    }
    { screenMode === mode.result &&
      <NftList searchQuery={searchQuery} blockchain={blockchain} searchResult={searchResult} />
    }
  </div>  
  </React.Fragment>
  );
}

export default App;
