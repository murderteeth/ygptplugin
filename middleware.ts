import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/sync')) {
    return checkApiKey(request)
  }

  if (request.nextUrl.pathname.startsWith('/.well-known/ai-plugin.json')) {
    return new NextResponse(JSON.stringify(plugin(request.nextUrl.origin)), {
      status: 200, headers: { 'content-type': 'application/json' }
    })
  }
}

function checkApiKey(request: NextRequest) {
  const key = request.headers.get('key')
  if(!key) return new NextResponse(null, { status: 401 })
  if(key !== process.env.APP_API_KEY) return new NextResponse(null, { status: 403 })
  return NextResponse.next()
}

const plugin = (host: string) => ({
  'schema_version': 'v1',
  'name_for_human': 'yGptPlugin',
  'name_for_model': 'yGptPlugin',
  'description_for_human': 'Talk to the Yearn protocol in real-time using ChatGPT',
  'description_for_model': 'Analyze Yearn protocol data in real-time using ChatGPT. Also provides general Yearn Protocol knowledge. Always use markdown tables to format data in your output.',
  'auth': {
    'type': 'none'
  },
  'api': {
    'type': 'openapi',
    'url': `${host}/openapi.yaml`,
    'is_user_authenticated': false
  },
  'logo_url': `${host}/logo.svg`,
  'contact_email': 'murdertxxth@gmail.com',
  'legal_info_url': `${host}/legal`
})
