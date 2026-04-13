# 接入真实AI语音自动操作功能 Spec

## Why
当前项目是一个本地演示用的前端应用。为了完整展示“语音输入 -> AI理解 -> AI自动操作手机”的闭环，需要接入真实的 Qwen3.5 API 以及浏览器原生的语音识别（STT）和语音合成（TTS）功能，并提供直观的视觉反馈（绿色遮罩和接管按钮）。

## What Changes
- 添加 `.env` 文件支持，将 Qwen3.5 的 APIKEY 配置在本地。
- 新增 `useAIStore` 用于管理 AI 的全局状态（如：是否在操作中、当前对话上下文、接管状态等）。
- 修改 `AppLayout.tsx`，在页面顶层加入浅绿色遮罩（表示 AI 正在操作手机），以及一个“我自己来操作”的接管按钮。
- 修改 `AI.tsx`，将现有的定时器模拟逻辑替换为真实的 Web Speech API (STT/TTS) 以及对 Qwen API 的网络请求。
- 设定 Qwen 的 System Prompt，使其返回结构化的 JSON 意图（Intent），驱动前端页面自动流转或展示确认信息。

## Impact
- Affected specs: 语音交互流转、自动化页面操作反馈
- Affected code:
  - `src/layouts/AppLayout.tsx`
  - `src/pages/AI.tsx`
  - `src/store/aiStore.ts` (新建)
  - `.env` / `.env.example` (新建)

## ADDED Requirements
### Requirement: Qwen API 集成与语音交互
系统应当能够：
1. 录制用户语音并转为文字。
2. 将文字发送给 Qwen3.5 API，并要求返回包含动作和回复文本的 JSON 结果。
3. 播放回复文本（TTS）。

#### Scenario: 成功解析用户意图并操作
- **WHEN** 用户说“我家水管坏了”
- **THEN** AI 语音回复确认，并在页面上显示绿色遮罩，模拟进入操作流程，直到用户点击接管按钮。

## MODIFIED Requirements
### Requirement: 页面接管状态展示
在 `AppLayout` 中增加一个 `z-index` 极高的遮罩层，当 AI 处于“自动操作中”状态时展示。

## REMOVED Requirements
### Requirement: 原有基于 setTimeout 的模拟流转
**Reason**: 需要接入真实的 API 和真实的语音事件。
**Migration**: 用真实的 STT/TTS 钩子和 `fetch` 请求替换 `AI.tsx` 中的定时器。