import { ethers } from "ethers";
import { abi, contractAddress } from "./constants.js";

const getProvider = () => {
  return new ethers.providers.Web3Provider(window.ethereum);
};

const getContract = () => {
  const provider = getProvider();
  const signer = provider.getSigner();
  return new ethers.Contract(contractAddress, abi, signer);
};

export default getContract;
