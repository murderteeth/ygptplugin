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

## sync
```bash
curl -v \
  -H "key: ********" \
  -H "Content-type: application/json" \
  -d '{ }' \
  'http://localhost:3000/api/sync'
```