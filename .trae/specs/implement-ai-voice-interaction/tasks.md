# Tasks
- [x] Task 1: 环境配置与基础设置
  - [x] SubTask 1.1: 创建 `.env.example` 和 `.env`，配置 `VITE_QWEN_API_KEY`。
- [x] Task 2: 全局 AI 状态管理
  - [x] SubTask 2.1: 新建 `src/store/aiStore.ts`，定义 `isAiOperating`、`intent`、`startOperation`、`stopOperation` 等状态和方法。
- [x] Task 3: 全局视觉反馈与接管功能
  - [x] SubTask 3.1: 修改 `src/layouts/AppLayout.tsx`，引入 `aiStore`。
  - [x] SubTask 3.2: 增加浅绿色遮罩层（`bg-green-500/20`）和“我自己来操作”按钮。
  - [x] SubTask 3.3: 实现接管按钮的点击逻辑（调用 `stopOperation` 中断流程）。
- [x] Task 4: 真实语音与 Qwen API 集成
  - [x] SubTask 4.1: 修改 `src/pages/AI.tsx`，接入浏览器的 `SpeechRecognition` (STT)。
  - [x] SubTask 4.2: 实现对 Qwen3.5 API 的调用逻辑，约束其返回 JSON 格式的意图和对话文本。
  - [x] SubTask 4.3: 接入浏览器的 `speechSynthesis` (TTS)，播放 Qwen 返回的文本。
- [x] Task 5: 意图驱动与自动操作演示
  - [x] SubTask 5.1: 解析 API 返回的 JSON，根据具体意图触发页面导航或状态变更（例如跳转到报修页）。

# Task Dependencies
- Task 3 依赖 Task 2
- Task 4 依赖 Task 1 和 Task 2
- Task 5 依赖 Task 4