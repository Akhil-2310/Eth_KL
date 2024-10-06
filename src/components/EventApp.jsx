import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import EventForm from "./EventForm";
import abi from "../eventsabi.json"

const EventApp = () => {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // await window.ethereum.enable();
        const signer = provider.getSigner();
        const address = "0x8c43FEAbe31C39f009B7A843b0Fe64689F4ceb74"; // Replace with your contract address
        const eventContract = new ethers.Contract(address, abi, signer);
        setContract(eventContract);
      }
    };
    init();
  }, []);

  return (
    <div>
      <h1>Event Management</h1>
      {contract && <EventForm contract={contract} />}
    </div>
  );
};

export default EventApp;
