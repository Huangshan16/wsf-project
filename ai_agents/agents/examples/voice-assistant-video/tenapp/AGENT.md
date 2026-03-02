# tenapp/
> L2 | 父级: /mnt/e/wsf-project/AGENT.md

成员清单
`manifest.json`: tenapp 依赖树，声明系统包与共享扩展来源。
`manifest-lock.json`: `tman install` 解析后的锁文件。
`property.json`: 图配置，定义 `XiaoYou` 节点、连接关系与运行时参数。
`main.go`: TEN Go app 入口。
`go.mod`: Go 模块依赖。
`scripts/start.sh`: tenapp 启动脚本，负责设置运行时动态库路径。
`scripts/install_python_deps.sh`: 安装本地与依赖扩展的 Python 依赖。
`ten_packages/extension/main_python`: 主控扩展，串联 ASR、LLM、TTS 与消息转录。

法则
`property.json` 引用了哪个本地 addon，`ten_packages/extension/` 下就必须有哪个真实包，不能只剩配置引用。

[PROTOCOL]: 变更时更新此头部，然后检查 AGENT.md
