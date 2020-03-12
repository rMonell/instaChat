export const setOneOfTheStates = (stateName, stateToChange) => {
    const setMethod = 'set' + stateName[0].toUppercase() + stateName.slice(1)
    
    setMethod.call({
        ...stateName,
        stateToChange
    })
}