import React, { useState, useEffect } from "react";
import { Button, PageHeader } from "antd";
import { ethers } from "ethers";
import { boxComponentStyles } from "./styles.js";

const Header = () => {
  const [userAddress, setUserAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = async () => {
    setIsLoading(true);

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    let accounts = await provider.send("eth_requestAccounts", []);
    let account = accounts[0];
    account = account.substring(0, 5) + "..." + account.slice(-5);
    setUserAddress(account);

    setIsLoading(false);
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <PageHeader
      style={{
        marginTop: "1rem",
        ...boxComponentStyles
      }}
      ghost={false}
      loading={isLoading}
      title="RMIT FTC DAPP"
      extra={[
        !userAddress ? (
          <Button
            key="1"
            shape="round"
            type="primary"
            size="large"
            onClick={connectWallet}
          >
            Connect Wallet
          </Button>
        ) : (
          <Button key="1" shape="round" type="primary" size="large">
            {userAddress}
          </Button>
        ),
      ]}
    />
  );
};

export default Header;
