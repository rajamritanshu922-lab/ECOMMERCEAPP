/** Map Mongo/API product shape to what UI components expect (image[] URLs). */
export function normalizeProduct(p) {
  if (!p) return null
  const imgs = (p.images || p.image || [])
    .map((x) => (typeof x === 'string' ? x : x?.url))
    .filter(Boolean)
  return {
    ...p,
    _id: p._id,
    image: imgs,
    date: p.date ?? (p.createdAt ? new Date(p.createdAt).getTime() : Date.now()),
  }
}
