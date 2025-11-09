# CheckersLux - Elegant Luxury Checkers

A premium American checkers (draughts) web application featuring an elegant onyx + champagne visual system, strong AI with multiple difficulty levels, and comprehensive tutorials.

## Features

### 🎯 Core Gameplay
- **American Checkers Rules**: 8×8 board, mandatory captures, multi-jumps, king promotion
- **Complete Game Engine**: Move generation, legality checking, end-game detection
- **Multi-Player Support**: Solo vs AI, Local 2-player games
- **Professional Board**: Dark slate & walnut alternating squares with luxury styling

### 🧠 AI Engine
- **Alpha-Beta Search**: Advanced minimax algorithm with pruning
- **Multiple Difficulty Levels**:
  - **Novice**: Depth 4, 30% randomness, 100ms time limit
  - **Standard**: Depth 8, 10% randomness, 250ms time limit  
  - **Master**: Depth 12, 5% randomness, 1000ms time limit
- **Position Evaluation**: Material counting, king value (3x), strategic positioning
- **Move Ordering**: Captures prioritized, history heuristics

### 🎨 Luxury Design
- **Onyx + Champagne Theme**: Dark backgrounds with gold accents
- **Elegant Pieces**: Matte onyx vs pearl with metallic rings
- **King Crowns**: Gold crown inlays for promoted pieces
- **Smooth Animations**: Piece movements, captures, promotions
- **Professional Layout**: Clear information hierarchy and visual feedback

### 🎓 Coaching & Tutorials
- **Real-time Hints**: Highlight best moves and forced captures
- **Interactive Tutorials**: Step-by-step game introduction
- **Move Validation**: Automatic legality checking and feedback
- **Forced Capture Detection**: Clear indication when captures are mandatory

### ⚙️ Game Configuration
- **Standard Rules**: Mandatory captures, multi-jumps, king promotion
- **Customizable Settings**: AI difficulty, hint display, game mode
- **Move History**: Complete game record with algebraic notation
- **Game State Tracking**: Current player, move count, forced captures

## How to Play

### Getting Started
1. Navigate to `/checkers` in the application
2. Choose game mode: Solo vs AI or 2 Players
3. Select AI difficulty if playing against computer
4. Dark pieces move first (convention)

### Basic Rules
- **Movement**: Pieces move diagonally forward on dark squares only
- **Captures**: Jump over opponent pieces to capture them (mandatory)
- **Multi-Jumps**: Continue jumping if additional captures are available
- **Promotion**: Reach the back rank to become a king
- **Kings**: Move and capture diagonally in both directions
- **Game End**: Win by capturing all opponent pieces or blocking all moves

### Game Controls
- **Select Piece**: Click on your piece to see legal moves
- **Make Move**: Click on highlighted square to move
- **Hints**: Use the lightbulb button for move suggestions
- **New Game**: Reset the board and start fresh
- **Settings**: Adjust AI difficulty and display options

## Technical Implementation

### Architecture
- **React TypeScript**: Modern component-based architecture
- **Framer Motion**: Smooth animations and transitions
- **Tailwind CSS**: Utility-first styling with custom luxury theme
- **State Management**: React hooks for game state management

### Game Engine
- **Move Generation**: Complete legal move calculation
- **Capture Detection**: Multi-jump sequence finding
- **Position Evaluation**: Strategic assessment for AI
- **End-Game Detection**: Win/loss condition checking

### AI Implementation
- **Alpha-Beta Pruning**: Efficient search algorithm
- **Iterative Deepening**: Progressive depth search
- **Move Ordering**: Optimized search with capture prioritization
- **Difficulty Scaling**: Adjustable depth and randomness

### UI Components
- **BoardView**: 8×8 grid with piece rendering
- **CheckerPiece**: Individual piece with selection states
- **GameControls**: Action buttons and game management
- **MoveHistory**: Scrollable move list with notation

## Configuration Files

### `checkers-rules.json`
Complete game configuration including:
- Board dimensions and playable squares
- Movement rules for men and kings
- Capture and promotion settings
- Draw conditions and UI preferences
- Coaching and tutorial options

### `checkers-tutorial.json`
Interactive tutorial system with:
- Step-by-step game introduction
- Highlighted board elements
- Scripted positions for learning
- Forced moves for demonstration

## AI Difficulty Levels

### Novice (Depth 4)
- **Search Depth**: 4 moves ahead
- **Randomness**: 30% chance of suboptimal moves
- **Time Limit**: 100ms per move
- **Best For**: Beginners learning the game

### Standard (Depth 8)
- **Search Depth**: 8 moves ahead
- **Randomness**: 10% chance of suboptimal moves
- **Time Limit**: 250ms per move
- **Best For**: Intermediate players

### Master (Depth 12)
- **Search Depth**: 12 moves ahead
- **Randomness**: 5% chance of suboptimal moves
- **Time Limit**: 1000ms per move
- **Best For**: Advanced players and serious competition

## Strategy Tips

### Basic Principles
- **Control the Center**: Central squares provide more mobility
- **King the Pieces**: Promote to kings for increased power
- **Force Captures**: Create situations where opponent must capture
- **Block Opponent**: Prevent opponent from promoting pieces

### Advanced Tactics
- **Double Corners**: Secure corner positions for safety
- **Back Rank Defense**: Keep pieces on back rank to prevent promotion
- **Tempo Moves**: Force opponent into disadvantageous positions
- **Sacrifice Tactics**: Give up pieces to gain positional advantage

## Future Enhancements

### Planned Features
- **Online Multiplayer**: Real-time games against other players
- **Analysis Mode**: Review games with best-move indicators
- **Opening Book**: Pre-calculated opening moves
- **Endgame Database**: Perfect play for common endgame positions
- **Statistics Tracking**: Win/loss records and performance metrics

### Technical Improvements
- **WebSocket Integration**: Real-time multiplayer functionality
- **Server-Side Validation**: Secure game state management
- **Mobile Optimization**: Touch-friendly controls
- **Accessibility**: Screen reader support, keyboard navigation

## Development

### Running the Game
```bash
cd no-window-shopping
npm start
```
Navigate to `http://localhost:3000/checkers`

### Building for Production
```bash
npm run build
```

### Testing
The game includes comprehensive unit tests for:
- Move generation and validation
- AI search algorithms
- Game state management
- UI component rendering

## License

This Checkers implementation is part of the No Window Shopping platform and follows the same licensing terms as the main application.

---

**CheckersLux** - Where strategy meets elegance in the world's most sophisticated board game.





