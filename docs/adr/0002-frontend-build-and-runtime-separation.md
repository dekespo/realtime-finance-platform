# ADR-0002: Separate Frontend Build and Runtime Using Node + Nginx

## Status
Accepted

## Context

The frontend application is a React-based Single Page Application (SPA).

React applications require:

- Node.js and npm for dependency management
- Build tooling (webpack / Vite / React Scripts)
- Compilation and bundling into optimized static assets

However, once built, the application consists only of static files:

- index.html
- JavaScript bundles
- CSS
- Static assets

We must determine how to structure the frontend container image.

Options considered:

1. Use Node runtime to build and serve the app
2. Build with Node and serve with Nginx
3. Use a simple Node static file server (e.g., `serve`)
4. Deploy static files directly to object storage (future cloud model)

---

## Decision

We use a multi-stage Docker build:

- Stage 1: Node (build stage)
- Stage 2: Nginx (runtime stage)

---

## Rationale

### 1. Separation of Concerns

Node is required only for:

- Dependency installation
- Transpilation
- Bundling

It is NOT required to serve static files in production.

Nginx is optimized for:

- Serving static assets
- Handling HTTP efficiently
- Supporting caching and compression

This separation follows clean runtime principles.

---

### 2. Reduced Runtime Attack Surface

By excluding Node from the final image:

- Fewer system packages
- Smaller runtime image
- Reduced vulnerability surface
- No npm runtime exposure

This aligns with container security best practices.

---

### 3. Smaller Production Image

Multi-stage builds ensure:

- Build tools are not included in runtime
- Final image is minimal
- Faster container startup and deployment

---

### 4. Production Alignment

In real-world deployments:

- Frontend builds are often stored in object storage (e.g., S3)
- Served via CDN
- Or served by a lightweight HTTP server

Using Nginx locally mirrors production deployment patterns.

---

## Trade-offs

- Slightly more complex Dockerfile
- Requires separate dev workflow for hot reload

However, this complexity reflects real production practices.

---

## Alternatives Considered

### Node Static Server (`serve`)

Pros:
- Simpler setup

Cons:
- Larger runtime image
- Node runtime exposed in production
- Less efficient for static serving

Rejected due to runtime optimization goals.

---

## Consequences

Positive:
- Cleaner architecture
- Better separation of build and runtime
- Security improvement
- Strong production alignment

Negative:
- Requires dedicated dev workflow for frontend hot reload

---

## Summary

We intentionally separate build and runtime responsibilities:

- Node builds the frontend.
- Nginx serves static artifacts.

This reflects production-grade architecture and container optimization best practices.
