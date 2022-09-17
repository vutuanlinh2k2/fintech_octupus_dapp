// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

contract Club {
    struct Request {
        uint256 id;
        string title;
        string description;
        uint256 value;
        address owner;
        address recipient;
        bool complete;
        uint256 approvalsCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    mapping(address => bool) public members;
    uint256 public membersCount;
    uint256 public requestsCount;
    uint256 public completeRequestsCount;

    address public manager;

    modifier managerOnly() {
        require(msg.sender == manager);
        _;
    }

    modifier memberOnly() {
        require(members[msg.sender]);
        _;
    }

    constructor() {
        manager = msg.sender;
        members[msg.sender] = true;
        membersCount++;
    }

    function addMember(address newMember) public managerOnly {
        require(!members[newMember]);
        members[newMember] = true;
        membersCount++;
    }

    function getCurrentBudget() public view memberOnly returns (uint256) {
        return address(this).balance;
    }

    function sendMoneyToBudget() public payable memberOnly {}

    function createRequest(
        string memory title,
        string memory description,
        address recipient,
        uint256 value
    ) public memberOnly {
        require(value <= address(this).balance);

        Request storage newRequest = requests.push();
        newRequest.id = requestsCount;
        newRequest.title = title;
        newRequest.description = description;
        newRequest.value = value;
        newRequest.owner = msg.sender;
        newRequest.recipient = recipient;
        newRequest.complete = false;
        newRequest.approvalsCount = 0;

        requestsCount++;
    }

    function approveRequest(uint256 index) public memberOnly {
        Request storage request = requests[index];

        require(!request.approvals[msg.sender]);
        request.approvals[msg.sender] = true;
        request.approvalsCount++;
    }

    function finalizeRequest(uint256 index) public {
        Request storage request = requests[index];

        require(request.approvalsCount >= (membersCount / 2));
        require(!request.complete);
        require(request.owner == msg.sender);

        payable(request.recipient).transfer(request.value);
        request.complete = true;
        completeRequestsCount++;
    }

    function getMemberCount() public view returns (uint256) {
        return membersCount;
    }

    function getRequestCount() public view returns (uint256) {
        return requestsCount;
    }
}
