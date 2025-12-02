# White Rabbit Profile Optimizer

A conversational AI agent that enriches member profile data for the White Rabbit Ashland community.

## Quick Start

### Prerequisites

- Docker & Docker Compose
- Python 3.11+
- Node.js 18+
- uv or pip for Python package management

### 1. Environment Setup

Copy the example environment file and add your API keys:

```bash
cp .env.example .env
```

Edit `.env` and add:
- `ANTHROPIC_API_KEY` - Your Anthropic API key
- `CLERK_PUBLISHABLE_KEY` - Your Clerk publishable key
- `CLERK_SECRET_KEY` - Your Clerk secret key

### 2. Start the Database

```bash
docker-compose up -d
```

This starts PostgreSQL with pgvector extension on port 5432.

### 3. Start the Backend

```bash
cd backend
source venv/bin/activate  # Activate virtual environment
uvicorn app.main:app --reload --port 8000
```

The API will be available at:
- API: http://localhost:8000
- Interactive Docs: http://localhost:8000/docs
- Health Check: http://localhost:8000/health

### 4. Start the Frontend

In a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will be available at http://localhost:5173

## Project Structure

```
profile-optimizer/
├── backend/           # FastAPI backend
│   ├── app/
│   │   ├── agents/   # AI agent implementations
│   │   ├── api/      # API endpoints
│   │   ├── core/     # Config, database, security
│   │   └── models.py # SQLAlchemy models
│   └── pyproject.toml
├── frontend/          # React + Vite frontend
│   ├── src/
│   │   ├── api/      # API client
│   │   ├── components/
│   │   └── pages/
│   └── package.json
├── docs/              # Planning & implementation docs
├── user-stories/      # Product requirements
├── docker-compose.yml # Postgres + pgvector
└── CLAUDE.md          # Project context for Claude Code
```

## Tech Stack

### Backend
- **Framework**: FastAPI
- **Database**: PostgreSQL with pgvector
- **ORM**: SQLAlchemy + Alembic
- **LLM**: Anthropic Claude (via SDK)
- **Auth**: Clerk

### Frontend
- **Framework**: React + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Data Fetching**: TanStack Query
- **Auth**: Clerk React SDK

## Development

### Backend Development

```bash
cd backend
source venv/bin/activate

# Run tests
pytest

# Create new migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head
```

### Frontend Development

```bash
cd frontend

# Install dependencies
npm install

# Run linter
npm run lint

# Build for production
npm run build
```

## Database

The database schema includes:
- `members` - User profiles
- `social_links` - External profile URLs
- `skills` - Member skills and expertise
- `interests` - Member interests
- `conversation_history` - Chat history with AI agent
- `profile_completeness` - Profile health scores

## Ethical Principles

This project follows strict ethical guidelines:

1. **Opt-in at member's pace** - No forced data collection
2. **AI suggests, human approves** - No auto-publishing
3. **Transparent visibility** - Clear data access policies
4. **Respect boundaries** - Honor communication preferences
5. **High-trust environment** - Responsible use of community data
6. **Personality-aware** - Adapt to different working styles
7. **Transparent motivation** - Clear purpose for data collection

See [CLAUDE.md](./CLAUDE.md) for full project context and philosophy.

## License

This project is open source and contributed back to the White Rabbit community.
