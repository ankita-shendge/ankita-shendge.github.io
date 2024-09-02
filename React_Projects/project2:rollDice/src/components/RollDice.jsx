import React, { useState } from "react";
import styled from "styled-components";

const RollDice = ({ rollDice, currentDice }) => {
  return (
    <DiceContainer>
      <div onClick={() => rollDice(1, 7)} className="dice">
        <img src={`/images/dice/dice_${currentDice}.png`} alt="dice1" />
        <p>Click on Dice to Roll</p>
      </div>
    </DiceContainer>
  );
};

export default RollDice;

const DiceContainer = styled.div`
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .dice {
    cursor: pointer;
  }

  p {
    font-size: 24px;
    text-align: center;
  }
`;
