# Tasks
- [x] Task 1: 改造报修语音识别为双缓冲流式显示
  - [x] SubTask 1.1: 在 `src/pages/Repair.tsx` 增加 `finalTranscript`/`interimTranscript` 状态与必要的 ref 缓存
  - [x] SubTask 1.2: 重写 `recognition.onresult`，使用 `resultIndex` 与 `isFinal` 增量更新 final/interim，避免重复与抖动
  - [x] SubTask 1.3: 调整静音停止与手动停止逻辑，停止时将 interim 提交到 final，并清空 interim
  - [x] SubTask 1.4: 调整 textarea：识别中展示 `final + interim` 并设为 readOnly，停止后恢复可编辑
- [x] Task 2: 构建验证与预览
  - [x] SubTask 2.1: 运行 `npm run build` 确保构建通过
  - [x] SubTask 2.2: 重启 `npm run dev` 并提供预览地址用于测试“边说边显示”
- [x] Task 3: 将静音时间修改为3秒

# Task Dependencies
- Task 2 依赖 Task 1
