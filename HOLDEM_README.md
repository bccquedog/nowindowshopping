# Hold'emLux - Elegant Luxury Texas Hold'em

A premium Texas Hold'em web application featuring an elegant onyx + champagne visual system, adaptive AI opponents, multiplayer support, and comprehensive tutorials.

## Features

### 🎰 Core Gameplay
- **Texas Hold'em Rules**: No-limit hold'em with standard betting rounds
- **Complete Game Engine**: Hand evaluation, pot management, side pots, all-in scenarios
- **Multi-Player Support**: Solo vs AI, Local multiplayer, Online tables (planned)
- **Professional Table**: 6-max ring games with position tracking

### 🧠 AI Engine
- **Adaptive AI**: Three difficulty levels with realistic playing styles
- **Position-Aware**: Preflop ranges based on position (BTN, CO, MP, etc.)
- **Postflop Strategy**: Board texture analysis and bet sizing
- **Bluff Detection**: AI considers pot odds and opponent tendencies
- **Difficulty Levels**:
  - **Easy**: Conservative play, basic strategy, 1s think time
  - **Standard**: Balanced aggression, position awareness, 2s think time
  - **Tough**: Advanced tactics, bluffing, 3s think time

### 🎨 Luxury Design
- **Onyx + Champagne Theme**: Dark backgrounds with gold accents
- **Elegant Cards**: High-contrast design with clear suit symbols
- **Professional Chips**: Matte finish with denomination display
- **Smooth Animations**: Card deals, chip movements, action transitions
- **Position Badges**: Clear BTN/SB/BB indicators with color coding

### 🎓 Coaching & Tutorials
- **Real-time Hints**: Strategic advice based on position and hand strength
- **Interactive Tutorials**: Step-by-step game introduction
- **Hand Analysis**: Equity calculations and optimal play suggestions
- **Position Education**: Teaching the importance of position in poker

### ⚙️ Game Configuration
- **Flexible Rules**: Customizable blinds, buy-ins, and table settings
- **Multiple Formats**: Cash games, tournaments (planned)
- **Time Banks**: Player time management with customizable limits
- **Hand History**: Complete game records with action tracking

## How to Play

### Getting Started
1. Navigate to `/holdem` in the application
2. Choose game mode: Solo vs AI or Multiplayer
3. Select AI difficulty if playing against computer
4. Set your buy-in amount (within table limits)
5. Take your seat and start playing

### Basic Rules
- **Objective**: Make the best 5-card hand using your 2 hole cards + 5 community cards
- **Betting Rounds**: Preflop → Flop → Turn → River
- **Actions**: Fold, Check, Call, Bet, Raise
- **Positions**: Button (BTN), Small Blind (SB), Big Blind (BB) rotate each hand
- **Blinds**: Forced bets that create initial pot

### Hand Rankings (Best to Worst)
1. **Royal Flush**: A-K-Q-J-10 of same suit
2. **Straight Flush**: 5 consecutive cards of same suit
3. **Four of a Kind**: 4 cards of same rank
4. **Full House**: 3 of a kind + pair
5. **Flush**: 5 cards of same suit
6. **Straight**: 5 consecutive cards
7. **Three of a Kind**: 3 cards of same rank
8. **Two Pair**: 2 different pairs
9. **Pair**: 2 cards of same rank
10. **High Card**: Highest card wins

### Game Controls
- **Action Buttons**: Fold, Call, Raise with clear bet amounts
- **Bet Slider**: Adjustable bet sizing with pot percentage presets
- **Position Indicators**: Clear BTN/SB/BB badges
- **Stack Display**: Real-time chip counts and bet amounts
- **Hand History**: Scrollable action log

## Technical Implementation

### Architecture
- **React TypeScript**: Modern, type-safe architecture
- **Framer Motion**: Smooth animations and transitions
- **Tailwind CSS**: Custom luxury theme colors
- **State Management**: React hooks for complex game state
- **WebSocket Ready**: Prepared for real-time multiplayer

### Game Engine
- **Hand Evaluation**: Complete 7-card hand ranking system
- **Pot Management**: Side pots, all-in scenarios, split pots
- **Betting Logic**: Min-raise rules, action validation
- **Position Tracking**: Automatic button and blind rotation

### AI Implementation
- **Decision Trees**: Position-based preflop ranges
- **Equity Calculation**: Hand strength vs opponent ranges
- **Bet Sizing**: Pot-relative and stack-relative sizing
- **Bluff Frequency**: Difficulty-based bluffing patterns

### UI Components
- **PlayerSeats**: Individual player displays with action states
- **CommunityCards**: Central board with street progression
- **ActionControls**: Betting interface with slider and presets
- **HandHistory**: Scrollable action log with timestamps

## Configuration Files

### `holdem-rules.json`
Complete game configuration including:
- Table limits and seat configuration
- Blind structure and betting rules
- Time bank settings and action limits
- UI preferences and coaching options
- Rake and tournament settings

### `holdem-tutorial.json`
Interactive tutorial system with:
- Step-by-step game introduction
- Position and betting explanations
- Hand strength demonstrations
- Strategic concept teaching

## AI Difficulty Levels

### Easy (Conservative)
- **Preflop**: Tight range, mostly premium hands
- **Postflop**: Value betting, minimal bluffing
- **Think Time**: 1 second per decision
- **Best For**: Beginners learning the game

### Standard (Balanced)
- **Preflop**: Position-aware ranges, standard aggression
- **Postflop**: Mixed strategy, moderate bluffing
- **Think Time**: 2 seconds per decision
- **Best For**: Intermediate players

### Tough (Aggressive)
- **Preflop**: Wide ranges, frequent 3-betting
- **Postflop**: Complex strategies, frequent bluffing
- **Think Time**: 3 seconds per decision
- **Best For**: Advanced players and serious competition

## Strategy Tips

### Basic Principles
- **Position Matters**: Play more hands in late position
- **Pot Odds**: Call when getting good odds to draw
- **Stack Sizes**: Adjust strategy based on effective stack depth
- **Board Texture**: Consider how the board connects with your range

### Advanced Concepts
- **Range vs Range**: Think about your opponent's likely holdings
- **Bet Sizing**: Use different sizes for value vs bluff
- **Pot Control**: Check back with medium-strength hands
- **Bluff Catchers**: Call with hands that beat bluffs but lose to value

## Future Enhancements

### Planned Features
- **Online Multiplayer**: Real-time games against other players
- **Tournament Mode**: Sit & Go and multi-table tournaments
- **Hand Replayer**: Review hands with analysis tools
- **Statistics Tracking**: Win rates, hand histories, performance metrics
- **Advanced AI**: Machine learning-based opponent modeling

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
Navigate to `http://localhost:3000/holdem`

### Building for Production
```bash
npm run build
```

### Testing
The game includes comprehensive unit tests for:
- Hand evaluation and ranking
- Betting logic and pot management
- AI decision making
- Game state management

## License

This Hold'em implementation is part of the No Window Shopping platform and follows the same licensing terms as the main application.

---

**Hold'emLux** - Where strategy meets elegance in the world's most sophisticated card game.





