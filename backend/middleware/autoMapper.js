module.exports = (fullObj, partialObj) => {
    let objForReturn = {};
    Object.keys(fullObj).forEach(key => {
        if (partialObj[key]){
            objForReturn[key] = partialObj[key];
        } else {
            objForReturn[key] = fullObj[key];
        }
    })
    return objForReturn;
}