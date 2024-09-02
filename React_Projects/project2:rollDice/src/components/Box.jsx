import React from "react";
import styled from "styled-components";

const Box = (props) => {
  return <BoxContainer>{props.number}</BoxContainer>;
};

export default Box;

const BoxContainer = styled.div`
  border: 1px solid red;
  height: 72px;
  width: 72px;
  display: grid;
  place-items: center;
  font-size: 24px;
  font-weight: 700;
`;
