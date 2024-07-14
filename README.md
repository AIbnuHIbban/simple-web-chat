# Chat App

A real-time chat application built with Node.js, Express, Socket.IO, MongoDB, and TailwindCSS. This app allows users to create or join chat rooms, send messages, share files, and display images.

## Features

- Create and join chat rooms
- Real-time messaging
- Share public link to join chat room
- Send images and files
- Display images directly in the chat
- User-specific chat bubble colors
- System messages for user join/leave notifications

## Technologies Used

- Node.js
- Express
- Socket.IO
- MongoDB
- TailwindCSS

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AIbnuHIbban/simple-web-chat.git
   cd simple-web-chat
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Make sure MongoDB is installed and running on your machine.
4. Start the server
    ```bash
    node src/index.js
    ```
5. Open your browser and navigate to `http://localhost:3000`

## Usage
- Creating a Room: Enter your name and click "Create Room" to generate a new room. Share the generated link with others to join the room.
- Joining a Room: Enter your name and the room ID to join an existing room.
- Sending Messages: Type your message and click "Send" to send a message.
- Sharing Files: Click the "Send File" button to upload and share files. Images will be displayed directly in the chat.
