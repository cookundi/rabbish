import { useEffect, useState } from 'react';

export const Checker = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/.netlify/functions/get-users') // You'll need to create this function
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-4xl font-black mb-8 underline decoration-double">The Registry</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-black font-sketch">
            <th className="text-left p-2">X Username</th>
            <th className="text-left p-2">Wallet</th>
            <th className="text-right p-2">Points</th>
          </tr>
        </thead>
        <tbody className="font-sketch">
          {users.map((u: any) => (
            <tr key={u.wallet} className="border-b border-slate-300 hover:bg-white/40">
              <td className="p-2">{u.x_username}</td>
              <td className="p-2 text-xs truncate max-w-[150px]">{u.wallet}</td>
              <td className="p-2 text-right font-bold">{u.referral_points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};