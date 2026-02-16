import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(`ws://${window.location.host}/ws/prices`);
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setData((d) => [...d.slice(-20), { price: msg.price, time: new Date().toLocaleTimeString() }]);
    };
    return () => ws.close();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>Real-Time Finance Dashboard</h2>
      <LineChart width={800} height={400} data={data}>
        <XAxis dataKey="time" />
        <YAxis />
        <CartesianGrid stroke="#eee" />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}

export default App;