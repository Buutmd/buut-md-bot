
function autoReply(message) {
  const text = message.toLowerCase().trim();

  if (text === "hi" || text === "hello") {
    return "👋 Hello! Welcome to Buut md Bot ❤️";
  }

  if (text === "help") {
    return "🤖 Welcome to Buut md! How can I help you?";
  }

  if (text === "name") {
    return "My name is Buut md Bot ❤️";
  }

  return "Thank you for messaging Buut md! 😊";
}

module.exports = autoReply;
