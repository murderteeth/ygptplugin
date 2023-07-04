import * as yDaemon from '@/lib/ydaemon/types'
import * as db from './db'
import axios from 'axios'
import { NextResponse } from 'next/server'

// const chainIds = [1, 10, 250, 42161]
const chainIds = [1]
// const endpoint = 'https://ydaemon.yearn.finance'
const endpoint = 'https://ydaemon.ycorpo.com'
const query = 'strategiesCondition=all&strategiesDetails=withDetails&strategiesRisk=withRisk'

export async function POST() {
  for(const chainId of chainIds) {
    const ydaemonVaults = await axios.get<yDaemon.Vault[]>(`${endpoint}/${chainId}/vaults/all?${query}`).then(response => response.data)
    for(const ydaemonVault of ydaemonVaults) await db.upsert(chainId, ydaemonVault)
  }
  return NextResponse.json({ status: 'synced' })
}