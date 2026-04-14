import React from 'react'
import { assets } from '../assets/assets'

const items = [
  {
    icon: assets.exchange_icon,
    title: 'Easy exchange policy',
    text: 'We offer hassle free exchange policy',
  },
  {
    icon: assets.quality_icon,
    title: '7 Days return policy',
    text: 'We provide 7 days free return policy',
  },
  {
    icon: assets.profile_icon,
    title: 'Best customer support',
    text: 'We provide 24/7 customer support',
  },
]

const PolicyFeatures = () => {
  return (
    <section className="border-y border-neutral-200 bg-neutral-50/80">
      <div className="grid divide-y divide-neutral-200 md:grid-cols-3 md:divide-x md:divide-y-0">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex flex-col items-center gap-4 px-6 py-10 text-center sm:px-10 md:py-14"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-sm">
              <img src={item.icon} alt="" className="h-7 w-7 object-contain opacity-90" width={28} height={28} />
            </div>
            <div>
              <h3 className="font-display text-lg font-medium text-neutral-900">{item.title}</h3>
              <p className="mt-2 max-w-xs font-sans text-sm text-neutral-600">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PolicyFeatures
