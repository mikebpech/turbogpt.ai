import { Modal } from '@mantine/core';

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
  return (
    <Modal
      {...modalProps}
      opened={isOpen}
      onClose={close}
      title={title}
      centered
    >
      {children}
    </Modal>
  );
}

export default ModalComponent;
