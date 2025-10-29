# Tic Tac Toe Game

A beautiful and interactive tic-tac-toe game built with React and Vite.

## Features

- ✨ Modern and responsive UI with gradient background
- 🎯 Interactive gameplay with hover effects
- 🏆 Winner detection and highlighting
- 📝 Game history - jump to any previous move
- 🎨 Smooth animations and transitions
- ♿ Draw detection
- 🔄 Reset/New Game functionality

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

### Running the Game

Start the development server:
```bash
npm run dev
```

The game will be available at `http://localhost:5173`

### Building for Production

To create a production build:
```bash
npm run build
```

The built files will be in the `dist` directory.

### Testing

The project includes a comprehensive test suite using Vitest and React Testing Library.

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

Run tests with UI (interactive):
```bash
npm run test:ui
```

The test suite covers:
- ✅ Game logic (winner calculation for all scenarios)
- ✅ Component rendering and interactions
- ✅ Player turns and alternation
- ✅ Winner detection (rows, columns, diagonals)
- ✅ Draw detection
- ✅ Game history and time travel
- ✅ Reset functionality
- ✅ Preventing invalid moves

## How to Play

1. The game starts with player X
2. Click on any square to place your mark
3. Players alternate turns
4. The first player to get 3 marks in a row wins
5. Use the "New Game" button to start a fresh game
6. Use the move history to go back to any previous state

## Project Structure

```
.
├── src/
│   ├── App.jsx              # Main game component
│   ├── App.test.jsx          # Component tests
│   ├── App.css               # Game styles
│   ├── main.jsx              # React entry point
│   ├── index.css             # Global styles
│   ├── utils/
│   │   ├── gameLogic.js      # Game logic (winner calculation)
│   │   └── gameLogic.test.js # Game logic tests
│   └── test/
│       └── setup.js          # Test setup configuration
├── index.html                # HTML template
├── package.json              # Dependencies
├── vite.config.js            # Vite configuration
└── README.md                 # This file
```

## Technologies Used

- React 18
- Vite
- Vitest (testing framework)
- React Testing Library
- CSS3 with animations

Enjoy playing! 🎮



