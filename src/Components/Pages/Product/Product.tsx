import { Button } from "@/Components/UI/Button/Button";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { getProductById } from "@/Api/queries";
import "./Product.css";
import CatalogPreviewGrid from "@/Components/Widgets/CatalogPreviewLikeGrid/CatalogPreviewLikeGrid";
import { Calculator } from "@/Components/Widgets/Calculator/Calculator";

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

interface Category {
  id: number;
  name: string;
  image?: string;
  slug: string;
  children: Category[];
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

interface CartItem {
  id: number;
  title: string;
  description?: string;
  price: number;
  image: string;
}

export const Product = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const loadProduct = async () => {
      if (!productId) return;

      try {
        setLoading(true);
        const productData = await getProductById(parseInt(productId));
        setProduct(productData);
        setError(null);
      } catch (err) {
        console.error("Ошибка загрузки товара:", err);
        setError("Не удалось загрузить товар");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  const nextImage = () => {
    if (product?.productsImages && product.productsImages.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === product.productsImages!.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (product?.productsImages && product.productsImages.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? product.productsImages!.length - 1 : prev - 1
      );
    }
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Логика добавления в корзину
  const addToCart = () => {
    if (!product) return;

    const cartItem: CartItem = {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      image:
        product.productsImages?.[0]?.image ||
        product.image ||
        "/placeholder-product.jpg",
    };

    const cart = JSON.parse(localStorage.getItem("cart") || "[]") as CartItem[];
    console.log("Текущая корзина перед добавлением:", cart); // Отладка
    if (!cart.find((item) => item.id === product.id)) {
      cart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(cart));
      console.log("Товар добавлен, новая корзина:", cart); // Отладка
      alert("Товар добавлен в корзину!");
    } else {
      console.log("Товар уже в корзине:", cartItem); // Отладка
      alert("Товар уже в корзине!");
    }
  };

  if (loading) {
    return <div className="product-loading">Загрузка товара...</div>;
  }

  if (error) {
    return <div className="product-error">{error}</div>;
  }

  if (!product) {
    return <div className="product-not-found">Товар не найден</div>;
  }

  const hasMultipleImages =
    product.productsImages && product.productsImages.length > 1;
  const currentImage =
    product.productsImages && product.productsImages.length > 0
      ? product.productsImages[currentImageIndex].image
      : product.image || "/placeholder-product.jpg";

  return (
    <>
      <div className="product-block__container">
        <div className="product-block__slider">
          <div className="product-slider">
            {/* Основное изображение */}
            <div className="product-slider__main">
              <img
                src={currentImage}
                alt={product.title}
                className="product-main-image"
              />

              {/* Кнопки навигации если есть multiple images */}
              {hasMultipleImages && (
                <>
                  <button
                    className="product-slider__prev"
                    onClick={prevImage}
                    aria-label="Предыдущее изображение"
                  >
                    ‹
                  </button>
                  <button
                    className="product-slider__next"
                    onClick={nextImage}
                    aria-label="Следующее изображение"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {/* Миниатюры если есть multiple images */}
            {hasMultipleImages && (
              <div className="product-slider__thumbnails">
                {product.productsImages!.map((img, index) => (
                  <button
                    key={img.id}
                    className={`product-slider__thumbnail ${
                      index === currentImageIndex ? "active" : ""
                    }`}
                    onClick={() => selectImage(index)}
                  >
                    <img
                      src={img.image}
                      alt={`${product.title} ${index + 1}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="product-block__info">
          <h2 className="product-block__title">{product.title}</h2>
          <h3 className="product-block__price">
            {product.price.toLocaleString("ru-RU")} РУБ
          </h3>
          <p className="product-block__description">
            {product.description || "Описание отсутствует"}
          </p>

          <div className="product-block__sub-description">
            {product.materials && product.materials.length > 0 && (
              <p className="product-block__material">
                Материал: {product.materials.map((m) => m.title).join(", ")}
              </p>
            )}
            {product.category && (
              <p className="product-block__counrty">
                Страна производитель: {product.category.name}
              </p>
            )}
            {product.category && (
              <p className="product-block__category">
                Категория: {product.category.name}
              </p>
            )}
          </div>

          <div className="product-block__actions">
            <Button
              text="Добавить в корзину"
              color="custom"
              icon={<img src="/landing/white-basket.svg" alt="Корзина" />}
              fullWidth={true}
              customColor="#E7392F"
              onClick={addToCart}
              size="lg"
              hoverEffect="underline"
            />
            <Button
              text="Рассчитать на калькуляторе"
              color="custom"
              customColor="#352C2B"
              icon={<img src="/landing/ruler.svg" alt="Калькулятор" />}
              fullWidth={true}
              size="lg"
              hoverEffect="underline"
            />
          </div>
        </div>
      </div>

      <div className="product-block__like">
        <h2 className="product-block__like-title">ВАМ МОЖЕТ ПОНРАВИТЬСЯ</h2>
        <CatalogPreviewGrid />
      </div>
      <Calculator />
    </>
  );
};
