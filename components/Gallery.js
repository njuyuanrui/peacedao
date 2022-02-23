import styled from "styled-components";
import Typography from "@mui/material/Typography";
import _ from "lodash";

import Container from "./Container";

const GalleryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 840px;
  max-height: 840px;
  overflow: hidden;
  margin: 5% auto 0 auto;
`;
const GalleryItem = styled.div`
  width: 120px;
  margin: 10px;
  transition: all 0.2s ease;
  will-change: transform;
  position: relative;
  z-index: 10;
  img {
    width: 100%;
    height: auto;
  }
  :hover {
    transform: scale(1.2);
  }
`;

const arts = [
  "/images/11.JPG",
  "/images/12.JPG",
  "/images/13.JPG",
  "/images/14.JPG",
  "/images/15.JPG",
  "/images/16.JPG",
  "/images/17.JPG",
  "/images/18.JPG"
];

const Content = styled.div`
  max-width: 840px;
  margin: 5% auto 5% auto;
  strong {
    color: red;
  }
`;

function Gallery() {
  return (
    <Container
      style={{
        background: "#fff",
      }}
    >
      <Typography
        style={{ textAlign: "center", marginTop: "5%" }}
        variant="h3"
        gutterBottom
      >
        真实作品效果展示
      </Typography>
      <GalleryList>
        {arts.map((art, idx) => {
          return (
            <GalleryItem key={idx}>
              <img src={art} alt="国产良心作品展示" />
            </GalleryItem>
          );
        })}
      </GalleryList>

      <Content>
        <Typography style={{ textAlign: "center" }} variant="h4" gutterBottom>
          郑重说明
        </Typography>
        <Typography
          style={{ marginBottom: 20, marginTop: 50 }}
          variant="body1"
          gutterBottom
        >
          1. 我们在开发上借鉴了【国产良心】，但我们的独立意志永远是，
          <strong>国产韭菜</strong>
        </Typography>
        <Typography style={{ marginBottom: 20 }} variant="body1" gutterBottom>
          2. 我们<strong>仅设置 5000 份限量作品</strong>
          ，我们正在夜以继日地创建更好的作品，请相信并期待。
        </Typography>
        <Typography style={{ marginBottom: 20 }} variant="body1" gutterBottom>
          3. 如果您很穷没有钱，但又非常喜欢本系列作品，我们建议您
          <strong>右键保存图片</strong>，请不要借贷或者卖房参与。
        </Typography>
        <Typography style={{ marginBottom: 20 }} variant="body1" gutterBottom>
          4. 因为我们是国产韭菜NFT，我们非常清楚作品的艺术价值和项目的开发成本，因此我们设置了作品的
          <strong>良心价为 0.01 ETH 一个</strong>。并且由于我们使用了更新的协议，所以您 
          <strong>一次mint多个并不会影响手续费</strong>，请放心mint。
        </Typography>
      </Content>
    </Container>
  );
}

export default Gallery;
