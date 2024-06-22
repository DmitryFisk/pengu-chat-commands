function update(k, v) {
    let prefs = DataStore.get("cc_preferences");
    prefs[k] = v;

    DataStore.set("cc_preferences", prefs);
}

function get(k) {
    return DataStore.get("cc_preferences")[k];
}

function init() {
    if (!DataStore.has("cc_preferences"))
        DataStore.set("cc_preferences", {
            summonerId: null,
            playerChatId: null,
            roomId: null
        });
}

export default {
    update: update,
    get: get,
    init: init
};