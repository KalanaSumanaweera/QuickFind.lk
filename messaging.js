// Sample data structure for conversations and messages
let conversations = [
    { id: 1, name: "John's Electrical", lastMessage: "Hi, I'm available for the job..." },
    { id: 2, name: "Plumb Perfect", lastMessage: "Thank you for your inquiry..." }
];

let messages = {
    1: [
        { sender: 'user', text: "Hi, I need an electrician for some wiring work. Are you available this week?" },
        { sender: 'provider', text: "Hello! Yes, I'm available. Can you provide more details about the job?" }
    ],
    2: [
        { sender: 'user', text: "I have a leaky faucet. Can you help?" },
        { sender: 'provider', text: "Certainly! I can come take a look tomorrow. What time works for you?" }
    ]
};

// Load conversations from localStorage or use sample data
if (localStorage.getItem('conversations')) {
    conversations = JSON.parse(localStorage.getItem('conversations'));
}

if (localStorage.getItem('messages')) {
    messages = JSON.parse(localStorage.getItem('messages'));
}

let currentConversationId = null;

function displayConversations() {
    const conversationList = document.getElementById('conversationList');
    conversationList.innerHTML = '';
    conversations.forEach(conv => {
        const div = document.createElement('div');
        div.className = 'p-4 border-b hover:bg-gray-100 cursor-pointer';
        div.innerHTML = `
            <h4 class="font-bold">${conv.name}</h4>
            <p class="text-sm text-text-secondary">Last message: ${conv.lastMessage}</p>
        `;
        div.onclick = () => loadConversation(conv.id);
        conversationList.appendChild(div);
    });
}

function loadConversation(id) {
    currentConversationId = id;
    const conversation = conversations.find(c => c.id === id);
    document.getElementById('currentConversationName').textContent = conversation.name;
    displayMessages(id);
}

function displayMessages(conversationId) {
    const messageList = document.getElementById('messageList');
    messageList.innerHTML = '';
    messages[conversationId].forEach(msg => {
        const div = document.createElement('div');
        div.className = `flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`;
        div.innerHTML = `
            <div class="${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-gray-200'} p-3 rounded-lg max-w-xs">
                ${msg.text}
            </div>
        `;
        messageList.appendChild(div);
    });
    messageList.scrollTop = messageList.scrollHeight;
}

document.getElementById('sendMessage').addEventListener('click', sendMessage);

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();
    if (messageText && currentConversationId) {
        messages[currentConversationId].push({ sender: 'user', text: messageText });
        const conversation = conversations.find(c => c.id === currentConversationId);
        conversation.lastMessage = messageText;
        displayMessages(currentConversationId);
        displayConversations();
        messageInput.value = '';
        
        // Save to localStorage
        localStorage.setItem('conversations', JSON.stringify(conversations));
        localStorage.setItem('messages', JSON.stringify(messages));
    }
}

document.getElementById('searchConversations').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const filteredConversations = conversations.filter(conv => 
        conv.name.toLowerCase().includes(searchTerm) || 
        conv.lastMessage.toLowerCase().includes(searchTerm)
    );
    displayFilteredConversations(filteredConversations);
});

function displayFilteredConversations(filteredConvs) {
    const conversationList = document.getElementById('conversationList');
    conversationList.innerHTML = '';
    filteredConvs.forEach(conv => {
        const div = document.createElement('div');
        div.className = 'p-4 border-b hover:bg-gray-100 cursor-pointer';
        div.innerHTML = `
            <h4 class="font-bold">${conv.name}</h4>
            <p class="text-sm text-text-secondary">Last message: ${conv.lastMessage}</p>
        `;
        div.onclick = () => loadConversation(conv.id);
        conversationList.appendChild(div);
    });
}

// Initial display
displayConversations();