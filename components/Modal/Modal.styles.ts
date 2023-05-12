import styled, { css } from "styled-components";

const Close = styled.button`
  all: unset;
  position: absolute;
  top: 1rem;
  right: 2rem;
  cursor: pointer;
  font-size: 1.25em;
  z-index: 1;
  padding: 0.2em;
  border-radius: 5rem;
`;

const Heading = styled.button`
  font-weight: bold;
  font-size: 1.4rem;
  margin: 0.5rem 0 1rem;
  text-align: center;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // semi-transparent black color
  z-index: 1000;
`;

const ModalWrapper = styled.div<{ width: string }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  z-index: 1001;
  width: 500px;
  max-height: 70%;
  overflow-y: auto;
`;

export default {
  Close,
  Heading,
  ModalOverlay,
  ModalWrapper,
};
