import { STRONG_MODEL, next_message } from "@/lib/ai"
import { Result } from "postcss"

const prompts = {
  system: `you are a savant at generating SQL queries.
you only know SQL queries, you don't know anything else.
your inputs are REQUEST and SCHEMAS.
examine USER input and respond with a SQL query that satisfies REQUEST.
if you're not sure how to satisfy REQUEST, say "IDK".
you can only respond with a SQL query or "IDK".`,

user: (languageQuery: string) => `
REQUEST: ${languageQuery}

SCHEMAS:
Vault {
  chain_id: number
  address: string
  name: string
  token_symbol: string    # sometimes users will refer to vaults by their token symbol
  tvl_in_usd: number
  net_annual_percent_yield: number
  gross_annual_percent_yield: number
  deposit_token_name: string
  deposit_token_symbol: string
  deposit_token_description: string
  deposit_token_price: number
  strategies: Strategy[]
}

Strategy {
  chain_id: number
  address: string
  name: string
  description: string     # describes how a strategy manages assets
  total_debt_usd: number
  net_annual_percent_rate: number
  last_report: date       # timestamp of last report
  vault_chain_id: number
  vault_address: string
}

i am working with a PostgreSQL database.
i want to see chain_id and address for vaults that satisfy REQUEST.
i have another agent upstream that will fill in properties and strategies.
so your sql query should only return chain_id and address.
unless told otherwise, sort vaults by TVL descending.
limit your results to the top 5 results.
only respond in sql.
no conversation. 
no natural language.
`
}

export default async function toSql(languageQuery: string) {
  const message = await next_message([
    { role: 'system', content: prompts.system },
    { role: 'user', content: prompts.user(languageQuery) }
  ], null, STRONG_MODEL, 0)
  if(message.content === 'IDK') throw 'IDK'
  const result = message.content as string
  const fixed = result
    .replace(/ vault/ig, ' "Vault"')
    .replace(/ strategy/ig, ' "Strategy"')
  return fixed
}
