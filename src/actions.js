const axios = require('axios');

/**
 * Action method.
 *
 * @param {object} params - A map of all the parameters passed from the flow.
 * @param {object} options - The additional options provided from the flow
 *	 engine.
 * @param {object} options.pluginConfig - The service configuration for this
 *	 plugin from API Builder config.pluginConfig['api-builder-plugin-pluginName']
 * @param {object} options.logger - The API Builder logger which can be used
 *	 to log messages to the console. When run in unit-tests, the messages are
 *	 not logged.  If you wish to test logging, you will need to create a
 *	 mocked logger (e.g. using `simple-mock`) and override in
 *	 `MockRuntime.loadPlugin`.  For more information about the logger, see:
 *	 https://docs.axway.com/bundle/API_Builder_4x_allOS_en/page/logging.html
 * @param {*} [options.pluginContext] - The data provided by passing the
 *	 context to `sdk.load(file, actions, { pluginContext })` in `getPlugin`
 *	 in `index.js`.
 * @return {*} The response value (resolves to "next" output, or if the method
 *	 does not define "next", the first defined output).
 */
async function sendMsg(params, options) {
	const { url, title, summary, text } = params;
	const { logger } = options;
	if (!url) {
		throw new Error('Missing required parameter: url');
	}
  if (!title) {
		throw new Error('Missing required parameter: title');
	}
  if (!summary) {
		throw new Error('Missing required parameter: summary');
	}
  if (!text) {
		throw new Error('Missing required parameter: text');
	}

  let card = {
    "@type": "MessageCard",
    "@context": "https://schema.org/extensions",
    "summary": summary,
    "themeColor": "0078D7",
    "title": title,
    "sections": [{
      "text": text
    }]
  }

  await axios({
   method: 'post',
   url: url,
   data: card
   });

  return;

}

async function sendMsgFull(params, options) {
	const { url, card } = params;
	const { logger } = options;
	if (!url) {
		throw new Error('Missing required parameter: url');
	}
  if (!card) {
		throw new Error('Missing required parameter: title');
	}

  await axios({
   method: 'post',
   url: url,
   data: card
   });

  return;

}

module.exports = {
  sendMsg,
  sendMsgFull
};
