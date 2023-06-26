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
          chainId_address: {
            chainId: chainId,
            address: ydaemonVault.address
          }
        },
        update: {
          name: ydaemonVault.name,
          symbol: ydaemonVault.symbol,
          decimals: ydaemonVault.decimals,
          price: ydaemonVault.tvl.price,
        },
        create: {
          chainId: chainId,
          address: ydaemonVault.address,
          version: ydaemonVault.version,
          name: ydaemonVault.name,
          symbol: ydaemonVault.symbol,
          decimals: ydaemonVault.decimals,
          price: ydaemonVault.tvl.price,
        }
      })
    }
  }
  return NextResponse.json({ status: 'synced' })
}