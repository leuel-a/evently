import {initChatModel} from 'langchain';
import {BaseChatModel} from '@langchain/core/language_models/chat_models';

export let llm: BaseChatModel;

export async function initLLM(): Promise<void> {
    const provider = process.env.LLM_PROVIDER ?? 'google';
    const model = process.env.LLM_MODEL ?? 'gemini-2.0-flash';

    // TODO: temperature and maxTokens need to be env variables
    llm = await initChatModel(model, {
        modelProvider: provider,
        temperature: 0,
        maxTokens: 2048,
    });
}
