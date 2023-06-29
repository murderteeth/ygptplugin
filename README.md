# ygptplugin


## dev
for now.. to run this project locally you either need to be a memeber of the murderteeth's vercel team or you can create your own vercel project and link to that. If you create your own vercel project, use the vercel dashboard to add a postgres database to your project. The following works in either case:
```bash
yarn add vercel -g
vercel link
yarn
yarn pullenv
yarn migrate
yarn dev
```

## db changes and migrations
```bash
# make changes to prisma/schema.prisma
yarn migrate
```

## local plugin testing
Go to ChatGPT's plugin store, click `Develop your own plugin`, enter `localhost:3000`.


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
uses qstash to keep data synced
https://upstash.com

schedule a QStash sync job
```
curl -v \
  -H "Authorization: Bearer ********" \
  -H "Upstash-Forward-key: ********" \
  -H "Upstash-Cron: */30 * * * *" \
  -H "Content-type: application/json" \
  -d '{}' \
  'https://qstash.upstash.io/v1/publish/https://ygptplugin.vercel.app/api/sync'
```
