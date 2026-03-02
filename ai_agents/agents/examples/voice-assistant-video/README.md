# Voice Assistant (Video)

A voice assistant with video capabilities for enhanced visual interaction.

## Environment

Set `SILICONFLOW_API_KEY` in `ai_agents/.env` before running. This example now uses SiliconFlow TTS for the `tts` node.

## Quick Start

1. **Install dependencies:**
   ```bash
   task install
   ```

2. **Run the video voice assistant:**
   ```bash
   task run
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - API Server: http://localhost:8080
   - TMAN Designer: http://localhost:49483

If you just pulled new changes, rerun `task install` so `tman install` can install the new `siliconflow_tts2_python` dependency.
