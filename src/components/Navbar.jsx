import React from 'react'
import { useState } from 'react';
import { ethers } from 'ethers';
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";
import { Link } from "react-router-dom";
//import { IDKitWidget } from "@worldcoin/idkit";
//import { ISuccessResult, CredentialType } from "@worldcoin/idkit";
import { BigNumber } from "ethers";
//import { decode } from "./wld.ts";
import { IDKitWidget, ISuccessResult, useIDKit } from "@worldcoin/idkit";
// import {
//   useAccount,
//   useWriteContract,
//   useWaitForTransactionReceipt,
//   type BaseError,
// } from "wagmi";
// import { decodeAbiParameters, parseAbiParameters } from "viem";

const Navbar = () => {
// 1. Get projectId
const projectId = "dbe843c72438dc8cab711ae11e6876fc";

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

const mantle = {
    chainId: 5003,
  name: "Mantle",
  currency: "MNT",
//   explorerUrl: "https://etherscan.io",
  rpcUrl: "https://rpc.sepolia.mantle.xyz",
}

// 3. Create a metadata object
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: "...", // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [mainnet, mantle],
  projectId,
  // enableSwaps: true,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

const abi = [
  {
    inputs: [
      {
        internalType: "contract IWorldID",
        name: "_worldId",
        type: "address",
      },
      {
        internalType: "string",
        name: "_appId",
        type: "string",
      },
      {
        internalType: "string",
        name: "_actionId",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nullifierHash",
        type: "uint256",
      },
    ],
    name: "DuplicateNullifier",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "nullifierHash",
        type: "uint256",
      },
    ],
    name: "Verified",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "signal",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "root",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "nullifierHash",
        type: "uint256",
      },
      {
        internalType: "uint256[8]",
        name: "proof",
        type: "uint256[8]",
      },
    ],
    name: "verifyAndExecute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// const address = "0x469449f251692E0779667583026b5A1E99512157";

// const account = useAccount()
// 	const { setOpen } = useIDKit()
// 	const [done, setDone] = useState(false)
// 	const { data: hash, isPending, error, writeContractAsync } = useWriteContract()
// 	const { isLoading: isConfirming, isSuccess: isConfirmed } = 
// 		useWaitForTransactionReceipt({
// 			hash,
// 		}) 

// 	const submitTx = async (proof: ISuccessResult) => {
// 		try {
// 			await writeContractAsync({
// 				address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
// 				account: account.address!,
// 				abi,
// 				functionName: 'verifyAndExecute',
// 				args: [
// 					account.address!,
// 					BigInt(proof!.merkle_root),
// 					BigInt(proof!.nullifier_hash),
// 					decodeAbiParameters(
// 						parseAbiParameters('uint256[8]'),
// 						proof!.proof as `0x${string}`
// 					)[0],
// 				],
// 			})
// 			setDone(true)
// 		} catch (error) {throw new Error((error as BaseError).shortMessage)}
// 	}


  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">zKeveKom</a>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/community">Events</Link>
          </li>
          <li>
            <Link to="/restricted">Entry Gated Events</Link>
          </li>
          <li>
            <Link to="/my">My Events</Link>
          </li>
        </ul>
      </div>
      {/* {!hideWorldCoin && wld} */}
      <IDKitWidget
        app_id="app_staging_66f83164bd5e69e75546612dc02179f7" // obtained from the Developer Portal
        action="vote" // this is your action name from the Developer Portal
        signal="user_value" // any arbitrary value the user is committing to, e.g. a vote
        //onSuccess={onSuccess}
        verification_level="device" // minimum verification level accepted, defaults to "orb"
      >
        {({ open }) => <button onClick={open}>Verify with World ID</button>}
      </IDKitWidget>
      <div>
        <w3m-button />
      </div>
    </>
  );
}
export default Navbar

