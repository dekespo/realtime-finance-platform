# Architecture Overview

This project demonstrates a real-time financial data streaming platform.

Components:
- FastAPI backend streaming market prices via WebSockets
- React frontend dashboard for live visualization
- Docker Compose for orchestration

Data Flow:
Market Feed (simulated) -> Backend WebSocket -> Frontend Live Chart

Key Design Goals:
- Real-time streaming
- Loose coupling
- Cloud-native deployment
- Observability ready