"use strict";
// import { dryrun, result } from "@permaweb/aoconnect";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// export async function retrieveTransactionData(
//   processId: string, 
//   tags: { name: string; value: string }[]
// ) {
//   try {
//     const dryrunRes = await dryrun({
//       process: processId,
//       tags,
//     });
//     console.log('Dryrun Response:', JSON.stringify(dryrunRes, null, 2));
//     // Check if Messages exist and have content
//     if (!dryrunRes.Messages || dryrunRes.Messages.length === 0) {
//       console.log('No messages found in dryrun response');
//       return null;
//     }
//     // Attempt to parse the first message's data
//     const firstMessage = dryrunRes.Messages[0];
//     console.log('First Message:', JSON.stringify(firstMessage, null, 2));
//     // Check if Data exists before parsing
//     if (!firstMessage.Data) {
//       console.log('No Data found in the first message');
//       return null;
//     }
//     const parsedData = JSON.parse(firstMessage.Data);
//     return parsedData;
//   } catch (error) {
//     console.error("Error retrieving transaction data:", error);
//     return null;
//   }
// }
// async function main() {
//   const processId = 'ec1YRXxBy5Jn_868vOMuOsvzdlHSJgQDNY8r0WaPG3M';
//   // const processId = 'coeLCECdZdj6tserfrpS0KYDQDkMPMTQwci0OhPNZTg';
//   const tags = [{ name: "Action", value: "Fetch-Data" }];
//   try {
//     const data = await retrieveTransactionData(processId, tags);
//     console.log('Parsed Data:', data);
//   } catch (error) {
//     console.error('Main function error:', error);
//   }
// }
// main();
// import fetch from 'node-fetch';
// async function fetchArweaveJson(url: string): Promise<any | null> {
//     try {
//         const response = await fetch(url);
//         // Check if the response's Content-Type header indicates JSON
//         const contentType = response.headers.get('content-type');
//         if (contentType && contentType.includes('application/json')) {
//             // If it's JSON, parse and return the content
//             return await response.json();
//         } else {
//             console.log('Content type is not JSON');
//             return null;
//         }
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return null;
//     }
// }
// // Usage
// const arweaveUrl = 'https://arweave.net/RYJLI7YIeUxj3KL05TA0VEwycg-snzr214h7aqtcK_Q';
// fetchArweaveJson(arweaveUrl).then(result => {
//     if (result) {
//         console.log('Retrieved JSON:', result);
//     } else {
//         console.log('No JSON content retrieved or an error occurred.');
//     }
// }).catch(error => {
//     console.error('Failed to fetch or process JSON:', error);
// });
const crypto_1 = __importDefault(require("crypto"));
// Example public key extraction from JSON
const walletData = {
    kty: "RSA",
    n: "n5WB23uxh21t_jT9tvOnMrhzsYpR6H_s58St3O09DKnR7jJ5X_fI--MQpSPMMdjW4ClzB1NEXoXXlbeyEr3Mh-k5KJezk8YiBxdt5-UOR5z6PT4chEotgColbLryg2EEA3DVsPNCckELEjn-dg8TGnWb0yFLqIw0--gcTgr4ALTDy06WfTCen8g0IqLcVdbz9V2_y2pF31RvFQN8dBlBvaDqBF0Toqs7XvKTz-uYDS1CLiSQQzKVXI2EKJ5tqZBe2eIPeThNDV-hRB0wYqwm9xmBYU23AX0PV0rmBVQFSCF2lZSnlhfuAu0K5twm_UYa1YXzHW1bapwHMrKI13NCuE4dL3o-pi_HOgQWPo8l5dUzEb0z3vuX68M8uDm1cbWBGVhLM37FwybOWyiuMbNP55uXnPB3oV7MssYHehyBpxFEBEacNjPxnQNQ60K7fUJGHVgKVGXircQ46934DPcK2m1SHcdb5ezMGp6vxRTyhcYsNc9uhzV6AuRRAHSfmeFzi2sBxWDlWUM9l4T-Jnums3oMfNAANrXXyJM3oLybSYdNojqvpoZUgbbVXq7B0W-0T2CENx7sVjq2emqAytt4P4jjUwOpUBjR4uYMD4Cpz3k11Fk1xyHCPwWBvGt6X5H5WWMVibRqUMIBolM3ZoDaWDVN1lQgE7op78FCSsWOKDs",
    e: "AQAB"
};
// Step 1: Parse public key modulus
const publicKeyModulus = Buffer.from(walletData.n, "base64");
// Step 2: Hash the modulus
const address = crypto_1.default.createHash('sha256').update(publicKeyModulus).digest('hex');
// Output the derived address
console.log("Derived Address:", address);
