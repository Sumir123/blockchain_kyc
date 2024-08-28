// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.19;

contract DecentralizedKYC1 {
    //admin for bank verification
    address public admin;
    bytes32 public root;

    //status of user's kyc
    enum KYC_STATUS {
        NOT_UPLOADED,
        UPLOADED,
        REQUESTED,
        VERIFIED,
        REJECTED
    }

    //user's details along with n and d of RSA
    struct Kyc {
        string jsonHash;
        string photoHash;
        string frontHash;
        string backHash;
        uint256 privateKey;
        uint256 publicKey;
        uint256 encryptKey;
        bytes32 merkleRoot;
        address verifiedBy;
    }

    //user's details
    struct User {
        string name;
        string email;
        string phone;
        bool isRegistered;
        KYC_STATUS kycStatus;
    }

    //bank's details
    struct Bank {
        string name;
        string license;
        bool isRegistered;
        bool isVerified;
    }

    //each User is identified by address
    mapping(address => User) users;

    //each bank is identified by address
    mapping(address => Bank) banks;

    //each kyc details is identified by customer's address
    mapping(address => Kyc) kyc;

    //mappings for client to bank verification requests
    mapping(address => address[]) verificationRequestBy;
    mapping(address => address) verificationRequestTo;

    //mappings for bank to verified clients KYC details access request
    mapping(address => address[]) accessRequestSent;
    mapping(address => address[]) accessRequestReceived;

    //mapping from a bank to all its clients
    mapping(address => address[]) allBankClients;

    //mapping from a user to all its banks
    mapping(address => address[]) userAllBanks;

    //list of addresses
    address[] bankList;
    address[] userList;
    address[] verifiedBankList;

    //who deploys the contract is the admin
    constructor() {
        admin = msg.sender;
    }

    //modifiers for different roles
    modifier onlyNewUser() {
        require(
            users[msg.sender].isRegistered != true,
            "User Address already registered"
        );
        require(
            banks[msg.sender].isRegistered != true,
            "This address is registered as a bank"
        );
        _;
    }

    modifier onlyNewBank() {
        require(
            banks[msg.sender].isRegistered != true,
            "Bank Address already registered"
        );
        require(
            users[msg.sender].isRegistered != true,
            "This account is registered as a user"
        );
        _;
    }

    modifier onlyRegisteredUser() {
        require(
            users[msg.sender].isRegistered == true,
            "User Address not registered"
        );
        _;
    }

    modifier onlyRegisteredBank() {
        require(
            banks[msg.sender].isRegistered == true,
            "Bank Address not registered"
        );
        _;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Admin access required");
        _;
    }

    modifier onlyVerifiedBank() {
        require(banks[msg.sender].isVerified == true, "Bank not verified");
        _;
    }

    //registration of a customer in the platform
    function registerUser(
        string memory _name,
        string memory _email,
        string memory _phone
    ) public onlyNewUser {
        users[msg.sender] = User(
            _name,
            _email,
            _phone,
            true,
            KYC_STATUS.NOT_UPLOADED
        );
        userList.push(msg.sender);
    }

    //registration of a bank in the platform
    function registerBank(
        string memory _name,
        string memory _license
    ) public onlyNewBank {
        banks[msg.sender] = Bank(_name, _license, true, false);
        bankList.push(msg.sender);
    }

    //called by user to get dashboard
    function getUser() public view onlyRegisteredUser returns (User memory) {
        return users[msg.sender];
    }

    //called by bank to get dashboard
    function getBank() public view onlyRegisteredBank returns (Bank memory) {
        return banks[msg.sender];
    }

    //validators to check if correct wallet is connected
    function isAdmin() public view returns (bool) {
        return admin == msg.sender;
    }

    function isUserValid() public view returns (bool) {
        return users[msg.sender].isRegistered;
    }

    function isBankValid() public view returns (bool) {
        return banks[msg.sender].isRegistered;
    }

    function isBankVerified() public view returns (bool) {
        return banks[msg.sender].isVerified;
    }

    //address list of all banks returned
    function getAllBanksAddress() public view returns (address[] memory) {
        return bankList;
    }

    //total count of users and verified bank called by admin
    function getUserCount() public view returns (uint256 count) {
        return userList.length;
    }

    function getVerifiedBankCount() public view returns (uint256 count) {
        return verifiedBankList.length;
    }

    //called by admin to verify a registered bank
    function verifyBank(address _bank) public onlyAdmin {
        require(banks[_bank].isRegistered, "Bank Address not registered");
        require(!banks[_bank].isVerified, "Bank already verified");
        banks[_bank].isVerified = true;
        verifiedBankList.push(_bank);
    }

    //called by bank to get details of a particular user
    function getUserDetails(
        address user
    ) public view onlyRegisteredBank returns (User memory) {
        require(isBankValid(), "Invalid Bank");
        return users[user];
    }

    //get the address of the caller
    function getMessageSender() public view returns (address) {
        return msg.sender;
    }

    //called by admin to get details of a particular bank
    function getBankDetails(address _bank) public view returns (Bank memory) {
        require(banks[_bank].isRegistered, "Bank Address not registered");
        return banks[_bank];
    }

    // Helper function to convert uint256 to string
    function uintToString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 tempValue = value;
        uint256 digits;
        while (tempValue != 0) {
            digits++;
            tempValue /= 10;
        }
        bytes memory buffer = new bytes(digits);
        uint256 index = digits - 1;
        tempValue = value;
        while (tempValue != 0) {
            buffer[index--] = bytes1(uint8(48 + (tempValue % 10)));
            tempValue /= 10;
        }
        return string(buffer);
    }

    //called by user to upload the kyc hashes and cryptography keys
    function uploadKyc(
        string memory _jsonHash,
        string memory _photoHash,
        string memory _frontHash,
        string memory _backHash,
        uint256 _privateKey,
        uint256 _publicKey,
        uint256 _encryptKey
    ) public onlyRegisteredUser {
        require(
            users[msg.sender].kycStatus == KYC_STATUS.NOT_UPLOADED ||
                users[msg.sender].kycStatus == KYC_STATUS.REJECTED,
            "KYC already uploaded"
        );

        // Convert uint256 to string
        string memory privateKeyStr = uintToString(_privateKey);
        string memory publicKeyStr = uintToString(_publicKey);
        string memory encryptKeyStr = uintToString(_encryptKey);

        // Prepare the array of hashes
        string[] memory hashes = new string[](7);
        hashes[0] = _jsonHash;
        hashes[1] = _photoHash;
        hashes[2] = _frontHash;
        hashes[3] = _backHash;
        hashes[4] = privateKeyStr;
        hashes[5] = publicKeyStr;
        hashes[6] = encryptKeyStr;

        // Compute Merkle root for KYC data
        bytes32 merkleRoot = computeMerkleRoot(hashes);

        Kyc memory newKyc = Kyc(
            _jsonHash,
            _photoHash,
            _frontHash,
            _backHash,
            _privateKey,
            _publicKey,
            _encryptKey,
            merkleRoot,
            address(0)
        );

        // Store the KYC object in the mapping
        kyc[msg.sender] = newKyc;

        // Update the user's KYC status
        users[msg.sender].kycStatus = KYC_STATUS.UPLOADED;
    }

    // Helper function to compute Merkle Root
    function computeMerkleRoot(
        string[] memory leaves
    ) public pure returns (bytes32) {
        require(leaves.length > 0, "Leaves cannot be empty");

        bytes32[] memory hashes = new bytes32[](leaves.length);
        for (uint i = 0; i < leaves.length; i++) {
            hashes[i] = keccak256(abi.encodePacked(leaves[i]));
        }

        while (hashes.length > 1) {
            uint newLength = (hashes.length + 1) / 2;
            bytes32[] memory newHashes = new bytes32[](newLength);

            for (uint i = 0; i < newLength; i++) {
                if (i * 2 + 1 < hashes.length) {
                    newHashes[i] = keccak256(
                        abi.encodePacked(hashes[i * 2], hashes[i * 2 + 1])
                    );
                } else {
                    newHashes[i] = hashes[i * 2];
                }
            }

            hashes = newHashes;
        }

        return hashes[0];
    }

    /*---------functions for KYC verification requests (client to bank)----------*/

    //called by user to request a particular bank for verification purpose
    function requestVerification(address _bank) public onlyRegisteredUser {
        require(
            users[msg.sender].kycStatus == KYC_STATUS.UPLOADED,
            "KYC status should be uploaded"
        );
        require(banks[_bank].isVerified, "Bank not verified");
        address[] storage requestedUsers = verificationRequestBy[_bank];
        requestedUsers.push(msg.sender);
        users[msg.sender].kycStatus = KYC_STATUS.REQUESTED;
        verificationRequestTo[msg.sender] = _bank;
    }

    //called by bank to get all the users who requested for verification
    function getRequestedUsers()
        public
        view
        onlyRegisteredBank
        returns (address[] memory)
    {
        require(isBankVerified(), "Bank not verified");
        return verificationRequestBy[msg.sender];
    }

    //called by user to get bank which is requested for verification
    function getRequestedBank()
        public
        view
        onlyRegisteredUser
        returns (address)
    {
        return verificationRequestTo[msg.sender];
    }

    //called by user to get all its banks
    function getUserAllBanks()
        public
        view
        onlyRegisteredUser
        returns (address[] memory)
    {
        return userAllBanks[msg.sender];
    }

    /*------------------------------------------------------------------------------------*/

    /*---------------------functions for KYC details access requests (bank to verified clients)----*/

    //called by bank to request particular client to give access
    function requestAccess(address _client) public onlyVerifiedBank {
        require(
            users[_client].kycStatus == KYC_STATUS.VERIFIED,
            "Client KYC is not verified"
        );
        address[] storage accessRequestsByBank = accessRequestSent[msg.sender];
        accessRequestsByBank.push(_client);
        address[] storage accessRequestsToClient = accessRequestReceived[
            _client
        ];
        accessRequestsToClient.push(msg.sender);
    }

    //called by user to get banks who have requested for kyc access
    function getReceivedRequests() public view returns (address[] memory) {
        return accessRequestReceived[msg.sender];
    }

    //called by bank to get users who have been requested for access
    function getSentRequests() public view returns (address[] memory) {
        return accessRequestSent[msg.sender];
    }

    //called by user to give access to the bank
    function grantAccess(address _bank) public {
        require(
            users[msg.sender].kycStatus == KYC_STATUS.VERIFIED,
            "Client KYC is not verified"
        );
        allBankClients[_bank].push(msg.sender);
        userAllBanks[msg.sender].push(_bank);
    }

    /*------------------------------------------------------------------------------------*/

    //All clients of a bank
    function getBankClients()
        public
        view
        onlyVerifiedBank
        returns (address[] memory)
    {
        return allBankClients[msg.sender];
    }

    //All clients with bank address supplied
    function getBankClientsAddrSupp(
        address _bank
    ) public view returns (address[] memory) {
        return allBankClients[_bank];
    }

    // Bank can now get users kyc
    function getUserKYC(
        address _userAddress
    ) public view onlyRegisteredBank returns (Kyc memory) {
        require(banks[msg.sender].isVerified, "Bank not verified");
        require(
            users[_userAddress].kycStatus != KYC_STATUS.NOT_UPLOADED,
            "KYC not Uploaded"
        );
        Kyc memory userKyc = kyc[_userAddress];

        // Validate Merkle Root
        string[] memory kycData = new string[](7);
        kycData[0] = userKyc.jsonHash;
        kycData[1] = userKyc.photoHash;
        kycData[2] = userKyc.frontHash;
        kycData[3] = userKyc.backHash;
        kycData[4] = uintToString(userKyc.privateKey);
        kycData[5] = uintToString(userKyc.publicKey);
        kycData[6] = uintToString(userKyc.encryptKey);

        bytes32 computedRoot = computeMerkleRoot(kycData);
        require(userKyc.merkleRoot == computedRoot, "Merkle root mismatch");

        return userKyc;
    }

    //get user's own kyc
    function getKYC() public view onlyRegisteredUser returns (Kyc memory) {
        require(
            users[msg.sender].kycStatus != KYC_STATUS.NOT_UPLOADED,
            "KYC not Uploaded"
        );
        return kyc[msg.sender];
    }

    //Bank can verify kyc document if requested by user (requestVerification() function call)
    function verifyUserKYC(
        address _userAddress
    ) public onlyRegisteredBank returns (string memory) {
        require(
            users[_userAddress].kycStatus == KYC_STATUS.REQUESTED,
            "KYC must be requested first"
        );
        require(banks[msg.sender].isVerified, "Bank not verified");
        users[_userAddress].kycStatus = KYC_STATUS.VERIFIED;
        allBankClients[msg.sender].push(_userAddress);
        userAllBanks[_userAddress].push(msg.sender);
        kyc[_userAddress].verifiedBy = msg.sender;
        return "KYC has been successfully verified";
    }

    //bank can reject verification if details aren't good enough
    function rejectUserKYC(
        address _userAddress
    ) public onlyRegisteredBank returns (string memory) {
        require(
            users[_userAddress].kycStatus == KYC_STATUS.REQUESTED,
            "KYC must be requested first"
        );
        require(banks[msg.sender].isVerified, "Bank not verified");
        users[_userAddress].kycStatus = KYC_STATUS.REJECTED;
        return "KYC has been rejected";
    }
}
