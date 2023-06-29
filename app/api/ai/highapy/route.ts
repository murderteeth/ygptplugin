import prisma from '../../../../lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const vaults = await prisma.vault.findMany({
    select: {
      chain_id: true,
      address: true,
      token_symbol: true,
      name: true,
      net_annual_percent_yield: true,
      gross_annual_percent_yield: true
    },
    where: { chain_id: 1 },
    orderBy: { net_annual_percent_yield: 'desc' },
    take: 5
  })
  const result = vaults.map(vault => ({...vault, url: `https://yearn.finance/vaults/${vault.chain_id}/${vault.address}`}))
  return NextResponse.json(result)
}
