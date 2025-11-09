# BlackjackLux - Elegant Luxury Blackjack (21)

A premium Blackjack web application featuring an elegant onyx + champagne visual system, basic strategy coaching, and professional game mechanics.

## Features

### 🎰 Core Gameplay
- **Standard Blackjack Rules**: 6-deck shoe, dealer stands on soft 17 (S17)
- **Multi-Seat Support**: Up to 5 player positions (currently single-player implementation)
- **Professional Betting**: Chip denominations from $5 to $1000
- **Complete Game Flow**: Betting → Dealing → Player Actions → Dealer Play → Settlement

### 🎯 Player Actions
- **Hit**: Take another card
- **Stand**: Keep current hand
- **Double Down**: Double bet and take one card (available on first two cards)
- **Split**: Split pairs into separate hands (available on matching ranks)
- **Surrender**: Forfeit half bet (Late Surrender - after dealer peek)

### 🧠 Basic Strategy Coach
- **Real-time Advice**: Shows optimal play based on player hand vs dealer upcard
- **Toggle Feature**: Enable/disable coaching hints
- **Strategy Matrix**: Complete basic strategy for S17/DAS/LS rules
- **Soft Hand Detection**: Automatically identifies soft totals (Ace + other cards)

### 🎨 Luxury Design
- **Onyx + Champagne Theme**: Dark backgrounds with gold accents
- **Elegant Typography**: Ivory text on dark felt
- **Smooth Animations**: Card deals, chip interactions, and UI transitions
- **Professional Layout**: Casino-style table with clear information hierarchy

### ⚙️ Game Configuration
- **6-Deck Shoe**: Standard casino configuration
- **75% Penetration**: Reshuffle at 75% of cards dealt
- **Burn Cards**: 1 card burned per shuffle
- **Betting Limits**: $5 minimum, $1000 maximum

### 📊 Game Information
- **Bankroll Tracking**: Real-time balance updates
- **Round Counter**: Track game progress
- **Shoe Status**: Visual indicator of remaining cards
- **Result History**: Detailed outcome of each hand
- **Hand Totals**: Automatic calculation with soft hand detection

## How to Play

### Getting Started
1. Navigate to `/blackjack` in the application
2. Start with $1000 bankroll
3. Place your bet using the chip rack
4. Click "Deal Cards" to begin

### Game Flow
1. **Betting Phase**: Select chips to place your bet
2. **Dealing**: Two cards dealt to player, two to dealer (one hidden)
3. **Player Turn**: Choose your action based on your hand vs dealer upcard
4. **Dealer Play**: Dealer reveals hole card and plays according to rules
5. **Settlement**: Compare hands and award winnings
6. **Next Round**: Return to betting phase

### Basic Strategy Tips
- **Always hit** hard totals of 8 or less
- **Always stand** on hard totals of 17 or more
- **Double down** on 11 vs dealer 2-10
- **Split 8s and Aces** against any dealer upcard
- **Surrender** 16 vs dealer 9, 10, or Ace (if available)

## Technical Implementation

### Architecture
- **React TypeScript**: Modern component-based architecture
- **Framer Motion**: Smooth animations and transitions
- **Tailwind CSS**: Utility-first styling with custom luxury theme
- **State Management**: React hooks for game state management

### Game Engine
- **Card Management**: Complete deck creation, shuffling, and dealing
- **Hand Evaluation**: Automatic total calculation with soft hand detection
- **Rule Enforcement**: All standard Blackjack rules implemented
- **Payout System**: Accurate win/loss/push calculations

### UI Components
- **CardComponent**: Displays individual cards with suit symbols
- **ChipComponent**: Interactive betting chips with denominations
- **GameTable**: Main playing surface with dealer and player areas
- **ActionButtons**: Game controls with conditional availability

## Configuration Files

### `blackjack-rules.json`
Complete game configuration including:
- Table limits and seat configuration
- Shoe settings (decks, penetration, burn cards)
- Dealer rules (S17/H17, blackjack payouts)
- Player options (doubling, splitting, surrender)
- UI preferences and coaching settings

### `blackjack-tutorial.json`
Interactive tutorial system with:
- Step-by-step game introduction
- Highlighted UI elements
- Scripted deals for learning scenarios
- Basic strategy demonstrations

## Future Enhancements

### Planned Features
- **Multi-Player Support**: Real-time multiplayer tables
- **Advanced Actions**: Insurance, even money, resplit aces
- **Side Bets**: Perfect pairs, 21+3, insurance
- **Statistics Tracking**: Win/loss records, session history
- **Customizable Rules**: H17, different payouts, surrender options

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
Navigate to `http://localhost:3000/blackjack`

### Building for Production
```bash
npm run build
```

### Testing
The game includes comprehensive unit tests for:
- Card deck operations
- Hand evaluation logic
- Basic strategy calculations
- Game state management

## License

This Blackjack implementation is part of the No Window Shopping platform and follows the same licensing terms as the main application.

---

**BlackjackLux** - Where elegance meets strategy in the world's most sophisticated card game.





