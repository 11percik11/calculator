import './NewsGrid.css';
import NewsItem , { NewsItemProps } from '@/Components/UI/NewsItem/NewsItem';

interface NewsGridProps {
    news: NewsItemProps[];
}

const NewsGrid = ({ news }: NewsGridProps) => {
    return (
        <div className="news-grid">
            {news.map((news, index) => (
                <NewsItem
                    key={`news-${index}`}
                    imageUrl={news.imageUrl}
                    title={news.title}
                    description={news.description}
                />
            ))}
        </div>
    );
};

export default NewsGrid;