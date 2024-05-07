import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import NewProducts from "@/components/NewProducts";
import AboutUs from "@/components/Aboutus";
import Footer from "@/components/Footer";
import Stats from "@/components/Stats";
import Banner from "@/components/Banner";
import NewsLetter from "@/components/NewsLetter";
import Owner from "@/components/Owner";

export default function homePage({ featuredProduct, newProducts }) {
  return (
    <>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
      <AboutUs />
      <Banner />
      <Stats />
      <NewsLetter />
      <Footer />
    </>
  );
}

//s23 ultra id = 65c8bdc9ed8dc7645dd924cb

export async function getServerSideProps() {
  const featuredProductId = "65d3667dea07806f2ea497ec";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 8,
  });
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
