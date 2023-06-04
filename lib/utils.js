// Extracts the ID from a name with ID string eg. "name (id:123)" returns 123
function getIDFromNameWithID (name) {
  const match = name.match(/(.*) \(id:(\d+)\)/)
  if (match) {
    const parsedID = parseInt(match[2])
    if (parsedID) {
      return parsedID
    } else {
      // don't return NaN or undefined
      return null
    }
  } else {
    return null
  }
}

// Extracts the name from a name with ID string, eg. "name (id:123)" returns "name"
function getNameFromNameWithID (name) {
  const match = name.match(/(.*) \(id:(\d+)\)/)
  if (match) {
    return match[1].trim()
  } else {
    // return original name if no match
    return name
  }
}

module.exports = {
  getIDFromNameWithID,
  getNameFromNameWithID
}
