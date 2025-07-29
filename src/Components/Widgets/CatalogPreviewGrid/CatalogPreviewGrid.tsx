import './CatalogPreviewGrid.css';
import CatalogCard from "@/Components/UI/CatalogCard/CatalogCard";

const products = [
    {
        image: 'https://i.pinimg.com/1200x/0b/93/e4/0b93e462d11e25efb4035e404fb45fe1.jpg',
        title: 'Название товара 1',
        price: '1 990 ₽'
    },
    {
        image: 'https://i.pinimg.com/1200x/da/1b/ac/da1bac4d69d7fea48bb504202795d31f.jpg',
        title: 'Название товара 2',
        price: '2 490 ₽'
    },
    {
        image: 'https://i.pinimg.com/1200x/db/b4/7f/dbb47fb0c90737cefac83cddaeba6cbf.jpg',
        title: 'Название товара 3',
        price: '3 290 ₽'
    },
    {
        image: 'https://i.pinimg.com/1200x/49/bf/f5/49bff5a6b0eb16026fe1dec041ad08fe.jpg',
        title: 'Название товара 4',
        price: '1 590 ₽'
    },
    {
        image: 'https://i.pinimg.com/1200x/63/e2/fb/63e2fb5d7212d154a82c1602f3ddfc86.jpg',
        title: 'Название товара 5',
        price: '2 990 ₽'
    },
    {
        image: 'https://i.pinimg.com/1200x/5f/79/a3/5f79a325fb6f3dc04df44f164888768c.jpg',
        title: 'Название товара 6',
        price: '3 590 ₽'
    }
];

const CatalogPreviewGrid = () => {
    return (
        <div className="catalog-preview-grid">
            {products.map((product, index) => (
                <CatalogCard
                    key={index}
                    image={product.image}
                    title={product.title}
                    price={product.price}
                />
            ))}
        </div>
    );
};

export default CatalogPreviewGrid;