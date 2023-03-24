/* --- STATE --- */
export interface ModalState {
  editModal: {
    isOpen: boolean;
    data: string;
    selectedMessageIdx: number;
  };
  promptModal: {
    isOpen: boolean;
  };
}
