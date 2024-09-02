import styled from "styled-components";

export const Button = styled.button`
  padding: 10px 18px;
  border: none;
  background-color: #000000;
  border-radius: 5px;
  color: white;
  min-width: 220px;
  font-size: 16px;
  border: 1px solid transparent;
  transition: 0.8s background ease-in;
  cursor: pointer;

  &:hover {
    background-color: white;
    border: 1px solid black;
    color: black;
    transition: 0.3s background ease-in;
  }
`;

export const OutlinedButton = styled(Button)`
  background-color: white;
  color: black;
  border: 1px solid black;
  &:hover {
    background-color: black;
    border: 1px solid black;
    color: white;
    transition: 0.3s background ease-in;
  }
`;
