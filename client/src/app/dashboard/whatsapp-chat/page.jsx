"use client";

import { useState } from "react";

const INITIAL_CONTACTS = [
  { id: 1, name: "Rohan Sharma", phone: "+91 98765 43210", lastMsg: "Which scholarships are available?", unread: 2, status: "Active" },
  { id: 2, name: "Ananya Iyer", phone: "+91 99887 76655", lastMsg: "Okay, I will send the docs by evening.", unread: 0, status: "Active" },
  { id: 3, name: "Kabir Mehta", phone: "+91 88776 65544", lastMsg: "Can we schedule a call at 3 PM?", unread: 1, status: "Away" },
];

const INITIAL_MESSAGES = [
  { sender: "student", text: "Hello, I am interested in the B.Tech CSE course.", time: "11:20 AM" },
  { sender: "counselor", text: "Hi! That's a great choice. IIT Bombay and BITS Pilani are excellent for CSE. Do you have any preference?", time: "11:22 AM" },
  { sender: "student", text: "Which scholarships are available?", time: "11:25 AM" },
];

export default function WhatsAppChatPage() {
  const [contacts] = useState(INITIAL_CONTACTS);
  const [activeContact, setActiveContact] = useState(contacts[0]);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setMessages([...messages, { sender: "counselor", text: inputText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setInputText("");
  };

  return (
    <div className="h-[calc(100vh-140px)] border border-slate-200 bg-white rounded-[12px] shadow-premium overflow-hidden flex font-poppins">
      {/* Contact list side */}
      <div className="w-[300px] border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <h4 className="text-[14px] font-bold text-slate-800">WhatsApp Inbox</h4>
          <input
            type="text"
            placeholder="Search chat..."
            className="w-full h-[36px] px-3 mt-3 border border-slate-200 rounded-[8px] bg-white text-[12px] outline-none"
          />
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setActiveContact(contact)}
              className={`w-full p-4 flex flex-col gap-1 transition-colors hover:bg-slate-50 text-left ${activeContact.id === contact.id ? "bg-slate-50" : ""}`}
            >
              <div className="flex justify-between items-center w-full">
                <span className="text-[13px] font-bold text-slate-800">{contact.name}</span>
                {contact.unread > 0 && (
                  <span className="w-4 h-4 bg-accent-emerald text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {contact.unread}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 truncate w-full">{contact.lastMsg}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Chat pane */}
      <div className="flex-1 flex flex-col bg-slate-50">
        {/* Chat header */}
        <div className="h-[60px] bg-white border-b border-slate-200 px-6 flex items-center justify-between">
          <div>
            <h4 className="text-[14px] font-bold text-slate-800">{activeContact.name}</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">{activeContact.phone}</p>
          </div>
        </div>

        {/* Message bubble flow */}
        <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
          {messages.map((msg, idx) => {
            const isCounselor = msg.sender === "counselor";
            return (
              <div key={idx} className={`max-w-[70%] p-3.5 rounded-[12px] flex flex-col gap-1 ${isCounselor ? "self-end bg-brand-800 text-white rounded-tr-none shadow-card" : "self-start bg-white text-slate-800 rounded-tl-none border border-slate-200"}`}>
                <span className="text-[13px] leading-relaxed">{msg.text}</span>
                <span className={`text-[9px] self-end mt-1 ${isCounselor ? "text-slate-300" : "text-slate-400"}`}>{msg.time}</span>
              </div>
            );
          })}
        </div>

        {/* Send message form */}
        <form onSubmit={handleSendMessage} className="h-[68px] bg-white border-t border-slate-200 px-6 flex items-center gap-4">
          <input
            type="text"
            placeholder="Type your message here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 h-[42px] border border-slate-200 rounded-[8px] bg-slate-50 px-4 text-[13px] outline-none focus:border-brand-800"
          />
          <button type="submit" className="h-[42px] px-5 bg-brand-800 hover:bg-brand-900 text-white rounded-[8px] text-[13px] font-semibold transition-colors cursor-pointer">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
