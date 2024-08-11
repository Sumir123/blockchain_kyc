/* eslint-disable eqeqeq */
import { ethers } from "ethers";
import STATUS from "../utils/status";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { makeStorageClient } from "../utils/ipfsConnection";
import {
  contractABI,
  contractAddress,
  THIRD_WORLD_CLIENT_ID,
} from "../utils/constants";
import { getCryptographyKeys, decryptMessage } from "../utils/cryptography";
import { computeMerkleRoot } from "../utils/merkleTree";

async function retrieveFiles(cid) {
  const client = makeStorageClient();
  const res = await client.get(cid);
  console.log(`Got a response! [${res.status}] ${res.statusText}`);
  if (!res.ok) {
    throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`);
  }

  // unpack File objects from the response
  const files = await res.files();
  // if (files.length===1){
  //   return files[0].path
  // }

  for (const file of files) {
    console.log(file);
    console.log(`${file.cid} -- ${file.path} -- ${file.size}`);
  }
  return files[0];
}

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const kycContract = new ethers.Contract(contractAddress, contractABI, signer);

  return kycContract;
};

export const TransactionsProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [userDashboard, setUserDashboard] = useState("");
  const [bankDashboard, setBankDashboard] = useState("");
  const [validUser, setValidUser] = useState("");
  const [validBank, setValidBank] = useState("");
  const [validAdmin, setValidAdmin] = useState("");
  const [userCount, setUserCount] = useState("");
  const [bankCount, setBankCount] = useState("");
  const [allBanks, setAllBanks] = useState([]);
  const [allBankClients, setAllBankClients] = useState([]);
  const [userAllBanks, setUserAllBanks] = useState([]);
  const [allBankClientDetails, setAllBankClientDetails] = useState([]);
  const [requestedClients, setRequestedClients] = useState([]);
  const [KycRequestedClients, setKycRequestedClients] = useState([]);
  const [KycRequestedBanks, setKycRequestedBanks] = useState([]);
  // const [KycAccessGrantedClients, setKycAccessGrantedClients] = useState([]);
  const [kycDetail, setKycDetail] = useState({});
  const [passportPhoto, setPassportPhoto] = useState("");
  const [citizenshipFrontPhoto, setCitizenshipFrontPhoto] = useState("");
  const [citizenshipBackPhoto, setCitizenshipBackPhoto] = useState("");
  const [passportHash, setPassportHash] = useState("");
  const [citizenshipFrontHash, setCitizenshipFrontHash] = useState("");
  const [citizenshipBackHash, setCitizenshipBackHash] = useState("");
  const [keys, setKeys] = useState([]);
  const [userKeys, setUserKeys] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const registerUser = async (formData) => {
    try {
      if (ethereum) {
        const kycContract = createEthereumContract();
        const { name, email, phone } = formData;

        const registerTxn = await kycContract.registerUser(name, email, phone, {
          gasLimit: 300000,
        });

        // toast.info("Mining... ", registerTxn.hash);
        await registerTxn.wait();
        console.log("Mined --", registerTxn.hash);
        // toast.info("Mined -- ", registerTxn.hash);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      toast.info("Registration Unsuccessful");
    }
  };

  const registerBank = async (formData) => {
    try {
      if (ethereum) {
        const kycContract = createEthereumContract();
        const { name, license } = formData;
        const registerTxn = await kycContract.registerBank(name, license, {
          gasLimit: 300000,
        });

        // toast.info("Mining... ", registerTxn.hash);
        await registerTxn.wait();
        console.log("Mined --", registerTxn.hash);
        // toast.info("Mined -- ", registerTxn.hash);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      toast.info("Registration Unsuccessful");
    }
  };

  const getUserDashboard = async () => {
    try {
      if (ethereum) {
        const kycContract = createEthereumContract();
        const userDashboard = await kycContract.getUser();

        const dashboard = {
          name: userDashboard.name,
          email: userDashboard.email,
          phone: userDashboard.phone,
          kycStatus: STATUS[userDashboard.kycStatus],
        };
        setUserDashboard(dashboard);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBankDashboard = async () => {
    try {
      if (ethereum) {
        const kycContract = createEthereumContract();
        const bankDashboard = await kycContract.getBank();

        const dashboard = {
          name: bankDashboard.name,
          license: bankDashboard.license,
          verified: bankDashboard.isVerified,
        };
        setBankDashboard(dashboard);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getKycAccessRequests = async () => {
    try {
      if (ethereum) {
        const kycContract = createEthereumContract();
        const clients = await kycContract.getSentRequests();
        setKycRequestedClients(clients);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const bankFilter = async () => {
    try {
      if (ethereum) {
        const kycContract = createEthereumContract();
        const banks = await kycContract.getReceivedRequests();

        const promises = banks.map(async (bank) => {
          const bankClients = await kycContract.getBankClientsAddrSupp(bank);

          const detail = {
            address: bank,
            clients: bankClients,
          };
          return detail;
        });
        const bankWithClients = await Promise.all(promises);

        const user = await kycContract.getMessageSender();

        const filteredBankList = [];

        bankWithClients.map((bank) => {
          const check = bank.clients.includes(user);

          if (!check) {
            filteredBankList.push(bank.address);
          }
        });

        return filteredBankList;
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getKycAccessRequestsForClient = async () => {
    try {
      if (ethereum) {
        const kycContract = createEthereumContract();
        const filteredBanks = await bankFilter();

        const promises = filteredBanks.map(async (bank) => {
          const bankDetail = await kycContract.getBankDetails(bank);
          const detail = {
            address: bank,
            name: bankDetail.name,
            license: bankDetail.license,
            isVerified: bankDetail.isVerified,
          };
          return detail;
        });
        const allBanks = await Promise.all(promises);

        setKycRequestedBanks(allBanks);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllBankClients = async () => {
    try {
      if (ethereum) {
        const kycContract = createEthereumContract();
        const clients = await kycContract.getBankClients();
        setAllBankClients(clients);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserCount = async () => {
    try {
      if (ethereum) {
        const kycContract = createEthereumContract();
        const userCount = await kycContract.getUserCount();
        const parsedCount = parseInt(userCount._hex, 16);
        setUserCount(parsedCount);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBankCount = async () => {
    try {
      if (ethereum) {
        const kycContract = createEthereumContract();
        const bankCount = await kycContract.getVerifiedBankCount();
        const parsedCount = parseInt(bankCount._hex, 16);
        setBankCount(parsedCount);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllBanks = async () => {
    try {
      if (ethereum) {
        const kycContract = createEthereumContract();
        const banks = await kycContract.getAllBanksAddress();
        const promises = banks.map(async (bank) => {
          const bankDetail = await kycContract.getBankDetails(bank);
          const detail = {
            address: bank,
            name: bankDetail.name,
            license: bankDetail.license,
            isVerified: bankDetail.isVerified,
          };
          return detail;
        });
        const allBanks = await Promise.all(promises);
        setAllBanks(allBanks);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const addBankAccess = async () => {
  //   try {
  //     if (ethereum) {
  //       const kycContract = createEthereumContract();
  //
  //       const userAccess = await kycContract.addBankAccess(
  //         "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  //         {
  //           gasLimit: 300000,
  //         }
  //       );

  //       console.log("Mining...", userAccess.hash);
  //       await userAccess.wait();
  //       console.log("Mined --", userAccess.hash);
  //     } else {
  //       console.log("Ethereum is not present");
  //     }
  //   } catch (error) {
  //     console.log("ERROR ", error);
  //   }
  // };

  const getRequestedUsers = async () => {
    try {
      if (ethereum) {
        const kycContract = createEthereumContract();
        const bankUsers = await kycContract.getRequestedUsers();

        const promises = bankUsers.map(async (user) => {
          const userDetail = await kycContract.getUserDetails(user);
          const detail = {
            address: user,
            name: userDetail.name,
            email: userDetail.email,
            phone: userDetail.phone,
            kycStatus: STATUS[userDetail.kycStatus],
          };
          return detail;
        });

        const requestedUsers = await Promise.all(promises);

        console.log("TRANS CONTEXT", requestedUsers);
        const requestedAndNotVerified = requestedUsers.filter(
          (user) =>
            user.kycStatus != "VERIFIED" &&
            user.kycStatus != "REJECTED" &&
            user.kycStatus != "UPLOADED"
        );
        setRequestedClients(requestedAndNotVerified);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log("ERROR ON BANK CLIEN", error);
    }
  };

  const getAllUserDetailsofBank = async () => {
    try {
      if (ethereum) {
        const kycContract = createEthereumContract();
        const bankUsers = await kycContract.getBankClients();

        const promises = bankUsers.map(async (user) => {
          const userDetail = await kycContract.getUserDetails(user);
          const detail = {
            address: user,
            name: userDetail.name,
            email: userDetail.email,
            phone: userDetail.phone,
            kycStatus: STATUS[userDetail.kycStatus],
          };
          return detail;
        });

        const allBankUsers = await Promise.all(promises);

        console.log("TRANS CONTEXT", allBankUsers);
        setAllBankClientDetails(allBankUsers);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log("ERROR ON BANK CLIEN", error);
    }
  };

  const getAllBanksDetailsofUser = async () => {
    try {
      if (ethereum) {
        const kycContract = createEthereumContract();
        const userBanks = await kycContract.getUserAllBanks();

        const promises = userBanks.map(async (bank) => {
          const bankDetail = await kycContract.getBankDetails(bank);
          const detail = {
            address: bank,
            name: bankDetail.name,
            license: bankDetail.license,
            isVerified: bankDetail.isVerified,
          };
          return detail;
        });

        const userAllbanks = await Promise.all(promises);
        setUserAllBanks(userAllbanks);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyUserKYC = async (_userAddress) => {
    try {
      if (ethereum) {
        const kycContract = createEthereumContract();
        const verifyTxn = await kycContract.verifyUserKYC(_userAddress, {
          gasLimit: 300000,
        });
        console.log("Mining ...", verifyTxn.hash);

        await verifyTxn.wait();
        console.log("Mined --", verifyTxn.hash);

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      toast.info("Unable to verify KYC");
    }
  };

  const rejectUserKYC = async (_userAddress) => {
    try {
      if (ethereum) {
        const kycContract = createEthereumContract();
        const verifyTxn = await kycContract.rejectUserKYC(_userAddress, {
          gasLimit: 300000,
        });
        console.log("Mining ...", verifyTxn.hash);

        await verifyTxn.wait();
        console.log("Mined --", verifyTxn.hash);

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      toast.info("Unable to reject KYC");
    }
  };

  const verifyBank = async (bank) => {
    try {
      if (ethereum) {
        const kycContract = createEthereumContract();
        const verifyTxn = await kycContract.verifyBank(bank, {
          gasLimit: 300000,
        });

        await verifyTxn.wait();
        console.log("Mined --", verifyTxn.hash);

        setTimeout(() => {
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }, 2000);
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      toast.info("Request Unsuccessful");
    }
  };

  const requestVerification = async (bank) => {
    try {
      if (ethereum) {
        const kycContract = createEthereumContract();
        const requestTxn = await kycContract.requestVerification(bank, {
          gasLimit: 300000,
        });

        await requestTxn.wait();
        console.log("Mined --", requestTxn.hash);

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        console.log("No ethereum object");
        toast.info("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      toast.info("Request Unsuccessful");
    }
  };

  const requestAccess = async (client) => {
    try {
      if (ethereum) {
        const kycContract = createEthereumContract();
        const requestTxn = await kycContract.requestAccess(client, {
          gasLimit: 300000,
        });

        await requestTxn.wait();
        console.log("Mined --", requestTxn.hash);

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        console.log("No ethereum object");
        toast.info("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      toast.info("Request Unsuccessful");
    }
  };

  //bank can call this function to get KYC details of user (for now if it has userAddress)
  const getUserKYC = async (_userAddress) => {
    try {
      if (ethereum) {
        const kycContract = createEthereumContract();
        const kycDetailFromContract = await kycContract.getUserKYC(
          _userAddress
        );
        console.log("KYC DETAIL  ", kycDetailFromContract);
        const privateKey = kycDetailFromContract.privateKey;
        const publicKey = kycDetailFromContract.publicKey;
        const parsedPrivateKey = parseInt(privateKey._hex, 16);
        const parsedPublicKey = parseInt(publicKey._hex, 16);
        const jsonHash = kycDetailFromContract.jsonHash;
        const verifiedBy = kycDetailFromContract.verifiedBy;
        let verifier;
        if (verifiedBy == "0x0000000000000000000000000000000000000000") {
          verifier = "None";
        } else {
          const bankDetail = await kycContract.getBankDetails(verifiedBy);
          verifier = bankDetail.name;
        }

        fetch(
          `https://${THIRD_WORLD_CLIENT_ID}.ipfscdn.io/ipfs/${jsonHash}/form.json`
        ).then(function (response) {
          return response.text().then(function (text) {
            console.log(text);
            const decryptedMessage = JSON.parse(
              decryptMessage(text, parsedPrivateKey, parsedPublicKey)
            );
            decryptedMessage.verifiedBy = verifiedBy;
            decryptedMessage.verifier = verifier;
            setKycDetail({ userDetails: decryptedMessage });
          });
        });

        const passportHash = kycDetailFromContract.passportHash;

        fetch(
          `https://${THIRD_WORLD_CLIENT_ID}.ipfscdn.io/ipfs/${passportHash}/passportPhotoHash`
        ).then(function (response) {
          return response.text().then(function (text) {
            const decryptedMessage = decryptMessage(
              text,
              parsedPrivateKey,
              parsedPublicKey
            );

            setPassportPhoto(
              decryptedMessage.replace('"', "").replace('"', "")
            );
          });
        });

        const citizenshipFrontHash = kycDetailFromContract.citizenshipFrontHash;

        fetch(
          `https://${THIRD_WORLD_CLIENT_ID}.ipfscdn.io/ipfs/${citizenshipFrontHash}/citizenshipFrontHash`
        ).then(function (response) {
          return response.text().then(function (text) {
            const decryptedMessage = decryptMessage(
              text,
              parsedPrivateKey,
              parsedPublicKey
            );

            setCitizenshipFrontPhoto(
              decryptedMessage.replace('"', "").replace('"', "")
            );
          });
        });

        const citizenshipBackHash = kycDetailFromContract.citizenshipBackHash;

        fetch(
          `https://${THIRD_WORLD_CLIENT_ID}.ipfscdn.io/ipfs/${citizenshipBackHash}/citizenshipBackHash`
        ).then(function (response) {
          return response.text().then(function (text) {
            const decryptedMessage = decryptMessage(
              text,
              parsedPrivateKey,
              parsedPublicKey
            );

            setCitizenshipBackPhoto(
              decryptedMessage.replace('"', "").replace('"', "")
            );
          });
        });
      } else {
        console.log("Ethereum is not present");
        toast.info("Ethereum is not present");
      }
    } catch (error) {
      console.log("ERROR ON GETTING KYC", error);
    }
  };

  //user can call this function to get KYC details if it is uploaded
  const getKYC = async () => {
    try {
      if (ethereum) {
        const kycContract = createEthereumContract();
        const kycDetailFromContract = await kycContract.getKYC();
        const privateKey = kycDetailFromContract.privateKey;
        const publicKey = kycDetailFromContract.publicKey;
        const encryptKey = kycDetailFromContract.encryptKey;
        const parsedPrivateKey = parseInt(privateKey._hex, 16);
        const parsedPublicKey = parseInt(publicKey._hex, 16);
        const parsedEncryptKey = parseInt(encryptKey._hex, 16);
        const verifiedBy = kycDetailFromContract.verifiedBy;

        let verifier;
        if (verifiedBy == "0x0000000000000000000000000000000000000000") {
          verifier = "None";
        } else {
          const bankDetail = await kycContract.getBankDetails(verifiedBy);
          verifier = bankDetail.name;
        }

        setUserKeys([parsedEncryptKey, parsedPrivateKey, parsedPublicKey]);
        const jsonHash = kycDetailFromContract.jsonHash;
        console.log("Hashes", kycDetailFromContract);

        fetch(
          `https://${THIRD_WORLD_CLIENT_ID}.ipfscdn.io/ipfs/${jsonHash}/form.json`
        ).then(function (response) {
          return response.text().then(function (text) {
            const decryptedMessage = JSON.parse(
              decryptMessage(text, parsedPrivateKey, parsedPublicKey)
            );
            decryptedMessage.verifiedBy = verifiedBy;
            decryptedMessage.verifier = verifier;

            setKycDetail({
              ...kycDetail,
              userDetails: decryptedMessage,
            });
          });
        });
        console.log("kycDetailFromContract", kycDetailFromContract);
        setPassportHash(kycDetailFromContract.photoHash);

        fetch(
          `https://${THIRD_WORLD_CLIENT_ID}.ipfscdn.io/ipfs/${kycDetailFromContract.photoHash}/passportPhotoHash`
        ).then(function (response) {
          return response.text().then(function (text) {
            const decryptedMessage = decryptMessage(
              text,
              parsedPrivateKey,
              parsedPublicKey
            );

            setPassportPhoto(
              decryptedMessage.replace('"', "").replace('"', "")
            );
          });
        });

        setCitizenshipFrontHash(kycDetailFromContract.frontHash);

        fetch(
          `https://${THIRD_WORLD_CLIENT_ID}.ipfscdn.io/ipfs/${kycDetailFromContract.frontHash}/citizenshipFrontHash`
        ).then(function (response) {
          return response.text().then(function (text) {
            const decryptedMessage = decryptMessage(
              text,
              parsedPrivateKey,
              parsedPublicKey
            );
            console.log(decryptedMessage);
            setCitizenshipFrontPhoto(
              decryptedMessage.replace('"', "").replace('"', "")
            );
          });
        });

        setCitizenshipBackHash(kycDetailFromContract.backHash);

        fetch(
          `https://${THIRD_WORLD_CLIENT_ID}.ipfscdn.io/ipfs/${kycDetailFromContract.backHash}/citizenshipBackHash`
        ).then(function (response) {
          return response.text().then(function (text) {
            const decryptedMessage = decryptMessage(
              text,
              parsedPrivateKey,
              parsedPublicKey
            );

            setCitizenshipBackPhoto(
              decryptedMessage.replace('"', "").replace('"', "")
            );
          });
        });
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log("ERROR ON GETTING KYC", error);
    }
  };

  const handleComputeMerkleRoot = async (data) => {
    const merkleRoot = computeMerkleRoot(data);
    return merkleRoot;
  };

  const uploadKYC = async (
    _jsonHash,
    _photoHash,
    _frontHash,
    _backHash,
    _privateKey,
    _publicKey,
    _encryptKey
  ) => {
    try {
      if (ethereum) {
        const kycContract = createEthereumContract();

        const dataForMerkle = [
          _jsonHash,
          _photoHash,
          _frontHash,
          _backHash,
          _privateKey,
          _publicKey,
          _encryptKey,
        ];

        const merkleRootHex = await handleComputeMerkleRoot(dataForMerkle);

        // Ensure merkleRootHex is a 64-character hexadecimal string
        if (!/^([0-9a-fA-F]{64})$/.test(merkleRootHex)) {
          throw new Error("Invalid merkleRootHex format");
        }

        // Convert to bytes32 format
        const merkleRoot = ethers.utils.hexZeroPad(`0x${merkleRootHex}`, 32);

        const uploadTxn = await kycContract.uploadKyc(
          _jsonHash,
          _photoHash,
          _frontHash,
          _backHash,
          _privateKey,
          _publicKey,
          _encryptKey,
          merkleRoot
        );

        await uploadTxn.wait();

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        console.log("No Ethereum object found");
        toast.info("No Ethereum object found");
      }
    } catch (error) {
      console.error("Error uploading KYC:", error);
      toast.error("Upload Unsuccessful");
    }
  };

  const checkValidUser = async () => {
    try {
      if (ethereum) {
        const kycContract = createEthereumContract();
        const validUser = await kycContract.isUserValid();
        const logged = JSON.parse(localStorage.getItem("loggedIn")).entry;

        logged && setValidUser(validUser);
        console.log("User status:", validUser);
        toast.info(`User status: ${validUser ? "Online" : "Offline"}`);
      } else {
        console.log("Ethereum is not present");
        toast.info("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkValidBank = async () => {
    try {
      if (ethereum) {
        const kycContract = createEthereumContract();
        console.log("kycContract", kycContract);
        const validBank = await kycContract.isBankValid();
        setValidBank(validBank);
        console.log("Bank status:", validBank);
        toast.info(`"Bank status: ${validBank ? "Online" : "Offline"}`);
      } else {
        console.log("Ethereum is not present");
        toast.info("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkValidAdmin = async () => {
    try {
      if (ethereum) {
        const kycContract = createEthereumContract();
        const validAdmin = await kycContract.isAdmin();
        setValidAdmin(validAdmin);
        console.log("Admin status:", validAdmin);
        toast.info(`Admin status: ${validAdmin ? "Online" : "Offline"}`);
      } else {
        toast.info("Ethereum is not present");
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        toast.info("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        const logged = JSON.parse(localStorage.getItem("loggedIn")).entry;
        logged && setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //for test
  const addBankAccess = async (bankAddress) => {
    try {
      if (ethereum) {
        const kycContract = createEthereumContract();

        const userAccess = await kycContract.grantAccess(bankAddress, {
          gasLimit: 300000,
        });

        await userAccess.wait();
        console.log("Mined --", userAccess.hash);
        toast.info("Mined... ", userAccess.hash);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log("ERROR ", error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setLoggedIn(true);

      localStorage.setItem("loggedIn", JSON.stringify({ entry: true }));

      console.log("Connected", accounts[0]);
      toast.info("Login Successful. Wallet Connected.");
      setCurrentAccount(accounts[0]);
    } catch (error) {
      toast.info("Login Unsuccessful");
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("loggedIn");
    document.location.href = "/";
    setLoggedIn(false);
    toast.info("Logout Successful");
  };

  const genKeys = () => {
    console.log("Keys Computing");
    // toast.info("Keys Computing");
    const keysGenerated = getCryptographyKeys();
    setKeys(keysGenerated);
  };

  const getUserKeys = () => {
    setKeys(userKeys);
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        registerUser,
        registerBank,
        userDashboard,
        getUserDashboard,
        bankDashboard,
        getBankDashboard,
        validUser,
        checkValidUser,
        checkValidBank,
        validBank,
        checkValidAdmin,
        validAdmin,
        userCount,
        bankCount,
        getUserCount,
        getBankCount,
        allBanks,
        getAllBanks,
        getRequestedUsers,
        addBankAccess,
        requestedClients,
        getKycAccessRequests,
        KycRequestedClients,
        getAllBankClients,
        allBankClients,
        getAllUserDetailsofBank,
        allBankClientDetails,
        verifyBank,
        uploadKYC,
        requestVerification,
        verifyUserKYC,
        requestAccess,
        getKycAccessRequestsForClient,
        KycRequestedBanks,
        getUserKYC,
        kycDetail,
        getKYC,
        genKeys,
        keys,
        rejectUserKYC,
        passportPhoto,
        citizenshipFrontPhoto,
        citizenshipBackPhoto,
        passportHash,
        citizenshipBackHash,
        citizenshipFrontHash,
        getUserKeys,
        getAllBanksDetailsofUser,
        userAllBanks,
        logout,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
