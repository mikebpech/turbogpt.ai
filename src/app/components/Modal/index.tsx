import { Modal } from '@mantine/core';
import styled from 'styled-components';
import { useScrollLock } from '@mantine/hooks';

type ModalComponentProps = {
  title: string;
  children: React.ReactNode;
  close: () => void;
  open: () => void;
  isOpen: boolean;
  modalProps?: any;
};

function ModalComponent({
  title,
  children,
  close,
  open,
  modalProps,
  isOpen,
}: ModalComponentProps) {
  useScrollLock(isOpen);

  return (
    <Modal
      zIndex={100000}
      {...modalProps}
      opened={isOpen}
      onClose={close}
      title={title}
      centered
    >
      <ModalWrap>{children}</ModalWrap>
    </Modal>
  );
}

export default ModalComponent;

const ModalWrap = styled.div`
  overflow: hidden;
`;
