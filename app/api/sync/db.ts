import * as yDaemon from '@/lib/ydaemon/types'
import prisma from '../../../lib/prisma'

const DUST = 10_000

function toUsd(bigvalue: string, decimals: number, price: number) {
  return Number((BigInt(bigvalue) / (BigInt(10) ** BigInt(decimals)))) * price
}

export async function upsert(chainId: number, vault: yDaemon.Vault) {
  const strategies = vault.strategies.filter(s => toUsd(s.details.totalDebt, vault.decimals, vault.tvl.price) > 0)

  await prisma.vault.upsert({
    where: {
      chain_id_address: {
        chain_id: chainId,
        address: vault.address
      }
    },

    update: {
      name: vault.name,
      token_symbol: vault.symbol,
      tvl_in_usd: vault.tvl.tvl,
      net_annual_percent_yield: vault.apy.net_apy,
      gross_annual_percent_yield: vault.apy.gross_apr,
      deposit_token_name: vault.token.name,
      deposit_token_symbol: vault.token.symbol,
      deposit_token_description: vault.token.description,
      deposit_token_price: vault.tvl.price,
      strategies: {
        deleteMany: {},
        createMany: {
          data: [
            ...strategies.map(strategy => ({
              chain_id: chainId,
              address: strategy.address,
              name: strategy.name,
              total_debt_usd: toUsd(strategy.details.totalDebt, vault.decimals, vault.tvl.price),
              total_loss_usd: toUsd(strategy.details.totalLoss, vault.decimals, vault.tvl.price),
              total_gain_usd: toUsd(strategy.details.totalGain, vault.decimals, vault.tvl.price),
              last_report: new Date(parseInt(strategy.details.lastReport) * 1000),
              net_annual_percent_rate: strategy.details.apr,
              withdrawal_queue_index: strategy.details.withdrawalQueuePosition,
              description: strategy.description,
            }))
          ]
        }
      },
      updated_at: new Date()
    },

    create: {
      chain_id: chainId,
      address: vault.address,
      version: vault.version,
      name: vault.name,
      token_symbol: vault.symbol,
      tvl_in_usd: vault.tvl.tvl,
      net_annual_percent_yield: vault.apy.net_apy,
      gross_annual_percent_yield: vault.apy.gross_apr,
      deposit_token_name: vault.token.name,
      deposit_token_symbol: vault.token.symbol,
      deposit_token_description: vault.token.description,
      deposit_token_price: vault.tvl.price,
      strategies: {
        createMany: {
          data: [
            ...strategies.map(strategy => ({
              chain_id: chainId,
              address: strategy.address,
              name: strategy.name,
              total_debt_usd: toUsd(strategy.details.totalDebt, vault.decimals, vault.tvl.price),
              total_loss_usd: toUsd(strategy.details.totalLoss, vault.decimals, vault.tvl.price),
              total_gain_usd: toUsd(strategy.details.totalGain, vault.decimals, vault.tvl.price),
              last_report: new Date(strategy.details.lastReport),
              net_annual_percent_rate: strategy.details.apr,
              withdrawal_queue_index: strategy.details.withdrawalQueuePosition,
              description: strategy.description,
            }))
          ]
        }
      }
    }
  })
}