const { ethers } = require("ethers");

const CONTRACT_ABI = require("../artifacts/contracts/abi/OverTrustFunctionsConsumer.json");
const ADDRESS_TO_LISTEN = "0x85F1Aba89aefc2E7f5e1D45B23d4E638945f70c8";
const WS_PROVIDER = new ethers.WebSocketProvider("wss://avalanche-fuji.infura.io/ws/v3/36b33c566c834ab4bd001f38b774769c");


async function listenOffChainEvents() {

  try {
    console.log("Connecting Websocket:", WS_PROVIDER.websocket.url);
    console.log("Listening on address:", ADDRESS_TO_LISTEN);

    let contract = new ethers.Contract(ADDRESS_TO_LISTEN, CONTRACT_ABI, WS_PROVIDER);
    
    contract.on("ResponseOffChainData", (requestId, records, res, err) => {

      console.log('Evento onchain started');
      console.log('');

      console.log('requestId', requestId);
      console.log('');
      console.log('records', records);

      console.log(err);

      console.log("WS Aberto readyState -> ", WS_PROVIDER.websocket.readyState);
    });
    
  } catch (err) {
    console.error('ERROR:', err);
  }
}

module.exports = {
  listenOffChainEvents
};