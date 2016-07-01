node-supervisord-slack-notifier
==========================

Event listener for Supervisord that sends notifications to Slack via Web API

# Installation

### Requirements

node >= 4

## Set up
To get the package up and running run

```
npm install
```

Add to supervisord.conf the following:
```
[eventlistener:slack_notifier]
command=node /services/applications/supervisord-slack-notifier/current/index.js --NODE_CONFIG='{"slack":{"apiToken":"YOUR_API_TOKEN", "channel": "YOUR_CHANNEL_ID"}}'
events=PROCESS_STATE
```

## License

Released under the MIT License: http://www.opensource.org/licenses/mit-license.php
