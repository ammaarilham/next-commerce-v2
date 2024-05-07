import styled from "styled-components";
import { useState } from "react";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Center = styled.div`
  max-width: 950px;
  margin: 15px auto;

  gap: 40px;

  @media screen and (min-width: 768px) {
  }
`;

const Title = styled.h1`
  font-size: 1.7em;
  color: #aaa;
  text-align: center;
`;

const StyledHr = styled.hr`
  margin: 20px 0;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function ProductsPage({ categoriesWithProducts }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const handleFilter = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const filterProducts = (products) => {
    return products.filter((product) => {
      const inSelectedCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const inPriceRange =
        product.price >= minPrice && product.price <= maxPrice;
      const matchesSearchQuery = product.title
        .toLowerCase()
        .includes(searchQuery);
      return inSelectedCategory && inPriceRange && matchesSearchQuery;
    });
  };

  const relevantCategoryIds = categoriesWithProducts.reduce((acc, category) => {
    const relevantProducts = category.products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery)
    );
    if (relevantProducts.length > 0) {
      acc.push(category._id);
    }
    return acc;
  }, []);

  return (
    <>
      <Header />
      <Center>
        <div>
          <TopBar>
            <Title>All products</Title>
          </TopBar>
          {categoriesWithProducts.map((category) => {
            const filteredProducts = filterProducts(category.products);
            if (filteredProducts.length > 0) {
              return (
                <div key={category._id}>
                  <h2>{category.name}</h2>
                  <ProductsGrid products={filteredProducts} />
                  <StyledHr />
                </div>
              );
            }
            return null;
          })}
        </div>
      </Center>
      <Footer />
    </>
  );
}

async function getAllCategoriesWithProducts() {
  try {
    const categories = await Category.find();
    const categoriesWithProducts = await Promise.all(
      categories.map(async (category) => {
        const products = await getProductsByCategory(category._id);
        return { ...category.toObject(), products };
      })
    );
    return categoriesWithProducts;
  } catch (error) {
    console.error("Error fetching categories with products:", error);
    return [];
  }
}

async function getProductsByCategory(categoryId) {
  try {
    const products = await Product.find({ category: categoryId });
    return products;
  } catch (error) {
    console.error("Error fetching products for category:", error);
    return [];
  }
}

export async function getServerSideProps() {
  try {
    await mongooseConnect();
    const categoriesWithProducts = await getAllCategoriesWithProducts();
    return {
      props: {
        categoriesWithProducts: JSON.parse(
          JSON.stringify(categoriesWithProducts)
        ),
      },
    };
  } catch (error) {
    console.error("Error fetching categories with products:", error);
    return {
      props: {
        categoriesWithProducts: [],
        error: "Error fetching categories with products",
      },
    };
  }
}
