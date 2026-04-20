export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

      <div className="bg-white p-6 rounded-xl w-96 shadow-lg relative">

        <button 
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black"
        >
          ✖
        </button>

        {children}

      </div>
    </div>
  );
}