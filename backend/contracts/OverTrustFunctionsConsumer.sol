// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/functions/v1_0_0/FunctionsClient.sol";
import "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import "@chainlink/contracts/src/v0.8/functions/v1_0_0/libraries/FunctionsRequest.sol";

//magic
contract OverTrustFunctionsConsumer is FunctionsClient, ConfirmedOwner {
    using FunctionsRequest for FunctionsRequest.Request;

    constructor() FunctionsClient(router) ConfirmedOwner(msg.sender) {}

    /**
     * Fuji tesnet
     */
    address router = 0xA9d587a00A31A52Ed70D6026794a8FC5E2F5dCb0;
    bytes32 donID = 0x66756e2d6176616c616e6368652d66756a692d31000000000000000000000000;

    bytes32 public s_lastRequestId;
    bytes public s_lastResponse;
    bytes public s_lastError;
    string public debugRetorno;
    
    event ResponseOffChainData(
        bytes32 indexed requestId,
        string character,
        bytes response,
        bytes err
    );

    uint32 gasLimit = 300000;

    string externalAPIDataSource =
        "const param = args[0];"
        "const apiResponse = await Functions.makeHttpRequest({"
        "url: `https://api.jsonbin.io/v3/b/${param}/`"
        "});"
        "if (apiResponse.error) {"
        "throw Error('Request failed');"
        "}"
        "const { data } = apiResponse;"
        "const retorno = '' + data.record.Rating + '|' + JSON.stringify(data.record.Partners);"
        "return Functions.encodeString(retorno);";

    function sendRequestOffChain(string memory arg
    ) external onlyOwner returns (bytes32 requestId) {
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(externalAPIDataSource); // Initialize the request with JS code
        
        string[] memory externalParams = new string[](1);
        externalParams[0] = arg;
        req.setArgs(externalParams); //args = wallets address or govID

        s_lastRequestId = _sendRequest(
            req.encodeCBOR(),
            8279,
            gasLimit,
            donID
        );
        return s_lastRequestId;
    }

    /**
     * @notice Callback function for fulfilling a request
     * @param requestId The ID of the request to fulfill
     * @param response The HTTP response data
     * @param err Any errors from the Functions request
     */
    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {

        if (s_lastRequestId != requestId) {
            revert UnexpectedRequestID(requestId); // Check if request IDs match
        }
       
        s_lastResponse = response;
        s_lastError = err;
        debugRetorno = string(response);

        // Emit an event to log the response
        emit ResponseOffChainData(requestId, string(response), s_lastResponse, s_lastError);
    }

    error UnexpectedRequestID(bytes32 requestId);
}