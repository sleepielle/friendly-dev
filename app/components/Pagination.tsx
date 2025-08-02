type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

{
  /*React.FC significa React Function Component.
  y recibe un interface o type.
  
  Un React.FC se refiere a que 
  1. Es una funcion 
  2. Recibe parametros de una interfaz/type
  3. Retorna JSX, elementos de React. 
  */
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  // Pagination button render

  if (totalPages <= 1) return null;
  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={`px-3 py-1 cursor-pointer rounded ${
            currentPage === index + 1
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-200"
          }`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
