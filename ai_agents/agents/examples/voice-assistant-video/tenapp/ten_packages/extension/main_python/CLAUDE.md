# main_python - 视频语音助理主控扩展
Python + TEN Runtime + ten_ai_base

<directory>
agent/ - 语义事件、LLM 执行器与 Agent 编排核心
</directory>

<config>
manifest.json - 声明扩展依赖与打包边界
property.json - 默认配置
extension.py - 运行时主入口
addon.py - addon 注册入口
helper.py - TEN 数据与命令发送辅助
</config>

决策
- 让 `main_python` 作为本地扩展留在 `tenapp/ten_packages/extension/`，避免把主控逻辑散落到示例外部。
- `__init__.py` 必须导入 `addon`，否则 TEN 只会导入包而不会完成 addon 注册。
- `extension.py` 只编排事件流，不承载 LLM 协议细节；协议处理下沉到 `agent/llm_exec.py`。

变更日志
- 恢复被删除的 `main_python` 整包，修复 `voice-assistant-video` 启动时 `ModuleNotFoundError: ten_packages.extension.main_python`。
- 为 `on_stop()` 增加空指针保护，避免启动失败后的二次异常噪音。

[PROTOCOL]: 变更时更新此头部，然后检查 AGENT.md
