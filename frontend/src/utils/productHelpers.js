export function getProductById(id, list) {
  if (!id || !list?.length) return null
  return list.find((p) => String(p._id) === String(id)) ?? null
}

export function getCategories(list) {
  if (!list?.length) return ['All']
  const set = new Set(list.map((p) => p.category).filter(Boolean))
  return ['All', ...Array.from(set).sort()]
}

export const SUB_CATEGORIES = ['All', 'Topwear', 'Bottomwear', 'Winterwear']

export function filterProducts(list, { category, subCategory, query }) {
  if (!list?.length) return []
  let result = [...list]
  if (category && category !== 'All') {
    result = result.filter((p) => p.category === category)
  }
  if (subCategory && subCategory !== 'All') {
    result = result.filter((p) => p.subCategory === subCategory)
  }
  if (query && query.trim()) {
    const q = query.trim().toLowerCase()
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q) ||
        (p.subCategory || '').toLowerCase().includes(q),
    )
  }
  return result
}

export function sortProducts(list, sortKey) {
  if (!list?.length) return []
  const copy = [...list]
  if (sortKey === 'price-low') {
    copy.sort((a, b) => a.price - b.price)
  } else if (sortKey === 'price-high') {
    copy.sort((a, b) => b.price - a.price)
  } else {
    copy.sort((a, b) => (b.date || 0) - (a.date || 0))
  }
  return copy
}

export function getBestsellers(list, limit = 8) {
  if (!list?.length) return []
  return list.filter((p) => p.bestseller).slice(0, limit)
}
