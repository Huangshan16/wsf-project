# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

This project uses Task (taskfile.yml) for task automation. All commands should be run from the root directory.

### Building and Development
- `task build` - Build both agents and server components
- `task build-agent` - Build agent components only
- `task build-server` - Build Go server only
- `task clean` - Clean up build artifacts

### Testing
- `task test` - Run all tests (agents and server)
- `task test-server` - Run Go server tests
- `task test-agent-extensions` - Run Python extension tests
- `task test-extension EXTENSION=<name>` - Test specific extension
- `task test-extension-no-install EXTENSION=<name>` - Test extension without reinstalling deps

### Code Quality
- `task lint` - Run Python linting on agents
- `task lint-extension EXTENSION=<name>` - Lint specific extension
- `task format` - Format Python code with black
- `task check` - Check code formatting

### Running the System
- `task use AGENT=<name>` - Switch to using a specific agent (default: voice-assistant)
- `task run-server` - Start the backend HTTP server on port 8080
- `task run-gd-server` - Start TMAN Designer server on port 49483
- `task run` - Start both servers

### Working with Agents
Available agents in `agents/examples/`: voice-assistant, transcription, stepfun-demo
- Use `task use AGENT=voice-assistant` to switch between agents
- Agent configuration is symlinked from examples to the agents root

## Architecture Overview

### Core Components
1. **Server** (`/server`) - Go HTTP API server that manages agent processes
   - Provides REST endpoints: `/start`, `/stop`, `/ping`
   - Manages agent lifecycle and RTC connections
   - Built with Go, runs on port 8080

2. **Agents** (`/agents`) - TEN Framework-based agent runtime
   - Uses TEN Framework for real-time engagement
   - Python-based extensions for various capabilities
   - Agent configurations defined in manifest.json and property.json

3. **Extensions** (`/agents/ten_packages/extension/`) - Modular agent capabilities
   - ASR (Speech Recognition), TTS (Text-to-Speech), LLM integrations
   - Each extension has its own tests, manifest, and configuration

4. **Playground** (`/playground`) - Next.js web interface for testing
   - React/TypeScript frontend
   - Uses pnpm for package management

### Development Environment
- **Docker-based**: Uses docker-compose.yml with development containers
- **Python Environment**: Extensions use Python with specific PYTHONPATH setup
- **Type Checking**: Pyright configured for Python type checking
- **Multi-language**: Go for server, Python for agents, TypeScript for UI

### Key Configuration Files
- `Taskfile.yml` - Task automation and build commands
- `pyrightconfig.json` - Python type checking configuration
- `docker-compose.yml` - Development container setup
- `.env` - Environment variables (API keys, ports, etc.)

### Agent System Architecture
- Agents are configurable via manifest.json (graph definition) and property.json (runtime config)
- Extensions are loaded dynamically based on agent configuration
- RTC communication handled through Agora SDK integration
- Each agent example demonstrates different use cases (voice assistant, transcription, etc.)

### Extension Development
- Extensions live in `agents/ten_packages/extension/`
- Each extension requires manifest.json, property.json, and optional tests/
- Python extensions use the TEN Runtime Python interface
- PYTHONPATH includes TEN framework interfaces and AI base classes