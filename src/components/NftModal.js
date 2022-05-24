import React, { useState } from "react";

function NftModal(props) {

    const [showAttributes, setShowAttributes] = useState();

    function onShowAttributes() {
        setShowAttributes(show => !show);
    }

    return (
        <div id="nft-modal" className="modal" tabIndex="-1">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-body">
                        { props.nft &&
                        <div className="container-fluid py-2">
                            <div className="row">
                                <div className="col-4">
                                    <img src={props.nft.metadata_obj.image_url} className="img-thumbnail img-fluid" alt="NFT" />
                                    <div className="py-3">
                                        <span className="badge rounded-pill bg-light text-dark me-2" title={ props.nft.token_address }>{ props.nft.token_address_mini }</span>
                                        <span className="badge rounded-pill bg-light text-dark me-2">{ props.nft.contract_type }</span>
                                        <span className="badge rounded-pill bg-light text-dark" title={ '#' + props.nft.token_id }>#{ props.nft.token_id_mini}</span>
                                    </div>
                                </div>
                                <div className="col-8">
                                    <div className="mb-3">
                                        <h2 className="mb-1">{ props.nft.metadata_name }</h2>
                                        { props.nft.date_formatted &&
                                            <div className="text-muted">{ props.nft.date_formatted }</div>
                                        }
                                    </div>
                                    { props.nft.metadata_description &&
                                        <p>{ props.nft.metadata_description }</p>
                                    }
                                    <div className="mb-3">
                                    { props.nft.metadata_obj.external_url &&
                                        <a href={ props.nft.metadata_obj.external_url } className="btn btn-light me-2" target="_blank" rel="noreferrer"><i className="bi bi-box-arrow-up-right"></i> External link</a>
                                    }
                                    { props.nft.metadata_obj.attributes_formatted &&
                                        <button type="button" className="btn btn-light" onClick={onShowAttributes}><i className="bi bi-search"></i> Show attributes</button>
                                    }
                                    </div>
                                    { showAttributes &&
                                        <code>
                                            <pre className="small rounded-3 bg-white p-3 shadow">
                                                { props.nft.metadata_obj.attributes_formatted }
                                            </pre>
                                        </code>
                                    }
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NftModal;