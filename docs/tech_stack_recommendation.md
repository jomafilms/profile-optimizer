# Tech Stack & Best Practices Recommendation

**Status**: Approved by User

## Finalized Stack

- **Backend**: Python 3.11+ with **FastAPI**.
    - *Orchestration*: **FastAPI BackgroundTasks** (Simple, built-in async task handling).
- **Frontend**: **TypeScript** + **React** (Vite).
    - *API Client*: Generated from OpenAPI spec.
- **Database**: **PostgreSQL** (Neon).
    - *Extensions*: **pgvector** enabled for future semantic search/matching.
- **Auth**: **Clerk**.
    - *Why*: Managed authentication, secure, easy integration with React/FastAPI.
- **AI**: **Anthropic Claude SDK**.
- **Infrastructure**: Docker Compose (local).

## Architectural Decisions

### 1. Type Safety & Contracts
- **OpenAPI to TypeScript**: Strictly generate frontend API clients from the FastAPI OpenAPI spec.
- **Pydantic Everywhere**: Use Pydantic models for all internal data structures.

### 2. Agent Orchestration (The "3-Agent" Model)
- **Profile Evaluation Agent**: Read-only access to DB, writes to `profile_completeness`.
- **URL Processing Agent**: Async scraping using `BackgroundTasks`. Stores artifacts on filesystem.
- **Interactive Agent**: No direct DB access. Uses `conversation_history` and filesystem artifacts.

### 3. Testing Strategy
- **Mocking LLMs**: Robust mocking layer for Anthropic client.
- **E2E Testing**: Playwright for critical flows.

### 4. Project Structure (Monorepo)
```
/backend
  /app
    /agents (The 3 agents)
    /api
    /core (Config, DB, Auth)
/frontend
  /src
```
