from typing import Any, Dict, List
from pydantic import BaseModel, Field
from ten_ai_base import utils


class ElevenLabsTTS2Config(BaseModel):
    dump: bool = False
    dump_path: str = "./"
    params: Dict[str, Any] = Field(default_factory=dict)
    black_list_keys: List[str] = Field(default_factory=list)

    # query params
    sample_rate: int = 16000

    def to_str(self, sensitive_handling: bool = False) -> str:
        if not sensitive_handling:
            return f"{self}"

        config = self.copy(deep=True)
        if config.params.get("key"):
            config.params["key"] = utils.encrypt(config.params["key"])
        return f"{config}"

    def update_params(self) -> None:
        # This function allows overriding default config values with 'params' from property.json
        # pylint: disable=no-member

        for key, value in self.params.items():
            if hasattr(self, key):
                setattr(self, key, value)

        if not self.params.get("base_url"):
            self.params["base_url"] = "wss://api.elevenlabs.io/v1"

        if not self.params.get("voice_settings"):
            voice_settings = {}
            direct_map = {
                "stability": "stability",
                "similarity_boost": "similarity_boost",
                "style": "style",
            }
            for src_key, dest_key in direct_map.items():
                value = self.params.get(src_key)
                if value is not None:
                    voice_settings[dest_key] = value

            speaker_boost = self.params.get("use_speaker_boost")
            if speaker_boost is None:
                speaker_boost = self.params.get("speaker_boost")
            if speaker_boost is not None:
                voice_settings["use_speaker_boost"] = speaker_boost

            if voice_settings:
                self.params["voice_settings"] = voice_settings

        # Delete keys after iteration is complete
        for key in self.black_list_keys:
            if key in self.params:
                del self.params[key]
