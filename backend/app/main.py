from fastapi import FastAPI, WebSocket
import asyncio
import random
import logging

logging.basicConfig(level=logging.INFO)

app = FastAPI()

@app.get("/")
def root():
    return {"status": "ok"}

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.websocket("/ws/prices")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        price = random.uniform(0, 200)
        await websocket.send_json({"price": round(price, 2)})
        await asyncio.sleep(1)