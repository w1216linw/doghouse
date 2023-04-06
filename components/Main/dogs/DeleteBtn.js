import { FaTimesCircle } from "react-icons/fa";

const DeleteBtn = ({ children, onDelete, del }) => {
  if (del)
    return (
      <button
        className="p-2 w-full flex gap-2 items-center text-blue-500"
        onClick={() => onDelete(del)}
      >
        <FaTimesCircle />
        {children}
      </button>
    );

  return (
    <button
      className="p-2 w-full flex gap-2 items-center text-blue-500"
      onClick={onDelete}
    >
      <FaTimesCircle />
      {children}
    </button>
  );
};

export default DeleteBtn;
