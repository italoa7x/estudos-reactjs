import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
const Product = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const { findProductBy } = useFetch();

  useEffect(() => {
    const getProductDetail = async () => {
      const productDetail = await findProductBy(id);
      setProduct(productDetail);
    };
    getProductDetail();
  }, [id, findProductBy]);
  return (
    <div>
      {product && (
        <>
          <h2>Produto: {product?.name}</h2>
          <span>R$:{product?.price}</span>
          <Link to={`/products/${product?.id}/info`}>Mais informações</Link>
        </>
      )}
    </div>
  );
};

export default Product;
