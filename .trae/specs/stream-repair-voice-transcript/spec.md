# 报事报修语音识别流式输入 Spec

## Why
当前“报事报修”的语音输入在识别结束后才一次性写入“问题描述”，用户体验上缺少“边说边显示”的反馈。需要改造为流式展示，让用户在说话过程中就能看到识别文本逐步出现在输入框内。

## What Changes
- 在 `Repair.tsx` 中采用“双缓冲”语音转写策略：区分已确认文本（final）与临时文本（interim）。
- 更新 `SpeechRecognition` 的 `onresult` 处理逻辑，使用 `resultIndex` 与 `isFinal` 做增量合并，避免反复重算带来的抖动与重复。
- 在“问题描述”输入框中实时展示 `final + interim` 的组合文本；当识别结束（静音自动停止或用户手动停止）后，将 interim 提交为 final 并清空 interim。
- 识别过程中将 textarea 设为只读（readOnly），避免受控输入频繁更新导致光标跳动与编辑冲突；停止识别后恢复可编辑。
- 延长静音识别时间为 3 秒。

## Impact
- Affected specs: 报事报修语音输入体验
- Affected code:
  - `src/pages/Repair.tsx`
