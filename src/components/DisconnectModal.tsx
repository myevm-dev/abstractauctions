// components/DisconnectModal.tsx
import Modal from "react-modal";

interface DisconnectModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DisconnectModal: React.FC<DisconnectModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      className="modal"
      overlayClassName="overlay"
      closeTimeoutMS={200}
    >
      <div className="flex flex-col items-center p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Disconnect Wallet?</h2>
        <p className="text-gray-600">Are you sure you want to disconnect your wallet?</p>
        <div className="flex space-x-4">
          <button onClick={onConfirm} className="bg-red-500 text-white px-6 py-2 rounded-md">
            Confirm
          </button>
          <button onClick={onCancel} className="bg-gray-300 text-black px-6 py-2 rounded-md">
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DisconnectModal;
