export interface Vault {
	address: string,
  name: string,
  version: string,
  symbol: string,
  decimals: number,
  token: {
    address: string,
    name: string,
    symbol: string,
    description: string
  },
  inception: number,
  details: {
    managementFee: number,
    performanceFee: number
  },
  apy: {
    gross_apr: number,
    net_apy: number
  }, 
  tvl: {
    tvl: number,
    price: number
  },
  strategies: Strategy[]
}

export interface Strategy {
  address: string,
  name: string,
  description: string,
  details: {
    totalDebt: string,
    totalLoss: string,
    totalGain: string,
    lastReport: string,
    apr: number,
    withdrawalQueuePosition: number
  }
}

export const defaultVault: Vault = {
  address: '',
  name: '',
  version: '',
  token: {
    address: '',
    name: '',
    symbol: '',
    description: ''
  },
  inception: 0,
  details: {
    managementFee: 0,
    performanceFee: 0
  },
  apy: {
    gross_apr: 0,
    net_apy: 0
  },
  tvl: {
    tvl: 0,
    price: 0
  },
  symbol: '',
  decimals: 0,
  strategies: []
}
