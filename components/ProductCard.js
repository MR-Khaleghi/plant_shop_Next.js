import Image from 'next/image';
import Link from 'next/link';

function ProductCard({ product }) {
  const myLoader = ({ src }) => {
    return `${product.imageUrl}`;
  };

  return (
    <div className="border w-80 shadow hover:shadow-xl">
      <Link href={`/products/${product.id}`}>
        <Image
          unoptimized
          loader={myLoader}
          src={product.imageUrl}
          width={320}
          height={240}
          alt=""
        />
        <div className="p-2 flex justify-between items-baseline">
          <h2 className="text-lg font-bold"> {product.title}</h2>
          <span>{product.price}</span>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
