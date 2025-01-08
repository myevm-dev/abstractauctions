// pages/MyAuctions.tsx
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import CreateAuction from '@/components/CreateAuction';
import RunningAuctions from '@/components/RunningAuctions';

const MyAuctions = () => {
  const [isCreating, setIsCreating] = useState<boolean>(true);

  const handleToggle = (view: string) => {
    setIsCreating(view === 'create');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Toggle Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => handleToggle('create')}
          className={`px-6 py-2 font-medium text-lg rounded-md border-2 ${isCreating ? 'bg-[#02de73] text-black border-[#02de73]' : 'bg-neutral-900 text-gray-300 border-[#02de73]'}`}
        >
          Create
        </button>
        <button
          onClick={() => handleToggle('running')}
          className={`px-6 py-2 font-medium text-lg rounded-md border-2 ${!isCreating ? 'bg-[#02de73] text-black border-[#02de73]' : 'bg-neutral-900 text-gray-300 border-[#02de73]'}`}
        >
          Running
        </button>
      </div>

      {/* Conditional Rendering */}
      {isCreating ? <CreateAuction /> : <RunningAuctions />}
    </div>
  );
};

export default MyAuctions;
