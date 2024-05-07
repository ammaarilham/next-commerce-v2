import styled from "styled-components";
import { useState } from "react";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Center = styled.div`
  max-width: 90%;
  margin: 15px auto;
  display: grid;
  gap: 40px;
  grid-template-columns: 1fr 4fr;

  @media screen and (min-width: 768px) {
  }
`;

const FilterBar = styled.div`
  padding: 10px;
  border-right: 5px solid #ccc;

  h2 {
    color: grey;
    margin-top: 10px;
    margin-bottom: 30px;
  }

  p {
    color: #ccc;
  }
`;

const FilterOption = styled.div`
  margin-bottom: 20px;
  padding: 5px;

  label {
    font-weight: bold;
    padding-right: 10px;
  }
  span {
    line-height: 1.5;
  }
`;

const FilterCheckbox = styled.input`
  margin-right: 5px;
`;

const Title = styled.h1`
  font-size: 1.7em;
  color: #aaa;
`;

const StyledHr = styled.hr`
  margin: 20px 0;
`;

const SearchBar = styled.input`
  width: 270px;
  padding: 2px 9px;
  margin: 10px;
  border-radius: 5px;
  border: none;
  box-shadow: 1px 2px 2px #ccc;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PriceInput = styled.input`
  width: 70px;
  padding: 3px 9px;
  margin: 0 5px;
  border-radius: 2px;
  border: none;
`;
const Select = styled.select`
  padding: 5px 10px;
  border: None;
  border: 1px solid #aaa;
  border-radius: 5px;
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
        <FilterBar>
          <h2>Filtering section</h2>
          <p>You can use the below section </p>
          <FilterOption>
            <label htmlFor="">Price Range:</label>
            <div></div>
            <PriceInput
              type="number"
              min="0"
              max="10000"
              value={minPrice}
              onChange={(e) => setMinPrice(parseFloat(e.target.value))}
            />
            <span>-</span>
            <PriceInput
              type="number"
              min="0"
              max="10000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
            />
          </FilterOption>
          <FilterOption>
            <label htmlFor="">Product Category:</label>
            {categoriesWithProducts.map((category) => {
              if (relevantCategoryIds.includes(category._id)) {
                return (
                  <div key={category._id}>
                    <FilterCheckbox
                      type="checkbox"
                      id={category._id}
                      name={category.name}
                      checked={selectedCategories.includes(category._id)}
                      onChange={() => handleFilter(category._id)}
                    />
                    <span htmlFor={category._id}>{category.name}</span>
                  </div>
                );
              }
              return null;
            })}
          </FilterOption>
          <FilterOption>
            <label htmlFor="">Sort By:</label>
            <Select>
              <option value="latest">Latest Added</option>
              <option value="oldest">Oldest First</option>
            </Select>
          </FilterOption>
        </FilterBar>
        <div>
          <TopBar>
            <Title>All products</Title>

            <SearchBar
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
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
