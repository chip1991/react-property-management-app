# Add Privacy Policy Link Spec

## Why
用户希望在“系统设置”页面中，点击“隐私与安全”选项时能够在新窗口打开相应的隐私与安全协议，以便于查看相关的隐私条款和安全政策。

## What Changes
- 创建一个新的页面组件 `PrivacyPolicy.tsx`，用于展示隐私与安全协议的内容。
- 在 `App.tsx` 中注册 `/privacy-policy` 路由。
- 在 `Settings.tsx` 中，为“隐私与安全”按钮添加点击事件，点击时使用 `window.open` 在新标签页（新窗口）打开隐私协议。

## Impact
- Affected specs: 系统设置功能
- Affected code:
  - `src/pages/Settings.tsx`
  - `src/pages/PrivacyPolicy.tsx` (新建)
  - `src/App.tsx`

## ADDED Requirements
### Requirement: 隐私与安全协议链接
系统应当提供查看隐私与安全协议的途径。

#### Scenario: 成功打开隐私与安全协议
- **WHEN** 用户在“系统设置”页面点击“隐私与安全”按钮
- **THEN** 系统在新窗口中打开隐私与安全协议页面
