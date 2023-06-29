import * as yDaemon from '@/lib/ydaemon/types'
import axios from 'axios'
import prisma from '../../../lib/prisma'
import { NextResponse } from 'next/server'

// const chainIds = [1, 10, 250, 42161]
const chainIds = [10]
const endpoint = 'https://ydaemon.yearn.finance'

export async function POST() {
  for(const chainId of chainIds) {
    const ydaemonVaults = await axios.get<yDaemon.Vault[]>(`${endpoint}/${chainId}/vaults/all`).then(response => response.data)
    for(const ydaemonVault of ydaemonVaults) {
      await prisma.vault.upsert({
        where: {
          chain_id_address: {
            chain_id: chainId,
            address: ydaemonVault.address
          }
        },
        update: {
          name: ydaemonVault.name,
          token_symbol: ydaemonVault.symbol,
          tvl_in_usd: ydaemonVault.tvl.tvl,
          net_annual_percent_yield: ydaemonVault.apy.net_apy,
          gross_annual_percent_yield: ydaemonVault.apy.gross_apr,
          deposit_token_name: ydaemonVault.token.name,
          deposit_token_symbol: ydaemonVault.token.symbol,
          deposit_token_description: ydaemonVault.token.description,
          deposit_token_price: ydaemonVault.tvl.price,
          updated_at: new Date()
        },
        create: {
          chain_id: chainId,
          address: ydaemonVault.address,
          version: ydaemonVault.version,
          name: ydaemonVault.name,
          token_symbol: ydaemonVault.symbol,
          tvl_in_usd: ydaemonVault.tvl.tvl,
          net_annual_percent_yield: ydaemonVault.apy.net_apy,
          gross_annual_percent_yield: ydaemonVault.apy.gross_apr,
          deposit_token_name: ydaemonVault.token.name,
          deposit_token_symbol: ydaemonVault.token.symbol,
          deposit_token_description: ydaemonVault.token.description,
          deposit_token_price: ydaemonVault.tvl.price
        }
      })
    }
  }
  return NextResponse.json({ status: 'synced' })
}