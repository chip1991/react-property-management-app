import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col w-full max-w-[375px] mx-auto shadow-[0_0_20px_rgba(0,0,0,0.5)]">
      {/* 头部 */}
      <div className="bg-white flex items-center justify-between px-4 h-14 border-b border-gray-100 shrink-0 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-medium text-gray-800">隐私与安全协议</h1>
        <div className="w-10"></div>
      </div>

      {/* 内容区 */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. 信息收集</h2>
            <p>我们可能会收集您的基本信息，包括但不限于姓名、联系方式、设备信息等，以便为您提供更好的服务体验。</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. 信息使用</h2>
            <p>收集到的信息将主要用于系统安全维护、功能优化以及必要时的客户沟通。我们承诺不会在未经您授权的情况下，将您的信息用于其他商业用途。</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. 信息保护</h2>
            <p>我们采用业界标准的安全技术和防护措施，保护您的个人信息免遭未经授权的访问、使用或泄露。</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. 您的权利</h2>
            <p>您有权随时查看、修改或要求删除我们收集的关于您的个人信息。如有需要，请联系我们的客服团队。</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
