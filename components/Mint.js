import { useState, useEffect } from "react";
import styled from "styled-components";
import { ethers } from "ethers";
import Typography from "@mui/material/Typography";

import { get, subscribe } from "../store";
import Container from "./Container";
import ConnectWallet, { connectWallet } from "./ConnectWallet";
import showMessage from "./showMessage";

const ETHERSCAN_DOMAIN =
  process.env.NEXT_PUBLIC_CHAIN_ID === "1"
    ? "etherscan.io"
    : "rinkeby.etherscan.io";

const Content = styled.div`
  max-width: 840px;
  margin: 0 auto 5% auto;
  strong {
    color: red;
  }
`;

const StyledMintButton = styled.div`
  display: inline-block;
  width: 140px;
  text-align: center;
  padding: 10px 10px;
  border: 4px solid #000;
  border-radius: 20px;
  color: #000;
  background: #dde4b6;
  cursor: ${(props) => {
    return props.minting || props.disabled ? "not-allowed" : "pointer";
  }};
  opacity: ${(props) => {
    return props.minting || props.disabled ? 0.6 : 1;
  }};
`;



function MintButton(props) {
  const [minting, setMinting] = useState(false);

  return (
    <StyledMintButton
      disabled={!!props.disabled}
      minting={minting}
      onClick={async () => {
        if (minting || props.disabled) {
          return;
        }
        setMinting(true);
        try {
          const { signer, contract } = await connectWallet();
          const contractWithSigner = contract.connect(signer);
          const value = ethers.utils.parseEther(
            (props.mintAmount*0.01).toString()
          );
          const tx = await contractWithSigner.mint(props.mintAmount, {
            value,
          });
          const response = await tx.wait();
          showMessage({
            type: "success",
            title: "铸造成功",
            body: (
              <div>
                <a
                  href={`https://${ETHERSCAN_DOMAIN}/tx/${response.transactionHash}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  点击查看交易详情
                </a>{" "}
                或者到{" "}
                <a
                  href="https://opensea.io/account"
                  target="_blank"
                  rel="noreferrer"
                >
                  OpenSea 查看
                </a>
                。
              </div>
            ),
          });
        } catch (err) {
          showMessage({
            type: "error",
            title: "铸造失败",
            body: err.message,
          });
        }
        props.onMinted && props.onMinted();
        setMinting(false);
      }}
      style={{
        background: "#dde4b6",
        ...props.style,
      }}
    >
      铸造 {props.mintAmount} 个{minting ? "中..." : ""}
    </StyledMintButton>
  );
}

function MintSection() {
  const [status, setStatus] = useState("0");
  const [progress, setProgress] = useState(null);
  const [fullAddress, setFullAddress] = useState(null);
  const [numberMinted, setNumberMinted] = useState(0);

  async function updateStatus() {
    const { contract } = await connectWallet();
    const status = await contract.status();
    const progress = parseInt(await contract.totalSupply());
    setStatus(status.toString());
    setProgress(progress);
    // 在 mint 事件的时候更新数据
    contract.on("Minted", async (event) => {
      const status = await contract.status();
      const progress = parseInt(await contract.totalSupply());
      setStatus(status.toString());
      setProgress(progress);
    });
  }

  useEffect(() => {
    (async () => {
      const fullAddressInStore = get("fullAddress") || null;
      if (fullAddressInStore) {
        const { contract } = await connectWallet();
        const numberMinted = await contract.numberMinted(fullAddressInStore);
        setNumberMinted(parseInt(numberMinted));
        setFullAddress(fullAddressInStore);
      }
      subscribe("fullAddress", async () => {
        const fullAddressInStore = get("fullAddress") || null;
        setFullAddress(fullAddressInStore);
        if (fullAddressInStore) {
          const { contract } = await connectWallet();
          const numberMinted = await contract.numberMinted(fullAddressInStore);
          setNumberMinted(parseInt(numberMinted));
          updateStatus();
        }
      });
    })();
  }, []);

  useEffect(() => {
    try {
      const fullAddressInStore = get("fullAddress") || null;
      if (fullAddressInStore) {
        updateStatus();
      }
    } catch (err) {
      showMessage({
        type: "error",
        title: "获取合约状态失败",
        body: err.message,
      });
    }
  }, []);

  async function refreshStatus() {
    const { contract } = await connectWallet();
    const numberMinted = await contract.numberMinted(fullAddress);
    setNumberMinted(parseInt(numberMinted));
  }

  let mintButton = (
    <StyledMintButton
      style={{
        background: "#eee",
        color: "#999",
        cursor: "not-allowed",
      }}
    >
      尚未开始
    </StyledMintButton>
  );

  if (status === "1") {
    mintButton = (
      <div
        style={{
          display: "flex",
        }}
      >
        <MintButton
          onMinted={refreshStatus}
          mintAmount={1}
          style={{ marginRight: "20px" }}
          disabled={numberMinted === 5}
        />
        <MintButton
          onMinted={refreshStatus}
          mintAmount={2}
          disabled={numberMinted > 3}
        />
        <MintButton
          onMinted={refreshStatus}
          mintAmount={3}
          disabled={numberMinted >2}
        />
        <MintButton
          onMinted={refreshStatus}
          mintAmount={4}
          disabled={numberMinted > 1}
        />
        <MintButton
          onMinted={refreshStatus}
          mintAmount={5}
          disabled={numberMinted > 0}
        />
      </div>
    );
  }

  if (progress >= 5000 || status === "2") {
    mintButton = (
      <StyledMintButton
        style={{
          background: "#eee",
          color: "#999",
          cursor: "not-allowed",
        }}
      >
        全部卖完了
      </StyledMintButton>
    );
  }

  if (numberMinted === 5) {
    mintButton = (
      <StyledMintButton
        style={{
          background: "#eee",
          color: "#999",
          cursor: "not-allowed",
        }}
      >
        铸造已达上限
      </StyledMintButton>
    );
  }

  if (!fullAddress) {
    mintButton = (
      <StyledMintButton
        style={{
          background: "#eee",
          color: "#999",
          cursor: "not-allowed",
        }}
      >
        请先连接钱包
      </StyledMintButton>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ marginBottom: 20, display: "flex", alignItems: "center" }}>
        您的钱包： <ConnectWallet />{" "}
        {fullAddress && (
          <span style={{ marginLeft: 10 }}>
            可以铸造 {5 - numberMinted} 个。
          </span>
        )}
      </div>

      {mintButton}

      <div style={{ marginTop: 20, fontSize: 20, textAlign: "center" }}>
        铸造进度：{progress === null ? "请先连接钱包" : progress} / 5000，价格
        0.01 ETH 一个，每个钱包最多 5 个。
        <br />
        今天，我们都是国产韭菜！ 
      </div>
    </div>
  );
}

function Mint() {
  return (
    <Container
      style={{
        background: "#5383b2",
        color: "#fff",
      }}
      id="mint"
    >
      <Typography
        style={{ textAlign: "center", marginTop: "5%" }}
        variant="h3"
        gutterBottom
        component="div"
      >
        铸造（Mint）
      </Typography>

      <Content>
        <Typography
          style={{
            marginTop: "5%",
            textAlign: "center",
          }}
          variant="body1"
          gutterBottom
        >
          亲爱的韭菜朋友们，我们深受国产良心项目启发，希望大家能够在这里找到真正属于各位的社群。
          尽管我们名字叫做韭菜NFT，但希望各位未来都不要变成韭菜。
          
        </Typography>
        <Typography
          style={{
            marginTop: 30,
            textAlign: "center",
          }}
          variant="body1"
          gutterBottom
        >
          关于mint，我们也采用了ERC721A的框架，确保你们在mint多个NFT的时候，也只需要支付很少的手续费。
          所以，放心地参与吧。
        </Typography>
        <Typography
          style={{
            marginTop: 30,
            textAlign: "center",
          }}
          variant="body1"
          gutterBottom
        >
          相信通过上面的资料，相信您已经充分了解了我们国产韭菜 NFT
          项目。在您做好充分的思想准备之后，可以选择点击下面铸造（Mint）按钮进行铸造。
        </Typography>

        <div
          style={{
            marginTop: 60,
            border: "4px dashed #000",
            padding: "40px",
            borderRadius: 20,
          }}
        >
          <MintSection />
        </div>
        <Typography
          style={{ textAlign: "center", marginTop: "8%" }}
          variant="h5"
          gutterBottom
          component="div"
        >
          铸造之后
        </Typography>
        <Typography
          style={{
            marginTop: 30,
            textAlign: "center",
          }}
          variant="body2"
          gutterBottom
        >
          铸造成功之后，您可以选择加入国产良心 NFT
          会员频道，不过项目团队不会在里面做管理或者组织什么事情。
          <br />
          为了节约时间，经过和 NextDAO 的沟通，我们将会员频道设立在了 NextDAO 的
          Discord 里面。
          <br />
          您可以加入 NextDAO 的 Discord （
          <a
            style={{ color: "#fff" }}
            href="https://discord.gg/NextDAO"
            target="_blank"
            rel="noreferrer"
          >
            https://discord.gg/NextDAO
          </a>
          ） 并链接钱包验证身份，之后即可看到会员频道。
        </Typography>
      </Content>
    </Container>
  );
}

export default Mint;
