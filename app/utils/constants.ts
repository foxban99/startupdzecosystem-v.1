import type { ModelInfo, OllamaApiResponse, OllamaModel } from './types';

export const WORK_DIR_NAME = 'project';
export const WORK_DIR = `/home/${WORK_DIR_NAME}`;
export const MODIFICATIONS_TAG_NAME = 'bolt_file_modifications';
export const MODEL_REGEX = /^\[Model: (.*?)\]\n\n/;
export const PROVIDER_REGEX = /\[Provider: (.*?)\]\n\n/;
export const DEFAULT_MODEL = 'Qwen/Qwen2.5-Coder-32B-Instruct';
export const DEFAULT_PROVIDER = 'Hyperbolic';

const staticModels: ModelInfo[] = [
  { name: 'nvidia/llama-3.1-nemotron-70b-instruct', label: 'nvidia/llama-3.1-nemotron-70b', provider: 'OpenRouter' },
  { name: 'openai/gpt-4o-mini', label: 'gpt-4o-mini', provider: 'OpenRouter' },
  { name: 'nvidia/llama-3.1-nemotron-70b-instruct', label: 'nvidia/llama-3.1-nemotron-70b', provider: 'OpenRouter' },
  { name: 'google/gemini-exp-1114', label: 'gemini-exp-1114', provider: 'OpenRouter' },
  { name: 'anthropic/claude-3.5-sonnet', label: 'Claude 3.5 Sonnet', provider: 'OpenRouter' },
  { name: 'qwen/qwen-2.5-coder-32b-instruct', label: 'qwen-2.5-coder-32b', provider: 'OpenRouter' },
  { name: 'qwen/qwen-2.5-72b-instruct', label: 'qwen-2.5-72b', provider: 'OpenRouter' },
  { name: 'deepseek/deepseek-chat', label: 'deepseek-v2.5', provider: 'OpenRouter' },
  { name: 'deepseek/deepseek-coder', label: 'Deepseek-Coder V2 236B (OpenRouter)', provider: 'OpenRouter' },
  { name: 'nousresearch/hermes-3-llama-3.1-405b:free', label: 'hermes-3-llama-3.1-405b:free', provider: 'OpenRouter' },
  { name: 'meta-llama/llama-3.1-70b-instruct', label: 'llama-3.1-70b-instruct', provider: 'OpenRouter' },
  { name: 'meta-llama/llama-3.1-70b-instruct:free', label: 'llama-3.1-70b-instruct:free', provider: 'OpenRouter' },
  { name: 'meta-llama/llama-3.1-405b-instruct:free', label: 'llama-3.1-405b-instruct:free', provider: 'OpenRouter' },
  { name: 'microsoft/phi-3-mini-128k-instruct:free', label: 'phi-3-mini-128k-instruct:free', provider: 'OpenRouter' },
  { name: 'microsoft/phi-3-medium-128k-instruct:free', label: 'phi-3-medium-128k-instruct:free', provider: 'OpenRouter' },
  { name: 'Qwen/Qwen2.5-Coder-32B-Instruct', label: 'Qwen2.5-Coder-32B', provider: 'Hyperbolic' },
  { name: 'deepseek-ai/DeepSeek-V2.5', label: 'DeepSeek-V2.5', provider: 'Hyperbolic' },
  { name: 'gemini-1.5-flash-latest', label: 'Gemini 1.5 Flash', provider: 'Google' },
  { name: 'gemini-1.5-pro-latest', label: 'Gemini 1.5 Pro', provider: 'Google' },
  { name: 'llama-3.1-70b-versatile', label: 'Llama 3.1 70b (Groq)', provider: 'Groq' },
  { name: 'llama-3.1-8b-instant', label: 'Llama 3.1 8b (Groq)', provider: 'Groq' },
  { name: 'llama-3.2-11b-vision-preview', label: 'Llama 3.2 11b (Groq)', provider: 'Groq' },
  { name: 'llama-3.2-3b-preview', label: 'Llama 3.2 3b (Groq)', provider: 'Groq' },
  { name: 'llama-3.2-1b-preview', label: 'Llama 3.2 1b (Groq)', provider: 'Groq' },
  { name: 'OpenAi/gpt-4o', label: 'gpt-4o', provider: 'Github' },
  { name: 'claude-3-5-sonnet-latest', label: 'Claude 3.5 Sonnet (new)', provider: 'Anthropic' },
  { name: 'claude-3-5-sonnet-20240620', label: 'Claude 3.5 Sonnet (old)', provider: 'Anthropic' },
  { name: 'claude-3-5-haiku-latest', label: 'Claude 3.5 Haiku (new)', provider: 'Anthropic' },
  { name: 'claude-3-opus-latest', label: 'Claude 3 Opus', provider: 'Anthropic' },
  { name: 'claude-3-sonnet-20240229', label: 'Claude 3 Sonnet', provider: 'Anthropic' },
  { name: 'claude-3-haiku-20240307', label: 'Claude 3 Haiku', provider: 'Anthropic' },
  { name: 'gpt-4o-mini', label: 'GPT-4o Mini', provider: 'OpenAI' },
  { name: 'gpt-4-turbo', label: 'GPT-4 Turbo', provider: 'OpenAI' },
  { name: 'gpt-4', label: 'GPT-4', provider: 'OpenAI' },
  { name: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo', provider: 'OpenAI' },
  { name: 'grok-beta', label: "xAI Grok Beta", provider: 'xAI' },
  { name: 'open-mistral-7b', label: 'Mistral 7B', provider: 'Mistral' },
  { name: 'open-mixtral-8x7b', label: 'Mistral 8x7B', provider: 'Mistral' },
  { name: 'open-mixtral-8x22b', label: 'Mistral 8x22B', provider: 'Mistral' },
  { name: 'open-codestral-mamba', label: 'Codestral Mamba', provider: 'Mistral' },
  { name: 'open-mistral-nemo', label: 'Mistral Nemo', provider: 'Mistral' },
  { name: 'ministral-8b-latest', label: 'Mistral 8B', provider: 'Mistral' },
  { name: 'mistral-small-latest', label: 'Mistral Small', provider: 'Mistral' },
  { name: 'codestral-latest', label: 'Codestral', provider: 'Mistral' },
  { name: 'mistral-large-latest', label: 'Mistral Large Latest', provider: 'Mistral' },
];

export let MODEL_LIST: ModelInfo[] = [...staticModels];

const getOllamaBaseUrl = () => {
  const defaultBaseUrl = import.meta.env.OLLAMA_API_BASE_URL || 'http://localhost:11434';
  // Check if we're in the browser
  if (typeof window !== 'undefined') {
    // Frontend always uses localhost
    return defaultBaseUrl;
  }

  // Backend: Check if we're running in Docker
  const isDocker = process.env.RUNNING_IN_DOCKER === 'true';

  return isDocker
    ? defaultBaseUrl.replace("localhost", "host.docker.internal")
    : defaultBaseUrl;
};

async function getOllamaModels(): Promise<ModelInfo[]> {
  try {
    const base_url = getOllamaBaseUrl();
    const response = await fetch(`${base_url}/api/tags`);
    const data = await response.json() as OllamaApiResponse;

    return data.models.map((model: OllamaModel) => ({
      name: model.name,
      label: `${model.name} (${model.details.parameter_size})`,
      provider: 'Ollama',
    }));
  } catch (e) {
    return [];
  }
}

async function getOpenAILikeModels(): Promise<ModelInfo[]> {
  try {
    const base_url = import.meta.env.OPENAI_LIKE_API_BASE_URL || "";
    if (!base_url) {
      return [];
    }
    const api_key = import.meta.env.OPENAI_LIKE_API_KEY ?? "";
    const response = await fetch(`${base_url}/models`, {
      headers: {
        Authorization: `Bearer ${api_key}`,
      }
    });
    const res = await response.json() as any;
    return res.data.map((model: any) => ({
      name: model.id,
      label: model.id,
      provider: 'OpenAILike',
    }));
  } catch (e) {
    return []
  }

}

async function getLMStudioModels(): Promise<ModelInfo[]> {
  try {
    const base_url = import.meta.env.LMSTUDIO_API_BASE_URL || "http://localhost:1234";
    const response = await fetch(`${base_url}/v1/models`);
    const data = await response.json() as any;
    return data.data.map((model: any) => ({
      name: model.id,
      label: model.id,
      provider: 'LMStudio',
    }));
  } catch (e) {
    return [];
  }
}


async function initializeModelList(): Promise<void> {
  const ollamaModels = await getOllamaModels();
  const openAiLikeModels = await getOpenAILikeModels();
  const lmstudioModels = await getLMStudioModels();
  MODEL_LIST = [...ollamaModels,...openAiLikeModels, ...staticModels,...lmstudioModels,];
}
initializeModelList().then();
export { getOllamaModels,getOpenAILikeModels,getLMStudioModels,initializeModelList };
