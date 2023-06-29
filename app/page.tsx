import Image from 'next/image'
import prisma from '../lib/prisma'
import TimeAgoUseClient from './components/TimeAgoUseClient'

// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#segment-cache-configuration
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
export const revalidate = 0

async function getVaults() {
  return await prisma.vault.findMany({
    where: { chain_id: 10 },
    orderBy: { tvl_in_usd: 'desc' },
    take: 20
  })
}

export default async function Home() {
  const vaults = await getVaults()
  return <main className="flex min-h-screen flex items-center justify-center gap-12">

    <div className="flex flex-col items-center justify-center gap-4">
      <Image priority={true} src={'/chimp.png'} alt={'ahoy'} width={400} height={400} />
      <div className="text-4xl">yGptPlugin</div>
      <div>Talk to the Yearn protocol in real-time using ChatGPT</div>
    </div>

    <div>
      {vaults.map((vault, index) => <div key={index}>
        <div>{<TimeAgoUseClient date={vault.updated_at} />} - {vault.token_symbol} - {vault.tvl_in_usd}</div>
      </div>)}
    </div>

  </main>
}
