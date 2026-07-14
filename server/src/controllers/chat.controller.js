let MOCK_CONVERSATIONS = [
  { id: 1, name: "Rohan Sharma", phone: "+91 98765 43210", lastMsg: "Which scholarships are available?" },
  { id: 2, name: "Ananya Iyer", phone: "+91 99887 76655", lastMsg: "Okay, I will send the docs by evening." },
];

let MOCK_MESSAGES = {
  1: [
    { sender: "student", text: "Hello, I am interested in B.Tech CSE.", time: "11:20 AM" },
    { sender: "counselor", text: "Hi Rohan! How can I help you?", time: "11:22 AM" }
  ],
  2: [
    { sender: "student", text: "I have filled the form.", time: "Yesterday" }
  ]
};

exports.getConversations = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, conversations: MOCK_CONVERSATIONS });
  } catch (err) {
    next(err);
  }
};

exports.getMessages = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const messages = MOCK_MESSAGES[contactId] || [];
    res.status(200).json({ success: true, messages });
  } catch (err) {
    next(err);
  }
};

exports.sendMessage = async (req, res, next) => {
  const { contactId, text } = req.body;
  try {
    if (!MOCK_MESSAGES[contactId]) {
      MOCK_MESSAGES[contactId] = [];
    }

    const newMsg = {
      sender: "counselor",
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    MOCK_MESSAGES[contactId].push(newMsg);

    // Update last message in conversation
    const convIdx = MOCK_CONVERSATIONS.findIndex(c => c.id === parseInt(contactId));
    if (convIdx !== -1) {
      MOCK_CONVERSATIONS[convIdx].lastMsg = text;
    }

    res.status(200).json({ success: true, message: newMsg });
  } catch (err) {
    next(err);
  }
};
