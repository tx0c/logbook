import { utils } from "ethers";

export const logbookABI = [
  "constructor(string name_, string symbol_)",
  "event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)",
  "event ApprovalForAll(address indexed owner, address indexed operator, bool approved)",
  "event Content(address indexed author, bytes32 indexed contentHash, string content)",
  "event Donate(uint256 indexed tokenId, address indexed donor, uint256 amount)",
  "event Fork(uint256 indexed tokenId, uint256 indexed newTokenId, address indexed owner, uint256 end, uint256 amount)",
  "event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)",
  "event Pay(uint256 indexed tokenId, address indexed sender, address indexed recipient, uint256 amount, uint8 purpose)",
  "event Publish(uint256 indexed tokenId, bytes32 indexed contentHash)",
  "event SetDescription(uint256 indexed tokenId, string description)",
  "event SetForkPrice(uint256 indexed tokenId, uint256 amount)",
  "event SetTitle(uint256 indexed tokenId, string title)",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
  "event Withdraw(address indexed account, uint256 amount)",
  "function approve(address to, uint256 tokenId)",
  "function balanceOf(address owner) view returns (uint256)",
  "function books(uint256) view returns (uint256 forkPrice)",
  "function claim(address to_, uint256 logrsId_)",
  "function donate(uint256 tokenId_) payable",
  "function donateWithCommission(uint256 tokenId_, address commission_, uint256 commissionBPS_) payable",
  "function fork(uint256 tokenId_, uint256 end_) payable returns (uint256 tokenId)",
  "function forkWithCommission(uint256 tokenId_, uint256 end_, address commission_, uint256 commissionBPS_) payable returns (uint256 tokenId)",
  "function getApproved(uint256 tokenId) view returns (address)",
  "function getBalance(address account_) view returns (uint256)",
  "function getLogbook(uint256 tokenId_) view returns (uint256 forkPrice, bytes32[] contentHashes, address[] authors)",
  "function isApprovedForAll(address owner, address operator) view returns (bool)",
  "function logs(bytes32) view returns (address author, uint256 tokenId)",
  "function multicall(bytes[] data) returns (bytes[] results)",
  "function name() view returns (string)",
  "function owner() view returns (address)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function publicSale() view returns (uint256)",
  "function publicSaleMint() payable returns (uint256 tokenId)",
  "function publicSalePrice() view returns (uint256)",
  "function publish(uint256 tokenId_, string content_)",
  "function renounceOwnership()",
  "function safeTransferFrom(address from, address to, uint256 tokenId)",
  "function safeTransferFrom(address from, address to, uint256 tokenId, bytes _data)",
  "function setApprovalForAll(address operator, bool approved)",
  "function setDescription(uint256 tokenId_, string description_)",
  "function setForkPrice(uint256 tokenId_, uint256 amount_)",
  "function setPublicSalePrice(uint256 price_)",
  "function setTitle(uint256 tokenId_, string title_)",
  "function supportsInterface(bytes4 interfaceId) view returns (bool)",
  "function symbol() view returns (string)",
  "function togglePublicSale() returns (uint256 newPublicSale)",
  "function tokenURI(uint256 tokenId) view returns (string)",
  "function transferFrom(address from, address to, uint256 tokenId)",
  "function transferOwnership(address newOwner)",
  "function withdraw()",
];

export const logbookInterface = new utils.Interface(logbookABI);
