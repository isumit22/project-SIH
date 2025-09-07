import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { LogOut, Star, Award, Gift, ClipboardCopy, Check } from "lucide-react";

interface Reward {
  id: number;
  title: string;
  description: string;
  cost: number;
  image: string;
  code: string; // 🎟 coupon code
}

const RewardsPage: React.FC = () => {
  const { user, logoutUser, updateGreenCoins } = useUser();
  const [redeemed, setRedeemed] = useState<{ [key: number]: string }>({});
  const [copied, setCopied] = useState<number | null>(null);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-xl">You are not logged in.</p>
        <a
          href="/login"
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Go to Login
        </a>
      </div>
    );
  }

  // 🎁 Available Rewards
  const rewards: Reward[] = [
    {
      id: 1,
      title: "₹50 Electricity Bill Cashback",
      description: "Get ₹50 off on your next electricity bill payment.",
      cost: 100,
      image: "https://img.icons8.com/color/96/electricity.png",
      code: "ELECTRO50",
    },
    {
      id: 2,
      title: "Metro Travel Voucher",
      description: "₹100 worth of free metro rides.",
      cost: 150,
      image: "https://img.icons8.com/color/96/train.png",
      code: "METRO100",
    },
    {
      id: 3,
      title: "IRCTC Discount Coupon",
      description: "Flat ₹200 off on IRCTC ticket bookings.",
      cost: 200,
      image: "https://img.icons8.com/color/96/railway-station.png",
      code: "IRCTC200",
    },
    {
      id: 4,
      title: "Eco-Friendly Bag",
      description: "Get a free reusable eco-bag delivered to you.",
      cost: 80,
      image: "https://img.icons8.com/color/96/shopping-bag.png",
      code: "ECOBAG80",
    },{
      id: 5,
      title: "Nykaa ₹100 Gift Card",
      description: "Flat ₹100 voucher for shopping on Nykaa.",
      cost: 500,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDAe3rC-7gcrjaF67j-bdWIt8uLhAp5rCxSQ&s",
      code: "NYKAA500",
    },
    {
      id: 6,
      title: "Adidas 25% Off Coupon",
      description: "25% discount on Adidas store or online.",
      cost: 750,
      image: "https://logos-world.net/wp-content/uploads/2020/04/Adidas-Logo-1991-present.jpg",
      code: "ADIDAS25",
    },
  ];

  const handleRedeem = (reward: Reward) => {
    if (user.greenCoins < reward.cost) {
      alert(`You need ${reward.cost - user.greenCoins} more coins to unlock this reward.`);
      return;
    }

    // Deduct coins & store coupon code
    updateGreenCoins(-reward.cost);
    setRedeemed({ ...redeemed, [reward.id]: reward.code });

    alert(`🎉 You unlocked: ${reward.title}`);
  };

  const handleCopy = (code: string, id: number) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      

      {/* Rewards Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
          <Star className="text-yellow-500 w-8 h-8 mb-2" />
          <h2 className="font-semibold">Your Coins</h2>
          <p className="text-3xl font-bold text-green-600 mt-1">
            {user.greenCoins}
          </p>
          <p className="text-gray-500 text-sm">+25 this week</p>
        </div>

        <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
          <Award className="text-purple-500 w-8 h-8 mb-2" />
          <h2 className="font-semibold">Level</h2>
          <p className="text-3xl font-bold text-purple-600 mt-1">{user.level}</p>
          <p className="text-gray-500 text-sm">Keep contributing!</p>
        </div>

        <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
          <Gift className="text-pink-500 w-8 h-8 mb-2" />
          <h2 className="font-semibold">Rewards</h2>
          <p className="text-gray-700 text-sm mt-1">
            Redeem vouchers using your Green Coins
          </p>
        </div>
      </div>

      {/* Rewards Marketplace */}
      <div className="bg-white rounded-xl shadow p-6 mt-6">
        <h2 className="font-semibold text-lg mb-4">Available Rewards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className={`p-4 border rounded-xl shadow-sm flex flex-col md:flex-row space-x-4 items-center 
                ${user.greenCoins < reward.cost && !redeemed[reward.id] ? "opacity-70" : ""}`}
            >
              <img src={reward.image} alt={reward.title} className="w-16 h-16" />
              <div className="flex-1">
                <h3 className="font-bold">{reward.title}</h3>
                <p className="text-sm text-gray-500">{reward.description}</p>
                <p className="mt-1 text-green-600 font-semibold">
                  {reward.cost} Coins
                </p>

                {/* 🎟 Show coupon code if redeemed */}
                {redeemed[reward.id] && (
                  <div className="mt-2 flex items-center space-x-2">
                    <span className="px-3 py-1 bg-gray-100 rounded-lg font-mono text-sm">
                      {redeemed[reward.id]}
                    </span>
                    <button
                      onClick={() => handleCopy(redeemed[reward.id], reward.id)}
                      className="p-1 text-gray-600 hover:text-green-600"
                    >
                      {copied === reward.id ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <ClipboardCopy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                )}
              </div>

              {!redeemed[reward.id] && (
                <button
                  onClick={() => handleRedeem(reward)}
                  disabled={user.greenCoins < reward.cost}
                  className={`mt-3 md:mt-0 px-4 py-2 rounded-lg text-white font-semibold 
                    ${user.greenCoins >= reward.cost
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-300 cursor-not-allowed"}`}
                >
                  Redeem
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={logoutUser}
          className="flex items-center space-x-2 px-6 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default RewardsPage;
