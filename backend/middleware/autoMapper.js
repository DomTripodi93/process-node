module.exports = (fullObj, partialObj) => {
    let objForReturn = {...fullObj};
    Object.keys(partialObj.toJSON()).forEach(key => {
        objForReturn[key] = partialObj[key];
    })
    return objForReturn;
}