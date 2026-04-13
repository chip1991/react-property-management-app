# Tasks
- [x] Task 1: 改造 AI 语音识别为双缓冲流式显示
  - [x] SubTask 1.1: 在 `src/pages/AI.tsx` 中引入 `finalTranscriptRef` / `interimTranscriptRef` 等状态和 ref
  - [x] SubTask 1.2: 启用 `continuous = true` 和 `interimResults = true`，并修改 `onresult` 逻辑，使用 `resultIndex` 与 `isFinal` 增量更新 `userTranscript` 状态
  - [x] SubTask 1.3: 引入与报事报修页面一致的静音定时器机制（如 3 秒检测停顿）
  - [x] SubTask 1.4: 修改 `onresult` 中直接触发 `handleUserInput` 的逻辑，改为在静音定时器触发时或 `onend` 时统一调用 `handleUserInput`，并清空本次会话文本
- [x] Task 2: 构建与验证
  - [x] SubTask 2.1: 运行 `npm run build` 确保项目构建通过
  - [x] SubTask 2.2: 重启前端开发服务器并预览验证，用户在说话时界面底部实时展示文本，停顿后 AI 能够正常回复

# Task Dependencies
- Task 2 依赖 Task 1
