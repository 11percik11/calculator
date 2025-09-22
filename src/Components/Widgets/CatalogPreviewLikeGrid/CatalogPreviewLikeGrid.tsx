import './CatalogPreviewLikeGrid.css';
import { CatalogCardFull } from "@/Components/UI/CatalogCardFull/CatalogCardFull";
import { getRandomProducts } from '@/Api/queries';
import { useState, useEffect } from 'react';

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

const CatalogPreviewGrid = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRandomProducts = async () => {
            try {
                setLoading(true);
                const randomProducts = await getRandomProducts(6);
                setProducts(randomProducts);
            } catch (error) {
                console.error('Error loading random products:', error);
                // Можно добавить fallback данные или обработку ошибок
            } finally {
                setLoading(false);
            }
        };

        loadRandomProducts();
    }, []);

    // Функция для получения первой фотки из productsImages или основной image
    const getProductImage = (product: Product): string => {
        // Берем первую фотку из productsImages если она есть
        if (product.productsImages && product.productsImages.length > 0) {
            return product.productsImages[0].image;
        }
        // Если нет, используем основное image
        return product.image || '/placeholder-product.jpg';
    };

    if (loading) {
        return (
            <div className="catalog-preview-loading">
                <div className="spinner"></div>
                <span>Загрузка товаров...</span>
            </div>
        );
    }

    return (
        <div className="catalog-preview-grid">
            {products.map((product) => (
                <CatalogCardFull
                    key={product.id}
                    image={getProductImage(product)} // ← используем первую фотку из массива
                    title={product.title}
                    price={`${product.price.toLocaleString('ru-RU')} ₽`}
                    productId={product.id}
                />
            ))}
        </div>
    );
};

export default CatalogPreviewGrid;