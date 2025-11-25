# Implementation Plan - White Rabbit Profile Optimizer

## Goal Description
Build a "Profile Optimizer" agentic system for White Rabbit Ashland members. The system will analyze member profiles, scrape provided social links, and conduct conversational interviews to suggest profile improvements.

**Key Constraints**:
- **Privacy**: Agents are read-only or have limited access.
- **User Control**: AI suggests, human approves (Copy-to-Clipboard workflow).
- **Tech Stack**: FastAPI, React, Clerk, Postgres (pgvector), Anthropic Claude.

## User Review Required
> [!IMPORTANT]
> **Clerk Integration**: We will need your Clerk API keys (Publishable Key & Secret Key) to configure authentication.
> **Anthropic API Key**: Ensure the `ANTHROPIC_API_KEY` is available in the environment.

## Proposed Changes

### Phase 1: Foundation & Backend Setup

#### [NEW] Backend Structure
- Set up FastAPI project with `uv` or `poetry`.
- Configure Docker Compose for local Postgres (with `pgvector` image).
- Implement Database Schema (SQLAlchemy + Alembic).
    - `members`, `social_links`, `skills`, `interests`, `conversation_history`, `profile_completeness`.
- Configure Clerk Authentication middleware.

#### [NEW] Core Agents Implementation
- **Profile Evaluation Agent**: Logic to score profile completeness.
- **URL Processing Agent**: Async task (BackgroundTasks) to scrape and summarize URLs.
- **Interactive Agent**: Chat interface logic, context management.

### Phase 2: Frontend Development

#### [NEW] React Application
- Initialize Vite + React + TypeScript project.
- Setup Clerk Provider.
- Generate API client from FastAPI OpenAPI spec.
- **UI Components**:
    - Chat Interface (Tailwind).
    - Profile "Health" Dashboard.
    - "Copy to Clipboard" suggestion cards.

### Phase 3: Integration & Verification

- Connect Frontend Chat to Interactive Agent.
- Verify "Copy to Clipboard" flow.
- Test URL scraping background tasks.

## Verification Plan

### Automated Tests
- **Backend**: `pytest` for agent logic (mocking LLM calls).
- **Database**: Verify schema migrations and `pgvector` extension.

### Manual Verification
- **Auth**: Login/Logout with Clerk.
- **Agent Flow**:
    1. Log in.
    2. Provide a LinkedIn URL -> Verify scraping happens in background.
    3. Chat with agent -> Verify it knows about the LinkedIn content.
    4. Receive suggestion -> Copy to clipboard.
