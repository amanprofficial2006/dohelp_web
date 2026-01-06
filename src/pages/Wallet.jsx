import { useState } from "react";
import {
  FaWallet,
  FaMoneyBillWave,
  FaCreditCard,
  FaHistory,
  FaArrowUp,
  FaArrowDown,
  FaPlusCircle,
  FaRupeeSign,
  FaShieldAlt,
  FaChartLine,
  FaBell,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaQrcode,
  FaShareAlt,
  FaDownload,
  FaPrint,
  FaCreditCard as FaCreditCardIcon,
  FaUniversity,
  FaPaypal,
  FaGoogleWallet,
  FaLock,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Wallet() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showBalance, setShowBalance] = useState(true);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  
  const walletData = {
    balance: 15250,
    available: 12500,
    pending: 2750,
    totalEarnings: 45600,
    thisMonth: 18500,
    lastMonth: 14200,
    securityLevel: "High"
  };

  const paymentMethods = [
    { id: 1, type: "bank", name: "HDFC Bank", last4: "5432", primary: true, icon: <FaUniversity className="text-blue-500" /> },
    { id: 2, type: "upi", name: "Google Pay", upiId: "priya@okhdfcbank", icon: <FaGoogleWallet className="text-green-500" /> },
    { id: 3, type: "card", name: "Visa Card", last4: "9876", expiry: "12/25", icon: <FaCreditCardIcon className="text-purple-500" /> },
    { id: 4, type: "paypal", name: "PayPal", email: "priya@example.com", icon: <FaPaypal className="text-blue-400" /> },
  ];

  const transactions = [
    { id: 1, type: "credit", amount: 1200, description: "Task Completion - Website Design", date: "Today, 10:30 AM", status: "completed", category: "Earnings" },
    { id: 2, type: "debit", amount: 5000, description: "Withdrawal to HDFC Bank", date: "Yesterday, 3:45 PM", status: "completed", category: "Withdrawal" },
    { id: 3, type: "credit", amount: 800, description: "Task Completion - Home Cleaning", date: "2 days ago", status: "completed", category: "Earnings" },
    { id: 4, type: "credit", amount: 450, description: "Task Completion - Grocery Delivery", date: "3 days ago", status: "pending", category: "Earnings" },
    { id: 5, type: "debit", amount: 200, description: "Service Fee", date: "5 days ago", status: "completed", category: "Fees" },
    { id: 6, type: "credit", amount: 1500, description: "Task Completion - Tutoring", date: "1 week ago", status: "completed", category: "Earnings" },
    { id: 7, type: "credit", amount: 600, description: "Referral Bonus", date: "2 weeks ago", status: "completed", category: "Bonus" },
    { id: 8, type: "credit", amount: 1200, description: "Task Completion - Event Help", date: "2 weeks ago", status: "completed", category: "Earnings" },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: <FaWallet /> },
    { id: "transactions", label: "Transactions", icon: <FaHistory /> },
    { id: "withdraw", label: "Withdraw", icon: <FaArrowUp /> },
    { id: "add-money", label: "Add Money", icon: <FaArrowDown /> },
    { id: "security", label: "Security", icon: <FaShieldAlt /> },
  ];

  const quickActions = [
    { label: "Withdraw Money", icon: <FaArrowUp />, color: "from-blue-500 to-cyan-500" },
    { label: "Add Money", icon: <FaArrowDown />, color: "from-green-500 to-emerald-500" },
    { label: "View Statements", icon: <FaDownload />, color: "from-purple-500 to-pink-500" },
    { label: "Share QR", icon: <FaQrcode />, color: "from-orange-500 to-red-500" },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed": return <FaCheckCircle className="text-green-500" />;
      case "pending": return <FaClock className="text-yellow-500" />;
      case "failed": return <FaTimesCircle className="text-red-500" />;
      default: return <FaCheckCircle className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "failed": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">My Wallet</h1>
              <p className="text-gray-600">
                Manage your earnings, withdrawals, and payment methods
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              
              
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors">
                <FaShareAlt />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Balance Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <FaWallet className="text-2xl" />
                  </div>
                  <div>
                    <div className="text-sm opacity-90">Total Balance</div>
                    <div className="flex items-center gap-3">
                      <div className="text-4xl md:text-5xl font-bold">
                        {showBalance ? `₹${walletData.balance.toLocaleString()}` : "••••••"}
                      </div>
                      <button
                        onClick={() => setShowBalance(!showBalance)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        {showBalance ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-6 mt-6">
                  <div>
                    <div className="text-sm opacity-80">Available</div>
                    <div className="text-xl font-semibold">₹{walletData.available.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-80">Pending</div>
                    <div className="text-xl font-semibold">₹{walletData.pending.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-80">Security</div>
                    <div className="flex items-center gap-2">
                      <FaShieldAlt className="text-green-300" />
                      <span className="font-semibold">{walletData.securityLevel}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold">₹{walletData.thisMonth.toLocaleString()}</div>
                  <div className="text-sm opacity-80">Earned This Month</div>
                </div>
                <div className="flex items-center gap-2 text-green-300">
                  <FaChartLine />
                  <span>+23% from last month</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
            >
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Wallet Menu</h2>
                <div className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 border border-blue-100"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${
                        activeTab === tab.id ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                      }`}>
                        {tab.icon}
                      </div>
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className={`bg-gradient-to-r ${action.color} rounded-xl p-4 text-white hover:shadow-lg transition-shadow`}
                  >
                    <div className="text-2xl mb-2">{action.icon}</div>
                    <div className="text-sm font-medium">{action.label}</div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Security Status */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <FaLock className="text-2xl text-green-500" />
                <div>
                  <h3 className="font-bold text-gray-900">Wallet Security</h3>
                  <p className="text-sm text-gray-600">Your wallet is protected</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">2FA Enabled</span>
                  <FaCheckCircle className="text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Email Verification</span>
                  <FaCheckCircle className="text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">PIN Protection</span>
                  <FaCheckCircle className="text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Withdrawal Limit</span>
                  <span className="text-sm font-medium text-gray-900">₹50,000/day</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
            >
              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "overview" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    {/* Payment Methods */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900">Payment Methods</h2>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors">
                          <FaPlusCircle />
                          Add New
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {paymentMethods.map((method) => (
                          <div
                            key={method.id}
                            className={`p-4 rounded-xl border ${
                              method.primary
                                ? "border-blue-300 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-white">
                                  {method.icon}
                                </div>
                                <div>
                                  <div className="font-semibold text-gray-900">{method.name}</div>
                                  <div className="text-sm text-gray-600">
                                    {method.type === "bank" && `•••• ${method.last4}`}
                                    {method.type === "upi" && method.upiId}
                                    {method.type === "card" && `•••• ${method.last4}`}
                                    {method.type === "paypal" && method.email}
                                  </div>
                                </div>
                              </div>
                              {method.primary && (
                                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                                  Primary
                                </span>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <button className="flex-1 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                                Edit
                              </button>
                              {!method.primary && (
                                <button className="flex-1 py-2 text-sm rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors">
                                  Set Primary
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Transactions */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900">Recent Transactions</h2>
                        <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                          <FaHistory />
                          View All
                        </button>
                      </div>
                      
                      <div className="space-y-3">
                        {transactions.slice(0, 5).map((transaction) => (
                          <div
                            key={transaction.id}
                            className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${
                                transaction.type === "credit"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-red-100 text-red-600"
                              }`}>
                                {transaction.type === "credit" ? <FaArrowDown /> : <FaArrowUp />}
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{transaction.description}</div>
                                <div className="text-sm text-gray-600">{transaction.date}</div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4">
                              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(transaction.status)}`}>
                                <span className="flex items-center gap-1">
                                  {getStatusIcon(transaction.status)}
                                  {transaction.status}
                                </span>
                              </span>
                              <div className="text-right">
                                <div className={`font-bold ${
                                  transaction.type === "credit" ? "text-green-600" : "text-red-600"
                                }`}>
                                  {transaction.type === "credit" ? "+" : "-"}₹{transaction.amount.toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-600">{transaction.category}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Earnings Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                        <div className="flex items-center gap-3 mb-4">
                          <FaMoneyBillWave className="text-2xl text-blue-500" />
                          <div>
                            <h3 className="font-bold text-gray-900">Total Earnings</h3>
                            <p className="text-sm text-gray-600">All time</p>
                          </div>
                        </div>
                        <div className="text-3xl font-bold text-gray-900">₹{walletData.totalEarnings.toLocaleString()}</div>
                      </div>

                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                        <div className="flex items-center gap-3 mb-4">
                          <FaChartLine className="text-2xl text-green-500" />
                          <div>
                            <h3 className="font-bold text-gray-900">This Month</h3>
                            <p className="text-sm text-gray-600">Earnings growth</p>
                          </div>
                        </div>
                        <div className="text-3xl font-bold text-gray-900">₹{walletData.thisMonth.toLocaleString()}</div>
                        <div className="text-sm text-green-600 mt-2">+23% from last month</div>
                      </div>

                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                        <div className="flex items-center gap-3 mb-4">
                          <FaCreditCard className="text-2xl text-purple-500" />
                          <div>
                            <h3 className="font-bold text-gray-900">Withdrawals</h3>
                            <p className="text-sm text-gray-600">This month</p>
                          </div>
                        </div>
                        <div className="text-3xl font-bold text-gray-900">₹7,500</div>
                        <div className="text-sm text-gray-600 mt-2">2 withdrawals processed</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "transactions" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-4">All Transactions</h2>
                      
                      {/* Filters */}
                      <div className="flex flex-wrap gap-3 mb-6">
                        {["All", "Earnings", "Withdrawals", "Fees", "Bonus"].map((filter) => (
                          <button
                            key={filter}
                            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                          >
                            {filter}
                          </button>
                        ))}
                        <input
                          type="month"
                          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Transactions Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Description</th>
                              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Date</th>
                              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Category</th>
                              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Amount</th>
                              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {transactions.map((transaction) => (
                              <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4">
                                  <div className="font-medium text-gray-900">{transaction.description}</div>
                                </td>
                                <td className="py-3 px-4 text-gray-600">{transaction.date}</td>
                                <td className="py-3 px-4">
                                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                                    {transaction.category}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(transaction.status)}`}>
                                    {transaction.status}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <span className={`font-medium ${
                                    transaction.type === "credit" ? "text-green-600" : "text-red-600"
                                  }`}>
                                    {transaction.type === "credit" ? "+" : "-"}₹{transaction.amount.toLocaleString()}
                                  </span>
                                </td>
                                <td className="py-3 px-4">
                                  <div className="flex gap-2">
                                    <button className="p-1 text-gray-500 hover:text-gray-700">
                                      <FaDownload />
                                    </button>
                                    <button className="p-1 text-gray-500 hover:text-gray-700">
                                      <FaPrint />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "withdraw" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="max-w-2xl mx-auto"
                  >
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Withdraw Funds</h2>
                    
                    <div className="space-y-6">
                      {/* Available Balance */}
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
                        <div className="text-center">
                          <div className="text-sm text-gray-600 mb-2">Available for Withdrawal</div>
                          <div className="text-4xl font-bold text-gray-900">₹{walletData.available.toLocaleString()}</div>
                        </div>
                      </div>

                      {/* Amount Input */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Enter Amount (₹)
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaRupeeSign className="text-gray-400" />
                          </div>
                          <input
                            type="number"
                            value={withdrawAmount}
                            onChange={(e) => setWithdrawAmount(e.target.value)}
                            placeholder="Enter amount to withdraw"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                          />
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {[500, 1000, 2000, 5000, 10000].map((amount) => (
                            <button
                              key={amount}
                              onClick={() => setWithdrawAmount(amount.toString())}
                              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                            >
                              ₹{amount.toLocaleString()}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Payment Method */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Select Payment Method
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {paymentMethods.filter(m => m.primary).map((method) => (
                            <div
                              key={method.id}
                              className="p-4 rounded-xl border-2 border-blue-300 bg-blue-50"
                            >
                              <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-white">
                                  {method.icon}
                                </div>
                                <div>
                                  <div className="font-semibold text-gray-900">{method.name}</div>
                                  <div className="text-sm text-gray-600">
                                    {method.type === "bank" && `•••• ${method.last4}`}
                                    {method.type === "upi" && method.upiId}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Withdrawal Details */}
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="font-medium text-gray-900 mb-4">Withdrawal Summary</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Amount</span>
                            <span className="font-medium">₹{withdrawAmount || "0"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Processing Fee (2%)</span>
                            <span className="font-medium">₹{(withdrawAmount * 0.02 || 0).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Tax (18% GST)</span>
                            <span className="font-medium">₹{(withdrawAmount * 0.18 || 0).toFixed(2)}</span>
                          </div>
                          <div className="border-t pt-3">
                            <div className="flex justify-between font-bold text-lg">
                              <span>Total Received</span>
                              <span className="text-green-600">
                                ₹{(withdrawAmount - (withdrawAmount * 0.2) || 0).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Withdraw Button */}
                      <button
                        disabled={!withdrawAmount || parseInt(withdrawAmount) > walletData.available}
                        className={`w-full py-4 rounded-xl font-bold text-lg ${
                          withdrawAmount && parseInt(withdrawAmount) <= walletData.available
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        } transition-all`}
                      >
                        Withdraw Now
                      </button>

                      {/* Processing Info */}
                      <div className="text-center text-sm text-gray-600">
                        <p>Withdrawals are processed within 24-48 hours</p>
                        <p className="mt-1">Daily withdrawal limit: ₹50,000</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "add-money" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="max-w-2xl mx-auto text-center py-12"
                  >
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white text-3xl mx-auto mb-6">
                      <FaArrowDown />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Add Money to Wallet</h2>
                    <p className="text-gray-600 mb-8">
                      Add funds to your wallet using UPI, Credit/Debit Card, or Net Banking
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      <button className="p-6 rounded-xl border-2 border-blue-300 bg-blue-50 hover:bg-blue-100 transition-colors">
                        <FaGoogleWallet className="text-3xl text-blue-500 mx-auto mb-3" />
                        <div className="font-medium text-gray-900">UPI</div>
                      </button>
                      <button className="p-6 rounded-xl border-2 border-purple-300 bg-purple-50 hover:bg-purple-100 transition-colors">
                        <FaCreditCardIcon className="text-3xl text-purple-500 mx-auto mb-3" />
                        <div className="font-medium text-gray-900">Card</div>
                      </button>
                      <button className="p-6 rounded-xl border-2 border-green-300 bg-green-50 hover:bg-green-100 transition-colors">
                        <FaUniversity className="text-3xl text-green-500 mx-auto mb-3" />
                        <div className="font-medium text-gray-900">Net Banking</div>
                      </button>
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      <p>Instant credit • Secure payment • No hidden charges</p>
                    </div>
                  </motion.div>
                )}

                {activeTab === "security" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="max-w-2xl mx-auto"
                  >
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Wallet Security</h2>
                    
                    <div className="space-y-6">
                      {[
                        {
                          title: "Two-Factor Authentication",
                          description: "Add an extra layer of security to your wallet",
                          status: true,
                          action: "Configure"
                        },
                        {
                          title: "Withdrawal PIN",
                          description: "Set a PIN for all withdrawals",
                          status: true,
                          action: "Change PIN"
                        },
                        {
                          title: "Email Notifications",
                          description: "Get notified for all wallet activities",
                          status: true,
                          action: "Manage"
                        },
                        {
                          title: "Device Management",
                          description: "View and manage devices with wallet access",
                          status: false,
                          action: "View Devices"
                        },
                        {
                          title: "Withdrawal Limits",
                          description: "Set daily and monthly withdrawal limits",
                          status: true,
                          action: "Adjust Limits"
                        }
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-gray-200">
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-lg ${
                              feature.status ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                            }`}>
                              <FaLock />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{feature.title}</h3>
                              <p className="text-sm text-gray-600">{feature.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              feature.status ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                            }`}>
                              {feature.status ? "Enabled" : "Disabled"}
                            </span>
                            <button className="px-4 py-2 rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors text-sm">
                              {feature.action}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Support Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200 mt-6"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Need Help with Your Wallet?</h3>
                  <p className="text-gray-600">
                    Contact our support team for any wallet-related queries or issues
                  </p>
                </div>
                <div className="flex gap-3">
                  <button className="px-6 py-3 rounded-xl border border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors">
                    Contact Support
                  </button>
                  <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all">
                    FAQ & Help
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}