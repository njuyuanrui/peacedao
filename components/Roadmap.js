import styled from "styled-components";
import Container from "./Container";
import Typography from "@mui/material/Typography";

const Content = styled.div`
  max-width: 840px;
  margin: 5% auto 5% auto;
  strong {
    color: red;
  }
`;

function Roadmap() {
  return (
    <Container
      style={{
        background: "#dde4b6",
      }}
      id="roadmap"
    >
      <Typography
        style={{ textAlign: "center", marginTop: "5%" }}
        variant="h3"
        gutterBottom
        component="div"
      >
        发展路线
      </Typography>

      <Content>
        <Typography
          style={{ marginBottom: 20, marginTop: "4%" }}
          variant="body1"
          gutterBottom
        >
          <strong>2022 Q1</strong> 我正在和社区紧锣密鼓的讨论中！
        </Typography>
        <Typography style={{ marginBottom: 20 }} variant="body1" gutterBottom>
          <strong>2022 Q2</strong>  我正在和社区紧锣密鼓的讨论中！
        </Typography>
        <Typography style={{ marginBottom: 20 }} variant="body1" gutterBottom>
          <strong>2022 Q3</strong>{" "} 我正在和社区紧锣密鼓的讨论中！
        </Typography>
        <Typography style={{ marginBottom: 20 }} variant="body1" gutterBottom>
          <strong>2022 Q4</strong>{" "} 稍有不同的地方在于，我们应该不跑路，我会把利润放回社区。
        </Typography>
        <Typography style={{ marginBottom: 20 }} variant="body1" gutterBottom>
          我们是国产韭菜NFT
        </Typography>
      </Content>
    </Container>
  );
}

export default Roadmap;
