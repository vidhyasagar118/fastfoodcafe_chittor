
import TrendingProducts from "../components/TrendingProducts";
import BestSellerProducts from "../components/BestSellerProducts";
import TopRatedProducts from "../components/TopRatedProducts";

const FeaturedProducts = () => {
  return (
    <div style={{ padding: "20px" }}>
      <TrendingProducts limit={false} />
      <BestSellerProducts limit={false} />
      <TopRatedProducts limit={false} />
    </div>
  );
};

export default FeaturedProducts;