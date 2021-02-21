import { loadTemplate } from './templatesLoader';
import * as mustache from 'mustache';

/**
 * Completes the template with the given data
 *
 * @param {object} dataToComplete data to complete template with
 * @param {string} template template name
 * @param {Promise} loader function to load the template file
 * @returns {Promise<string>} string representation of the completed template
 */

export const completeTemplate = async (
  dataToComplete: Record<string, unknown>,
  template: string,
  loader = loadTemplate,
): Promise<string> => {
  const templateFile = await loader(template);
  const completedTemplate = mustache.render(templateFile.toString(), dataToComplete);
  return completedTemplate;
};
