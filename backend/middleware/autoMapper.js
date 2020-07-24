module.exports = (fullObj, partialObj) => {
    return {...fullObj, ...partialObj};
}