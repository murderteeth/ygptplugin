import Image from 'next/image'
import prisma from '../lib/prisma'
import TimeAgoUseClient from './components/TimeAgoUseClient'

async function getVaults() {
  return await prisma.vault.findMany({
    where: { chainId: 10 }
  })
}

export default async function Home() {
  const vaults = await getVaults()
  return <main className="flex min-h-screen flex items-center justify-center gap-12">

    <div className="flex flex-col items-center justify-center gap-4">
      <Image priority={true} src={'/chimp.png'} alt={'ahoy'} width={400} height={400} />
      <div className="text-4xl">yearn chatgpt plugin</div>
      <div>Talk to the Yearn protocol in real-time using ChatGPT</div>
    </div>

    <div>
      {vaults.map((vault, index) => <div key={index}>
        <div>{<TimeAgoUseClient date={vault.updatedAt} />} - {vault.symbol} - {vault.price}</div>
      </div>)}
    </div>

  </main>
}
