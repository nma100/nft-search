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
    <div className='container'>
    { screenMode === mode.search &&
    <div id="search"  className="d-flex justify-content-center">
      <div id ="search-form" className="w-75 shadow rounded-3 px-5 pt-4 pb-5 mt-5">
        <form onSubmit={process}>
          <div id="title" className="mb-5 text-center">NFT Search</div>
          <div className="mb-4">
            <input type="text" id="input-search" className="form-control form-control-lg" placeholder="Search NFTs by name/description/attributes ..." autoComplete="off"/>
          </div>
          <div className="mb-5">
            <label htmlFor="select-chain" className="form-label">Blockchain</label>
            <select id="select-chain" className="form-select" style={{ cursor: 'pointer' }}>
                <option value="eth">Ethereum</option>
                <option value="bsc">Binance</option>
                <option value="polygon">Polygon </option>
                <option value="avalanche">Avalanche</option>
                <option value="fantom">Fantom</option>
            </select>
          </div>
          <div className="">              
            <div className="d-grid col-4 mx-auto">
            {searching 
              ? <button type="submit" className="btn btn-primary btn-lg" disabled>          
                  <div className="spinner-border spinner-border-sm me-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                  </div>Searching
                </button>
              : <button type="submit" className="btn btn-primary btn-lg">Search NFTs</button>
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
    <div id="credits" className="text-center fs-5 mt-4 p-2">
      Powered by : <a href="https://moralis.io/" className="text-reset">Moralis</a>
    </div>
  </div>  
  );
}

export default App;
