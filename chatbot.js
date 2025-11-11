// Chatbot functionality
const chatbot = {
    // Speech therapy knowledge base
    knowledge: {
        conditions: {
            aphasia: {
                description: "A language disorder affecting ability to communicate, often caused by brain injury or stroke",
                exercises: [
                    "Word-finding practice",
                    "Picture naming exercises",
                    "Reading comprehension tasks",
                    "Conversation practice"
                ],
                tips: "Start with simple words and gradually increase complexity. Regular practice is key."
            },
            dysarthria: {
                description: "Motor speech disorder affecting speech muscle strength and control",
                exercises: [
                    "Tongue strengthening exercises",
                    "Lip movement practice",
                    "Breathing exercises",
                    "Articulation drills"
                ],
                tips: "Focus on slow, controlled movements. Practice in front of a mirror."
            },
            stroke: {
                description: "Recovery of speech after stroke requires consistent practice and patience",
                exercises: [
                    "Facial muscle exercises",
                    "Voice projection practice",
                    "Rhythm exercises",
                    "Word repetition drills"
                ],
                tips: "Regular short practice sessions are better than long, infrequent ones."
            }
        },
        exercises: {
            breathing: [
                "Diaphragmatic breathing",
                "Pursed lip breathing",
                "Controlled breath support exercises"
            ],
            articulation: [
                "Tongue twisters",
                "Sound isolation practice",
                "Word pair contrasts",
                "Minimal pair exercises"
            ],
            voice: [
                "Pitch variation exercises",
                "Volume control practice",
                "Resonance exercises",
                "Sustained phonation"
            ]
        },
        techniques: {
            pronunciation: "Focus on clear, precise movements of lips, tongue, and jaw",
            rhythm: "Practice speaking with natural rhythm and appropriate pauses",
            intonation: "Work on voice melody and stress patterns in sentences",
            fluency: "Build confidence through gradual increase in speaking complexity"
        }
    },

    init() {
        // Initialize chatbot elements
        this.chatBox = document.getElementById('chat-box');
        this.chatButton = document.getElementById('chat-button');
        this.chatMessages = document.getElementById('chat-messages');
        this.userInput = document.getElementById('user-message');
        this.sendButton = document.getElementById('send-message');
        this.closeChat = document.getElementById('close-chat');

        // Bind event listeners
        this.chatButton.addEventListener('click', () => this.toggleChat());
        this.closeChat.addEventListener('click', () => this.toggleChat());
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Show initial message
        this.addMessage('bot', 'Hello! I\'m your SpeakBee assistant. I can help you with speech therapy exercises, techniques, and condition-specific guidance. What would you like to know about?');
    },

    toggleChat() {
        this.chatBox.classList.toggle('active');
    },

    sendMessage() {
        const message = this.userInput.value.trim();
        if (message) {
            this.addMessage('user', message);
            this.userInput.value = '';
            this.processMessage(message);
        }
    },

    addMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.innerHTML = `<p>${text}</p>`;
        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    },

    processMessage(message) {
        const lowerMessage = message.toLowerCase();
        let response = '';

        // Enhanced response patterns with detailed knowledge
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            response = "Hi! I'm here to help with your speech therapy. I can provide information about:\n" +
                      "1. Specific conditions (aphasia, dysarthria, stroke)\n" +
                      "2. Exercise techniques\n" +
                      "3. Practice activities\n" +
                      "What would you like to learn about?";
        }
        else if (lowerMessage.includes('aphasia')) {
            const info = this.knowledge.conditions.aphasia;
            response = `Aphasia: ${info.description}\n\nRecommended exercises:\n` +
                      info.exercises.map(ex => `• ${ex}`).join('\n') + 
                      `\n\nTip: ${info.tips}`;
        }
        else if (lowerMessage.includes('dysarthria')) {
            const info = this.knowledge.conditions.dysarthria;
            response = `Dysarthria: ${info.description}\n\nRecommended exercises:\n` +
                      info.exercises.map(ex => `• ${ex}`).join('\n') +
                      `\n\nTip: ${info.tips}`;
        }
        else if (lowerMessage.includes('stroke')) {
            const info = this.knowledge.conditions.stroke;
            response = `Speech Recovery After Stroke: ${info.description}\n\nRecommended exercises:\n` +
                      info.exercises.map(ex => `• ${ex}`).join('\n') +
                      `\n\nTip: ${info.tips}`;
        }
        else if (lowerMessage.includes('breathing') || lowerMessage.includes('breath')) {
            response = "Breathing Exercises for Speech:\n" +
                      this.knowledge.exercises.breathing.map(ex => `• ${ex}`).join('\n') +
                      "\n\nTip: Good breath support is fundamental for clear speech.";
        }
        else if (lowerMessage.includes('articulation') || lowerMessage.includes('pronounce')) {
            response = "Articulation Exercises:\n" +
                      this.knowledge.exercises.articulation.map(ex => `• ${ex}`).join('\n') +
                      `\n\nTip: ${this.knowledge.techniques.pronunciation}`;
        }
        else if (lowerMessage.includes('voice') || lowerMessage.includes('pitch')) {
            response = "Voice Training Exercises:\n" +
                      this.knowledge.exercises.voice.map(ex => `• ${ex}`).join('\n') +
                      "\n\nTip: Practice these exercises daily for best results.";
        }
        else if (lowerMessage.includes('exercise') || lowerMessage.includes('practice')) {
            response = "What type of practice would you like to focus on?\n\n" +
                      "1. Breathing Exercises - for better breath support\n" +
                      "2. Articulation Practice - for clearer pronunciation\n" +
                      "3. Voice Exercises - for better control and projection\n" +
                      "4. Word Practice - for vocabulary and pronunciation\n" +
                      "5. Sentence Practice - for natural speech flow\n\n" +
                      "Type the area you want to work on, and I'll provide specific exercises.";
        }
        else if (lowerMessage.includes('technique') || lowerMessage.includes('tip')) {
            response = "Speech Therapy Techniques:\n\n" +
                      `• Pronunciation: ${this.knowledge.techniques.pronunciation}\n` +
                      `• Rhythm: ${this.knowledge.techniques.rhythm}\n` +
                      `• Intonation: ${this.knowledge.techniques.intonation}\n` +
                      `• Fluency: ${this.knowledge.techniques.fluency}`;
        }
        else if (lowerMessage.includes('progress') || lowerMessage.includes('improvement')) {
            response = "I can help you track your progress! Would you like to:\n" +
                      "1. Review your recent practice sessions\n" +
                      "2. See your improvement trends\n" +
                      "3. Get personalized recommendations\n" +
                      "4. Set new practice goals";
        }
        else if (lowerMessage.includes('help')) {
            response = "I can help you with:\n" +
                      "• Information about specific conditions (aphasia, dysarthria, stroke)\n" +
                      "• Detailed exercise instructions\n" +
                      "• Speech therapy techniques\n" +
                      "• Progress tracking\n" +
                      "• Practice recommendations\n\n" +
                      "What would you like to know more about?";
        }
        else {
            response = "I'm your speech therapy assistant. I can help with:\n" +
                      "1. Information about speech conditions\n" +
                      "2. Specific exercises and techniques\n" +
                      "3. Progress tracking\n" +
                      "4. Practice recommendations\n\n" +
                      "What would you like to explore?";
        }

        setTimeout(() => {
            this.addMessage('bot', response);
        }, 500);
    }
};

// Export the chatbot object
window.SpeakBeeChatbot = chatbot;