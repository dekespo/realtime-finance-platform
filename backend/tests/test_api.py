import pytest
import httpx
from app.main import app

@pytest.mark.asyncio
async def test_root():
    transport = httpx.ASGITransport(app=app)

    async with httpx.AsyncClient(
        transport=transport,
        base_url="http://test"
    ) as client:
        response = await client.get("/")

    assert response.status_code == 200
