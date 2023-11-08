"use client";

import MCITestResult from "@/components/MCITestResult";
import { useModal } from "@/hooks/useModal";
import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";

function MCITest() {
  type Props = {
    idx: number;
    description: string;
  };
  const [questions, setQuestions] = useState<Props[][]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [choices, setChoices] = useState<number[]>([]);
  const stepCnt = 5;
  const chunkSize = 3;
  const { isModalOpen, openModal, closeModal } = useModal();
  const [totalScore, setTotalScore] = useState(0);
  const [cogLevel, setCogLevel] = useState("");

  useEffect(() => {
    const questions = [
      "오늘이 몇월이고 무슨요일인지를 잘 모른다.",
      "자기가 놔둔 물건을 찾지 못한다.",
      "같은 질문을 반복해서 한다.",
      "약속을 하고서 잊어버린다.",
      "물건을 가지러 갔다가 잊어버리고 그냥 온다.",
      "물건이나, 사람의 이름을 대기가 힘들어 머뭇거린다.",
      "대화 중 내용이 이해되지 않아 반복해서 물어본다.",
      "길을 잃거나 헤맨 적이 있다.",
      "예전에 비해 계산 능력이 떨어졌다.\n(예 : 물건값이나 거스름돈 계산을 못한다)",
      "예전에 비해서 성격이 변했다.",
      "이전에 잘 다루던 기구의 사용이 서툴러졌다.\n(세탁기, 전기밥솥, 경운기 등)",
      "예전에 비해 방이나 집안의 정리 정돈을 하지 못한다.",
      "상황에 맞게 스스로 옷을 선택하여 입지 못한다.",
      "혼자 대중교통 수단을 이용하여 목적지에 가기 힘들다.\n(신체적인 문제(관절염 등)로 인한 것은 제외됨)",
      "내복이나 옷이 더러워져도 갈아입지 않으려고 한다.",
    ];
    const questionArr: Props[] = [];
    for (let i = 0; i < questions.length; i++) {
      questionArr.push({
        idx: i + 1,
        description: questions[i],
      });
    }
    const chunkedQuestions = [];
    for (let i = 0; i < questionArr.length; i += chunkSize) {
      chunkedQuestions.push(questionArr.slice(i, i + chunkSize));
    }
    setQuestions(chunkedQuestions);
    setChoices(Array(questionArr.length + 1).fill(-1));
  }, []);

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onClickChoice = (questionIndex: number, choice: number) => {
    const newChoices = [...choices];
    newChoices[questionIndex] = choice;
    setChoices(newChoices);
  };

  const onSubmit = async () => {
    const submittedChoices = choices.slice(1);
    if (submittedChoices.includes(-1)) {
      alert("체크하지 않은 문항이 있습니다. 다시 확인해주세요.");
      return;
    }
    const totalScore = submittedChoices.reduce((p, c) => p + c, 0);
    const cogLevel = totalScore >= 8 ? "의심" : "양호";
    setTotalScore(totalScore);
    setCogLevel(cogLevel);
    openModal();
    console.log(totalScore, cogLevel);
  };

  const convertNewlineToJSX = (inputString: string) => {
    const lines = inputString.split("\n");
    const jsxLines = lines.map((line, index) => (
      <Fragment key={line}>
        {line}
        {index !== lines.length - 1 && <br />}
      </Fragment>
    ));

    return jsxLines;
  };

  return (
    <Container>
      <ProgressBarWrapper>
        {Array.from({ length: stepCnt }, (_, i) => i).map((v, idx) => (
          <Circle key={v} $step={idx + 1} $currentStep={currentStep}>
            <span>{idx + 1}</span>
          </Circle>
        ))}
      </ProgressBarWrapper>
      <Box>
        <Desc>
          <ChoiceLabel>아니다(0)</ChoiceLabel>
          <ChoiceLabel>가끔 그렇다(1)</ChoiceLabel>
          <ChoiceLabel>자주 그렇다(2)</ChoiceLabel>
        </Desc>
        {questions.length
          ? questions[currentStep - 1].map((question) => (
              <QuestionWrapper key={question.idx}>
                <Question>
                  {question.idx}. {convertNewlineToJSX(question.description)}
                </Question>
                <ChoiceWrapper>
                  <ChoiceButton
                    $choice={choices[question.idx]}
                    $idx={0}
                    onClick={() => onClickChoice(question.idx, 0)}
                  >
                    0
                  </ChoiceButton>
                  <ChoiceButton
                    $choice={choices[question.idx]}
                    $idx={1}
                    onClick={() => onClickChoice(question.idx, 1)}
                  >
                    1
                  </ChoiceButton>
                  <ChoiceButton
                    $choice={choices[question.idx]}
                    $idx={2}
                    onClick={() => onClickChoice(question.idx, 2)}
                  >
                    2
                  </ChoiceButton>
                </ChoiceWrapper>
              </QuestionWrapper>
            ))
          : null}
      </Box>
      <ButtonWrapper>
        <Button onClick={handlePrevStep} disabled={currentStep === 1}>
          이전
        </Button>
        {currentStep === stepCnt ? (
          <Button onClick={onSubmit}>제출</Button>
        ) : (
          <Button onClick={handleNextStep}>다음</Button>
        )}
      </ButtonWrapper>
      {isModalOpen && (
        <MCITestResult
          cogLevel={cogLevel}
          totalScore={totalScore}
          closeModal={closeModal}
        />
      )}
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Box = styled.div`
  width: 800px;
  height: 400px;
  border-radius: 1.6rem;
  background: #fff;
  box-shadow: 1.5rem 1.3rem 2.8rem 0 rgba(0, 0, 0, 0.06);
  padding: 3rem 5rem;
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media screen and (max-width: 767px) {
    width: 300px;
    height: 30rem;
    padding: 1.6rem;
    margin: 1.3rem 0;
    align-items: center;
  }
`;
const ProgressBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  @media screen and (max-width: 767px) {
    gap: 1rem;
  }
`;
const Circle = styled.div<{ $step: number; $currentStep: number }>`
  width: 70px;
  height: 70px;
  color: white;
  border: 0.5rem solid white;
  border-radius: 50%;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: ${(props) =>
    props.$step <= props.$currentStep ? "#FF9432" : "#E1E1E1"};
  @media screen and (max-width: 767px) {
    width: 50px;
    height: 50px;
    font-size: 2rem;
    border: 0.2rem solid white;
  }
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: -100%;
    width: 80px;
    height: 10px;
    background: ${(props) =>
      props.$step <= props.$currentStep
        ? "linear-gradient(90deg, #FF9432 0%, #FFD4AD 100%)"
        : "#e1e1e1"};
    transform: translateY(-50%);
    z-index: -1;
    @media screen and (max-width: 767px) {
      left: -60%;
      width: 40px;
      height: 5px;
    }
  }
  &:first-child::before {
    content: none;
  }
`;
const QuestionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.2rem solid #c6c6c6;
  padding: 1.6rem 0;
  &:last-child {
    border: none;
  }
  @media screen and (max-width: 767px) {
    flex-wrap: wrap;
    justify-content: center;
    padding: 1rem 0;
  }
`;
const ChoiceWrapper = styled.div`
  display: flex;
  gap: 1rem;
  @media screen and (max-width: 767px) {
    gap: 2rem;
  }
`;
const ChoiceButton = styled.button<{ $choice: number; $idx: number }>`
  border-radius: 0.8rem;
  font-size: 26px;
  padding: 1.5rem 2rem;
  background: ${(props) =>
    props.$choice === props.$idx ? "#fff5ec" : "#C6C6C6"};
  border: ${(props) =>
    props.$choice === props.$idx
      ? "0.2rem solid #FF9432"
      : "0.2rem solid white"};
  color: ${(props) => (props.$choice === props.$idx ? "#FF9432" : "#1f1411")};
  cursor: pointer;
  @media screen and (max-width: 767px) {
    font-size: 1.4rem;
    padding: 1rem 1.5rem;
  }
`;
const Question = styled.p`
  font-size: 26px;
  word-break: keep-all;
  font-family: "Pretendard-Medium";
  @media screen and (max-width: 767px) {
    font-size: 20px;
    margin: 0 0 1rem 0;
    text-align: center;
  }
`;
const Desc = styled.div`
  text-align: end;
  font-size: 16px;
  @media screen and (max-width: 767px) {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
`;
const ChoiceLabel = styled.span`
  margin: 0 0 0 2rem;
  @media screen and (max-width: 767px) {
    margin: 0;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
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

export default MCITest;
