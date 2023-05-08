import React, { useState } from "react";
import s from "./Modal.styles";
import { IoMdCloseCircle } from "react-icons/io";

type ModalSize = "small" | "medium" | "big" | "auto";

const MODAL_DIMENTIONS = {
  small: "500px",
  medium: "750px",
  big: "1275px",
  auto: "auto",
};

interface Props {
  heading: string;
  onClose: () => void;
  size: ModalSize;
}

export const Modal: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  heading,
  onClose,
  size,
}) => {
  return (
    <s.Wrapper>
      <s.Modal width={MODAL_DIMENTIONS[size]}>
        <s.ModalContent>
          <s.Close onClick={onClose}>
            <IoMdCloseCircle />
          </s.Close>
          <s.Heading>{heading}</s.Heading>
          <div> {children}</div>
        </s.ModalContent>
      </s.Modal>
    </s.Wrapper>
  );
};
