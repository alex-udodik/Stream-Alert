const fetch = require ("node-fetch");

module.exports = {

    subscribeChannel: async function(channel_id) {

        var channel = {
            type: "subscribe",
            broadcaster_user_id: channel_id,
        } 

        console.log(channel)
        return await fetch(process.env.SUBSCRIPTION_API_URL, {
                method: "POST",
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify(channel)
            }).then(res => {
                return res.json();
            }).then(body => {
                return body;
            }).catch(err => {
                return err;
            });
    },

    unsubscribeChannel: async function(channel_id) {

        var channel = {
            type: "unsubscribe",
            broadcaster_user_id: channel_id,
        } 

        return await fetch(process.env.SUBSCRIPTION_API_URL, {
                method: "POST",
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify(channel)
            }).then(res => {
                return res.json();
            }).then(body => {
                return body;
            }).catch(err => {
                return err;
            });
    }
}