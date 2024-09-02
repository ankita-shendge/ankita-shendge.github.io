import React from "react";
import styled from "styled-components";

function TotalScores({ score }) {
  return (
    <ScoreContainer>
      <h1>{score}</h1>
      <p>Total Scores</p>
    </ScoreContainer>
  );
}

export default TotalScores;

const ScoreContainer = styled.div`
  max-width: 200px;
  text-align: center;

  h1 {
    font-size: 100px;
    line-height: 100px;
  }
  p {
    font-size: 24px;
    font-weight: 500px;
  }
`;
