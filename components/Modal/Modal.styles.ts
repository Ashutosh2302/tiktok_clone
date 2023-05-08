import styled, { css } from "styled-components";
const Modal = styled.div<{ width: string }>`
  width: 500px;
  max-width: 90%;
  margin: auto;
  max-height: 80vh;
  border-radius: 4px;
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.2);
  background-color: white;
  position: fixed;
  z-index: 2;
  display: flex;
  flex-direction: column;
  overflow: auto;

  animation: enter 0.2s ease-out;

  @keyframes enter {
    from {
      transform: translateY(-1rem);
      opacity: 0;
    }

    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  z-index: 4;
`;

const ModalContent = styled.div<{ noPadding?: boolean }>`
  padding: ${(props) => (props.noPadding ? "0" : "2rem")};
  max-height: 80vh;
  overflow-y: auto;
`;

const Children = styled.div<{ noPadding?: boolean }>`
  padding: ${(props) => (props.noPadding ? "0" : "2rem")};
  max-height: 80vh;
`;

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

export default { Modal, Wrapper, ModalContent, Close, Heading, Children };
