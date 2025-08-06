function time(){
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC +5:30
    const istDate = new Date(now.getTime() + istOffset);
    return istDate
}

module.exports = {
    time
}