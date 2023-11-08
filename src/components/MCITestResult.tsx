import Link from "next/link";
import { styled } from "styled-components";

type Props = {
  cogLevel: string;
  totalScore: number;
  closeModal?: () => void;
};
function MCITestResult({ cogLevel, totalScore, closeModal }: Readonly<Props>) {
  return (
    <Container onClick={closeModal}>
      <Popup onClick={(e) => e.stopPropagation()}>
        <Box>
          <ResultWrapper>
            <Result $cogLevel={cogLevel}>
              <span>{cogLevel}</span>
            </Result>
            <Desc>
              {cogLevel === "양호"
                ? "현재 귀하는 양호한 단계로 보입니다."
                : "현재 귀하는 경도인지장애가 의심되는 단계로 보입니다."}
            </Desc>
            <Sub>
              진단 결과 귀하의 합산 점수는 {totalScore}점입니다.
              <br />
              합산한 점수가 8점 이상이면 경도인지장애로 진단할 수 있으며, 치매에
              대한 정밀 검사와 치매 예방을 위한 적극적인 관리가 필요합니다.
            </Sub>
            <Link href="/">
              <Button onClick={closeModal}>확인</Button>
            </Link>
          </ResultWrapper>
        </Box>
      </Popup>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
const Popup = styled.div`
  width: 500px;
  height: 600px;
  border-radius: 1.6rem;
  background: #fff;
  box-shadow: 1.5rem 1.3rem 2.8rem 0 rgba(0, 0, 0, 0.06);
  word-break: keep-all;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  white-space: pre-line;
  @media screen and (max-width: 767px) {
    width: 300px;
    height: 550px;
  }
`;
const Box = styled.div`
  height: 100%;
  border-radius: 1.6rem;
  background: #fff;
  box-shadow: 1.5rem 1.3rem 2.8rem 0 rgba(0, 0, 0, 0.06);
  padding: 2rem;
  @media screen and (max-width: 767px) {
    padding: 1.6rem;
  }
`;
const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: center;
  margin: 0 auto;
`;
const Result = styled.div<{ $cogLevel: string }>`
  width: 130px;
  height: 130px;
  background: ${(props) =>
    props.$cogLevel === "양호" ? "forestgreen" : "#FF3F3F"};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  border-radius: 50%;
  font-family: "Pretendard-Bold";
  color: white;
  @media screen and (max-width: 767px) {
    width: 10rem;
    height: 10rem;
    font-size: 2rem;
  }
`;
const Desc = styled.p`
  font-family: "Pretendard-Bold";
  font-size: 2rem;
  margin: 2rem 0 1.5rem 0;
  text-align: center;
  word-break: keep-all;
  @media screen and (max-width: 767px) {
    font-size: 1.4rem;
    margin: 2rem 0 1.5rem 0;
  }
`;
const Sub = styled.p`
  color: #6d6b69;
  font-size: 1.4rem;
  font-family: "Pretendard-Medium";
  text-align: center;
  word-break: keep-all;
  margin: 0 0 3.5rem 0;
  @media screen and (max-width: 767px) {
    font-size: 1.2rem;
    margin: 0 0 1rem 0;
  }
`;
const Button = styled.button`
  width: 300px;
  height: 80px;
  background: #ff9432;
  border-radius: 1.1rem;
  font-family: "Pretendard-Bold";
  font-size: 1.6rem;
  color: white;
  padding: 1rem;
  border: none;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    width: 150px;
    height: 70px;
    font-size: 1.4rem;
  }
  &:disabled {
    background: #c6c6c6;
    cursor: default;
  }
`;

export default MCITestResult;
