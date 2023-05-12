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
    <>
      <s.ModalOverlay />
      <s.ModalWrapper width={MODAL_DIMENTIONS[size]}>
        <s.Close onClick={onClose}>
          <IoMdCloseCircle />
        </s.Close>
        <s.Heading>{heading}</s.Heading>

        {children}
      </s.ModalWrapper>
    </>
  );
};
