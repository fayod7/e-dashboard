import { memo } from 'react';

const ProductsSkeleton = () => {
  return (
    <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-4">
  {Array(8).fill(null).map((_, index) => (
    <div
      key={index}
      className="bg-white aspect-[3/4] flex flex-col border-gray-200 overflow-hidden border rounded-lg animate-pulse"
    >
      <div className="w-full aspect-[1/1] h-[300px] bg-gray-200" />
      <div className="flex flex-col gap-2 p-4 bg-[#F4F5F7]">
        <div className="h-5 w-3/4 bg-gray-300 rounded" />
        <div className="h-6 w-1/2 bg-gray-300 rounded" />
        <div className="h-4 w-1/3 bg-gray-300 rounded" />
        <div className="flex gap-2.5 mt-2">
          <div className="h-10 w-full bg-gray-300 rounded" />
          <div className="h-10 w-full bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  ))}
</div>

  );
};

export default memo(ProductsSkeleton);