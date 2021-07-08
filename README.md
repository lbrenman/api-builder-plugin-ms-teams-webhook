# API Builder Plugin for MS Teams Incoming Webhooks

[**Axway API Builder**](https://docs.axway.com/bundle/API_Builder_4x_allOS_en/page/api_builder.html) flow-node that implements [**Microsoft Teams**](https://www.microsoft.com/en-us/microsoft-teams/group-chat-software) messages (cards) via incoming webhooks: *api-builder-plugin-ms-teams-webhook*

Methods Implemented:

* sendMsg
* sendMsgFull

## About flow-nodes

Flow-nodes are used within Axway API Builder's flow editor that is a low-code / no-code solution to designing and developing services
that integrate to many different connected components, such as databases and APIs.

## Install

After creating your [**API Builder Project**](https://docs.axway.com/bundle/API_Builder_4x_allOS_en/page/api_builder_getting_started_guide.html), you can install this plugin using npm:

```
npm install api-builder-plugin-ms-teams-webhook
```

> Note that this command will install from npm. If you want to install locally, then provide the full path to the plugin folder

In order to use the plugin, you will need the incoming webhook URL for the MS Team channel that you want to post messages to. Follow [**these instructions**](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook) to add an incoming webhook.

## Use

Find the plugin in the Messaging group in the Flow-Nodes panel. Drag onto the canvas and select the desired method and provide the input and wire up to the rest of your flow as shown below:

![](https://i.imgur.com/qOMpFFd.png)

## Methods

The currently implemented methods are described below.

### sendMsg

This method is for simple messages as shown above. You don't need to know how to create a MS Team card.

Provide the *url*, *summary*, *title* and *text* as input and the message will be similar to below:

* summary =  'Incident 1234'
* text = 'Incident 1234 created by Joe Blow'
* title = 'Incident Created'
* url = YOUR MS TEAM INCOMING WEBHOOK URL

![](https://i.imgur.com/i55K6we.png)

### sendMsgFull

This method is for any message supported by MS Teams. You need to know how to create an MS Team card.

This is a very nice page to generate the payload for your Microsoft Teams Webhook.

[**https://messagecardplayground.azurewebsites.net/**](https://messagecardplayground.azurewebsites.net/)

Provide the *url* and *card* JSON object and the message will be similar to below:

* url = YOUR MS TEAM INCOMING WEBHOOK URL
* card = SEE JSON BELOW

```
{
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
}
```

![](https://i.imgur.com/YPt5wK8.png)
