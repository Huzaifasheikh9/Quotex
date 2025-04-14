import React, { useState } from 'react';
import { auth } from '../firebase';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const [asset, setAsset] = useState('EURUSD_otc');
  const [tradeAmount, setTradeAmount] = useState(10);
  const [tradeDuration, setTradeDuration] = useState(1);
  const [botRunning, setBotRunning] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    auth.signOut();
    router.push('/');
  };

  const startBot = () => setBotRunning(true);
  const stopBot = () => setBotRunning(false);
  const resetBot = () => {
    setAsset('EURUSD_otc');
    setTradeAmount(10);
    setTradeDuration(1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-semibold text-center mb-6">Bot Control Dashboard</h2>
        <div>
          <label className="block text-sm font-medium text-gray-600">Asset</label>
          <select
            value={asset}
            onChange={(e) => setAsset(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-md"
          >
            <option value="EURUSD_otc">EURUSD_otc</option>
            <option value="BTCUSD_otc">BTCUSD_otc</option>
            <option value="AUDCAD">AUDCAD</option>
          </select>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-600">Initial Trade Amount ($)</label>
          <input
            type="number"
            value={tradeAmount}
            onChange={(e) => setTradeAmount(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-600">Trade Duration (sec)</label>
          <input
            type="number"
            value={tradeDuration}
            onChange={(e) => setTradeDuration(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mt-4 flex gap-4">
          <button onClick={startBot} className="py-2 px-4 bg-green-600 text-white rounded-md">
            Start Bot
          </button>
          <button onClick={stopBot} className="py-2 px-4 bg-red-600 text-white rounded-md">
            Stop Bot
          </button>
          <button onClick={resetBot} className="py-2 px-4 bg-yellow-600 text-white rounded-md">
            Reset Bot
          </button>
        </div>
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="py-2 px-4 bg-gray-700 text-white rounded-md"
          >
            Logout
          </button>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Bot Status</h3>
          <p>Last Signal: BUY STRONG</p>
          <p>Current Price: 1.0884</p>
          <p>Last Trade: ${tradeAmount} | Result: WIN</p>
          <p>Hedge Triggered: No</p>
          <p>Score: 5/7</p>
          <p>Bot Running: {botRunning ? '✅' : '❌'}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
