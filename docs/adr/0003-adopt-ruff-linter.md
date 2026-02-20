# ADR-0003: Adopt Ruff as Python Linter

## Status
Accepted

## Context

The backend service requires automated linting and formatting checks to ensure code quality and consistency.

Traditional Python tooling typically combines multiple tools:

- Black (formatting)
- Flake8 (linting)
- isort (import sorting)
- Pylint (static analysis)

This increases configuration overhead and CI complexity.

The goal of this project is to maintain:
- Minimal tooling overhead
- Fast CI execution
- Clear and modern developer experience

## Decision

We will use Ruff as the primary linting and formatting tool for the backend.

Ruff will run in CI and enforce:
- Code formatting
- Import sorting
- Common linting rules
- Detection of unused imports and variables
- Modern Python best practices

## Rationale

Ruff was selected because:

1. It consolidates multiple Python tools into a single dependency.
2. It is significantly faster than traditional linters.
3. It reduces configuration complexity.
4. It is widely adopted in modern Python and FastAPI projects.
5. It aligns with the project's minimal-effort, high-signal philosophy.

## Consequences

Positive:
- Faster CI
- Simpler toolchain
- Cleaner repository configuration
- Reduced maintenance overhead

Negative:
- Less granular control compared to combining multiple specialized tools.
- Rapid evolution of the tool may require occasional updates.

## Alternatives Considered

- Black + Flake8 + isort
- Pylint
- No linting (rejected due to quality concerns)

## Implementation

CI will run:

    ruff check backend

Developers may optionally run Ruff locally before committing changes.
