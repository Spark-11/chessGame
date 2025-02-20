# Chess Game

A real-time multiplayer chess game built with Node.js, Express, Socket.IO, and Chess.js.

## Features

- Real-time multiplayer chess gameplay
- Support for two players (white and black)
- Spectator mode for additional users
- Move validation using chess.js
- Interactive web-based interface

## Prerequisites

Before running this project, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v12 or higher)
- npm (Node Package Manager, comes with Node.js)

## Installation

1. Clone this repository or download the source code:
```bash
git clone <repository-url>
cd chess.com
```

2. Install the required dependencies:
```bash
npm install
```

This will install the following packages:
- express: ^4.21.2
- socket.io: ^4.8.1
- chess.js: ^1.0.0
- ejs: ^3.1.10

## Running the Application

1. Start the server:
```bash
node app.js
```

2. Open your web browser and navigate to:
```
http://localhost:3000
```

## How to Play

1. The first user to connect will be assigned as the white player
2. The second user to connect will be assigned as the black player
3. Any additional users will be able to watch the game as spectators
4. Players take turns making moves according to standard chess rules
5. Invalid moves will be rejected by the server

## Technical Details

- The game server runs on port 3000
- Uses Socket.IO for real-time communication
- Chess rules and move validation are handled by chess.js
- Frontend views are rendered using EJS templating
- Static files are served from the 'public' directory
 