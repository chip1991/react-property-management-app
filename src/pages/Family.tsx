import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, UserPlus, Trash2, Users } from 'lucide-react';

interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  phone: string;
}

export default function Family() {
  const navigate = useNavigate();
  const [members, setMembers] = useState<FamilyMember[]>([
    { id: '1', name: '张三', relation: '父亲', phone: '138****1234' },
    { id: '2', name: '李四', relation: '母亲', phone: '139****5678' },
  ]);

  const handleDelete = (id: string) => {
    setMembers(members.filter(m => m.id !== id));
  };

  const handleAdd = () => {
    const newId = Date.now().toString();
    const relations = ['配偶', '子女', '亲属', '朋友'];
    const randomRelation = relations[Math.floor(Math.random() * relations.length)];
    const newMember: FamilyMember = {
      id: newId,
      name: `家人 ${Math.floor(Math.random() * 100)}`,
      relation: randomRelation,
      phone: `13${Math.floor(Math.random() * 900000000 + 100000000)}`,
    };
    setMembers([...members, newMember]);
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
        <h1 className="flex-1 text-center text-lg font-medium text-gray-800">家人管理</h1>
        <button 
          onClick={handleAdd}
          className="p-2 -mr-2 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
        >
          <UserPlus size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {members.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <Users size={48} className="mx-auto mb-4 text-gray-300" />
            <p>暂无添加的家人</p>
          </div>
        ) : (
          members.map((member) => (
            <div key={member.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 font-bold text-lg">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-bold text-gray-800 text-base">{member.name}</h3>
                      <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-full">
                        {member.relation}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">{member.phone}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(member.id)}
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
