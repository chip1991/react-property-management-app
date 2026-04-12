import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, Trash2, Home as HomeIcon } from 'lucide-react';

interface HouseData {
  id: string;
  name: string;
  address: string;
  isDefault: boolean;
}

export default function House() {
  const navigate = useNavigate();
  const [houses, setHouses] = useState<HouseData[]>([
    { id: '1', name: '幸福家园 A区', address: '1栋 101室', isDefault: true },
    { id: '2', name: '阳光小区', address: '5栋 203室', isDefault: false },
  ]);

  const handleDelete = (id: string) => {
    setHouses(houses.filter(h => h.id !== id));
  };

  const handleAdd = () => {
    const newId = Date.now().toString();
    const newHouse: HouseData = {
      id: newId,
      name: `新小区 ${Math.floor(Math.random() * 100)}区`,
      address: `${Math.floor(Math.random() * 10) + 1}栋 ${Math.floor(Math.random() * 1000) + 100}室`,
      isDefault: false,
    };
    setHouses([...houses, newHouse]);
  };

  return (
    <div className="w-full max-w-[375px] mx-auto h-[100dvh] bg-gray-50 flex flex-col relative shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden">
      {/* Header */}
      <div className="h-14 bg-white flex items-center px-4 border-b border-gray-100 flex-shrink-0 z-10">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="flex-1 text-center text-lg font-medium text-gray-800">我的房屋</h1>
        <button 
          onClick={handleAdd}
          className="p-2 -mr-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
        >
          <Plus size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {houses.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <HomeIcon size={48} className="mx-auto mb-4 text-gray-300" />
            <p>暂无绑定的房屋</p>
          </div>
        ) : (
          houses.map((house) => (
            <div key={house.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 relative overflow-hidden">
              {house.isDefault && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] px-2 py-1 rounded-bl-lg">
                  当前默认
                </div>
              )}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                    <HomeIcon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-base">{house.name}</h3>
                    <p className="text-gray-500 text-sm mt-1">{house.address}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(house.id)}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
