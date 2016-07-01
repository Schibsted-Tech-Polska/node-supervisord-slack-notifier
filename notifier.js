'use strict';
const supervisor = require('supervisord-eventlistener');
const WebClient = require('@slack/client').WebClient;
const config = require('ez-config').get();
const os = require('os');
const get = require('lodash.get');
const moment = require('moment');

const slackClient = new WebClient(config.slack.apiToken, config.slack.opts);

function formatMessage(type, headers, data) {
    return `Process *${data.groupname}:${data.processname}* went from *${getEventNiceName(data.from_state)}* ` +
        `to *${getEventNiceName(headers.eventname)}* ${get(config, `supervisord.events[${type}]["emoji"]`, '')}`;
}

function getEventNiceName(event) {
    return get(config.supervisord.events, `${event}.niceName`, event).toUpperCase();
}

module.exports = function(stdin, stdout) {
    supervisor.on('event', function(type, headers, data) {
        slackClient.chat.postMessage(config.slack.channel, '', Object.assign({
            as_user: false,
            attachments: [{
                text: formatMessage(type, headers, data),
                fallback: data.groupname + ':' + data.processname + ' -> ' + headers.eventname,
                color: get(config, `supervisord.events.${type}.color`, '#ddd'),
                mrkdwn_in: ['text'],
                fields: [
                    {
                        title: 'Server',
                        value: os.hostname(),
                        short: true
                    },
                    {
                        title: 'Date',
                        value: moment().format('YYYY-MM-DD hh:mm:ss'),
                        short: true
                    }
                ]
            }]
        }, config.slack.opts));
    });

    supervisor.listen(stdin, stdout);

    return supervisor;
};
