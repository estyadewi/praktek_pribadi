export const SkeletonArtikel = () => {
  return (
    <div className="animate-pulse w-full rounded-lg bg-gray-200 hover:shadow-2xl group transition-all flex flex-col justify-between sm:h-52">
      <div className="sm:flex sm:h-full">
        <div className="sm:w-36 bg-gray-300 h-36 sm:h-full rounded-l-md"></div>
        <div className="flex flex-col sm:w-full">
          <div className="px-2 py-4 sm:h-full sm:p-6">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
          <div className="w-full flex justify-end">
            <div className="p-2 w-full sm:w-44 h-8 bg-gray-300 rounded-b-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
