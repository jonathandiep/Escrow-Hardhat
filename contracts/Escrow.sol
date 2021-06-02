// SPDX-License-Identifier: MIT
pragma solidity 0.7.5;

contract Escrow {
    address public arbiter;
    address payable public beneficiary;
    address payable public depositor;
    // bool public isApproved;
    Status public status = Status.Pending;

    enum Status {Pending, Approved, Declined}

    event Approved(uint256 amount);
    event Declined(address decliner);

    constructor(address _arbiter, address payable _beneficiary) payable {
        arbiter = _arbiter;
        beneficiary = _beneficiary;
        depositor = msg.sender;
    }

    function approve() external {
        require(msg.sender == arbiter);
        uint256 balance = address(this).balance;
        beneficiary.transfer(balance);
        emit Approved(balance);
        // isApproved = true;
        status = Status.Approved;
        // selfdestruct here?
    }

    function decline() external {
        require(
            msg.sender == depositor ||
                msg.sender == arbiter ||
                msg.sender == beneficiary,
            "u can't decline"
        );
        emit Declined(msg.sender);
        status = Status.Declined;
        depositor.transfer(address(this).balance);
    }

    receive() external payable {}
}
