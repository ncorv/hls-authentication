let globals = new Array();
const state = { globals };

const set = (key, value) => {
    state.globals[key] = value
};

const get = key => state.globals[key];

module.exports = { get, set };