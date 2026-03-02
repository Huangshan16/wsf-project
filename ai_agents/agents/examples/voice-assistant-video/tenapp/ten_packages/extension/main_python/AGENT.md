# main_python/
> L2 | 父级: /mnt/e/wsf-project/ai_agents/agents/examples/voice-assistant-video/tenapp/AGENT.md

成员清单
`addon.py`: 注册 `main_python` addon，负责把运行时入口绑定到 `MainControlExtension`。
`extension.py`: 主控扩展，连接 ASR、LLM、TTS、消息转录与打断逻辑。
`config.py`: 主控扩展配置模型，定义 `greeting` 等运行时属性。
`helper.py`: TEN 命令与数据发送辅助函数，以及句子切分工具。
`manifest.json`: 扩展清单，声明 TEN Python 运行时与 `ten_ai_base` 依赖。
`property.json`: 扩展默认属性。
`agent/agent.py`: Agent 事件总线与状态编排器。
`agent/events.py`: 领域事件定义，描述用户加入、ASR、LLM、工具注册等语义事件。
`agent/decorators.py`: 事件处理器装饰器，把扩展方法映射到 Agent 事件。
`agent/llm_exec.py`: LLM 请求执行器，维护上下文、工具调用与流式响应处理。
`agent/__init__.py`: Agent 子模块包入口。
`__init__.py`: 包入口，导入 `addon` 触发 addon 注册。
`README.md`: 扩展说明文档。

法则
这个模块是 `voice-assistant-video` 的控制中枢；`property.json` 引用它，目录就必须真实存在。

[PROTOCOL]: 变更时更新此头部，然后检查 AGENT.md
