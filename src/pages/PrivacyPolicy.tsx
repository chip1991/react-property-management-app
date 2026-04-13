import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">隐私与安全协议</h1>
        
        <div className="space-y-4 text-gray-700">
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
