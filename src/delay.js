async function delay(duration) {
    return new Promise(resolve => setTimeout(resolve, duration))
}

module.exports = delay
