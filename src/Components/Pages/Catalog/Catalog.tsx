// Components/Widgets/Catalog/Catalog.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import StarAnimation from "@/Components/UI/StartAnimation/StartAnimation";
import { CatalogCardFull } from "@/Components/UI/CatalogCardFull/CatalogCardFull"; // исправляем импорт
import { getProductsByCategory, getAllCategories } from "@/Api/queries";
import {
  CategoriesCatalog,
  Category,
} from "@/Components/Widgets/CategoriesCatalog/CategoriesCatalog";
import { PaginationCatalog } from "@/Components/Widgets/PaginationCatalog/PaginationCatalog";
import "./Catalog.css";
import { CatalogPromoBlock } from "@/Components/Widgets/CatalogPromoBlock/CatalogPromoBlock";

interface Product {
  id: number;
  title: string;
  description?: string;
  image?: string;
  price: number;
  category?: Category;
  materials?: Material[];
  productsImages?: ProductImage[];
}

interface ProductImage {
  id: number;
  image: string;
}

interface Material {
  id: number;
  title: string;
  name: string;
}

export const Catalog = () => {
  const { categorySlug, subcategorySlug } = useParams<{
    categorySlug?: string;
    subcategorySlug?: string;
  }>();
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(
    null
  );

  const itemsPerPage = 12;

  // Загрузка всех категорий
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const categoriesData = await getAllCategories();
        setCategories(categoriesData);
        setError(null);
      } catch (err) {
        console.error("Ошибка загрузки категорий:", err);
        setError("Не удалось загрузить категории");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  // Определение выбранной категории из URL
  useEffect(() => {
    if (categories.length > 0 && categorySlug) {
      const category = categories.find((cat) => cat.slug === categorySlug);
      if (category) {
        setSelectedCategory(category.id);

        if (subcategorySlug && category.children) {
          const subcategory = category.children.find(
            (sub) => sub.slug === subcategorySlug
          );
          if (subcategory) {
            setSelectedSubcategory(subcategory.id);
          } else {
            setSelectedSubcategory(null);
            setError("Подкатегория не найдена");
          }
        } else {
          setSelectedSubcategory(null);
        }
      } else {
        setError("Категория не найдена");
      }
    } else if (categories.length > 0 && !categorySlug) {
      setSelectedCategory(null);
      setSelectedSubcategory(null);
    }
  }, [categories, categorySlug, subcategorySlug]);

  // Загрузка товаров
  useEffect(() => {
    const loadProducts = async () => {
      if (selectedSubcategory) {
        await loadProductsByCategory(selectedSubcategory);
      } else if (selectedCategory) {
        await loadProductsByCategory(selectedCategory);
      } else {
        setProducts([]);
        setTotalPages(1);
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedCategory, selectedSubcategory, currentPage]);

  const loadProductsByCategory = async (categoryId: number) => {
    try {
      setLoading(true);
      const response = await getProductsByCategory(
        categoryId,
        currentPage,
        itemsPerPage
      );
      setProducts(response.data);
      setTotalPages(response.meta.pagination.totalPages);
      setError(null);
    } catch (err) {
      console.error("Ошибка загрузки товаров:", err);
      setError("Не удалось загрузить товары");
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (category: Category) => {
    navigate(`/catalog/${category.slug}`);
    setCurrentPage(1);
    setSelectedSubcategory(null);
  };

  const handleSubcategorySelect = (subcategory: Category) => {
    if (selectedCategory) {
      const mainCategory = categories.find(
        (cat) => cat.id === selectedCategory
      );
      if (mainCategory) {
        navigate(`/catalog/${mainCategory.slug}/${subcategory.slug}`);
        setCurrentPage(1);
        setSelectedSubcategory(subcategory.id);
      }
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getProductImage = (product: Product): string => {
    // Берем первую фотку из productsImages если она есть
    if (product.productsImages && product.productsImages.length > 0) {
      return product.productsImages[0].image;
    }
    // Если нет, используем основное image
    return product.image || "/placeholder-product.jpg";
  };

  return (
    <>
      <div className="catalog__container">
        <div className="catalog__header">
          <StarAnimation />
          <h2 className="catalog__header-title">
            КАТАЛОГ ПРОДУКЦИИ: ЖАЛЮЗИ И РУЛОННЫЕ ШТОРЫ
          </h2>
          <p className="catalog__header-text">
            Широкий выбор жалюзи и рулонных штор для дома и офиса. Качественные
            материалы, современные технологии и индивидуальный подход.
          </p>
        </div>

        {/* Категории сверху */}
        <div className="catalog__categories">
          <CategoriesCatalog
            categories={categories}
            selectedCategory={selectedCategory}
            selectedSubcategory={selectedSubcategory}
            onCategorySelect={handleCategorySelect}
            onSubcategorySelect={handleSubcategorySelect}
          />
        </div>

        {/* Товары снизу */}
        <div className="catalog__products">
          {loading && (
            <div className="catalog__loading">
              <div className="spinner"></div>
              <span>Загрузка товаров...</span>
            </div>
          )}

          {error && (
            <div className="catalog__error">
              <p>{error}</p>
              {/* <button
                onClick={() => window.location.reload()}
                className="catalog__retry-button"
              >
                Попробовать снова
              </button> */}
            </div>
          )}

          {!loading &&
            !error &&
            products.length === 0 &&
            (selectedCategory || selectedSubcategory) && (
              <div className="catalog__empty">
                <p>Товары не найдены в выбранной категории</p>
              </div>
            )}

          {!loading &&
            !error &&
            products.length === 0 &&
            !selectedCategory &&
            !selectedSubcategory && (
              <div className="catalog__empty">
                <p>Выберите категорию для просмотра товаров</p>
              </div>
            )}

          {!loading && !error && products.length > 0 && (
            <>
              <div className="catalog__grid">
                {products.map((product) => (
                  <CatalogCardFull
                    key={product.id}
                    image={getProductImage(product)}
                    title={product.title}
                    price={`${product.price.toLocaleString("ru-RU")} ₽`}
                    productId={product.id} // передаем ID продукта
                  />
                ))}
              </div>

              <PaginationCatalog
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
        <CatalogPromoBlock showBtn={false} />
      </div>
    </>
  );
};

export default Catalog;
