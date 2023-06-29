# yearn-chatgpt-plugin

## dev
```bash
yarn add vercel -g
vercel link
yarn
yarn pullenv
yarn dev
```

## db changes and migrations
```bash
# make changes to prisma/schema.prisma
yarn migrate
```

## manual plugin testing


## manual endpoint testing 
```bash
curl -v \
  -H "Content-type: application/json" \
  'http://localhost:3000/api/ai/highapy'
```

## sync
```bash
curl -v \
  -H "key: ********" \
  -H "Content-type: application/json" \
  -d '{ }' \
  'http://localhost:3000/api/sync'
```

## cron
uses qstash to keep sync cache
https://upstash.com
