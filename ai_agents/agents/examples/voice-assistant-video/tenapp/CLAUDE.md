# tenapp - 晓佑视频陪护示例运行时
Go + Python + TEN Runtime

<directory>
scripts/ - 启动与依赖安装脚本
ten_packages/extension/main_python/ - 本地主控扩展，协调语音与视频链路
</directory>

<config>
manifest.json - tenapp 依赖树
manifest-lock.json - 解析锁文件
property.json - 图结构与节点参数
main.go - Go app 入口
</config>

决策
- tenapp 保留共享扩展依赖声明，同时把示例私有逻辑放进本地 `main_python`，避免控制流散落。
- `property.json` 与 `ten_packages/extension/` 必须同构；配置里出现本地 addon 名称时，目录里必须存在对应实现。

变更日志
- 恢复 `ten_packages/extension/main_python`，修复启动时 `ModuleNotFoundError`。
- 为本地控制扩展补齐模块地图，避免再次发生“配置存在、实现缺失”的结构性错误。

[PROTOCOL]: 变更时更新此头部，然后检查 AGENT.md
