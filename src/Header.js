import React, { useState, useEffect } from "react";
import { Button, PageHeader } from "antd";
import { ethers } from "ethers";
import { boxComponentStyles } from "./styles.js";
import AddMemberModal from "./Modal/AddMemberModal.js";
import getContract from "./ethereum/ethereum.js";

const Header = () => {
  const [userAddress, setUserAddress] = useState("");
  const [manager, setManager] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openAddMember, setOpenAddMember] = useState(false);

  const connectWallet = async () => {
    setIsLoading(true);

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    let accounts = await provider.send("eth_requestAccounts", []);
    let account = accounts[0];
    setUserAddress(account);

    setIsLoading(false);
  };

  const getManager = async () => {
    const contract = getContract();
    const manager = await contract.manager();
    setManager(manager);
  };

  const openModal = () => {
    setOpenAddMember(true);
  };

  const closeModal = () => {
    setOpenAddMember(false);
  };

  useEffect(() => {
    connectWallet();
    getManager();
  }, []);

  return (
    <>
      <PageHeader
        style={{
          marginTop: "1rem",
          ...boxComponentStyles,
        }}
        ghost={false}
        loading={isLoading}
        title="RMIT FTC DAPP"
        extra={[
          !userAddress ? (
            <Button
              shape="round"
              type="primary"
              size="large"
              onClick={connectWallet}
            >
              Connect Wallet
            </Button>
          ) : (
            <Button key="1" shape="round" type="primary" size="large">
              {userAddress.substring(0, 5) + "..." + userAddress.slice(-5)}
            </Button>
          ),
          userAddress.toLowerCase() === manager.toLowerCase() ? (
            <Button shape="round" size="large" onClick={openModal}>
              Add Member
            </Button>
          ) : null,
        ]}
      />
      <AddMemberModal visible={openAddMember} onCancel={closeModal} />
    </>
  );
};

export default Header;
