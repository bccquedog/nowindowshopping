# NWS Spades - Joker-Joker-Deuce Variant

A premium Spades implementation featuring the NWS house rules with Jokers, custom trump order, special scoring, and elegant luxury theme.

## Features

### 🃏 Core Gameplay
- **Joker-Joker-Deuce Variant**: Two jokers + 2♠ as trump, 2♦ and 2♥ removed
- **Custom Trump Order**: Big Joker > Little Joker > 2♠ > A♠ > K♠ > Q♠ > J♠ > 10♠ > ... > 3♠
- **Spades Broken Rule**: Cannot lead spades until broken, unless hand contains only trump
- **Follow Suit Enforcement**: Must follow suit if possible, with spades restrictions
- **Complete Game Engine**: Bidding, trick-taking, scoring, and game management

### 🧠 AI Engine
- **Adaptive AI**: Three difficulty levels with realistic playing styles
- **Strategic Bidding**: Evaluates hand strength and partner bids
- **Smart Play**: Follows suit rules, manages trump, and tracks spades broken
- **Difficulty Levels**:
  - **Easy**: Conservative play, basic strategy, 1s think time
  - **Standard**: Balanced aggression, position awareness, 2s think time
  - **Tough**: Advanced tactics, aggressive bidding, 3s think time

### 🎨 Luxury Design
- **Onyx + Champagne Theme**: Dark backgrounds with gold accents
- **Elegant Cards**: High-contrast design with clear suit symbols
- **Professional Layout**: Player positions, trick display, score tracking
- **Smooth Animations**: Card plays, trick resolution, UI transitions

### 🎓 Coaching & Tutorials
- **Real-time Hints**: Strategic advice based on hand and game state
- **Interactive Tutorials**: Step-by-step game introduction
- **House Rule Education**: Teaching the custom rules and their strategic impact
- **Bidding Guidance**: Help with bid evaluation and partner communication

### ⚙️ Custom House Rules
- **Spades Broken Restriction**: Cannot lead spades until broken (unless only trump)
- **Follow Suit with Spades**: Cannot play spades unless void or already broken
- **10+ Bid Bonus**: Teams bidding 10+ get 250 points bonus on success
- **Blind Bid Option**: Teams down by 100+ can declare blind for 2× score
- **No Bags Scoring**: Extra tricks don't count for points

## How to Play

### Getting Started
1. Navigate to `/spades` in the application
2. Choose game mode: Solo vs AI or Multiplayer
3. Select AI difficulty if playing against computer
4. Start bidding and playing tricks

### Basic Rules
- **Objective**: Win tricks to meet your team's bid and score points
- **Trump**: Spades (including Jokers and 2♠) always win
- **Follow Suit**: Must play the same suit as led if possible
- **Spades Broken**: Cannot lead spades until someone has played a spade
- **Bidding**: Each player bids 0-13 tricks their team will win

### Custom House Rules

#### Spades Broken Restriction
- **Leading**: Cannot lead a spade until spades are broken
- **Exception**: If your hand contains only trump (spades/jokers), you may lead spades
- **Breaking Spades**: Playing a spade when void in led suit breaks spades for the game

#### Follow Suit with Spades
- **Normal Play**: Must follow suit if possible
- **Void in Led Suit**: May play any card, including spades (breaks spades)
- **Not Void**: Cannot play spades unless spades already broken

#### Special Scoring
- **10+ Bid Bonus**: Teams bidding 10+ tricks get 250 points bonus on success
- **Blind Bid**: Teams trailing by 100+ points can declare blind bid
  - Success: 2× normal score
  - Failure: Normal penalty
- **No Bags**: Extra tricks beyond bid don't count for points

#### Reneging Penalty
- **Definition**: Playing off-suit while holding the led suit
- **Penalty**: Current trick forfeited to opponents + 30-point team penalty

## Technical Implementation

### Architecture
- **React TypeScript**: Modern, type-safe architecture
- **Framer Motion**: Smooth animations and transitions
- **Tailwind CSS**: Custom luxury theme colors
- **State Management**: React hooks for complex game state
- **WebSocket Ready**: Prepared for real-time multiplayer

### Game Engine
- **Deck Management**: 52 cards + 2 jokers, minus 2♦ and 2♥
- **Trump System**: Custom trump order with jokers and 2♠
- **Rule Enforcement**: Spades broken restrictions and follow suit validation
- **Scoring System**: Complex scoring with bonuses and penalties

### AI Implementation
- **Hand Evaluation**: Trump count, side aces/kings, voids, long suits
- **Bidding Strategy**: Risk assessment and partner bid consideration
- **Play Logic**: Follow suit enforcement and trump management
- **House Rule Compliance**: AI respects all custom rules and restrictions

### UI Components
- **GameBoard**: Interactive 4-player table layout
- **CardDisplay**: Visual card representation with suit symbols
- **TrickView**: Current trick display with player positions
- **ScorePanel**: Team scores and game progress tracking

## Configuration Files

### `spades-rules.json`
Complete game configuration including:
- Deck composition and trump order
- Spades broken restrictions and follow suit rules
- Bidding rules and special scoring options
- Reneging detection and penalties
- Game targets and victory conditions

### `spades-tutorial.json`
Interactive tutorial system with:
- Step-by-step game introduction
- House rule explanations
- Strategic concept teaching
- Interactive practice scenarios

## AI Difficulty Levels

### Easy (Conservative)
- **Bidding**: Conservative approach, focuses on sure tricks
- **Play**: Basic follow suit, minimal trump usage
- **Strategy**: Avoids risky plays, prioritizes safety
- **Think Time**: 1 second per decision
- **Best For**: Beginners learning the game

### Standard (Balanced)
- **Bidding**: Balanced approach, evaluates hand potential
- **Play**: Strategic trump usage, considers partner's position
- **Strategy**: Moderate aggression, balanced risk-taking
- **Think Time**: 2 seconds per decision
- **Best For**: Intermediate players

### Tough (Aggressive)
- **Bidding**: Aggressive approach, maximizes bid potential
- **Play**: Advanced trump management, partner coordination
- **Strategy**: High aggression, complex tactical plays
- **Think Time**: 3 seconds per decision
- **Best For**: Advanced players and serious competition

## Strategy Tips

### Basic Principles
- **Count Trump**: Track remaining trump to plan your plays
- **Follow Suit**: Always follow suit when possible
- **Break Spades**: Use spades strategically to break them when advantageous
- **Partner Communication**: Consider your partner's bid and position

### Advanced Concepts
- **Trump Management**: Save high trump for key moments
- **Void Creation**: Try to create voids in weak suits
- **Blind Bid Timing**: Declare blind only when confident
- **10+ Bid Strategy**: Coordinate with partner for high bids

## House Rules Impact

### Strategic Depth
- **Early Game**: Focus on breaking spades at the right time
- **Mid Game**: Manage trump and coordinate with partner
- **Late Game**: Maximize trick-taking to meet bids

### Risk Management
- **Spades Timing**: Don't break spades too early unless necessary
- **Bid Evaluation**: Consider partner's bid and hand strength
- **Blind Bid Risk**: Only declare blind when confident in success

## Future Enhancements

### Planned Features
- **Online Multiplayer**: Real-time games against other players
- **Tournament Mode**: Competitive tournaments with rankings
- **Advanced AI**: Machine learning-based opponent modeling
- **Statistics Tracking**: Win rates, bid accuracy, game analytics
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
Navigate to `http://localhost:3000/spades`

### Building for Production
```bash
npm run build
```

### Testing
The game includes comprehensive unit tests for:
- House rule enforcement and validation
- Trump order and trick resolution
- Bidding logic and scoring calculations
- AI decision making and strategy

## License

This NWS Spades implementation is part of the No Window Shopping platform and follows the same licensing terms as the main application.

---

**NWS Spades** - Where strategy meets elegance in the world's most sophisticated trick-taking game.





