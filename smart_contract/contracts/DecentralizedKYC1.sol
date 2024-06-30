// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.19;

contract DecentralizedKYC1 {
    //admin for bank verification
    address public admin;

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
        string passportHash;
        string citizenshipFrontHash;
        string citizenshipBackHash;
        uint256 privateKey;
        uint256 publicKey;
        uint256 encryptKey;
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
        if (admin == msg.sender) {
            return true;
        } else {
            return false;
        }
    }

    function isUserValid() public view returns (bool) {
        if (users[msg.sender].isRegistered == true) {
            return true;
        } else {
            return false;
        }
    }

    function isBankValid() public view returns (bool) {
        if (banks[msg.sender].isRegistered == true) {
            return true;
        } else {
            return false;
        }
    }

    function isBankVerified() public view returns (bool) {
        if (banks[msg.sender].isVerified == true) {
            return true;
        } else {
            return false;
        }
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
        require(
            banks[_bank].isRegistered == true,
            "Bank Address not registered"
        );
        require(banks[_bank].isVerified == false, "Bank already verified");
        banks[_bank].isVerified = true;
        verifiedBankList.push(_bank);
    }

    //called by bank to get details of a particular user
    function getUserDetails(
        address user
    ) public view onlyRegisteredBank returns (User memory) {
        require(isBankValid() == true);
        return users[user];
    }

    //get the address of the caller
    function getMessageSender() public view returns (address) {
        return msg.sender;
    }

    //called by admin to get details of a particular bank
    function getBankDetails(address _bank) public view returns (Bank memory) {
        require(
            banks[_bank].isRegistered == true,
            "Bank Address not registered"
        );
        return banks[_bank];
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
            (users[msg.sender].kycStatus == KYC_STATUS.NOT_UPLOADED) ||
                (users[msg.sender].kycStatus == KYC_STATUS.REJECTED),
            "KYC already uploaded"
        );
        Kyc memory newKyc = Kyc(
            _jsonHash,
            _photoHash,
            _frontHash,
            _backHash,
            _privateKey,
            _publicKey,
            _encryptKey,
            address(0)
        );
        kyc[msg.sender] = newKyc;
        users[msg.sender].kycStatus = KYC_STATUS.UPLOADED;
    }

    /*---------functions for KYC verification requests (client to bank)----------*/

    //called by user to request a particular bank for verification purpose
    function requestVerification(address _bank) public onlyRegisteredUser {
        require(
            users[msg.sender].kycStatus == KYC_STATUS.UPLOADED,
            "KYC status should be uploaded"
        );
        require(banks[_bank].isVerified == true, "Bank not verified");
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
        require(isBankVerified() == true, "Bank not verified");
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
        require(banks[msg.sender].isVerified == true, "Bank not verified");
        require(
            users[_userAddress].kycStatus != KYC_STATUS.NOT_UPLOADED,
            "KYC not Uploaded"
        );
        return kyc[_userAddress];
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
        require(banks[msg.sender].isVerified == true, "Bank not verified");
        users[_userAddress].kycStatus = KYC_STATUS.VERIFIED;
        allBankClients[msg.sender].push(_userAddress);
        userAllBanks[_userAddress].push(msg.sender);
        kyc[_userAddress].verifiedBy = msg.sender;
        return "KYC has been Succesfully verified ";
    }

    //bank can reject verification is details aren't good enough
    function rejectUserKYC(
        address _userAddress
    ) public onlyRegisteredBank returns (string memory) {
        require(
            users[_userAddress].kycStatus == KYC_STATUS.REQUESTED,
            "KYC must be requested first"
        );
        require(banks[msg.sender].isVerified == true, "Bank not verified");
        users[_userAddress].kycStatus = KYC_STATUS.REJECTED;
        return "KYC has been rejected ";
    }
}
