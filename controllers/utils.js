module.exports = {
    viewLogs: (data) => console.table(
        data , ['id', 'custom', 'domain', 'url', 'count']
    )
}