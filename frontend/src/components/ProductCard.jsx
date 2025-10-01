import Button from './Button'
import Chip from './Chip'

export default function ProductCard({ product }) {
  return (
    <article className="card hover-lift overflow-hidden">
      <div className="aspect-[4/3] bg-softgray/60 flex items-center justify-center">
        <img src={product.image} alt="" className="object-contain max-h-full p-4" />
      </div>
      <div className="p-4 space-y-3">
        <h3 className="font-medium line-clamp-2 min-h-[3rem]">{product.title}</h3>
        <div className="flex flex-wrap gap-1">
          {product.compat?.slice(0,3).map((c) => <Chip key={c}>{c}</Chip>)}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold">${product.price}</div>
            <div className="text-xs text-coolgray">★★★★☆ (123)</div>
          </div>
          <Button> Add to Cart → </Button>
        </div>
      </div>
    </article>
  )
}

