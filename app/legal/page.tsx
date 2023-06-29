import Image from 'next/image'

export default async function Home() {
  return <main className="flex min-h-screen flex items-center justify-center gap-12">

    <div className="flex flex-col items-center justify-center gap-4">
      <Image priority={true} src={'/chimp.png'} alt={'ahoy'} width={400} height={400} />
      <div className="text-4xl">yGptPlugin</div>
      <div>{'Legal - We need "legal" here. Can someone call legal?..'}</div>
    </div>

  </main>
}
