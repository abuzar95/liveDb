import { useEffect } from "react";

export const Chatbot = () => {
  useEffect(() => {
    // Add chatbot HTML
    const chatbotHtml = `
      <div id="chatbot-button" style="position: fixed; bottom: 20px; right: 20px; z-index: 1000;">
        <button
          style="
            background-color: #B31F13;
            color: white;
            border: none;
            border-radius: 50px;
            width: 120px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            font-family: 'Manrope', sans-serif;
            font-size: 16px;
            cursor: pointer;
          "
          onclick="document.getElementById('chatbot-modal').style.display='block'"
        >
          Support
        </button>
      </div>

      <div id="chatbot-modal" style="display: none; position: fixed; inset: 0; z-index: 1000;">
        <div style="position: absolute; padding: 20px; background: white; width: 100%; max-width: 400px; height: 70%; max-height: 600px; top: 20%; right: 12%; border-radius: 10px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);">
          <button
            style="position: absolute; top: 10px; right: 10px; background: transparent; border: none; font-size: 20px; cursor: pointer;"
            onclick="document.getElementById('chatbot-modal').style.display='none'"
          >
            &times;
          </button>
          <div id="chatbot-container" style="font-family: 'Manrope', sans-serif; height: calc(100% - 0px); display: flex; flex-direction: column;">
            <header style="background-color: #B31F13; color: white; padding: 10px; border-radius: 10px 10px 0 0;">
              <h3 style="margin: 0;">RAVEN FORCE</h3>
            </header>
            <div id="chatbot-messages" style="flex: 1; border: 1px solid #ccc; padding: 10px; border-radius: 0 0 10px 10px; overflow-y: auto; background-color: #f9f9f9;">
              <div style="margin-bottom: 10px;">
                <p style="background-color: #f1f1f1; padding: 10px; border-radius: 5px;">Hello! How can I assist you today?</p>
              </div>
            </div>
            <footer style="padding: 10px; display: flex; gap: 10px; border-top: 1px solid #ccc; background-color: white;">
              <input
                id="chatbot-input"
                type="text"
                placeholder="Type your message..."
                style="width: calc(100% - 40px); padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-right: 10px;"
              />
              <button
                onclick="sendMessage()"
                style="background-color: #B31F13; color: white; border: none; border-radius: 5px; padding: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center;"
              >
                &#x27A4;
              </button>
            </footer>
          </div>
        </div>
      </div>
    `;

    // Create a container for the chatbot
    const container = document.createElement("div");
    container.innerHTML = chatbotHtml;
    document.body.appendChild(container);

    // Add the script for handling chatbot messages
    const script = document.createElement("script");
    script.textContent = `
      const apiKey = 'undefined';
      const sessionId = '123e4567-e89b-12d3-a456-426614174000';

      async function sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value;
        if (!message) return;

        const messageContainer = document.getElementById('chatbot-messages');
        const userMessage = document.createElement('div');
        userMessage.innerHTML = \`<p style="background-color: #e1e1e1; padding: 10px; border-radius: 5px;">\${message}</p>\`;
        messageContainer.appendChild(userMessage);

        input.value = '';

        const response = await fetch('https://srv572320.hstgr.cloud:3100/courier-chat-bot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
          },
          body: JSON.stringify({ question: message, session_id: sessionId })
        });

        const data = await response.json();
        const botMessage = document.createElement('div');
        botMessage.innerHTML = \`<p style="background-color: #f1f1f1; padding: 10px; border-radius: 5px;">\${data.answer}</p>\`;
        messageContainer.appendChild(botMessage);
        messageContainer.scrollTop = messageContainer.scrollHeight;

        const resolvedMessage = document.createElement('div');
        resolvedMessage.innerHTML = \`<p style="background-color: #f1f1f1; padding: 10px; border-radius: 5px;">Was your query resolved? Type "yes" or "no".</p>\`;
        messageContainer.appendChild(resolvedMessage);
      }

      document.getElementById('chatbot-input').addEventListener('keydown', async function(event) {
        if (event.key === 'Enter') {
          const message = event.target.value.toLowerCase().trim();
          if (message === 'yes' || message === 'no') {
            const messageContainer = document.getElementById('chatbot-messages');
            const userMessage = document.createElement('div');
            userMessage.innerHTML = \`<p style="background-color: #e1e1e1; padding: 10px; border-radius: 5px;">\${message}</p>\`;
            messageContainer.appendChild(userMessage);

            if (message === 'no') {
              await fetch('http://192.168.0.120:3100/generate/ticket', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + apiKey
                },
                body: JSON.stringify({ session_id: sessionId })
              });

              const ticketMessage = document.createElement('div');
              ticketMessage.innerHTML = \`<p style="background-color: #f1f1f1; padding: 10px; border-radius: 5px;">A ticket has been generated for further assistance.</p>\`;
              messageContainer.appendChild(ticketMessage);
            } else {
              const thankYouMessage = document.createElement('div');
              thankYouMessage.innerHTML = \`<p style="background-color: #f1f1f1; padding: 10px; border-radius: 5px;">Thank you! If you have any other questions, feel free to ask.</p>\`;
              messageContainer.appendChild(thankYouMessage);
            }

            event.target.value = '';
          } else {
            sendMessage();
          }
        }
      });
    `;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.body.removeChild(container);
      document.body.removeChild(script);
    };
  }, []);

  return null; // This component does not render anything visible itself
};
