# AI 语音流式识别 Spec

## Why
目前 AI 对话页面（`AI.tsx`）的语音识别配置为非连续、非中间结果模式（`continuous = false`, `interimResults = false`），用户在说话时无法看到实时转写的文字，缺乏“边说边显示”的即时反馈体验。将其改造为与“报事报修”相同的流式识别，可以大幅提升 AI 对话的交互体验。

## What Changes
- 修改 `src/pages/AI.tsx` 中的 `SpeechRecognition` 配置，启用 `continuous = true` 和 `interimResults = true`。
- 引入双缓冲机制（`finalTranscript` 和 `interimTranscript`）以及相应的 ref 缓存，用于在 `onresult` 中增量拼接用户的语音输入。
- 在用户说话期间，实时更新 `userTranscript` 状态，以便在界面底部实时渲染出“你说：...”的流式文本。
- 引入静音检测机制（例如停顿 2.5 ~ 3 秒），当检测到用户明显停顿不说话时，自动停止识别并提取完整的文本调用 `handleUserInput` 提交给 AI 进行思考和回复。

## Impact
- Affected specs: AI 语音交互体验
- Affected code:
  - `src/pages/AI.tsx`

## ADDED Requirements
### Requirement: AI 语音流式显示与静音提交
系统 SHALL 在用户进行 AI 语音对话时，实时将识别到的文本以流式方式展示在界面上；并 SHALL 在检测到用户说话停顿后自动提交给 AI。

#### Scenario: 语音识别中实时展示
- **WHEN** 用户在 AI 对话页面开始说话
- **THEN** 界面底部实时显示“你说：[流式更新的文本]”

#### Scenario: 停顿后自动提交
- **WHEN** 用户说话完毕并停顿达到设定的静音阈值（如 3 秒）
- **THEN** 系统停止监听，并将拼接完整的文本发送给大模型处理，AI 状态切换为“思考中”

## MODIFIED Requirements
### Requirement: 语音识别触发机制
**原逻辑**：在 `onresult` 中直接获取单次结果并立即调用 `handleUserInput`。
**新逻辑**：在 `onresult` 中仅更新文本缓存并重置静音定时器；在静音定时器触发或识别 `onend` 且有有效文本时，才调用 `handleUserInput` 进行提交。

## REMOVED Requirements
### Requirement: 单次短句识别模式
**Reason**: 无法满足长句或流式反馈需求。
**Migration**: 迁移至连续监听与流式中间结果的模式。
