import { Query } from "@tcgdex/sdk"
import { tcgdex } from "../utils/tcgdex"

export const PAGE_SIZE = 20

export async function searchCards(name: string, page: number) {
  const query = Query.create().like("name", name).paginate(page, PAGE_SIZE)
  const results = await tcgdex.card.list(query)
  return results ?? []
}
