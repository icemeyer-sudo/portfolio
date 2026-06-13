const dashboard = {};

dashboard.getMessages = async function() {
    const response = await fetch('/api/messages');
    const messages = await response.json();
    console.log(messages);
    return messages;
}

export default dashboard;