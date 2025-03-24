const WebSocket = require('ws');

function setupWebSocket(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('A client connected');

    ws.on('message', (message) => {
      console.log(`Received: ${message}`);

      // Broadcast the message as a JSON string
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          try {
            const parsedMessage = JSON.parse(message); // Ensure it's valid JSON
            client.send(JSON.stringify(parsedMessage)); // Always send JSON string
          } catch (error) {
            console.error("Invalid JSON received:", message);
          }
        }
      });
    });

    ws.on('close', () => {
      console.log('A client disconnected');
    });

    ws.on('error', (err) => {
      console.error('WebSocket error:', err);
    });
  });

  console.log('WebSocket server is running');
}

module.exports = { setupWebSocket };
