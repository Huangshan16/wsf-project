# Repository Guidelines

## Project Structure & Module Organization
- `core/` holds the core TEN framework runtime and libraries.
- `packages/` contains modular framework packages and extensions.
- `ai_agents/` contains agent examples, the Go server, and playground apps.
- `tests/` hosts unit/integration test suites (e.g., C++ unit tests under `tests/ten_utils`).
- `tools/` and `build/` contain tooling and build assets; `third_party/` vendors dependencies.

## Build, Test, and Development Commands
This repo uses Task as the primary runner (`Taskfile.yml`). Common commands:

```bash
# core build pipeline
 task gen        # generate build files
 task build      # build all targets
 task clean      # remove build output (out/)

# AI agents (from repo root)
 task -d ai_agents lint
 task -d ai_agents format
 task -d ai_agents test
 task -d ai_agents test-extension EXTENSION=agents/ten_packages/extension/elevenlabs_tts_python
```

Frontend lint/format (Biome) from repo root:

```bash
npm run lint
npm run format
```

## Coding Style & Naming Conventions
- Follow existing patterns per language; keep changes localized.
- JavaScript/TypeScript formatting is enforced by Biome (2-space indentation, 80-char lines).
- Python follows PEP 8 with Black (line length 80); run `task -d ai_agents format`.
- Go code should be gofmt-compliant; C++ follows existing style in `core/` and `tests/`.

## Testing Guidelines
- C++ unit tests use GoogleTest (see `tests/ten_utils`).
- Python extension tests are run via `task -d ai_agents test-extension ...`.
- Go server tests run with `task -d ai_agents test-server` (wraps `go test ./...`).
- Prefer adding tests alongside the component you modify; name tests to match the module or feature.

## Commit & Pull Request Guidelines
- Commit messages use conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`.
- Before opening a PR: run relevant tests, format code, and update docs as needed.
- PRs should include a clear description, linked issues (e.g., `Fixes #123`), and screenshots for UI changes.
- Contributions require accepting the CLA (see `CLA.md`).

## Configuration & Secrets
- AI agents rely on `ai_agents/.env`; start from `ai_agents/.env.example`.
- Never commit API keys or credentials; document new env vars in the relevant README.
