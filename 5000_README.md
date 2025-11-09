# 5000 NWS - NWS House Rules Rummy Variant

A premium rummy implementation featuring the NWS house rules with custom joker values, wild rank determination, and elegant luxury theme.

## Features

### 🃏 Core Gameplay
- **NWS House Rules**: First card dealt determines wild rank and extra cards
- **Custom Joker Values**: Big Joker = 20 points, Little Joker = 15 points
- **Dynamic Wild Rank**: Wild rank determined by first player's card
- **Extra Cards**: Number of extra cards based on wild rank value
- **Deep Discard Pickup**: Pick up from deep in discard pile with restrictions
- **Complete Game Engine**: Meld creation, layoffs, scoring, and game management

### 🧠 AI Engine
- **Adaptive AI**: Three difficulty levels with realistic playing styles
- **Strategic Evaluation**: Deadwood minimization, meld potential, discard safety
- **Monte Carlo Simulations**: Advanced decision making for draw vs. discard
- **Opponent Inference**: AI learns from discard history and opponent patterns
- **Difficulty Levels**:
  - **Easy**: Conservative play, basic strategy, 1s think time
  - **Standard**: Balanced approach, moderate risk-taking, 2s think time
  - **Tough**: Aggressive play, advanced tactics, 3s think time

### 🎨 Luxury Design
- **Onyx + Champagne Theme**: Dark backgrounds with gold accents
- **Elegant Cards**: High-contrast design with clear suit symbols
- **Professional Layout**: Player hands, meld areas, discard pile
- **Smooth Animations**: Card movements, meld creation, UI transitions

### 🎓 Coaching & Tutorials
- **Real-time Hints**: Strategic advice based on hand and game state
- **Interactive Tutorials**: Step-by-step game introduction
- **House Rule Education**: Teaching the custom rules and their strategic impact
- **Meld Suggestions**: Help with optimal meld creation and layoffs

### ⚙️ Custom House Rules
- **Wild Rank Determination**: First card dealt to each player determines wild rank
- **Extra Cards**: Number of extra cards based on wild rank value (2-10 = face value, J/Q/K = 10, A = 11, LJ = 15, BJ = 20)
- **Joker Values**: Big Joker = 20 points, Little Joker = 15 points
- **Deep Discard Pickup**: Must take all cards above selected card and immediately use in meld
- **Optional Discard**: Players can go out without discarding

## How to Play

### Getting Started
1. Navigate to `/5000` in the application
2. Choose game mode: Solo vs AI or Multiplayer
3. Select AI difficulty if playing against computer
4. Begin with initial deal and wild rank determination

### Basic Rules
- **Objective**: Create melds and go out to score points, first to 5000 wins
- **Wild Cards**: Jokers and cards matching the wild rank are always wild
- **Melds**: 3+ same rank (sets) or 3+ sequential same suit (runs)
- **Layoffs**: Add cards to any existing melds
- **Going Out**: Play all cards from hand (discard optional)

### Custom House Rules

#### Wild Rank Determination
- **First Card**: The first card dealt to each player determines the wild rank
- **Extra Cards**: Each player receives extra cards based on wild rank value
- **Wild Cards**: All cards of the wild rank and both jokers are wild

#### Extra Card Values
- **2-10**: Face value (2 = 2 extra cards, 10 = 10 extra cards)
- **J/Q/K**: 10 extra cards each
- **Ace**: 11 extra cards
- **Little Joker**: 15 extra cards
- **Big Joker**: 20 extra cards

#### Deep Discard Pickup
- **Restriction**: Can only pick up deep if you take all cards above your target
- **Immediate Use**: Must immediately use the selected card in a meld
- **Strategic Depth**: Creates interesting tactical decisions

#### Scoring System
- **Numbers (2-10)**: Face value points
- **Faces (J/Q/K)**: 10 points each
- **Ace**: 15 points
- **Wild Rank Cards**: 15 points each
- **Little Joker**: 15 points
- **Big Joker**: 20 points
- **Game Target**: 5000 points

## Technical Implementation

### Architecture
- **React TypeScript**: Modern, type-safe architecture
- **Framer Motion**: Smooth animations and transitions
- **Tailwind CSS**: Custom luxury theme colors
- **State Management**: React hooks for complex game state
- **WebSocket Ready**: Prepared for real-time multiplayer

### Game Engine
- **Deck Management**: 52 cards + 2 jokers with wild rank determination
- **Meld System**: Set and run validation with layoff support
- **Scoring Engine**: Complex scoring with custom card values
- **AI Logic**: Advanced decision making with Monte Carlo simulations

### AI Implementation
- **Hand Evaluation**: Deadwood calculation, meld potential assessment
- **Strategic Planning**: Long-term planning and opponent modeling
- **Risk Assessment**: Discard safety and pickup evaluation
- **House Rule Compliance**: AI respects all custom rules and restrictions

### UI Components
- **GameBoard**: Interactive table layout with player positions
- **CardDisplay**: Visual card representation with wild indicators
- **MeldArea**: Organized meld display with layoff support
- **DiscardPile**: Visual discard pile with deep pickup interface

## Configuration Files

### `5000-rules.json`
Complete game configuration including:
- Deck composition and joker values
- Wild rank determination and extra card rules
- Scoring system and card values
- Meld rules and layoff permissions
- Deep discard pickup restrictions

### `5000-tutorial.json`
Interactive tutorial system with:
- Step-by-step game introduction
- House rule explanations
- Strategic concept teaching
- Interactive practice scenarios

## AI Difficulty Levels

### Easy (Conservative)
- **Meld Creation**: Conservative approach, focuses on sure melds
- **Discard Strategy**: Safe discards, avoids risky pickups
- **Risk Tolerance**: Low risk tolerance, prioritizes safety
- **Think Time**: 1 second per decision
- **Best For**: Beginners learning the game

### Standard (Balanced)
- **Meld Creation**: Balanced approach, evaluates meld potential
- **Discard Strategy**: Strategic discards, considers opponent hands
- **Risk Tolerance**: Moderate risk tolerance, balanced decisions
- **Think Time**: 2 seconds per decision
- **Best For**: Intermediate players

### Tough (Aggressive)
- **Meld Creation**: Aggressive approach, maximizes meld potential
- **Discard Strategy**: Advanced discard strategy, opponent modeling
- **Risk Tolerance**: High risk tolerance, complex tactical plays
- **Think Time**: 3 seconds per decision
- **Best For**: Advanced players and serious competition

## Strategy Tips

### Basic Principles
- **Count Wild Cards**: Track remaining wild cards to plan your melds
- **Create Melds Early**: Get cards out of your hand to reduce deadwood
- **Watch Discards**: Pay attention to what opponents are discarding
- **Plan Layoffs**: Think about how cards can be used in multiple melds

### Advanced Concepts
- **Wild Card Management**: Save high-value wild cards for key moments
- **Deep Pickup Timing**: Use deep pickups strategically when you have meld potential
- **Opponent Modeling**: Track what cards opponents are likely holding
- **Endgame Planning**: Plan your final melds to go out efficiently

## House Rules Impact

### Strategic Depth
- **Early Game**: Focus on creating initial melds and reducing deadwood
- **Mid Game**: Build on existing melds and plan layoffs
- **Late Game**: Optimize for going out and maximizing points

### Risk Management
- **Wild Rank Risk**: High-value wild ranks create more cards but higher scoring potential
- **Deep Pickup Risk**: Weigh the cost of taking multiple cards against meld potential
- **Discard Safety**: Consider what information you're giving opponents

## Future Enhancements

### Planned Features
- **Online Multiplayer**: Real-time games against other players
- **Tournament Mode**: Competitive tournaments with rankings
- **Advanced AI**: Machine learning-based opponent modeling
- **Statistics Tracking**: Win rates, meld efficiency, game analytics
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
Navigate to `http://localhost:3000/5000`

### Building for Production
```bash
npm run build
```

### Testing
The game includes comprehensive unit tests for:
- Wild rank determination and extra card dealing
- Meld validation and scoring calculations
- AI decision making and strategy
- Game state management and progression

## License

This 5000 NWS implementation is part of the No Window Shopping platform and follows the same licensing terms as the main application.

---

**5000 NWS** - Where strategy meets elegance in the world's most sophisticated rummy variant.





