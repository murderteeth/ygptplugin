import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'
import pg from 'pg'
import toSql from './ai'

const { Pool } = pg

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
})

export async function GET(request: NextRequest) {
  const languageQuery = request.nextUrl.searchParams.get('languageQuery')
  if(!languageQuery) return new NextResponse(null, { status: 400 })

  const sql = await toSql(languageQuery)
  if(process.env.NODE_ENV === 'development') {
    console.log('languageQuery', languageQuery)
    console.log('sql', sql)
  }

  const db = await pool.connect()
  const data = await db.query(sql)
  const vaultIds = data.rows as { chain_id: number, address: string }[]

  const vaults = await prisma.vault.findMany({
    select: {
      chain_id: true,
      address: true,
      token_symbol: true,
      name: true,
      net_annual_percent_yield: true,
      gross_annual_percent_yield: true,
      strategies: {
        select: {
          address: true,
          name: true,
          description: true,
          total_debt_usd: true,
          net_annual_percent_rate: true
        }
      }
    },
    where: { 
      address: {
        search: vaultIds.map(vault => vault.address).join(' | ')
      },
      AND: {
        chain_id: 1,
      }
    }
  })

  const result = vaults.map(vault => ({...vault, url: `https://yearn.finance/vaults/${vault.chain_id}/${vault.address}`}))
  return NextResponse.json(result)
}
