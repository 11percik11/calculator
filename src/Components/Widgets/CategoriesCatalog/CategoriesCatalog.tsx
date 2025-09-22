import './CategoriesCatalog.css';

export interface Category {
  id: number;
  name: string;
  slug: string;
  image?: string;
  children?: Category[];
}

interface CategoriesCatalogProps {
  categories: Category[];
  selectedCategory: number | null;
  selectedSubcategory: number | null;
  onCategorySelect: (category: Category) => void;
  onSubcategorySelect: (subcategory: Category) => void;
}

export const CategoriesCatalog = ({
  categories,
  selectedCategory,
  selectedSubcategory,
  onCategorySelect,
  onSubcategorySelect
}: CategoriesCatalogProps) => {
  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="categories-catalog">
      {/* Основные категории */}
      <div className="categories-catalog__section">
        <h3 className="categories-catalog__title">Основные категории</h3>
        <div className="categories-catalog__list categories-catalog__list--main">
          {categories.map(category => (
            <div
              key={category.id}
              className={`categories-catalog__item ${
                selectedCategory === category.id ? 'categories-catalog__item--active' : ''
              }`}
              onClick={() => onCategorySelect(category)}
            >
              {category.image && (
                <div className="categories-catalog__image">
                  <img src={category.image} alt={category.name} />
                </div>
              )}
              <span className="categories-catalog__name">{category.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Подкатегории (если выбрана основная категория) */}
      {selectedCategoryData?.children && selectedCategoryData.children.length > 0 && (
        <div className="categories-catalog__section">
          <h3 className="categories-catalog__title">Подкатегории</h3>
          <div className="categories-catalog__list categories-catalog__list--sub">
            {selectedCategoryData.children.map(subcategory => (
              <div
                key={subcategory.id}
                className={`categories-catalog__item categories-catalog__item--sub ${
                  selectedSubcategory === subcategory.id ? 'categories-catalog__item--active' : ''
                }`}
                onClick={() => onSubcategorySelect(subcategory)}
              >
                {subcategory.image && (
                  <div className="categories-catalog__image">
                    <img src={subcategory.image} alt={subcategory.name} />
                  </div>
                )}
                <span className="categories-catalog__name">{subcategory.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};