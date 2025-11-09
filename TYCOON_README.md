# Tycoon - Luxury Property Trading Game

A premium Monopoly-style property trading game featuring an elegant onyx + champagne visual system, custom house rules, AI opponents, and comprehensive tutorials.

## Features

### 🏠 Core Gameplay
- **Classic Monopoly Rules**: Property trading, rent collection, chance/chest cards
- **Custom House Rules**: Enhanced gameplay with strategic depth
- **Complete Game Engine**: Dice rolling, movement, property management, auctions
- **Multi-Player Support**: Solo vs AI, Local multiplayer, Online tables (planned)
- **Professional Board**: 40-space board with luxury styling

### 🧠 AI Engine
- **Adaptive AI**: Three difficulty levels with realistic playing styles
- **Strategic Decision Making**: Property evaluation, auction bidding, trading
- **House Rule Compliance**: AI respects all custom rules and restrictions
- **Difficulty Levels**:
  - **Easy**: Conservative play, basic strategy, 1s think time
  - **Standard**: Balanced aggression, position awareness, 2s think time
  - **Tough**: Advanced tactics, aggressive bidding, 3s think time

### 🎨 Luxury Design
- **Onyx + Champagne Theme**: Dark backgrounds with gold accents
- **Elegant Board**: Color-coded properties with clear visual hierarchy
- **Professional Cards**: High-contrast design with clear suit symbols
- **Smooth Animations**: Dice rolls, piece movements, property transactions
- **Position Indicators**: Clear player tokens and property ownership

### 🎓 Coaching & Tutorials
- **Real-time Hints**: Strategic advice based on position and property value
- **Interactive Tutorials**: Step-by-step game introduction
- **House Rule Education**: Teaching the custom rules and their strategic impact
- **Property Analysis**: Value assessment and investment recommendations

### ⚙️ Custom House Rules
- **First Pass GO Requirement**: Players cannot buy property until passing GO once without going to Jail
- **Jail Disqualification**: If jailed before first GO pass, buying remains locked for the first lap
- **Even Building**: Houses/hotels must be built evenly across properties in a color set
- **Monopoly Requirement**: Full color set ownership required for building

## How to Play

### Getting Started
1. Navigate to `/tycoon` in the application
2. Choose game mode: Solo vs AI or Multiplayer
3. Select AI difficulty if playing against computer
4. Start with $1500 and begin your property empire

### Basic Rules
- **Objective**: Acquire properties, build houses/hotels, collect rent, bankrupt opponents
- **Movement**: Roll two dice and move clockwise around the board
- **Property Purchase**: Buy unowned properties when you land on them (if eligible)
- **Rent Collection**: Charge rent when opponents land on your properties
- **Building**: Add houses/hotels to increase rent (requires full color set ownership)

### Custom House Rules
- **Buying Restriction**: You cannot buy properties until you pass GO once without going to Jail
- **Jail Penalty**: If you go to Jail before your first GO pass, buying remains locked until you complete a full lap
- **Even Building**: When building houses/hotels, you must distribute them evenly across properties in a color set
- **Monopoly Requirement**: You must own all properties in a color set before building

### Game Controls
- **Roll Dice**: Click the dice button to roll and move
- **Buy Property**: Purchase properties when eligible and landing on unowned spaces
- **End Turn**: Complete your actions and pass to the next player
- **Build Houses**: Add houses/hotels to your monopoly sets
- **Trade Properties**: Negotiate trades with other players

## Technical Implementation

### Architecture
- **React TypeScript**: Modern, type-safe architecture
- **Framer Motion**: Smooth animations and transitions
- **Tailwind CSS**: Custom luxury theme colors
- **State Management**: React hooks for complex game state
- **WebSocket Ready**: Prepared for real-time multiplayer

### Game Engine
- **Board Management**: 40-space board with property tracking
- **Player Movement**: Dice rolling and position calculation
- **Property System**: Ownership, rent calculation, building management
- **House Rules**: Custom rule enforcement and validation

### AI Implementation
- **Decision Trees**: Property evaluation and purchase decisions
- **Auction Strategy**: Bidding logic based on property value and cash reserves
- **Trading Logic**: Property valuation and trade negotiations
- **House Rule Compliance**: AI respects all custom rules and restrictions

### UI Components
- **GameBoard**: Interactive 40-space board with property tiles
- **PlayerTokens**: Visual representation of player positions
- **PropertyCards**: Detailed property information and ownership
- **ActionControls**: Dice rolling, buying, and turn management

## Configuration Files

### `tycoon-rules.json`
Complete game configuration including:
- Board layout and property definitions
- House rules and restrictions
- Building costs and rent structures
- Auction and trading settings
- Victory conditions and game parameters

### `tycoon-tutorial.json`
Interactive tutorial system with:
- Step-by-step game introduction
- House rule explanations
- Strategic concept teaching
- Property value demonstrations

## AI Difficulty Levels

### Easy (Conservative)
- **Property Buying**: Conservative approach, focuses on low-cost properties
- **Auction Bidding**: Minimal participation, avoids bidding wars
- **Building Strategy**: Builds houses slowly, prioritizes cash reserves
- **Think Time**: 1 second per decision
- **Best For**: Beginners learning the game

### Standard (Balanced)
- **Property Buying**: Balanced approach, evaluates property value vs cost
- **Auction Bidding**: Strategic bidding, considers property potential
- **Building Strategy**: Moderate building pace, balances investment and cash
- **Think Time**: 2 seconds per decision
- **Best For**: Intermediate players

### Tough (Aggressive)
- **Property Buying**: Aggressive approach, prioritizes high-value properties
- **Auction Bidding**: Competitive bidding, willing to pay premium prices
- **Building Strategy**: Rapid building, maximizes rent potential
- **Think Time**: 3 seconds per decision
- **Best For**: Advanced players and serious competition

## Strategy Tips

### Basic Principles
- **Pass GO First**: Focus on passing GO without going to Jail to unlock buying
- **Property Value**: Consider both purchase price and potential rent income
- **Color Sets**: Complete color sets to enable house/hotel building
- **Cash Management**: Maintain sufficient cash for rent payments and opportunities

### Advanced Concepts
- **Even Building**: Distribute houses evenly to maximize rent potential
- **Auction Strategy**: Bid strategically on properties that complete your color sets
- **Trading**: Negotiate trades to complete monopolies and block opponents
- **Mortgage Management**: Use mortgages strategically to maintain liquidity

## House Rules Impact

### Strategic Depth
- **Early Game**: Focus on passing GO and avoiding Jail
- **Mid Game**: Build property portfolios and complete color sets
- **Late Game**: Maximize rent income and force opponents into bankruptcy

### Risk Management
- **Jail Avoidance**: Early Jail can severely delay your property acquisition
- **Cash Reserves**: Maintain sufficient cash for rent payments and opportunities
- **Property Diversification**: Don't over-invest in expensive properties early

## Future Enhancements

### Planned Features
- **Online Multiplayer**: Real-time games against other players
- **Tournament Mode**: Competitive tournaments with rankings
- **Advanced AI**: Machine learning-based opponent modeling
- **Statistics Tracking**: Win rates, property performance, game analytics
- **Custom Rules**: Additional house rule options and configurations

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
Navigate to `http://localhost:3000/tycoon`

### Building for Production
```bash
npm run build
```

### Testing
The game includes comprehensive unit tests for:
- House rule enforcement and validation
- Property management and rent calculation
- AI decision making and strategy
- Game state management and progression

## License

This Tycoon implementation is part of the No Window Shopping platform and follows the same licensing terms as the main application.

---

**Tycoon** - Where strategy meets elegance in the world's most sophisticated property trading game.





