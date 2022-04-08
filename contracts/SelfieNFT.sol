//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract SelfieNFT is ERC721URIStorage {
    uint256 tokenId;

    constructor() ERC721("SelfieNFT", "Selfie") {
        tokenId++;
    }

    function createNFT(string memory _tokenURI) public {
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        tokenId++;
    }

    function getTokenId() public view returns (uint256) {
        return tokenId;
    }
}
