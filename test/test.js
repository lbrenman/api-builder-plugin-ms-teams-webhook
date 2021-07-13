const { expect } = require('chai');
const { MockRuntime } = require('@axway/api-builder-test-utils');
const getPlugin = require('../src');

describe('flow-node ms-teams-webhook', () => {
	let plugin;
	let flowNode;
	beforeEach(async () => {
		plugin = await MockRuntime.loadPlugin(getPlugin);
		plugin.setOptions({ validateOutputs: true });
		flowNode = plugin.getFlowNode('ms-teams-webhook');
	});

	describe('#constructor', () => {
		it('should define flow-nodes', () => {
			expect(plugin).to.be.a('object');
			expect(plugin.getFlowNodeIds()).to.deep.equal([
				'ms-teams-webhook'
			]);
			expect(flowNode).to.be.a('object');

			// Ensure the flow-node matches the spec
			expect(flowNode.name).to.equal('MS Teams Webhook');
			expect(flowNode.description).to.equal('Flow-node to say send a message to a MS Team Webhook.');
			expect(flowNode.icon).to.be.a('string');
			expect(flowNode.getMethods()).to.deep.equal([
				'sendMsg',
				'sendMsgFull'
			]);
		});

		// It is vital to ensure that the generated node flow-nodes are valid
		// for use in API Builder. Your unit tests should always include this
		// validation to avoid potential issues when API Builder loads your
		// node.
		it('should define valid flow-nodes', () => {
			// if this is invalid, it will throw and fail
			plugin.validate();
		});
	});

	describe('#sendMsg', () => {
		it('should error when missing required parameter', async () => {
			// Invoke #hello with a non-number and check error.
			const { value, output } = await flowNode.sendMsg({
				url: null
			});

			expect(value).to.be.instanceOf(Error)
				.and.to.have.property('message', 'Missing required parameter: url');
			expect(output).to.equal('error');
		});

		let params = {
			url: 'https://axwaysoftware.webhook.office.com/webhookb2/bf96a962-a608-47c0-b398-f05dc36b7427@300f59df-78e6-436f-9b27-b64973e34f7d/IncomingWebhook/fa2f4f7c22814d6bb43c9fb385b349df/5cf7e7c2-6db1-4faa-a260-3950ef6d265e',
			title: 'Title Text',
			summary: 'Summary Text',
			text: 'Body Text'
		}

		it('should succeed with valid argument', async () => {
			const { value, output } = await flowNode.sendMsg(params);

			expect(value).to.equal(undefined);
			expect(output).to.equal('next');
		});
	});

	describe('#sendMsgFull', () => {
		it('should error when missing required parameter', async () => {
			// Invoke #hello with a non-number and check error.
			const { value, output } = await flowNode.sendMsgFull({
				url: null
			});

			expect(value).to.be.instanceOf(Error)
				.and.to.have.property('message', 'Missing required parameter: url');
			expect(output).to.equal('error');
		});

		let card = {
			"@type": "MessageCard",
			"@context": "https://schema.org/extensions",
			"summary": "Issue 176715375",
			"themeColor": "0078D7",
			"title": "Issue opened: \"Push notifications not working\"",
			"sections": [
				{
					"activityTitle": "Miguel Garcie",
					"activitySubtitle": "9/13/2016, 11:46am",
					"activityImage": "https://connectorsdemo.azurewebsites.net/images/MSC12_Oscar_002.jpg",
					"facts": [
						{
							"name": "Repository:",
							"value": "mgarcia\\test"
						},
						{
							"name": "Issue #:",
							"value": "176715375"
						}
					],
					"text": "There is a problem with Push notifications, they don't seem to be picked up by the connector."
				}
			],
			"potentialAction": [
				{
					"@type": "ActionCard",
					"name": "Add a comment",
					"inputs": [
						{
							"@type": "TextInput",
							"id": "comment",
							"title": "Enter your comment",
							"isMultiline": true
						}
					],
					"actions": [
						{
							"@type": "HttpPOST",
							"name": "OK",
							"target": "http://..."
						}
					]
				},
				{
					"@type": "HttpPOST",
					"name": "Close",
					"target": "http://..."
				},
				{
					"@type": "OpenUri",
					"name": "View in GitHub",
					"targets": [
						{
							"os": "default",
							"uri": "http://..."
						}
					]
				}
			]
		};

		let url = 'https://axwaysoftware.webhook.office.com/webhookb2/bf96a962-a608-47c0-b398-f05dc36b7427@300f59df-78e6-436f-9b27-b64973e34f7d/IncomingWebhook/fa2f4f7c22814d6bb43c9fb385b349df/5cf7e7c2-6db1-4faa-a260-3950ef6d265e';

		it('should succeed with valid argument', async () => {
			const { value, output } = await flowNode.sendMsgFull({url, card});

			expect(value).to.equal(undefined);
			expect(output).to.equal('next');
		});
	});

});
