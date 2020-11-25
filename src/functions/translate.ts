import fetch from 'node-fetch';
import * as querystring from 'query-string';
import { TranslationParameters } from '../interfaces/translation/translationParameters';
import { TranslationResponse } from '../interfaces/translation/translationResponse';
import { handleError } from './handleError';

/**
 * Translate a string into another language using the DeepL API.
 * @property {TranslationParameters} params The parameters you can send to configure DeepL.
 * @returns {Promise<TranslationResponse>} An array of translated text.
 */
export async function translate(params: TranslationParameters): Promise<TranslationResponse> {
  const body = querystring.stringify(params);

  const response = await fetch(`https://api.deepl.com/v2/translate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (!response.ok) throw await handleError(response);

  return response.json();
}
