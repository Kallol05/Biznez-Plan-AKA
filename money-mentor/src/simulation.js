"use client"

import { useState, useEffect } from "react"
import "./simulation.css"
import Navbar from "./Navbar"
import LoadingScreen from "./components/common/LoadingScreen"

function Simulation({ onLogout, onPageChange, currentPage }) {
  // Game state
  const [loading, setLoading] = useState(true)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameYear, setGameYear] = useState(1)
  const [gameMonth, setGameMonth] = useState(1)
  const [gameAge, setGameAge] = useState(25)
  const [gameSpeed, setGameSpeed] = useState("normal") // slow, normal, fast
  const [isPaused, setIsPaused] = useState(true)
  const [showEvent, setShowEvent] = useState(false)
  const [currentEvent, setCurrentEvent] = useState(null)
  const [showTutorial, setShowTutorial] = useState(false)
  const [tutorialStep, setTutorialStep] = useState(1)
  const [lifeEnded, setLifeEnded] = useState(false)
  const [lifeEndSummary, setLifeEndSummary] = useState(null)
  const [maxAge, setMaxAge] = useState(80)
  const [eventFrequency, setEventFrequency] = useState(0.1) // Reduced from 0.3 to 0.1

  // Setup state
  const [setupComplete, setSetupComplete] = useState(false)
  const [setupStep, setSetupStep] = useState(1)
  const [selectedCareer, setSelectedCareer] = useState(null)
  const [selectedAge, setSelectedAge] = useState(25)
  const [selectedDebts, setSelectedDebts] = useState({
    studentLoan: 0,
    creditCardDebt: 0,
    homeLoan: 0,
    carLoan: 0,
  })
  const [initialCash, setInitialCash] = useState(500000)

  // Player financial state
  const [player, setPlayer] = useState({
    name: "Player",
    career: "Entry Level Developer",
    cash: 500000,
    salary: 60000,
    expenses: 30000,
    assets: {
      stocks: [],
      realEstate: [],
      savings: [],
      mutualFunds: [],
      commodities: [],
      crypto: [],
      bonds: [],
    },
    netWorth: 500000,
    creditScore: 700,
    taxRate: 0.25,
    skills: {
      investing: 1,
      realEstate: 1,
      taxPlanning: 1,
      entrepreneurship: 1,
      career: 1,
    },
    liabilities: {
      studentLoan: 0,
      creditCardDebt: 0,
      homeLoan: 0,
      carLoan: 0,
    },
    decisions: [],
    achievements: [],
    startingNetWorth: 500000,
  })

  // Career options
  const careerOptions = [
    {
      id: 1,
      title: "Software Developer",
      startingSalary: 75000,
      description: "Build and maintain software applications. High growth potential with continuous learning.",
      skillBonus: "investing",
      growthRate: 0.06,
    },
    {
      id: 2,
      title: "Financial Analyst",
      startingSalary: 65000,
      description: "Analyze financial data and market trends to guide investment decisions.",
      skillBonus: "investing",
      growthRate: 0.05,
    },
    {
      id: 3,
      title: "Marketing Specialist",
      startingSalary: 60000,
      description: "Develop and implement marketing strategies to promote products or services.",
      skillBonus: "entrepreneurship",
      growthRate: 0.045,
    },
    {
      id: 4,
      title: "Real Estate Agent",
      startingSalary: 50000,
      description: "Help clients buy, sell, or rent properties. Commission-based with high earning potential.",
      skillBonus: "realEstate",
      growthRate: 0.04,
    },
    {
      id: 5,
      title: "Accountant",
      startingSalary: 62000,
      description: "Prepare and examine financial records, ensuring accuracy and tax compliance.",
      skillBonus: "taxPlanning",
      growthRate: 0.04,
    },
    {
      id: 6,
      title: "Entrepreneur",
      startingSalary: 30000,
      description: "Start and run your own business. High risk but potentially high reward.",
      skillBonus: "entrepreneurship",
      growthRate: 0.08,
    },
  ]

  // Market state
  const [market, setMarket] = useState({
    stockMarket: {
      index: 10000,
      trend: "neutral", // bullish, neutral, bearish
      volatility: "medium", // low, medium, high
      stocks: [
        {
          id: 1,
          symbol: "TECH",
          name: "TechCorp",
          price: 1500,
          change: 0.5,
          sector: "Technology",
          dividend: 0.01,
          volatility: 1.5,
          description: "A leading technology company focused on software and cloud services.",
        },
        {
          id: 2,
          symbol: "BNKG",
          name: "BankGroup",
          price: 2000,
          change: -0.2,
          sector: "Finance",
          dividend: 0.03,
          volatility: 1.2,
          description: "A major banking institution offering a wide range of financial services.",
        },
        {
          id: 3,
          symbol: "HLTH",
          name: "HealthCare",
          price: 1200,
          change: 1.2,
          sector: "Healthcare",
          dividend: 0.02,
          volatility: 1.3,
          description: "A healthcare company developing innovative medical treatments.",
        },
        {
          id: 4,
          symbol: "ENRG",
          name: "EnergyPlus",
          price: 800,
          change: -0.8,
          sector: "Energy",
          dividend: 0.04,
          volatility: 1.8,
          description: "An energy company with both traditional and renewable energy operations.",
        },
        {
          id: 5,
          symbol: "CONS",
          name: "ConsumerGoods",
          price: 650,
          change: 0.3,
          sector: "Consumer",
          dividend: 0.02,
          volatility: 1.1,
          description: "A consumer goods company producing everyday household products.",
        },
        {
          id: 6,
          symbol: "MANF",
          name: "Manufacturing Inc",
          price: 1100,
          change: 0.1,
          sector: "Industrial",
          dividend: 0.025,
          volatility: 1.4,
          description: "A manufacturing company producing industrial equipment and machinery.",
        },
        {
          id: 7,
          symbol: "LXRY",
          name: "Luxury Brands",
          price: 3200,
          change: 0.7,
          sector: "Consumer",
          dividend: 0.015,
          volatility: 1.6,
          description: "A luxury goods company with high-end fashion and accessories.",
        },
        {
          id: 8,
          symbol: "AGRI",
          name: "AgriTech",
          price: 450,
          change: 0.4,
          sector: "Agriculture",
          dividend: 0.03,
          volatility: 1.2,
          description: "An agricultural technology company improving farming efficiency.",
        },
      ],
    },
    realEstate: {
      trend: "neutral",
      properties: [
        {
          id: 1,
          type: "Apartment",
          location: "Urban",
          price: 5000000,
          rent: 25000,
          condition: "Good",
          appreciation: 0.03,
          description: "A modern apartment in a central urban location with good amenities.",
        },
        {
          id: 2,
          type: "House",
          location: "Suburban",
          price: 8500000,
          rent: 40000,
          condition: "Excellent",
          appreciation: 0.04,
          description: "A spacious family home in a quiet suburban neighborhood with good schools.",
        },
        {
          id: 3,
          type: "Condo",
          location: "Urban",
          price: 4500000,
          rent: 22000,
          condition: "Fair",
          appreciation: 0.02,
          description: "A condominium unit in an older building with basic amenities but good location.",
        },
        {
          id: 4,
          type: "Duplex",
          location: "Suburban",
          price: 9000000,
          rent: 55000,
          condition: "Good",
          appreciation: 0.035,
          description: "A duplex property offering two rental units, good for generating rental income.",
        },
        {
          id: 5,
          type: "Commercial Space",
          location: "Urban",
          price: 12000000,
          rent: 80000,
          condition: "Excellent",
          appreciation: 0.025,
          description: "A commercial property in a business district, suitable for retail or office use.",
        },
        {
          id: 6,
          type: "Vacation Home",
          location: "Rural",
          price: 6000000,
          rent: 35000,
          condition: "Good",
          appreciation: 0.03,
          description: "A vacation property in a scenic area, good for personal use and seasonal rentals.",
        },
      ],
    },
    banks: {
      savingsRate: 0.04,
      loanRate: 0.09,
      mortgageRate: 0.07,
      accounts: [
        {
          id: 1,
          name: "Basic Savings",
          interestRate: 0.04,
          minimumBalance: 0,
          monthlyFee: 0,
          description: "A simple savings account with no minimum balance requirement or monthly fees.",
        },
        {
          id: 2,
          name: "High-Yield Savings",
          interestRate: 0.055,
          minimumBalance: 100000,
          monthlyFee: 0,
          description: "A higher interest savings account requiring a minimum balance of ₹1,00,000.",
        },
        {
          id: 3,
          name: "Fixed Deposit - 1 Year",
          interestRate: 0.06,
          minimumBalance: 10000,
          term: 12,
          earlyWithdrawalPenalty: 0.01,
          description: "A 1-year fixed deposit with a fixed interest rate, subject to penalties for early withdrawal.",
        },
        {
          id: 4,
          name: "Fixed Deposit - 5 Year",
          interestRate: 0.07,
          minimumBalance: 10000,
          term: 60,
          earlyWithdrawalPenalty: 0.02,
          description: "A 5-year fixed deposit offering higher interest rates for a longer commitment.",
        },
        {
          id: 5,
          name: "Recurring Deposit",
          interestRate: 0.05,
          minimumBalance: 5000,
          monthlyFee: 0,
          description: "A recurring deposit account where you deposit a fixed amount monthly and earn interest.",
        },
      ],
    },
    mutualFunds: [
      {
        id: 1,
        name: "Index Fund",
        expenseRatio: 0.04,
        return: 0.12,
        risk: "Low",
        category: "Large Cap",
        description:
          "A fund that tracks a market index like the Nifty 50, offering broad market exposure with low fees.",
      },
      {
        id: 2,
        name: "Growth Fund",
        expenseRatio: 0.08,
        return: 0.14,
        risk: "Medium",
        category: "Growth",
        description:
          "Focuses on companies expected to grow earnings at an above-average rate, offering higher potential returns with moderate risk.",
      },
      {
        id: 3,
        name: "Aggressive Growth",
        expenseRatio: 0.12,
        return: 0.16,
        risk: "High",
        category: "Small Cap",
        description:
          "Invests in smaller companies with high growth potential, offering higher possible returns but with increased volatility.",
      },
      {
        id: 4,
        name: "Debt Fund",
        expenseRatio: 0.05,
        return: 0.08,
        risk: "Low",
        category: "Bonds",
        description: "Invests primarily in bonds, offering income and stability with lower risk than equity funds.",
      },
      {
        id: 5,
        name: "International Fund",
        expenseRatio: 0.1,
        return: 0.13,
        risk: "Medium",
        category: "International",
        description: "Invests in companies outside India, offering diversification and exposure to global markets.",
      },
    ],
    commodities: [
      {
        id: 1,
        name: "Gold",
        price: 6000,
        change: 0.2,
        volatility: 1.2,
        description: "A precious metal often used as a store of value and hedge against inflation.",
      },
      {
        id: 2,
        name: "Silver",
        price: 75,
        change: 0.3,
        volatility: 1.5,
        description: "A precious metal with both industrial uses and investment value.",
      },
    ],
    crypto: [
      {
        id: 1,
        name: "Bitcoin",
        price: 3500000,
        change: 2.5,
        volatility: 3.0,
        description: "The original cryptocurrency, known for its high value and volatility.",
      },
      {
        id: 2,
        name: "Ethereum",
        price: 200000,
        change: 1.8,
        volatility: 2.8,
        description: "A cryptocurrency platform that enables smart contracts and decentralized applications.",
      },
    ],
    bonds: [
      {
        id: 1,
        name: "Government Bond - 5 Year",
        yield: 0.06,
        price: 10000,
        risk: "Very Low",
        description: "A government-issued bond with a 5-year term, offering very low risk but lower returns.",
      },
      {
        id: 2,
        name: "Government Bond - 10 Year",
        yield: 0.065,
        price: 10000,
        risk: "Very Low",
        description:
          "A government-issued bond with a 10-year term, offering slightly higher yields than shorter-term bonds.",
      },
      {
        id: 3,
        name: "Corporate Bond - AA Rated",
        yield: 0.075,
        price: 10000,
        risk: "Low",
        description: "A high-quality corporate bond with low default risk and moderate yields.",
      },
    ],
  })

  // Game events
  const events = [
    {
      id: 1,
      title: "Market Crash",
      description: "The stock market has crashed! Prices are down 20% across the board.",
      type: "market",
      frequency: "rare",
      options: [
        { text: "Sell everything to avoid further losses", effect: "Sell all stocks at current prices" },
        { text: "Hold steady and wait for recovery", effect: "No immediate action" },
        { text: "Buy more at discounted prices", effect: "Opportunity to buy stocks at reduced prices" },
      ],
      condition: () => gameYear > 2 && Math.random() < 0.05,
    },
    {
      id: 2,
      title: "Promotion Opportunity",
      description: "Your company is offering you a promotion with a 15% salary increase, but it requires longer hours.",
      type: "career",
      frequency: "uncommon",
      options: [
        { text: "Accept the promotion", effect: "Salary +15%, Free time -10%" },
        { text: "Decline and maintain work-life balance", effect: "No change, but gain skill point in current field" },
      ],
      condition: () => gameYear > 1 && Math.random() < 0.1,
    },
    {
      id: 3,
      title: "Real Estate Opportunity",
      description:
        "A property in your area is available at 10% below market value due to the owner needing to sell quickly.",
      type: "investment",
      frequency: "uncommon",
      options: [
        { text: "Purchase the property", effect: "Add discounted property to portfolio" },
        { text: "Pass on this opportunity", effect: "No change" },
      ],
      condition: () => player.cash > 500000 && Math.random() < 0.08,
    },
  ]

  // Active tab state
  const [activeTab, setActiveTab] = useState("dashboard")
  // State for asset sub-tab
  const [assetSubTab, setAssetSubTab] = useState("stocks")

  // State for tax calculator
  const [taxCalcDeductions, setTaxCalcDeductions] = useState(0)

  // Initialize game
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  // Game time progression
  useEffect(() => {
    if (!gameStarted || isPaused || !setupComplete) return

    let interval
    let timeStep

    switch (gameSpeed) {
      case "slow":
        timeStep = 2000 // 2 seconds per month
        break
      case "fast":
        timeStep = 500 // 0.5 seconds per month
        break
      case "normal":
      default:
        timeStep = 1000 // 1 second per month
    }

    interval = setInterval(() => {
      progressTime()
    }, timeStep)

    return () => clearInterval(interval)
  }, [gameStarted, isPaused, gameSpeed, gameMonth, gameYear, setupComplete])

  // Progress game time by one month
  const progressTime = () => {
    // Update month and year
    let newMonth = gameMonth + 1
    let newYear = gameYear

    if (newMonth > 12) {
      newMonth = 1
      newYear += 1
      // Age increases every year
      setGameAge((prevAge) => {
        const newAge = prevAge + 1

        // Check if reached max age (end of life)
        if (newAge >= maxAge) {
          endLife()
        }

        return newAge
      })
    }

    setGameMonth(newMonth)
    setGameYear(newYear)

    // Process monthly financial updates
    processMonthlyUpdate()

    // Check for random events
    checkForEvents()
  }

  // End of life function
  const endLife = () => {
    setIsPaused(true)
    setLifeEnded(true)

    // Calculate wealth growth percentage
    const startingNetWorth = player.startingNetWorth
    const finalNetWorth = player.netWorth
    const growthPercentage = ((finalNetWorth - startingNetWorth) / startingNetWorth) * 100

    let performanceCategory
    let message

    if (growthPercentage >= 1000) {
      performanceCategory = "exceptional"
      message =
        "Extraordinary! You've achieved remarkable financial success, building wealth beyond most people's dreams. Your financial decisions have been masterful."
    } else if (growthPercentage >= 500) {
      performanceCategory = "excellent"
      message =
        "Congratulations! You've built substantial wealth over your lifetime. Your investment strategy and financial decisions have been excellent."
    } else if (growthPercentage >= 200) {
      performanceCategory = "good"
      message =
        "Well done! You've grown your wealth significantly and achieved financial security. Your financial journey has been successful."
    } else if (growthPercentage >= 50) {
      performanceCategory = "average"
      message =
        "You've maintained steady financial growth throughout your life. While not exceptional, you've made generally sound financial decisions."
    } else if (growthPercentage >= 0) {
      performanceCategory = "poor"
      message =
        "Your wealth has grown minimally over your lifetime. There were missed opportunities for better financial outcomes."
    } else {
      performanceCategory = "negative"
      message =
        "Unfortunately, you've ended with less wealth than you started with. Your financial decisions didn't yield positive results over your lifetime."
    }

    setLifeEndSummary({
      startingNetWorth,
      finalNetWorth,
      growthPercentage,
      performanceCategory,
      message,
      age: gameAge,
      yearsLived: gameAge - selectedAge,
      topAssetClass: getTopAssetClass(),
      totalDecisions: player.decisions.length,
    })
  }

  // Get top asset class
  const getTopAssetClass = () => {
    const assetValues = {
      stocks: player.assets.stocks.reduce((sum, stock) => sum + stock.currentValue, 0),
      realEstate: player.assets.realEstate.reduce((sum, property) => sum + property.value, 0),
      savings: player.assets.savings.reduce((sum, account) => sum + account.balance, 0),
      mutualFunds: player.assets.mutualFunds.reduce((sum, fund) => sum + fund.value, 0),
      commodities: player.assets.commodities.reduce((sum, commodity) => sum + commodity.value, 0),
      crypto: player.assets.crypto.reduce((sum, crypto) => sum + crypto.value, 0),
      bonds: player.assets.bonds.reduce((sum, bond) => sum + bond.value, 0),
    }

    let topAsset = "cash"
    let topValue = player.cash

    for (const [asset, value] of Object.entries(assetValues)) {
      if (value > topValue) {
        topAsset = asset
        topValue = value
      }
    }

    return topAsset
  }

  // Process monthly financial updates
  const processMonthlyUpdate = () => {
    setPlayer((prevPlayer) => {
      // Calculate monthly income
      const monthlyIncome = prevPlayer.salary

      // Calculate monthly expenses
      const monthlyExpenses = prevPlayer.expenses

      // Calculate taxes (simplified)
      const monthlyTaxes = monthlyIncome * prevPlayer.taxRate

      // Calculate net monthly cash flow
      const netCashFlow = monthlyIncome - monthlyExpenses - monthlyTaxes

      // Update cash balance
      const newCash = prevPlayer.cash + netCashFlow

      // Process investment returns
      let investmentReturns = 0

      // Process stock returns and dividends
      const updatedStocks = prevPlayer.assets.stocks.map((stock) => {
        const marketStock = market.stockMarket.stocks.find((s) => s.symbol === stock.symbol)
        if (marketStock) {
          // Calculate monthly dividend if applicable
          const monthlyDividend = (marketStock.dividend / 12) * stock.shares * marketStock.price
          investmentReturns += monthlyDividend

          return {
            ...stock,
            currentValue: stock.shares * marketStock.price,
            lastDividend: monthlyDividend,
          }
        }
        return stock
      })

      // Process real estate returns (rent)
      const updatedRealEstate = prevPlayer.assets.realEstate.map((property) => {
        // Calculate monthly rental income
        const monthlyRent = property.rent
        // Calculate monthly expenses (maintenance, property tax, etc.)
        const monthlyExpenses = property.rent * 0.3 // Simplified: 30% of rent goes to expenses
        // Calculate net rental income
        const netRentalIncome = monthlyRent - monthlyExpenses

        investmentReturns += netRentalIncome

        return {
          ...property,
          lastIncome: netRentalIncome,
        }
      })

      // Process savings account interest
      const updatedSavings = prevPlayer.assets.savings.map((account) => {
        // Calculate monthly interest
        const monthlyInterest = (account.interestRate / 12) * account.balance

        investmentReturns += monthlyInterest

        return {
          ...account,
          balance: account.balance + monthlyInterest,
          lastInterest: monthlyInterest,
        }
      })

      // Process mutual fund returns
      const updatedMutualFunds = prevPlayer.assets.mutualFunds.map((fund) => {
        const marketFund = market.mutualFunds.find((f) => f.id === fund.fundId)
        if (marketFund) {
          // Calculate monthly return
          const monthlyReturn = (marketFund.return / 12) * fund.value

          investmentReturns += monthlyReturn

          return {
            ...fund,
            value: fund.value + monthlyReturn,
            lastReturn: monthlyReturn,
          }
        }
        return fund
      })

      // Process commodities
      const updatedCommodities = prevPlayer.assets.commodities.map((commodity) => {
        const marketCommodity = market.commodities.find((c) => c.name === commodity.name)
        if (marketCommodity) {
          // Calculate new value based on price change
          const newValue = commodity.units * marketCommodity.price
          const valueChange = newValue - commodity.value

          return {
            ...commodity,
            value: newValue,
            lastChange: valueChange,
          }
        }
        return commodity
      })

      // Process crypto
      const updatedCrypto = prevPlayer.assets.crypto.map((crypto) => {
        const marketCrypto = market.crypto.find((c) => c.name === crypto.name)
        if (marketCrypto) {
          // Calculate new value based on price change
          const newValue = crypto.units * marketCrypto.price
          const valueChange = newValue - crypto.value

          return {
            ...crypto,
            value: newValue,
            lastChange: valueChange,
          }
        }
        return crypto
      })

      // Process bonds
      const updatedBonds = prevPlayer.assets.bonds.map((bond) => {
        const marketBond = market.bonds.find((b) => b.name === bond.name)
        if (marketBond) {
          // Calculate monthly interest
          const monthlyInterest = (marketBond.yield / 12) * bond.value

          investmentReturns += monthlyInterest

          return {
            ...bond,
            value: bond.value,
            accruedInterest: (bond.accruedInterest || 0) + monthlyInterest,
            lastInterest: monthlyInterest,
          }
        }
        return bond
      })

      // Process debt payments
      let debtPayments = 0
      const updatedLiabilities = { ...prevPlayer.liabilities }

      // Student loan payment (simplified)
      if (updatedLiabilities.studentLoan > 0) {
        const payment = 5000 // Fixed payment
        const interest = (updatedLiabilities.studentLoan * 0.07) / 12 // 7% annual interest

        if (payment <= newCash) {
          updatedLiabilities.studentLoan = Math.max(0, updatedLiabilities.studentLoan - (payment - interest))
          debtPayments += payment
        }
      }

      // Credit card debt payment (simplified)
      if (updatedLiabilities.creditCardDebt > 0) {
        const payment = Math.min(updatedLiabilities.creditCardDebt * 0.03, updatedLiabilities.creditCardDebt) // 3% minimum payment
        const interest = (updatedLiabilities.creditCardDebt * 0.24) / 12 // 24% annual interest

        if (payment <= newCash - debtPayments) {
          updatedLiabilities.creditCardDebt = Math.max(0, updatedLiabilities.creditCardDebt + interest - payment)
          debtPayments += payment
        }
      }

      // Home loan payment (simplified)
      if (updatedLiabilities.homeLoan > 0) {
        const payment = 25000 // Fixed payment
        const interest = (updatedLiabilities.homeLoan * 0.07) / 12 // 7% annual interest

        if (payment <= newCash - debtPayments) {
          updatedLiabilities.homeLoan = Math.max(0, updatedLiabilities.homeLoan - (payment - interest))
          debtPayments += payment
        }
      }

      // Car loan payment (simplified)
      if (updatedLiabilities.carLoan > 0) {
        const payment = 8000 // Fixed payment
        const interest = (updatedLiabilities.carLoan * 0.09) / 12 // 9% annual interest

        if (payment <= newCash - debtPayments) {
          updatedLiabilities.carLoan = Math.max(0, updatedLiabilities.carLoan - (payment - interest))
          debtPayments += payment
        }
      }

      // Calculate final cash after debt payments
      const finalCash = newCash - debtPayments

      // Calculate net worth
      const totalAssetValue =
        updatedStocks.reduce((sum, stock) => sum + stock.currentValue, 0) +
        updatedRealEstate.reduce((sum, property) => sum + property.value, 0) +
        updatedSavings.reduce((sum, account) => sum + account.balance, 0) +
        updatedMutualFunds.reduce((sum, fund) => sum + fund.value, 0) +
        updatedCommodities.reduce((sum, commodity) => sum + commodity.value, 0) +
        updatedCrypto.reduce((sum, crypto) => sum + crypto.value, 0) +
        updatedBonds.reduce((sum, bond) => sum + bond.value + (bond.accruedInterest || 0), 0)

      const totalLiabilities =
        updatedLiabilities.studentLoan +
        updatedLiabilities.creditCardDebt +
        updatedLiabilities.homeLoan +
        updatedLiabilities.carLoan

      const netWorth = totalAssetValue + finalCash - totalLiabilities

      // Return updated player state
      return {
        ...prevPlayer,
        cash: finalCash,
        assets: {
          stocks: updatedStocks,
          realEstate: updatedRealEstate,
          savings: updatedSavings,
          mutualFunds: updatedMutualFunds,
          commodities: updatedCommodities,
          crypto: updatedCrypto,
          bonds: updatedBonds,
        },
        liabilities: updatedLiabilities,
        netWorth: netWorth,
        monthlyIncome: {
          salary: monthlyIncome,
          investments: investmentReturns,
        },
        monthlyExpenses: {
          living: monthlyExpenses,
          taxes: monthlyTaxes,
          debt: debtPayments,
        },
      }
    })

    // Update market conditions
    updateMarketConditions()
  }

  // Update market conditions
  const updateMarketConditions = () => {
    setMarket((prevMarket) => {
      // Update stock market
      const stockMarketTrend = getRandomMarketTrend()
      const stockMarketVolatility = getRandomMarketVolatility()

      // Update stock prices based on market conditions
      const updatedStocks = prevMarket.stockMarket.stocks.map((stock) => {
        // Base monthly change percentage
        let changePercent = 0

        // Add market trend influence
        if (stockMarketTrend === "bullish") {
          changePercent += Math.random() * 3 + 0.5 // 0.5% to 3.5% positive influence
        } else if (stockMarketTrend === "bearish") {
          changePercent -= Math.random() * 3 + 0.5 // 0.5% to 3.5% negative influence
        } else {
          changePercent += Math.random() * 2 - 1 // -1% to 1% neutral influence
        }

        // Add volatility influence
        if (stockMarketVolatility === "high") {
          changePercent += Math.random() * 4 - 2 // -2% to 2% additional volatility
        } else if (stockMarketVolatility === "low") {
          changePercent += Math.random() * 1 - 0.5 // -0.5% to 0.5% reduced volatility
        } else {
          changePercent += Math.random() * 2 - 1 // -1% to 1% normal volatility
        }

        // Add stock-specific volatility
        changePercent *= stock.volatility

        // Calculate new price
        const newPrice = Math.max(1, stock.price * (1 + changePercent / 100))

        return {
          ...stock,
          price: Number.parseFloat(newPrice.toFixed(2)),
          change: Number.parseFloat(changePercent.toFixed(2)),
        }
      })

      // Update stock market index
      const indexChange =
        stockMarketTrend === "bullish"
          ? Math.random() * 2 + 0.2
          : stockMarketTrend === "bearish"
            ? -(Math.random() * 2 + 0.2)
            : Math.random() * 1 - 0.5

      const newIndex = Math.max(1000, prevMarket.stockMarket.index * (1 + indexChange / 100))

      // Update real estate market
      const realEstateTrend = getRandomRealEstateTrend()

      // Update property values based on market conditions
      const updatedProperties = prevMarket.realEstate.properties.map((property) => {
        // Base monthly appreciation
        let appreciationRate = property.appreciation / 12 // Monthly rate

        // Adjust based on market trend
        if (realEstateTrend === "hot") {
          appreciationRate += 0.002 // +0.2% monthly
        } else if (realEstateTrend === "cold") {
          appreciationRate -= 0.001 // -0.1% monthly
        }

        // Calculate new price
        const newPrice = property.price * (1 + appreciationRate)

        return {
          ...property,
          price: Math.round(newPrice),
          monthlyAppreciation: Number.parseFloat((appreciationRate * 100).toFixed(2)),
        }
      })

      // Update bank rates
      const updatedSavingsRate = Math.max(0.03, prevMarket.banks.savingsRate + (Math.random() * 0.002 - 0.001))
      const updatedLoanRate = Math.max(0.07, prevMarket.banks.loanRate + (Math.random() * 0.003 - 0.0015))
      const updatedMortgageRate = Math.max(0.06, prevMarket.banks.mortgageRate + (Math.random() * 0.002 - 0.001))

      // Update bank accounts
      const updatedAccounts = prevMarket.banks.accounts.map((account) => {
        if (account.name.includes("Savings")) {
          return {
            ...account,
            interestRate: account.name.includes("High-Yield") ? updatedSavingsRate * 1.5 : updatedSavingsRate,
          }
        } else if (account.name.includes("Fixed Deposit")) {
          return {
            ...account,
            interestRate: account.name.includes("5 Year") ? updatedSavingsRate * 1.8 : updatedSavingsRate * 1.5,
          }
        } else if (account.name.includes("Recurring")) {
          return {
            ...account,
            interestRate: updatedSavingsRate * 1.3,
          }
        }
        return account
      })

      // Update mutual funds
      const updatedMutualFunds = prevMarket.mutualFunds.map((fund) => {
        // Adjust returns based on market conditions
        let adjustedReturn = fund.return

        if (stockMarketTrend === "bullish") {
          adjustedReturn += 0.005 // +0.5% annual return in bull market
        } else if (stockMarketTrend === "bearish") {
          adjustedReturn -= 0.005 // -0.5% annual return in bear market
        }

        // Add some randomness
        adjustedReturn += Math.random() * 0.01 - 0.005 // -0.5% to +0.5% random adjustment

        // Ensure return stays within reasonable bounds
        adjustedReturn = Math.max(0.05, Math.min(0.2, adjustedReturn))

        return {
          ...fund,
          return: Number.parseFloat(adjustedReturn.toFixed(3)),
        }
      })

      // Update commodities
      const updatedCommodities = prevMarket.commodities.map((commodity) => {
        // Calculate price change
        let changePercent = Math.random() * 2 * commodity.volatility - 1 * commodity.volatility

        // Adjust for inflation and market conditions
        if (stockMarketTrend === "bullish" && Math.random() > 0.5) {
          changePercent += 0.5 // Slight positive bias in bull markets
        } else if (stockMarketTrend === "bearish" && commodity.name === "Gold") {
          changePercent += 0.8 // Gold often rises in bear markets
        }

        // Calculate new price
        const newPrice = Math.max(0.1, commodity.price * (1 + changePercent / 100))

        return {
          ...commodity,
          price: Number.parseFloat(newPrice.toFixed(2)),
          change: Number.parseFloat(changePercent.toFixed(2)),
        }
      })

      // Update crypto
      const updatedCrypto = prevMarket.crypto.map((crypto) => {
        // Calculate price change - crypto is more volatile
        const changePercent = Math.random() * 5 * crypto.volatility - 2.5 * crypto.volatility

        // Calculate new price
        const newPrice = Math.max(0.01, crypto.price * (1 + changePercent / 100))

        return {
          ...crypto,
          price: Number.parseFloat(newPrice.toFixed(2)),
          change: Number.parseFloat(changePercent.toFixed(2)),
        }
      })

      // Update bonds
      const updatedBonds = prevMarket.bonds.map((bond) => {
        // Bond yields move inversely to interest rates
        let yieldChange = -1 * ((updatedSavingsRate - prevMarket.banks.savingsRate) * 5)

        // Add some randomness
        yieldChange += Math.random() * 0.002 - 0.001

        // Calculate new yield
        const newYield = Math.max(0.04, bond.yield + yieldChange)

        // Bond prices move inversely to yields
        const priceChange = -1 * (newYield - bond.yield) * 100
        const newPrice = Math.max(9000, Math.min(11000, bond.price * (1 + priceChange / 100)))

        return {
          ...bond,
          yield: Number.parseFloat(newYield.toFixed(4)),
          price: Number.parseFloat(newPrice.toFixed(2)),
        }
      })

      return {
        stockMarket: {
          index: Number.parseFloat(newIndex.toFixed(2)),
          trend: stockMarketTrend,
          volatility: stockMarketVolatility,
          stocks: updatedStocks,
        },
        realEstate: {
          trend: realEstateTrend,
          properties: updatedProperties,
        },
        banks: {
          savingsRate: Number.parseFloat(updatedSavingsRate.toFixed(4)),
          loanRate: Number.parseFloat(updatedLoanRate.toFixed(4)),
          mortgageRate: Number.parseFloat(updatedMortgageRate.toFixed(4)),
          accounts: updatedAccounts,
        },
        mutualFunds: updatedMutualFunds,
        commodities: updatedCommodities,
        crypto: updatedCrypto,
        bonds: updatedBonds,
      }
    })
  }

  // Helper function to get random market trend
  const getRandomMarketTrend = () => {
    const rand = Math.random()
    if (rand < 0.3) return "bearish"
    if (rand < 0.7) return "neutral"
    return "bullish"
  }

  // Helper function to get random market volatility
  const getRandomMarketVolatility = () => {
    const rand = Math.random()
    if (rand < 0.2) return "low"
    if (rand < 0.8) return "medium"
    return "high"
  }

  // Helper function to get random real estate trend
  const getRandomRealEstateTrend = () => {
    const rand = Math.random()
    if (rand < 0.3) return "cold"
    if (rand < 0.7) return "neutral"
    return "hot"
  }

  // Check for random events
  const checkForEvents = () => {
    if (showEvent) return // Don't trigger new events if one is already active

    // Filter events that meet their conditions
    const eligibleEvents = events.filter((event) => event.condition())

    if (eligibleEvents.length > 0 && Math.random() < eventFrequency) {
      // Select a random event from eligible events
      const selectedEvent = eligibleEvents[Math.floor(Math.random() * eligibleEvents.length)]

      // Pause game and show event
      setIsPaused(true)
      setCurrentEvent(selectedEvent)
      setShowEvent(true)
    }
  }

  // Handle event option selection
  const handleEventOption = (option) => {
    // Process the effects of the selected option
    processEventEffect(currentEvent, option)

    // Hide event modal
    setShowEvent(false)
    setCurrentEvent(null)

    // Resume game
    setIsPaused(false)
  }

  // Process event effects
  const processEventEffect = (event, option) => {
    // Record decision
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      decisions: [
        ...prevPlayer.decisions,
        {
          event: event.title,
          decision: option.text,
          year: gameYear,
          month: gameMonth,
        },
      ],
    }))

    // Apply specific effects based on the event and option
    switch (event.id) {
      case 1: // Market Crash
        if (option.text.includes("Sell everything")) {
          // Sell all stocks at current (reduced) prices
          sellAllStocks()
        } else if (option.text.includes("Buy more")) {
          // Give player a special buying opportunity
          offerDiscountedStocks()
        }
        break

      case 2: // Promotion
        if (option.text.includes("Accept")) {
          // Increase salary by 15%
          setPlayer((prevPlayer) => ({
            ...prevPlayer,
            salary: Math.round(prevPlayer.salary * 1.15),
            career: prevPlayer.career.includes("Senior") ? prevPlayer.career : `Senior ${prevPlayer.career}`,
          }))
        } else {
          // Gain skill point
          increaseSkill("career")
        }
        break

      case 3: // Real Estate Opportunity
        if (option.text.includes("Purchase")) {
          // Add discounted property
          addDiscountedProperty()
        }
        break

      default:
        // No specific effect
        break
    }
  }

  // Helper function to sell all stocks
  const sellAllStocks = () => {
    setPlayer((prevPlayer) => {
      // Calculate total value of all stocks
      const totalStockValue = prevPlayer.assets.stocks.reduce((sum, stock) => {
        const marketStock = market.stockMarket.stocks.find((s) => s.symbol === stock.symbol)
        return sum + stock.shares * (marketStock?.price || 0)
      }, 0)

      // Add value to cash
      return {
        ...prevPlayer,
        cash: prevPlayer.cash + totalStockValue,
        assets: {
          ...prevPlayer.assets,
          stocks: [], // Empty stocks array
        },
      }
    })
  }

  // Helper function to offer discounted stocks
  const offerDiscountedStocks = () => {
    // Add achievement
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      achievements: [
        ...prevPlayer.achievements,
        {
          title: "Contrarian Investor",
          description: "Bought stocks during a market crash",
          year: gameYear,
          month: gameMonth,
        },
      ],
    }))
  }

  // Helper function to add discounted property
  const addDiscountedProperty = () => {
    // Select a random property from the market
    const availableProperties = market.realEstate.properties
    if (availableProperties.length === 0) return

    const selectedProperty = availableProperties[Math.floor(Math.random() * availableProperties.length)]

    // Apply 10% discount
    const discountedPrice = Math.round(selectedProperty.price * 0.9)

    // Check if player has enough cash
    if (player.cash < discountedPrice) {
      // Not enough cash, add achievement for missed opportunity
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        achievements: [
          ...prevPlayer.achievements,
          {
            title: "Missed Opportunity",
            description: "Couldn't afford a discounted property",
            year: gameYear,
            month: gameMonth,
          },
        ],
      }))
      return
    }

    // Add property to player's portfolio
    setPlayer((prevPlayer) => {
      const newProperty = {
        ...selectedProperty,
        purchasePrice: discountedPrice,
        value: selectedProperty.price, // Full market value
        purchaseYear: gameYear,
        purchaseMonth: gameMonth,
      }

      return {
        ...prevPlayer,
        cash: prevPlayer.cash - discountedPrice,
        assets: {
          ...prevPlayer.assets,
          realEstate: [...prevPlayer.assets.realEstate, newProperty],
        },
      }
    })

    // Add achievement
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      achievements: [
        ...prevPlayer.achievements,
        {
          title: "Real Estate Investor",
          description: "Purchased a property at a discount",
          year: gameYear,
          month: gameMonth,
        },
      ],
    }))
  }

  // Helper function to increase a skill
  const increaseSkill = (skillName) => {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      skills: {
        ...prevPlayer.skills,
        [skillName]: prevPlayer.skills[skillName] + 1,
      },
    }))
  }

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Format percentage
  const formatPercentage = (value) => {
    return `${(value * 100).toFixed(2)}%`
  }

  // Start new game
  const startNewGame = () => {
    setGameStarted(true)
    setSetupStep(1)
  }

  // Complete setup and start simulation
  const completeSetup = () => {
    // Initialize player with selected options
    setPlayer({
      ...player,
      career: selectedCareer.title,
      salary: selectedCareer.startingSalary,
      cash: initialCash,
      netWorth: initialCash - Object.values(selectedDebts).reduce((a, b) => a + b, 0),
      startingNetWorth: initialCash - Object.values(selectedDebts).reduce((a, b) => a + b, 0),
      liabilities: selectedDebts,
      skills: {
        ...player.skills,
        [selectedCareer.skillBonus]: player.skills[selectedCareer.skillBonus] + 1,
      },
    })

    // Set age
    setGameAge(selectedAge)

    // Complete setup
    setSetupComplete(true)
    setIsPaused(false)
  }

  // Handle setup navigation
  const handleSetupNavigation = (action) => {
    if (action === "next") {
      if (setupStep < 3) {
        setSetupStep(setupStep + 1)
      } else {
        completeSetup()
      }
    } else if (action === "prev") {
      if (setupStep > 1) {
        setSetupStep(setupStep - 1)
      }
    }
  }

  // Handle career selection
  const handleCareerSelection = (career) => {
    setSelectedCareer(career)
  }

  // Handle debt changes
  const handleDebtChange = (debtType, amount) => {
    setSelectedDebts({
      ...selectedDebts,
      [debtType]: amount,
    })
  }

  // Buy stock
  const buyStock = (stockSymbol, shares) => {
    const stock = market.stockMarket.stocks.find((s) => s.symbol === stockSymbol)
    if (!stock) return

    const cost = stock.price * shares

    if (player.cash < cost) {
      // Not enough cash
      return false
    }

    setPlayer((prevPlayer) => {
      // Check if player already owns this stock
      const existingStockIndex = prevPlayer.assets.stocks.findIndex((s) => s.symbol === stockSymbol)

      let updatedStocks

      if (existingStockIndex >= 0) {
        // Update existing stock
        const existingStock = prevPlayer.assets.stocks[existingStockIndex]
        const totalShares = existingStock.shares + shares
        const totalCost = existingStock.totalCost + cost
        const averageCost = totalCost / totalShares

        updatedStocks = [...prevPlayer.assets.stocks]
        updatedStocks[existingStockIndex] = {
          ...existingStock,
          shares: totalShares,
          totalCost: totalCost,
          averageCost: averageCost,
          currentValue: totalShares * stock.price,
        }
      } else {
        // Add new stock
        updatedStocks = [
          ...prevPlayer.assets.stocks,
          {
            symbol: stock.symbol,
            name: stock.name,
            shares: shares,
            purchasePrice: stock.price,
            totalCost: cost,
            averageCost: stock.price,
            currentValue: shares * stock.price,
            purchaseYear: gameYear,
            purchaseMonth: gameMonth,
          },
        ]
      }

      return {
        ...prevPlayer,
        cash: prevPlayer.cash - cost,
        assets: {
          ...prevPlayer.assets,
          stocks: updatedStocks,
        },
      }
    })

    return true
  }

  // Sell stock
  const sellStock = (stockSymbol, shares) => {
    const stock = market.stockMarket.stocks.find((s) => s.symbol === stockSymbol)
    if (!stock) return

    const playerStock = player.assets.stocks.find((s) => s.symbol === stockSymbol)
    if (!playerStock || playerStock.shares < shares) {
      // Don't own enough shares
      return false
    }

    const saleValue = stock.price * shares

    setPlayer((prevPlayer) => {
      let updatedStocks

      if (playerStock.shares === shares) {
        // Selling all shares
        updatedStocks = prevPlayer.assets.stocks.filter((s) => s.symbol !== stockSymbol)
      } else {
        // Selling some shares
        updatedStocks = prevPlayer.assets.stocks.map((s) => {
          if (s.symbol === stockSymbol) {
            return {
              ...s,
              shares: s.shares - shares,
              totalCost: s.totalCost * ((s.shares - shares) / s.shares),
              currentValue: (s.shares - shares) * stock.price,
            }
          }
          return s
        })
      }

      return {
        ...prevPlayer,
        cash: prevPlayer.cash + saleValue,
        assets: {
          ...prevPlayer.assets,
          stocks: updatedStocks,
        },
      }
    })

    return true
  }

  // Reset game
  const resetGame = () => {
    setGameStarted(false)
    setGameYear(1)
    setGameMonth(1)
    setGameAge(25)
    setIsPaused(true)
    setShowEvent(false)
    setCurrentEvent(null)
    setLifeEnded(false)
    setLifeEndSummary(null)
    setSetupComplete(false)
    setSetupStep(1)
    setSelectedCareer(null)
    setSelectedAge(25)
    setSelectedDebts({
      studentLoan: 0,
      creditCardDebt: 0,
      homeLoan: 0,
      carLoan: 0,
    })
    setInitialCash(500000)

    // Reset player state
    setPlayer({
      name: "Player",
      career: "Entry Level Developer",
      cash: 500000,
      salary: 60000,
      expenses: 30000,
      assets: {
        stocks: [],
        realEstate: [],
        savings: [],
        mutualFunds: [],
        commodities: [],
        crypto: [],
        bonds: [],
      },
      netWorth: 500000,
      creditScore: 700,
      taxRate: 0.25,
      skills: {
        investing: 1,
        realEstate: 1,
        taxPlanning: 1,
        entrepreneurship: 1,
        career: 1,
      },
      liabilities: {
        studentLoan: 0,
        creditCardDebt: 0,
        homeLoan: 0,
        carLoan: 0,
      },
      decisions: [],
      achievements: [],
      startingNetWorth: 500000,
    })
  }

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div className="page-wrapper">
      <Navbar onLogout={onLogout} onPageChange={onPageChange} currentPage={currentPage} />

      <div className="content-container">
        {!gameStarted ? (
          <div className="simulator-intro">
            <h1>Financial Life Simulator</h1>
            <p>
              Experience the journey of building wealth through various investment strategies and financial decisions.
            </p>

            <div className="intro-features">
              <div className="feature-item">
                <div className="feature-icon">📈</div>
                <h3>Invest in Markets</h3>
                <p>
                  Trade stocks, buy real estate, save in banks, invest in mutual funds, and explore commodities, crypto,
                  and bonds.
                </p>
              </div>

              <div className="feature-item">
                <div className="feature-icon">💰</div>
                <h3>Build Wealth</h3>
                <p>
                  Earn income, manage expenses, and grow your net worth over time through smart financial decisions.
                </p>
              </div>

              <div className="feature-item">
                <div className="feature-icon">🧠</div>
                <h3>Make Decisions</h3>
                <p>
                  Respond to life events and market changes with strategic choices that impact your financial future.
                </p>
              </div>

              <div className="feature-item">
                <div className="feature-icon">📊</div>
                <h3>Track Progress</h3>
                <p>Monitor your financial growth and achievements as you progress through your simulated life.</p>
              </div>
            </div>

            <button className="start-game-button" onClick={startNewGame}>
              Start New Game
            </button>
          </div>
        ) : !setupComplete ? (
          <div className="setup-container">
            <h2>Life Setup</h2>

            {setupStep === 1 && (
              <div className="setup-step">
                <h3>Choose Your Career</h3>
                <p>
                  Select a career path to start your financial journey. Each career offers different starting salaries
                  and growth potential.
                </p>

                <div className="career-options">
                  {careerOptions.map((career) => (
                    <div
                      key={career.id}
                      className={`career-option ${selectedCareer?.id === career.id ? "selected" : ""}`}
                      onClick={() => handleCareerSelection(career)}
                    >
                      <h4>{career.title}</h4>
                      <div className="career-details">
                        <div className="career-salary">
                          Starting Salary: {formatCurrency(career.startingSalary)}/month
                        </div>
                        <div className="career-growth">Annual Growth: {formatPercentage(career.growthRate)}</div>
                        <div className="career-skill">Skill Bonus: {career.skillBonus}</div>
                      </div>
                      <p className="career-description">{career.description}</p>
                    </div>
                  ))}
                </div>

                <div className="setup-navigation">
                  <button
                    className="setup-button next"
                    onClick={() => handleSetupNavigation("next")}
                    disabled={!selectedCareer}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {setupStep === 2 && (
              <div className="setup-step">
                <h3>Choose Your Starting Age and Life Span</h3>
                <p>
                  Select your starting age and how long you expect to live. This will determine the length of your
                  financial journey.
                </p>

                <div className="age-selection">
                  <div className="form-group">
                    <label htmlFor="starting-age">Starting Age:</label>
                    <input
                      type="range"
                      id="starting-age"
                      min="18"
                      max="50"
                      value={selectedAge}
                      onChange={(e) => setSelectedAge(Number.parseInt(e.target.value))}
                    />
                    <div className="range-value">{selectedAge} years old</div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="max-age">Life Expectancy:</label>
                    <input
                      type="range"
                      id="max-age"
                      min="70"
                      max="100"
                      value={maxAge}
                      onChange={(e) => setMaxAge(Number.parseInt(e.target.value))}
                    />
                    <div className="range-value">{maxAge} years old</div>
                  </div>

                  <div className="simulation-length">
                    <div className="length-label">Simulation Length:</div>
                    <div className="length-value">{maxAge - selectedAge} years</div>
                  </div>
                </div>

                <div className="setup-navigation">
                  <button className="setup-button prev" onClick={() => handleSetupNavigation("prev")}>
                    Previous
                  </button>
                  <button className="setup-button next" onClick={() => handleSetupNavigation("next")}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {setupStep === 3 && (
              <div className="setup-step">
                <h3>Financial Starting Point</h3>
                <p>Set your initial financial situation, including cash and debts.</p>

                <div className="financial-setup">
                  <div className="form-group">
                    <label htmlFor="initial-cash">Starting Cash:</label>
                    <input
                      type="range"
                      id="initial-cash"
                      min="100000"
                      max="2000000"
                      step="100000"
                      value={initialCash}
                      onChange={(e) => setInitialCash(Number.parseInt(e.target.value))}
                    />
                    <div className="range-value">{formatCurrency(initialCash)}</div>
                  </div>

                  <h4>Starting Debts</h4>

                  <div className="debt-options">
                    <div className="form-group">
                      <label htmlFor="student-loan">Student Loan:</label>
                      <input
                        type="range"
                        id="student-loan"
                        min="0"
                        max="2000000"
                        step="100000"
                        value={selectedDebts.studentLoan}
                        onChange={(e) => handleDebtChange("studentLoan", Number.parseInt(e.target.value))}
                      />
                      <div className="range-value">{formatCurrency(selectedDebts.studentLoan)}</div>
                      <div className="debt-info">7% interest rate, ₹5,000 monthly payment</div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="credit-card">Credit Card Debt:</label>
                      <input
                        type="range"
                        id="credit-card"
                        min="0"
                        max="500000"
                        step="25000"
                        value={selectedDebts.creditCardDebt}
                        onChange={(e) => handleDebtChange("creditCardDebt", Number.parseInt(e.target.value))}
                      />
                      <div className="range-value">{formatCurrency(selectedDebts.creditCardDebt)}</div>
                      <div className="debt-info">24% interest rate, 3% minimum monthly payment</div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="home-loan">Home Loan:</label>
                      <input
                        type="range"
                        id="home-loan"
                        min="0"
                        max="10000000"
                        step="1000000"
                        value={selectedDebts.homeLoan}
                        onChange={(e) => handleDebtChange("homeLoan", Number.parseInt(e.target.value))}
                      />
                      <div className="range-value">{formatCurrency(selectedDebts.homeLoan)}</div>
                      <div className="debt-info">7% interest rate, ₹25,000 monthly payment</div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="car-loan">Car Loan:</label>
                      <input
                        type="range"
                        id="car-loan"
                        min="0"
                        max="1000000"
                        step="100000"
                        value={selectedDebts.carLoan}
                        onChange={(e) => handleDebtChange("carLoan", Number.parseInt(e.target.value))}
                      />
                      <div className="range-value">{formatCurrency(selectedDebts.carLoan)}</div>
                      <div className="debt-info">9% interest rate, ₹8,000 monthly payment</div>
                    </div>
                  </div>

                  <div className="net-worth-summary">
                    <div className="summary-label">Starting Net Worth:</div>
                    <div className="summary-value">
                      {formatCurrency(initialCash - Object.values(selectedDebts).reduce((a, b) => a + b, 0))}
                    </div>
                  </div>
                </div>

                <div className="setup-navigation">
                  <button className="setup-button prev" onClick={() => handleSetupNavigation("prev")}>
                    Previous
                  </button>
                  <button className="setup-button start" onClick={() => handleSetupNavigation("next")}>
                    Start Simulation
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : lifeEnded ? (
          <div className="life-end-container">
            <h2>Life Simulation Complete</h2>

            <div className="life-summary">
              <div className="summary-header">
                <h3>Financial Life Summary</h3>
                <div className="age-span">
                  Age {selectedAge} to {gameAge}
                </div>
              </div>

              <div className="summary-stats">
                <div className="stat-item">
                  <div className="stat-label">Starting Net Worth:</div>
                  <div className="stat-value">{formatCurrency(lifeEndSummary.startingNetWorth)}</div>
                </div>

                <div className="stat-item">
                  <div className="stat-label">Final Net Worth:</div>
                  <div className="stat-value highlight">{formatCurrency(lifeEndSummary.finalNetWorth)}</div>
                </div>

                <div className="stat-item">
                  <div className="stat-label">Wealth Growth:</div>
                  <div className={`stat-value ${lifeEndSummary.growthPercentage >= 0 ? "positive" : "negative"}`}>
                    {lifeEndSummary.growthPercentage.toFixed(2)}%
                  </div>
                </div>

                <div className="stat-item">
                  <div className="stat-label">Years Lived:</div>
                  <div className="stat-value">{lifeEndSummary.yearsLived} years</div>
                </div>

                <div className="stat-item">
                  <div className="stat-label">Top Asset Class:</div>
                  <div className="stat-value">{lifeEndSummary.topAssetClass}</div>
                </div>

                <div className="stat-item">
                  <div className="stat-label">Financial Decisions Made:</div>
                  <div className="stat-value">{lifeEndSummary.totalDecisions}</div>
                </div>
              </div>

              <div className="performance-message">
                <h4>
                  Financial Performance:{" "}
                  <span className={lifeEndSummary.performanceCategory}>{lifeEndSummary.performanceCategory}</span>
                </h4>
                <p>{lifeEndSummary.message}</p>
              </div>

              <button className="restart-button" onClick={resetGame}>
                Start New Life
              </button>
            </div>
          </div>
        ) : (
          <div className="simulator-game">
            <div className="game-header">
              <div className="game-info">
                <div className="game-date">
                  Year {gameYear}, Month {gameMonth}
                </div>
                <div className="game-age">Age: {gameAge}</div>
              </div>

              <div className="game-controls">
                <button
                  className={`control-button ${isPaused ? "play" : "pause"}`}
                  onClick={() => setIsPaused(!isPaused)}
                >
                  {isPaused ? "Play" : "Pause"}
                </button>

                <div className="speed-controls">
                  <button
                    className={`speed-button ${gameSpeed === "slow" ? "active" : ""}`}
                    onClick={() => setGameSpeed("slow")}
                  >
                    Slow
                  </button>
                  <button
                    className={`speed-button ${gameSpeed === "normal" ? "active" : ""}`}
                    onClick={() => setGameSpeed("normal")}
                  >
                    Normal
                  </button>
                  <button
                    className={`speed-button ${gameSpeed === "fast" ? "active" : ""}`}
                    onClick={() => setGameSpeed("fast")}
                  >
                    Fast
                  </button>
                </div>
              </div>

              <div className="player-summary">
                <div className="summary-item">
                  <div className="summary-label">Cash</div>
                  <div className="summary-value">{formatCurrency(player.cash)}</div>
                </div>

                <div className="summary-item">
                  <div className="summary-label">Net Worth</div>
                  <div className="summary-value">{formatCurrency(player.netWorth)}</div>
                </div>
              </div>
            </div>

            <div className="game-tabs">
              <button
                className={`tab-button ${activeTab === "dashboard" ? "active" : ""}`}
                onClick={() => setActiveTab("dashboard")}
              >
                Dashboard
              </button>
              <button
                className={`tab-button ${activeTab === "invest" ? "active" : ""}`}
                onClick={() => setActiveTab("invest")}
              >
                Invest
              </button>
              <button
                className={`tab-button ${activeTab === "career" ? "active" : ""}`}
                onClick={() => setActiveTab("career")}
              >
                Career
              </button>
              <button
                className={`tab-button ${activeTab === "assets" ? "active" : ""}`}
                onClick={() => setActiveTab("assets")}
              >
                Assets
              </button>
              <button
                className={`tab-button ${activeTab === "taxes" ? "active" : ""}`}
                onClick={() => setActiveTab("taxes")}
              >
                Taxes
              </button>
              <button
                className={`tab-button ${activeTab === "achievements" ? "active" : ""}`}
                onClick={() => setActiveTab("achievements")}
              >
                Achievements
              </button>
            </div>

            <div className="game-content">
              {activeTab === "dashboard" && (
                <div className="dashboard-tab">
                  <div className="dashboard-grid">
                    <div className="dashboard-card financial-summary">
                      <h3>Financial Summary</h3>
                      <div className="summary-grid">
                        <div className="summary-row">
                          <div className="summary-label">Cash</div>
                          <div className="summary-value">{formatCurrency(player.cash)}</div>
                        </div>
                        <div className="summary-row">
                          <div className="summary-label">Net Worth</div>
                          <div className="summary-value">{formatCurrency(player.netWorth)}</div>
                        </div>
                        <div className="summary-row">
                          <div className="summary-label">Total Assets</div>
                          <div className="summary-value">
                            {formatCurrency(
                              player.netWorth + Object.values(player.liabilities).reduce((a, b) => a + b, 0),
                            )}
                          </div>
                        </div>
                        <div className="summary-row">
                          <div className="summary-label">Total Liabilities</div>
                          <div className="summary-value">
                            {formatCurrency(Object.values(player.liabilities).reduce((a, b) => a + b, 0))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="dashboard-card income-expenses">
                      <h3>Monthly Cash Flow</h3>
                      <div className="cashflow-grid">
                        <div className="cashflow-section">
                          <h4>Income</h4>
                          <div className="cashflow-row">
                            <div className="cashflow-label">Salary</div>
                            <div className="cashflow-value">{formatCurrency(player.salary)}</div>
                          </div>
                          <div className="cashflow-row">
                            <div className="cashflow-label">Investments</div>
                            <div className="cashflow-value">
                              {formatCurrency(player.monthlyIncome?.investments || 0)}
                            </div>
                          </div>
                          <div className="cashflow-row total">
                            <div className="cashflow-label">Total Income</div>
                            <div className="cashflow-value">
                              {formatCurrency((player.salary || 0) + (player.monthlyIncome?.investments || 0))}
                            </div>
                          </div>
                        </div>

                        <div className="cashflow-section">
                          <h4>Expenses</h4>
                          <div className="cashflow-row">
                            <div className="cashflow-label">Living Expenses</div>
                            <div className="cashflow-value">{formatCurrency(player.expenses)}</div>
                          </div>
                          <div className="cashflow-row">
                            <div className="cashflow-label">Taxes</div>
                            <div className="cashflow-value">{formatCurrency(player.salary * player.taxRate)}</div>
                          </div>
                          <div className="cashflow-row">
                            <div className="cashflow-label">Debt Payments</div>
                            <div className="cashflow-value">{formatCurrency(player.monthlyExpenses?.debt || 0)}</div>
                          </div>
                          <div className="cashflow-row total">
                            <div className="cashflow-label">Total Expenses</div>
                            <div className="cashflow-value">
                              {formatCurrency(
                                player.expenses + player.salary * player.taxRate + (player.monthlyExpenses?.debt || 0),
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="net-cashflow">
                        <div className="cashflow-label">Net Monthly Cash Flow</div>
                        <div
                          className={`cashflow-value ${(player.salary || 0) + (player.monthlyIncome?.investments || 0) - (player.expenses + player.salary * player.taxRate + (player.monthlyExpenses?.debt || 0)) >= 0 ? "positive" : "negative"}`}
                        >
                          {formatCurrency(
                            (player.salary || 0) +
                              (player.monthlyIncome?.investments || 0) -
                              (player.expenses + player.salary * player.taxRate + (player.monthlyExpenses?.debt || 0)),
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="dashboard-card market-overview">
                      <h3>Market Overview</h3>
                      <div className="market-indicators">
                        <div className="market-indicator">
                          <div className="indicator-label">Stock Market</div>
                          <div className="indicator-value">{market.stockMarket.index.toLocaleString()}</div>
                          <div className={`indicator-trend ${market.stockMarket.trend}`}>
                            {market.stockMarket.trend}
                          </div>
                        </div>

                        <div className="market-indicator">
                          <div className="indicator-label">Real Estate</div>
                          <div className="indicator-trend">{market.realEstate.trend}</div>
                        </div>

                        <div className="market-indicator">
                          <div className="indicator-label">Savings Rate</div>
                          <div className="indicator-value">{formatPercentage(market.banks.savingsRate)}</div>
                        </div>

                        <div className="market-indicator">
                          <div className="indicator-label">Mortgage Rate</div>
                          <div className="indicator-value">{formatPercentage(market.banks.mortgageRate)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "invest" && (
                <div className="invest-tab">
                  <div className="invest-options">
                    <div className="invest-option-card">
                      <h3>Stock Market</h3>
                      <p>Current Index: {market.stockMarket.index.toLocaleString()}</p>
                      <p>
                        Trend: <span className={market.stockMarket.trend}>{market.stockMarket.trend}</span>
                      </p>

                      <div className="stock-list">
                        <div className="stock-header">
                          <div className="stock-cell">Symbol</div>
                          <div className="stock-cell">Name</div>
                          <div className="stock-cell">Price</div>
                          <div className="stock-cell">Change</div>
                          <div className="stock-cell">Actions</div>
                        </div>

                        {market.stockMarket.stocks.map((stock) => (
                          <div key={stock.id} className="stock-row">
                            <div className="stock-cell">{stock.symbol}</div>
                            <div className="stock-cell">{stock.name}</div>
                            <div className="stock-cell">{formatCurrency(stock.price)}</div>
                            <div className={`stock-cell ${stock.change >= 0 ? "positive" : "negative"}`}>
                              {stock.change >= 0 ? "+" : ""}
                              {stock.change}%
                            </div>
                            <div className="stock-cell actions">
                              <button className="action-button buy" onClick={() => buyStock(stock.symbol, 10)}>
                                Buy
                              </button>
                              <button
                                className="action-button sell"
                                onClick={() => sellStock(stock.symbol, 10)}
                                disabled={
                                  !player.assets.stocks.some((s) => s.symbol === stock.symbol && s.shares >= 10)
                                }
                              >
                                Sell
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "career" && (
                <div className="career-tab">
                  <div className="career-header">
                    <h3>Your Career: {player.career}</h3>
                    <div className="career-stats">
                      <div className="stat-item">
                        <div className="stat-label">Current Salary</div>
                        <div className="stat-value">{formatCurrency(player.salary)}/year</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-label">Years in Career</div>
                        <div className="stat-value">{gameYear} years</div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-label">Career Level</div>
                        <div className="stat-value">{player.career.includes("Senior") ? "Senior" : "Junior"}</div>
                      </div>
                    </div>
                  </div>

                  <div className="career-skills">
                    <h4>Your Skills</h4>
                    <div className="skills-grid">
                      {Object.entries(player.skills).map(([skill, level]) => (
                        <div key={skill} className="skill-item">
                          <div className="skill-name">{skill.charAt(0).toUpperCase() + skill.slice(1)}</div>
                          <div className="skill-bar">
                            <div className="skill-progress" style={{ width: `${(level / 10) * 100}%` }}></div>
                          </div>
                          <div className="skill-level">Level {level}</div>
                          <button
                            className="skill-improve-btn"
                            onClick={() => {
                              if (player.cash >= 50000) {
                                setPlayer((prev) => ({
                                  ...prev,
                                  cash: prev.cash - 50000,
                                  skills: {
                                    ...prev.skills,
                                    [skill]: prev.skills[skill] + 1,
                                  },
                                }))
                              } else {
                                alert("Not enough cash to improve this skill!")
                              }
                            }}
                          >
                            Improve (₹50,000)
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="career-opportunities">
                    <h4>Career Opportunities</h4>
                    <div className="opportunities-grid">
                      <div className="opportunity-card">
                        <h5>Ask for Promotion</h5>
                        <p>Request a promotion at your current job. Success depends on your career skill level.</p>
                        <div className="opportunity-details">
                          <div className="detail-item">
                            <span>Success Chance:</span> {Math.min(player.skills.career * 10, 90)}%
                          </div>
                          <div className="detail-item">
                            <span>Salary Increase:</span> +15%
                          </div>
                        </div>
                        <button
                          className="opportunity-btn"
                          onClick={() => {
                            const successChance = Math.min(player.skills.career * 10, 90)
                            if (Math.random() * 100 < successChance) {
                              setPlayer((prev) => ({
                                ...prev,
                                salary: Math.round(prev.salary * 1.15),
                                career: prev.career.includes("Senior") ? prev.career : `Senior ${prev.career}`,
                              }))
                              alert("Congratulations! You've been promoted!")
                            } else {
                              alert(
                                "Unfortunately, your promotion request was denied. Try improving your skills first.",
                              )
                            }
                          }}
                        >
                          Request Promotion
                        </button>
                      </div>

                      <div className="opportunity-card">
                        <h5>Job Training</h5>
                        <p>Attend professional training to improve your career prospects and skills.</p>
                        <div className="opportunity-details">
                          <div className="detail-item">
                            <span>Cost:</span> {formatCurrency(100000)}
                          </div>
                          <div className="detail-item">
                            <span>Skills Gain:</span> +1 to all skills
                          </div>
                        </div>
                        <button
                          className="opportunity-btn"
                          onClick={() => {
                            if (player.cash >= 100000) {
                              setPlayer((prev) => ({
                                ...prev,
                                cash: prev.cash - 100000,
                                skills: Object.fromEntries(
                                  Object.entries(prev.skills).map(([skill, level]) => [skill, level + 1]),
                                ),
                              }))
                              alert("Training completed successfully! All skills improved.")
                            } else {
                              alert("Not enough cash for this training program!")
                            }
                          }}
                          disabled={player.cash < 100000}
                        >
                          Attend Training
                        </button>
                      </div>

                      <div className="opportunity-card">
                        <h5>Change Career</h5>
                        <p>
                          Switch to a new career path. This may result in a temporary salary reduction but better
                          long-term prospects.
                        </p>
                        <div className="opportunity-details">
                          <div className="detail-item">
                            <span>Initial Salary:</span> -20% (temporary)
                          </div>
                          <div className="detail-item">
                            <span>Growth Potential:</span> +25% (long-term)
                          </div>
                        </div>
                        <select
                          className="career-select"
                          onChange={(e) => {
                            if (e.target.value !== "") {
                              const newCareer = careerOptions.find((c) => c.id === Number.parseInt(e.target.value))
                              if (
                                window.confirm(
                                  `Are you sure you want to change your career to ${newCareer.title}? This will reduce your salary temporarily.`,
                                )
                              ) {
                                setPlayer((prev) => ({
                                  ...prev,
                                  career: newCareer.title,
                                  salary: Math.round(prev.salary * 0.8),
                                  skills: {
                                    ...prev.skills,
                                    [newCareer.skillBonus]: prev.skills[newCareer.skillBonus] + 2,
                                  },
                                }))
                                alert(`You've successfully changed your career to ${newCareer.title}!`)
                              }
                            }
                          }}
                          defaultValue=""
                        >
                          <option value="">Select New Career</option>
                          {careerOptions.map((career) => (
                            <option key={career.id} value={career.id}>
                              {career.title} - {formatCurrency(career.startingSalary)}/year
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "assets" && (
                <div className="assets-tab">
                  <div className="assets-overview">
                    <h3>Assets Overview</h3>
                    <div className="asset-allocation-chart">
                      <div className="chart-container">
                        <h4>Asset Allocation</h4>
                        <div className="pie-chart">
                          {/* Simple visual representation of asset allocation */}
                          <div className="pie-segments">
                            {player.assets.stocks.length > 0 && (
                              <div
                                className="pie-segment stocks"
                                style={{
                                  transform: `rotate(0deg)`,
                                  clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(Math.PI * 2 * (player.assets.stocks.reduce((sum, stock) => sum + stock.currentValue, 0) / player.netWorth))}% ${50 - 50 * Math.sin(Math.PI * 2 * (player.assets.stocks.reduce((sum, stock) => sum + stock.currentValue, 0) / player.netWorth))}%, 50% 50%)`,
                                }}
                              ></div>
                            )}
                            {player.assets.realEstate.length > 0 && (
                              <div
                                className="pie-segment real-estate"
                                style={{
                                  transform: `rotate(${360 * (player.assets.stocks.reduce((sum, stock) => sum + stock.currentValue, 0) / player.netWorth)}deg)`,
                                  clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(Math.PI * 2 * (player.assets.realEstate.reduce((sum, property) => sum + property.value, 0) / player.netWorth))}% ${50 - 50 * Math.sin(Math.PI * 2 * (player.assets.realEstate.reduce((sum, property) => sum + property.value, 0) / player.netWorth))}%, 50% 50%)`,
                                }}
                              ></div>
                            )}
                            <div
                              className="pie-segment cash"
                              style={{
                                transform: `rotate(${360 * ((player.assets.stocks.reduce((sum, stock) => sum + stock.currentValue, 0) + player.assets.realEstate.reduce((sum, property) => sum + property.value, 0)) / player.netWorth)}deg)`,
                                clipPath: `polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 50%)`,
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="chart-legend">
                          <div className="legend-item">
                            <div className="legend-color stocks"></div>
                            <div className="legend-label">Stocks</div>
                            <div className="legend-value">
                              {formatCurrency(player.assets.stocks.reduce((sum, stock) => sum + stock.currentValue, 0))}
                            </div>
                          </div>
                          <div className="legend-item">
                            <div className="legend-color real-estate"></div>
                            <div className="legend-label">Real Estate</div>
                            <div className="legend-value">
                              {formatCurrency(
                                player.assets.realEstate.reduce((sum, property) => sum + property.value, 0),
                              )}
                            </div>
                          </div>
                          <div className="legend-item">
                            <div className="legend-color cash"></div>
                            <div className="legend-label">Cash</div>
                            <div className="legend-value">{formatCurrency(player.cash)}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="assets-details">
                    <div className="assets-tabs">
                      <button
                        className={`asset-tab-btn ${assetSubTab === "stocks" ? "active" : ""}`}
                        onClick={() => setAssetSubTab("stocks")}
                      >
                        Stocks
                      </button>
                      <button
                        className={`asset-tab-btn ${assetSubTab === "real-estate" ? "active" : ""}`}
                        onClick={() => setAssetSubTab("real-estate")}
                      >
                        Real Estate
                      </button>
                      <button
                        className={`asset-tab-btn ${assetSubTab === "other" ? "active" : ""}`}
                        onClick={() => setAssetSubTab("other")}
                      >
                        Other Assets
                      </button>
                    </div>

                    <div className="asset-content">
                      {assetSubTab === "stocks" && (
                        <div className="stocks-content">
                          <h4>Your Stock Portfolio</h4>
                          {player.assets.stocks.length > 0 ? (
                            <div className="stocks-table">
                              <div className="stocks-header">
                                <div className="stock-cell">Symbol</div>
                                <div className="stock-cell">Shares</div>
                                <div className="stock-cell">Avg. Price</div>
                                <div className="stock-cell">Current Price</div>
                                <div className="stock-cell">Value</div>
                                <div className="stock-cell">Gain/Loss</div>
                                <div className="stock-cell">Actions</div>
                              </div>
                              <div className="stocks-body">
                                {player.assets.stocks.map((stock) => {
                                  const currentStock = market.stockMarket.stocks.find((s) => s.symbol === stock.symbol)
                                  const currentPrice = currentStock ? currentStock.price : 0
                                  const currentValue = stock.shares * currentPrice
                                  const gainLoss = currentValue - stock.averageCost * stock.shares
                                  const gainLossPercent = (currentPrice / stock.averageCost - 1) * 100

                                  return (
                                    <div key={stock.symbol} className="stock-row">
                                      <div className="stock-cell">{stock.symbol}</div>
                                      <div className="stock-cell">{stock.shares}</div>
                                      <div className="stock-cell">{formatCurrency(stock.averageCost)}</div>
                                      <div className="stock-cell">{formatCurrency(currentPrice)}</div>
                                      <div className="stock-cell">{formatCurrency(currentValue)}</div>
                                      <div className={`stock-cell ${gainLoss >= 0 ? "positive" : "negative"}`}>
                                        {formatCurrency(gainLoss)} ({gainLossPercent.toFixed(2)}%)
                                      </div>
                                      <div className="stock-cell">
                                        <button
                                          className="sell-btn"
                                          onClick={() => {
                                            const sellAmount = prompt(
                                              `How many shares of ${stock.symbol} do you want to sell? (Max: ${stock.shares})`,
                                            )
                                            const amount = Number.parseInt(sellAmount)
                                            if (!isNaN(amount) && amount > 0 && amount <= stock.shares) {
                                              sellStock(stock.symbol, amount)
                                            }
                                          }}
                                        >
                                          Sell
                                        </button>
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          ) : (
                            <div className="no-assets-message">
                              You don't own any stocks yet. Visit the Invest tab to start building your stock portfolio.
                            </div>
                          )}
                        </div>
                      )}

                      {assetSubTab === "real-estate" && (
                        <div className="real-estate-content">
                          <h4>Your Real Estate Portfolio</h4>
                          {player.assets.realEstate.length > 0 ? (
                            <div className="properties-grid">
                              {player.assets.realEstate.map((property, index) => (
                                <div key={index} className="property-card">
                                  <div className="property-header">
                                    <h5>{property.type}</h5>
                                    <div className="property-location">{property.location}</div>
                                  </div>
                                  <div className="property-details">
                                    <div className="property-detail">
                                      <span>Purchase Price:</span> {formatCurrency(property.purchasePrice)}
                                    </div>
                                    <div className="property-detail">
                                      <span>Current Value:</span> {formatCurrency(property.value)}
                                    </div>
                                    <div className="property-detail">
                                      <span>Monthly Rent:</span> {formatCurrency(property.rent)}
                                    </div>
                                    <div className="property-detail">
                                      <span>Condition:</span> {property.condition}
                                    </div>
                                    <div className="property-detail">
                                      <span>Annual Appreciation:</span> {(property.appreciation * 100).toFixed(1)}%
                                    </div>
                                  </div>
                                  <div className="property-actions">
                                    <button
                                      className="property-action-btn"
                                      onClick={() => {
                                        if (
                                          window.confirm(
                                            `Are you sure you want to sell this ${property.type} for ${formatCurrency(property.value)}?`,
                                          )
                                        ) {
                                          setPlayer((prev) => {
                                            const updatedRealEstate = prev.assets.realEstate.filter(
                                              (_, i) => i !== index,
                                            )
                                            return {
                                              ...prev,
                                              cash: prev.cash + property.value,
                                              assets: {
                                                ...prev.assets,
                                                realEstate: updatedRealEstate,
                                              },
                                            }
                                          })
                                          alert(
                                            `You've sold your ${property.type} for ${formatCurrency(property.value)}`,
                                          )
                                        }
                                      }}
                                    >
                                      Sell Property
                                    </button>
                                    <button
                                      className="property-action-btn"
                                      onClick={() => {
                                        const improvementCost = property.value * 0.05
                                        if (player.cash >= improvementCost) {
                                          if (
                                            window.confirm(
                                              `Improve this property for ${formatCurrency(improvementCost)}? This will increase its value and rent.`,
                                            )
                                          ) {
                                            setPlayer((prev) => {
                                              const updatedRealEstate = [...prev.assets.realEstate]
                                              updatedRealEstate[index] = {
                                                ...property,
                                                condition: "Excellent",
                                                value: Math.round(property.value * 1.1),
                                                rent: Math.round(property.rent * 1.15),
                                              }
                                              return {
                                                ...prev,
                                                cash: prev.cash - improvementCost,
                                                assets: {
                                                  ...prev.assets,
                                                  realEstate: updatedRealEstate,
                                                },
                                              }
                                            })
                                            alert(`You've improved your ${property.type}!`)
                                          }
                                        } else {
                                          alert("Not enough cash for this improvement!")
                                        }
                                      }}
                                      disabled={
                                        player.cash < property.value * 0.05 || property.condition === "Excellent"
                                      }
                                    >
                                      Improve ({formatCurrency(property.value * 0.05)})
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="no-assets-message">
                              <p>You don't own any real estate yet.</p>
                              <div className="property-market">
                                <h5>Available Properties</h5>
                                <div className="properties-grid">
                                  {market.realEstate.properties.slice(0, 3).map((property, index) => (
                                    <div key={index} className="property-card">
                                      <div className="property-header">
                                        <h5>{property.type}</h5>
                                        <div className="property-location">{property.location}</div>
                                      </div>
                                      <div className="property-details">
                                        <div className="property-detail">
                                          <span>Price:</span> {formatCurrency(property.price)}
                                        </div>
                                        <div className="property-detail">
                                          <span>Monthly Rent:</span> {formatCurrency(property.rent)}
                                        </div>
                                        <div className="property-detail">
                                          <span>Condition:</span> {property.condition}
                                        </div>
                                        <div className="property-detail">
                                          <span>Annual Appreciation:</span> {(property.appreciation * 100).toFixed(1)}%
                                        </div>
                                      </div>
                                      <button
                                        className="buy-property-btn"
                                        onClick={() => {
                                          if (player.cash >= property.price) {
                                            if (
                                              window.confirm(
                                                `Are you sure you want to purchase this ${property.type} for ${formatCurrency(property.price)}?`,
                                              )
                                            ) {
                                              setPlayer((prev) => {
                                                return {
                                                  ...prev,
                                                  cash: prev.cash - property.price,
                                                  assets: {
                                                    ...prev.assets,
                                                    realEstate: [
                                                      ...prev.assets.realEstate,
                                                      {
                                                        ...property,
                                                        purchasePrice: property.price,
                                                        value: property.price,
                                                        purchaseYear: gameYear,
                                                        purchaseMonth: gameMonth,
                                                      },
                                                    ],
                                                  },
                                                }
                                              })
                                              alert(
                                                `Congratulations! You've purchased a ${property.type} in ${property.location}!`,
                                              )
                                            }
                                          } else {
                                            alert("Not enough cash to purchase this property!")
                                          }
                                        }}
                                        disabled={player.cash < property.price}
                                      >
                                        Buy ({formatCurrency(property.price)})
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {assetSubTab === "other" && (
                        <div className="other-assets-content">
                          <h4>Other Investments</h4>
                          <div className="other-assets-grid">
                            <div className="asset-category">
                              <h5>Mutual Funds</h5>
                              {player.assets.mutualFunds.length > 0 ? (
                                <div className="mutual-funds-list">
                                  {player.assets.mutualFunds.map((fund, index) => (
                                    <div key={index} className="fund-item">
                                      <div className="fund-name">{fund.name}</div>
                                      <div className="fund-value">{formatCurrency(fund.value)}</div>
                                      <div className="fund-return">
                                        +{((fund.lastReturn / fund.value) * 100).toFixed(2)}% last month
                                      </div>
                                      <button
                                        className="sell-fund-btn"
                                        onClick={() => {
                                          if (
                                            window.confirm(
                                              `Are you sure you want to sell your investment in ${fund.name}?`,
                                            )
                                          ) {
                                            setPlayer((prev) => {
                                              const updatedFunds = prev.assets.mutualFunds.filter((_, i) => i !== index)
                                              return {
                                                ...prev,
                                                cash: prev.cash + fund.value,
                                                assets: {
                                                  ...prev.assets,
                                                  mutualFunds: updatedFunds,
                                                },
                                              }
                                            })
                                            alert(
                                              `You've sold your investment in ${fund.name} for ${formatCurrency(fund.value)}`,
                                            )
                                          }
                                        }}
                                      >
                                        Sell
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="no-assets-message">
                                  <p>You don't have any mutual fund investments.</p>
                                  <div className="available-funds">
                                    <h6>Available Funds</h6>
                                    <div className="funds-list">
                                      {market.mutualFunds.slice(0, 3).map((fund, index) => (
                                        <div key={index} className="available-fund">
                                          <div className="fund-info">
                                            <div className="fund-name">{fund.name}</div>
                                            <div className="fund-category">{fund.category}</div>
                                            <div className="fund-details">
                                              <span>Return: {(fund.return * 100).toFixed(2)}%</span>
                                              <span>Risk: {fund.risk}</span>
                                            </div>
                                          </div>
                                          <div className="fund-actions">
                                            <input
                                              type="number"
                                              placeholder="Amount"
                                              min="10000"
                                              step="10000"
                                              className="fund-amount"
                                              id={`fund-amount-${index}`}
                                            />
                                            <button
                                              className="invest-btn"
                                              onClick={() => {
                                                const amountInput = document.getElementById(`fund-amount-${index}`)
                                                const amount = Number.parseInt(amountInput.value)
                                                if (!isNaN(amount) && amount > 0 && amount <= player.cash) {
                                                  setPlayer((prev) => {
                                                    return {
                                                      ...prev,
                                                      cash: prev.cash - amount,
                                                      assets: {
                                                        ...prev.assets,
                                                        mutualFunds: [
                                                          ...prev.assets.mutualFunds,
                                                          {
                                                            name: fund.name,
                                                            fundId: fund.id,
                                                            value: amount,
                                                            purchaseYear: gameYear,
                                                            purchaseMonth: gameMonth,
                                                            lastReturn: 0,
                                                          },
                                                        ],
                                                      },
                                                    }
                                                  })
                                                  alert(`You've invested ${formatCurrency(amount)} in ${fund.name}!`)
                                                  amountInput.value = ""
                                                } else {
                                                  alert("Please enter a valid amount that you can afford!")
                                                }
                                              }}
                                            >
                                              Invest
                                            </button>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "taxes" && (
                <div className="taxes-tab">
                  <div className="tax-overview">
                    <h3>Tax Overview</h3>
                    <div className="tax-summary">
                      <div className="tax-item">
                        <div className="tax-label">Current Tax Rate</div>
                        <div className="tax-value">{(player.taxRate * 100).toFixed(1)}%</div>
                      </div>
                      <div className="tax-item">
                        <div className="tax-label">Annual Income</div>
                        <div className="tax-value">{formatCurrency(player.salary)}</div>
                      </div>
                      <div className="tax-item">
                        <div className="tax-label">Estimated Annual Tax</div>
                        <div className="tax-value">{formatCurrency(player.salary * player.taxRate)}</div>
                      </div>
                      <div className="tax-item">
                        <div className="tax-label">Tax Planning Skill</div>
                        <div className="tax-value">Level {player.skills.taxPlanning}</div>
                      </div>
                    </div>
                  </div>

                  <div className="tax-planning">
                    <h3>Tax Planning Strategies</h3>
                    <div className="strategies-grid">
                      <div className="strategy-card">
                        <h4>Tax-Saving Investments</h4>
                        <p>Invest in tax-saving instruments to reduce your taxable income.</p>
                        <div className="strategy-details">
                          <div className="detail-item">
                            <span>Cost:</span> {formatCurrency(150000)}
                          </div>
                          <div className="detail-item">
                            <span>Tax Reduction:</span> {formatCurrency(150000 * player.taxRate)}
                          </div>
                          <div className="detail-item">
                            <span>Net Savings:</span> {formatCurrency(150000 * player.taxRate)}
                          </div>
                        </div>
                        <button
                          className="strategy-btn"
                          onClick={() => {
                            if (player.cash >= 150000) {
                              setPlayer((prev) => {
                                return {
                                  ...prev,
                                  cash: prev.cash - 150000,
                                  taxRate: Math.max(prev.taxRate - 0.02, 0.15),
                                }
                              })
                              alert("You've made tax-saving investments! Your tax rate has been reduced.")
                            } else {
                              alert("Not enough cash for this investment!")
                            }
                          }}
                          disabled={player.cash < 150000}
                        >
                          Invest in Tax-Saving Instruments
                        </button>
                      </div>

                      <div className="strategy-card">
                        <h4>Hire Tax Consultant</h4>
                        <p>Hire a professional tax consultant to optimize your tax strategy.</p>
                        <div className="strategy-details">
                          <div className="detail-item">
                            <span>Cost:</span> {formatCurrency(50000)}
                          </div>
                          <div className="detail-item">
                            <span>Duration:</span> 1 year
                          </div>
                          <div className="detail-item">
                            <span>Tax Skill Increase:</span> +1 level
                          </div>
                        </div>
                        <button
                          className="strategy-btn"
                          onClick={() => {
                            if (player.cash >= 50000) {
                              setPlayer((prev) => {
                                return {
                                  ...prev,
                                  cash: prev.cash - 50000,
                                  skills: {
                                    ...prev.skills,
                                    taxPlanning: prev.skills.taxPlanning + 1,
                                  },
                                  taxRate: Math.max(prev.taxRate - 0.01, 0.15),
                                }
                              })
                              alert(
                                "You've hired a tax consultant! Your tax planning skill has improved and your tax rate has been slightly reduced.",
                              )
                            } else {
                              alert("Not enough cash to hire a tax consultant!")
                            }
                          }}
                          disabled={player.cash < 50000}
                        >
                          Hire Consultant
                        </button>
                      </div>

                      <div className="strategy-card">
                        <h4>Charitable Donations</h4>
                        <p>Make charitable donations to reduce your taxable income and contribute to society.</p>
                        <div className="strategy-details">
                          <div className="detail-item">
                            <span>Donation Amount:</span> {formatCurrency(100000)}
                          </div>
                          <div className="detail-item">
                            <span>Tax Deduction:</span> 100%
                          </div>
                          <div className="detail-item">
                            <span>Tax Savings:</span> {formatCurrency(100000 * player.taxRate)}
                          </div>
                        </div>
                        <button
                          className="strategy-btn"
                          onClick={() => {
                            if (player.cash >= 100000) {
                              setPlayer((prev) => {
                                return {
                                  ...prev,
                                  cash: prev.cash - 100000,
                                  taxRate: Math.max(prev.taxRate - 0.015, 0.15),
                                  achievements: [
                                    ...prev.achievements,
                                    {
                                      title: "Philanthropist",
                                      description: "Made a significant charitable donation",
                                      year: gameYear,
                                      month: gameMonth,
                                    },
                                  ],
                                }
                              })
                              alert(
                                "You've made a charitable donation! Your tax rate has been reduced and you've earned the Philanthropist achievement.",
                              )
                            } else {
                              alert("Not enough cash to make this donation!")
                            }
                          }}
                          disabled={player.cash < 100000}
                        >
                          Make Donation
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="tax-calculator">
                    <h3>Tax Calculator</h3>
                    <div className="calculator-form">
                      <div className="form-row">
                        <label htmlFor="income">Annual Income:</label>
                        <input type="number" id="income" value={player.salary} readOnly />
                      </div>
                      <div className="form-row">
                        <label htmlFor="deductions">Deductions:</label>
                        <input
                          type="number"
                          id="deductions"
                          placeholder="Enter deductions amount"
                          onChange={(e) => {
                            const deductions = Number.parseInt(e.target.value) || 0
                            setTaxCalcDeductions(deductions)
                          }}
                        />
                      </div>
                      <div className="form-row">
                        <label htmlFor="tax-rate">Tax Rate:</label>
                        <input type="number" id="tax-rate" value={(player.taxRate * 100).toFixed(1)} readOnly />
                      </div>
                      <div className="calculator-results">
                        <div className="result-item">
                          <div className="result-label">Taxable Income:</div>
                          <div className="result-value">
                            {formatCurrency(Math.max(player.salary - (taxCalcDeductions || 0), 0))}
                          </div>
                        </div>
                        <div className="result-item">
                          <div className="result-label">Estimated Tax:</div>
                          <div className="result-value">
                            {formatCurrency(Math.max(player.salary - (taxCalcDeductions || 0), 0) * player.taxRate)}
                          </div>
                        </div>
                        <div className="result-item">
                          <div className="result-label">After-Tax Income:</div>
                          <div className="result-value">
                            {formatCurrency(
                              player.salary - Math.max(player.salary - (taxCalcDeductions || 0), 0) * player.taxRate,
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "achievements" && (
                <div className="achievements-tab">
                  <div className="achievements-header">
                    <h3>Your Achievements</h3>
                    <div className="achievements-summary">
                      <div className="summary-item">
                        <div className="summary-label">Total Achievements</div>
                        <div className="summary-value">{player.achievements.length}</div>
                      </div>
                      <div className="summary-item">
                        <div className="summary-label">Decisions Made</div>
                        <div className="summary-value">{player.decisions.length}</div>
                      </div>
                      <div className="summary-item">
                        <div className="summary-label">Years Simulated</div>
                        <div className="summary-value">{gameYear}</div>
                      </div>
                    </div>
                  </div>

                  <div className="achievements-list">
                    {player.achievements.length > 0 ? (
                      <div className="achievements-grid">
                        {player.achievements.map((achievement, index) => (
                          <div key={index} className="achievement-card">
                            <div className="achievement-icon">🏆</div>
                            <div className="achievement-content">
                              <h4 className="achievement-title">{achievement.title}</h4>
                              <div className="achievement-description">{achievement.description}</div>
                              <div className="achievement-date">
                                Achieved in Year {achievement.year}, Month {achievement.month}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="no-achievements">
                        <p>You haven't earned any achievements yet. Keep playing to unlock achievements!</p>
                      </div>
                    )}
                  </div>

                  <div className="milestones-section">
                    <h3>Financial Milestones</h3>
                    <div className="milestones-grid">
                      <div className={`milestone-card ${player.netWorth >= 2000000 ? "achieved" : ""}`}>
                        <div className="milestone-header">
                          <h4>Millionaire</h4>
                          <div className="milestone-status">
                            {player.netWorth >= 2000000 ? "Achieved" : "In Progress"}
                          </div>
                        </div>
                        <div className="milestone-description">Reach a net worth of ₹20,00,000 or more.</div>
                        <div className="milestone-progress">
                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{ width: `${Math.min((player.netWorth / 2000000) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <div className="progress-text">
                            {formatCurrency(player.netWorth)} / {formatCurrency(2000000)} (
                            {Math.min(Math.round((player.netWorth / 2000000) * 100), 100)}%)
                          </div>
                        </div>
                      </div>

                      <div className={`milestone-card ${player.assets.realEstate.length >= 3 ? "achieved" : ""}`}>
                        <div className="milestone-header">
                          <h4>Real Estate Tycoon</h4>
                          <div className="milestone-status">
                            {player.assets.realEstate.length >= 3 ? "Achieved" : "In Progress"}
                          </div>
                        </div>
                        <div className="milestone-description">Own at least 3 properties.</div>
                        <div className="milestone-progress">
                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{ width: `${Math.min((player.assets.realEstate.length / 3) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <div className="progress-text">
                            {player.assets.realEstate.length} / 3 (
                            {Math.min(Math.round((player.assets.realEstate.length / 3) * 100), 100)}%)
                          </div>
                        </div>
                      </div>

                      <div className={`milestone-card ${player.salary >= 200000 ? "achieved" : ""}`}>
                        <div className="milestone-header">
                          <h4>High Earner</h4>
                          <div className="milestone-status">{player.salary >= 200000 ? "Achieved" : "In Progress"}</div>
                        </div>
                        <div className="milestone-description">Reach an annual salary of ₹2,00,000 or more.</div>
                        <div className="milestone-progress">
                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{ width: `${Math.min((player.salary / 200000) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <div className="progress-text">
                            {formatCurrency(player.salary)} / {formatCurrency(200000)} (
                            {Math.min(Math.round((player.salary / 200000) * 100), 100)}%)
                          </div>
                        </div>
                      </div>

                      <div
                        className={`milestone-card ${Object.values(player.skills).reduce((sum, level) => sum + level, 0) >= 25 ? "achieved" : ""}`}
                      >
                        <div className="milestone-header">
                          <h4>Master of All Trades</h4>
                          <div className="milestone-status">
                            {Object.values(player.skills).reduce((sum, level) => sum + level, 0) >= 25
                              ? "Achieved"
                              : "In Progress"}
                          </div>
                        </div>
                        <div className="milestone-description">
                          Reach a combined skill level of 25 or more across all skills.
                        </div>
                        <div className="milestone-progress">
                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{
                                width: `${Math.min((Object.values(player.skills).reduce((sum, level) => sum + level, 0) / 25) * 100, 100)}%`,
                              }}
                            ></div>
                          </div>
                          <div className="progress-text">
                            {Object.values(player.skills).reduce((sum, level) => sum + level, 0)} / 25 (
                            {Math.min(
                              Math.round(
                                (Object.values(player.skills).reduce((sum, level) => sum + level, 0) / 25) * 100,
                              ),
                              100,
                            )}
                            %)
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Event Modal */}
      {showEvent && currentEvent && (
        <div className="event-modal">
          <div className="event-content">
            <h3 className="event-title">{currentEvent.title}</h3>
            <p className="event-description">{currentEvent.description}</p>

            <div className="event-options">
              {currentEvent.options.map((option, index) => (
                <button key={index} className="event-option" onClick={() => handleEventOption(option)}>
                  {option.text}
                  <span className="option-effect">{option.effect}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Simulation


