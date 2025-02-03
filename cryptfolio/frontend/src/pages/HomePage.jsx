import { useState, useEffect } from "react"
import { FaChartLine, FaRobot, FaExchangeAlt, FaShieldAlt, FaCheck } from "react-icons/fa"
import cryptoDashboard from "../assets/Bitcoin-logo.png"
import bitcoinLogo from "../assets/Bitcoin-logo.png"
import ethereumLogo from "../assets/ethereum-logo.svg"
import binanceLogo from "../assets/binance-logo.svg"
import coinbaseLogo from "../assets/coinbase-logo.svg"
import krakenLogo from "../assets/kraken-logo.svg"
import portfolioAnalysis from "../assets/kraken-logo.svg"
import aiTrading from "../assets/kraken-logo.svg"
import metamaskLogo from "../assets/metamask-logo.png"
import ledgerLogo from "../assets/ledger-logo.png"
import trezorLogo from "../assets/trezor-logo.png"

const PricingToggle = ({ isYearly, setIsYearly }) => {
  return (
    <div className="flex items-center justify-center space-x-4 mb-8">
      <span className={`text-sm ${!isYearly ? "text-white" : "text-gray-400"}`}>Pay Monthly</span>
      <button
        onClick={() => setIsYearly(!isYearly)}
        className="relative w-16 h-8 rounded-full bg-gray-700 p-0.5 flex items-center justify-between"
      >
        <div
          className={`absolute w-7 h-7 bg-purple-600 rounded-full transition-transform duration-300 ${
            isYearly ? "translate-x-8" : "translate-x-0"
          }`}
        />
      </button>
      <span className={`text-sm ${isYearly ? "text-white" : "text-gray-400"}`}>Pay Yearly</span>
    </div>
  )
}

const PricingCard = ({ plan, monthlyPrice, yearlyPrice, features, isYearly, isPro }) => {
  const currentPrice = isYearly ? yearlyPrice : monthlyPrice

  return (
    <div
      className={`bg-gray-800/50 p-8 rounded-xl transform transition-all duration-300 hover:scale-105 ${
        isPro ? "border-2 border-purple-600" : ""
      }`}
    >
      <h3 className="text-2xl font-bold text-white mb-4">{plan}</h3>
      <div className="relative h-20">
        {isPro ? (
          <>
            <p
              className={`absolute text-4xl font-bold text-white mb-6 transition-all duration-500 ${
                isYearly ? "opacity-0 transform translate-y-2" : "opacity-100 transform translate-y-0"
              }`}
            >
              ${monthlyPrice}
            </p>
            <p
              className={`absolute text-4xl font-bold text-white mb-6 transition-all duration-500 ${
                isYearly ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-2"
              }`}
            >
              ${yearlyPrice}
            </p>
          </>
        ) : (
          <p className="absolute text-4xl font-bold text-white mb-6">${currentPrice}</p>
        )}
      </div>
      <button
        className={`w-full bg-purple-600 text-white px-6 py-3 rounded-full mb-8 hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 ${
          isPro ? "bg-gradient-to-r from-purple-600 to-purple-700" : ""
        }`}
      >
        {isPro ? "Start 30-day free trial" : "Get started"}
      </button>
      <ul className="space-y-4">
        {features.map((feature, index) => (
          <li key={index} className={`flex items-center ${feature.included ? "text-gray-300" : "text-gray-500"}`}>
            <FaCheck className={`mr-2 ${feature.included ? "text-purple-500" : "text-gray-600"}`} />
            {feature.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

const HomePage = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isYearly, setIsYearly] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = window.pageYOffset
      setScrollProgress((currentScroll / totalScroll) * 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative bg-[#0D1117]">
      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-purple-600 transition-all duration-300 z-50"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* Hero Section */}
      <section className="bg-[#0D1117] text-white py-20 px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center max-w-7xl">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12 lg:pr-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">AI-Powered Crypto Portfolio Management</h1>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <FaCheck className="text-purple-500 mr-2" /> Advanced AI algorithms for optimal trading
              </li>
              <li className="flex items-center">
                <FaCheck className="text-purple-500 mr-2" /> Real-time market insights and predictions
              </li>
              <li className="flex items-center">
                <FaCheck className="text-purple-500 mr-2" /> Secure multi-chain portfolio tracking
              </li>
            </ul>
            <div className="space-x-4">
              <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition duration-300">
                Get started for Free
              </button>
              <button className="bg-transparent border border-white text-white px-6 py-2 rounded-full hover:bg-white hover:text-purple-600 transition duration-300">
                Watch Demo
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src={cryptoDashboard || "/placeholder.svg"}
              alt="Crypto Dashboard"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="bg-[#0D1117] text-white py-12 px-6 border-t border-gray-800">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">TRUSTED BY MILLIONS OF CRYPTO TRADERS WORLDWIDE</h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <img src={bitcoinLogo || "/placeholder.svg"} alt="Bitcoin" className="h-8" />
            <img src={ethereumLogo || "/placeholder.svg"} alt="Ethereum" className="h-8" />
            <img src={binanceLogo || "/placeholder.svg"} alt="Binance" className="h-8" />
            <img src={coinbaseLogo || "/placeholder.svg"} alt="Coinbase" className="h-8" />
            <img src={krakenLogo || "/placeholder.svg"} alt="Kraken" className="h-8" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[#0D1117] text-white py-20 px-6 border-t border-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FaChartLine,
                title: "Advanced Analytics",
                description: "In-depth market analysis and portfolio performance tracking.",
              },
              {
                icon: FaRobot,
                title: "AI-Powered Insights",
                description: "Machine learning algorithms for predictive market analysis.",
              },
              {
                icon: FaExchangeAlt,
                title: "Multi-Chain Swaps",
                description: "Seamless asset exchanges across multiple blockchain networks.",
              },
              {
                icon: FaShieldAlt,
                title: "Enhanced Security",
                description: "State-of-the-art encryption and multi-factor authentication.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800/50 p-6 rounded-lg transform transition-all duration-300 hover:scale-105 hover:bg-gray-700/50"
              >
                <feature.icon className="text-4xl text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Analysis Section */}
      <section className="bg-[#0D1117] py-20 px-6 border-t border-gray-800">
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <img
              src={portfolioAnalysis || "/placeholder.svg"}
              alt="Portfolio Analysis"
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          <div className="md:w-1/2 md:pl-12">
            <h2 className="text-3xl font-bold text-white mb-6">Comprehensive Portfolio Analysis</h2>
            <p className="text-gray-400 mb-6">
              Get a clear view of your crypto investments with our advanced portfolio analysis tools.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="space-y-4">
                <li className="flex items-center text-white">
                  <FaCheck className="text-purple-500 mr-2" /> Real-time asset tracking
                </li>
                <li className="flex items-center text-white">
                  <FaCheck className="text-purple-500 mr-2" /> Performance metrics
                </li>
                <li className="flex items-center text-white">
                  <FaCheck className="text-purple-500 mr-2" /> Risk assessment
                </li>
              </ul>

              <ul className="space-y-4">
                <li className="flex items-center text-white">
                  <FaCheck className="text-purple-500 mr-2" /> Historical data analysis
                </li>
                <li className="flex items-center text-white">
                  <FaCheck className="text-purple-500 mr-2" /> Customizable dashboards
                </li>
                <li className="flex items-center text-white">
                  <FaCheck className="text-purple-500 mr-2" /> Multi-exchange support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* AI Trading Section */}
      <section className="bg-[#0D1117] py-20 px-6 border-t border-gray-800">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
            <div className="text-purple-500 font-semibold mb-4">AI-POWERED TRADING</div>
            <h2 className="text-4xl font-bold text-white mb-4">Harness the Power of AI for Smarter Trading</h2>
            <p className="text-gray-400 mb-12">
              Our advanced AI algorithms analyze market trends and provide intelligent trading suggestions to maximize
              your profits.
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <FaRobot className="text-purple-500 text-2xl mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Predictive Analysis</h3>
                  <p className="text-gray-400">
                    Our AI models predict market movements with high accuracy, giving you a competitive edge.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FaChartLine className="text-purple-500 text-2xl mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Automated Trading</h3>
                  <p className="text-gray-400">
                    Set up automated trading strategies based on AI insights for 24/7 portfolio optimization.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FaShieldAlt className="text-purple-500 text-2xl mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Risk Management
                    <span className="ml-2 text-xs bg-green-600 text-white px-2 py-1 rounded-full">AI-powered</span>
                  </h3>
                  <p className="text-gray-400">
                    Our AI continuously monitors your portfolio and suggests risk mitigation strategies.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-1/2">
            <img
              src={aiTrading || "/placeholder.svg"}
              alt="AI Trading Interface"
              className="w-full rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Wallet Integration Section */}
      <section className="bg-[#0D1117] py-20 px-6 border-t border-gray-800">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Seamless Wallet Integration</h2>
          <p className="text-gray-400 mb-12">
            Connect your favorite wallets and manage your assets securely across multiple chains.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { name: "MetaMask", logo: metamaskLogo, description: "Popular Ethereum and ERC-20 token wallet." },
              { name: "Ledger", logo: ledgerLogo, description: "Hardware wallet for maximum security." },
              { name: "Trezor", logo: trezorLogo, description: "Another trusted hardware wallet option." },
            ].map((wallet, index) => (
              <div
                key={index}
                className="bg-gray-800/50 p-4 rounded-lg text-center transform transition-all duration-300 hover:scale-105 hover:bg-gray-700/50"
              >
                <img src={wallet.logo || "/placeholder.svg"} alt={wallet.name} className="h-16 mx-auto mb-4" />
                <h3 className="text-white text-lg font-semibold">{wallet.name}</h3>
                <p className="text-gray-400 text-sm">{wallet.description}</p>
              </div>
            ))}
          </div>
          <button className="mt-12 bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition duration-300">
            Connect Your Wallet
          </button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-[#0D1117] py-20 px-6 border-t border-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 p-6 rounded-lg">
              <p className="text-gray-300 mb-4">
                "CryptoAI has revolutionized my trading strategy. The AI-powered insights have significantly improved my
                portfolio performance."
              </p>
              <p className="font-semibold text-white">Sarah K.</p>
              <p className="text-gray-400">Crypto Enthusiast</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-lg">
              <p className="text-gray-300 mb-4">
                "The multi-chain portfolio tracking and automated trading features have saved me countless hours. It's a
                game-changer for serious crypto investors."
              </p>
              <p className="font-semibold text-white">Michael R.</p>
              <p className="text-gray-400">Professional Trader</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-[#0D1117] py-20 px-6 border-t border-gray-800">
        <div className="container mx-auto text-center max-w-6xl">
          <h2 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h2>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            Select the perfect plan to elevate your crypto trading experience with our AI-powered tools and insights.
          </p>

          <PricingToggle isYearly={isYearly} setIsYearly={setIsYearly} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PricingCard
              plan="BASIC"
              monthlyPrice={0}
              yearlyPrice={0}
              features={[
                { text: "Basic portfolio tracking", included: true },
                { text: "Limited AI insights", included: true },
                { text: "Single chain support", included: true },
                { text: "Advanced analytics", included: false },
                { text: "Automated trading", included: false },
                { text: "24/7 priority support", included: false },
              ]}
              isYearly={isYearly}
              isPro={false}
            />
            <PricingCard
              plan="PRO"
              monthlyPrice={49}
              yearlyPrice={470}
              features={[
                { text: "Advanced portfolio tracking", included: true },
                { text: "Full AI-powered insights", included: true },
                { text: "Multi-chain support", included: true },
                { text: "Advanced analytics", included: true },
                { text: "Automated trading", included: true },
                { text: "24/7 priority support", included: true },
              ]}
              isYearly={isYearly}
              isPro={true}
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative bg-[#0D1117] py-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-purple-900/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(100,50,255,0.1),transparent_70%)]"></div>
        </div>
        <div className="container mx-auto text-center relative z-10 max-w-4xl">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Revolutionize Your Crypto Trading?</h2>
          <p className="text-gray-300 mb-8 text-lg">
            Join thousands of traders who are already leveraging the power of AI to maximize their crypto investments.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="w-full sm:w-auto bg-white text-purple-600 px-8 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Start Free Trial
            </button>
            <button className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105">
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

