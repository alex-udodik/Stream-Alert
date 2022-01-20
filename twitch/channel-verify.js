const fetch = require ("node-fetch");


//TODO: Lots of repeated code. Need to make some sort of builder for api endpoints.

module.exports = {
    verifyChannelName: async function(channel) {

        let channel_name = channel.toLowerCase();
        const bearerToken = await getBearerToken();

        const url = `https://api.twitch.tv/helix/users?login=${channel_name}`;

        return await fetch(url, {
            method: "GET",
            headers: {'Client-ID': process.env.TWITCH_CLIENT_ID,
            Authorization: `Bearer ${bearerToken}`
            }
        }).then(res => {
            return res.json();
        }).then(body => {
            if ((body.data || []).length === 0) return "invalid";

            else return body.data[0].id;
        }).catch(err => {
            return err;
        });
    },

    verifyChannelIsSubscribed: async function (channel_id) {
        
        const bearerToken = await getBearerToken();
        const url = 'https://api.twitch.tv/helix/eventsub/subscriptions';

        return await fetch(url, {
            method: "GET",
            headers: {'Client-ID': process.env.TWITCH_CLIENT_ID,
            Authorization: `Bearer ${bearerToken}`
            }
        }).then(res => {
            return res.json();
        }).then(res => {
            for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].condition.broadcaster_user_id === channel_id) {
                    return true;
                }
            }

            return false;
        }).catch(err => {
            return err;
        });
    },

    getChannelSubscriptions: async function() {
        const bearerToken = await getBearerToken();
        const url = 'https://api.twitch.tv/helix/eventsub/subscriptions';

        return await fetch(url, {
            method: "GET",
            headers: {'Client-ID': process.env.TWITCH_CLIENT_ID,
            Authorization: `Bearer ${bearerToken}`
            }
        }).then(res => {
            return res.json();
        }).then(res => {
            return res;
        }).catch(err => {
            return err;
        });
    },

    getChannels: async function(url) {

        const bearerToken = await getBearerToken();
        return await fetch(url, {
            method: "GET",
            headers: {'Client-ID': process.env.TWITCH_CLIENT_ID,
            Authorization: `Bearer ${bearerToken}`
            }
        }).then(res => {
            return res.json();
        }).then(res => {
            return res;
        }).catch(err => {
            return err;
        });
    }
};

const getBearerToken = async() => {
    const url = `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_SECRET_ID}&grant_type=client_credentials`;

    return await fetch(url, {
            method: "POST",
            headers: {'Content-Type': 'application/json'}
        }).then(res => {
            return res.json();
        }).then((body) => {
            return body.access_token;
        }).catch(err => {
            return err;
        });
}
