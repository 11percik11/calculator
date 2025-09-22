import { axiosInstance } from './axiosInstance';
import { API_URL } from './const';
// Promo Interfaces
interface PromoImage {
  id: number;
  image: string;
}

interface Promo {
  id: number;
  title: string;
  description?: string;
  image: string;
  promoImages?: PromoImage[];
  isPreview: boolean;
}

// News Interfaces (assumed similar structure to Promo)
interface NewsImage {
  id: number;
  image: string;
}

interface News {
  id: number;
  title: string;
  description?: string;
  image: string;
  newsImages?: NewsImage[];
  isPreview: boolean;
}

interface NewsResponse {
  data: News[];
  meta: {
    pagination: {
      currentPage: number;
      itemsPerPage: number;
      totalItems: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
}

interface PromoResponse {
  data: Promo[];
  meta: {
    pagination: {
      currentPage: number;
      itemsPerPage: number;
      totalItems: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
}

interface Company{
  id: number;
  image: string;
}

interface Works{
  id: number;
  image: string;
}

interface CallRequest {
  name: string;
  email?: string;
  phone: string;
}

// Product Interfaces
interface ProductImage {
  id: number;
  image: string;
}

interface Material {
  id: number;
  title: string;
  name: string;
}

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

interface ProductResponse {
  data: Product[];
  meta: {
    pagination: {
      currentPage: number;
      itemsPerPage: number;
      totalItems: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
}


export interface ApiCategory {
  id: number;
  name: string;
  image?: string;
  level: number;
  children: ApiCategory[];
}

export interface Category {
  id: number;
  name: string;
  image?: string;
  slug: string;
  children: Category[];
}

interface ApiProduct {
  id: number;
  title: string;
  price: number;
  images: Array<{
    id: number;
    image: string;
  }>;
  // другие поля если есть
}

// Функция для генерации slug
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9а-яё\s]/gi, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Добавьте эти функции в конец файла

export const getProductById = async (productId: number): Promise<Product> => {
  try {
    const response = await axiosInstance.get(`/api/products/${productId}`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    // Формируем полные URL для изображений
    const product = response.data;
    return {
      ...product,
      image: product.image ? `${API_URL}${product.image}` : '/placeholder-product.jpg',
      productsImages: product.images?.map((img: ProductImage) => ({
        id: img.id,
        image: img.image ? `${API_URL}${img.image}` : '/placeholder-product.jpg',
      })) || [],
      materials: product.materials?.map((mat: Material) => ({
        ...mat,
        name: mat.title, // Добавляем name, так как он есть в интерфейсе Material
      })) || [],
      category: product.category
        ? {
            ...product.category,
            name: product.category.title, // Исправляем name вместо title
            slug: generateSlug(product.category.title),
          }
        : undefined,
    };
  } catch (error) {
    console.error('Ошибка в getProductById:', error);
    throw error;
  }
};

// Random products
export const getRandomProducts = async (limit: number = 6): Promise<Product[]> => {
  try {
    const response = await axiosInstance.get<ApiProduct[]>('/api/rand/product', {
      params: { limit },
      headers: { 'Accept': 'application/json' },
    });
    
    
    return response.data.map(apiProduct => {
      // Берем первую фотку из images
      const firstImage = apiProduct.images && apiProduct.images.length > 0
        ? `${API_URL}${apiProduct.images[0].image}`
        : '/placeholder-product.jpg';
      
      return {
        id: apiProduct.id,
        title: apiProduct.title,
        price: apiProduct.price,
        image: firstImage, // ← это то что показывается в карточке
        // преобразуем images в productsImages для совместимости
        productsImages: apiProduct.images?.map(img => ({
          id: img.id,
          image: `${API_URL}${img.image}`
        })) || []
      };
    });
    
  } catch (error) {
    console.error('Error loading random products:', error);
    return [];
  }
};

// API Methods
export const getProductsByCategory = async (
  categoryId: number, 
  page: number = 1, 
  itemsPerPage: number = 12
): Promise<ProductResponse> => {
  const response = await axiosInstance.get<ProductResponse>(`/api/product`, {
    params: {
      categoryId,
      page,
      itemsPerPage,
      pagination: true
    },
    headers: {
      'Accept': 'application/json',
    },
  });
  
  // Формируем полные URL для изображений
  const dataWithFullUrls = response.data.data.map(product => ({
    ...product,
    // Используем первую фотку из productsImages если есть, иначе основное image
    image: product.productsImages && product.productsImages.length > 0
      ? `${API_URL}${product.productsImages[0].image}`
      : product.image 
        ? `${API_URL}${product.image}`
        : '/placeholder-product.jpg',
    productsImages: product.productsImages?.map(img => ({
      ...img,
      image: `${API_URL}${img.image}`
    }))
  }));
  
  return {
    ...response.data,
    data: dataWithFullUrls
  };
};

export const getParentCategories = async (): Promise<Category[]> => {
  try {
    const response = await axiosInstance.get<ApiCategory[]>('/api/category/parent', {
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.data || !Array.isArray(response.data)) {
      console.error('Invalid response format:', response.data);
      return [];
    }
    
    // Функция для рекурсивного преобразования категорий
    const transformCategory = (category: ApiCategory): Category => ({
      id: category.id,
      name: category.name,
      image: category.image,
      slug: generateSlug(category.name),
      children: (category.children || []).map(transformCategory)
    });
    
    return response.data.map(transformCategory);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const getCategoryById = async (id: number): Promise<Category> => {
  const response = await axiosInstance.get<Category[]>(`/api/categories/${id}`, {
    headers: {
      'Accept': 'application/json',
    },
  });
  
  const category = response.data[0]; // API возвращает массив
  return {
    ...category,
    slug: generateSlug(category.name),
    children: category.children.map(child => ({
      ...child,
      slug: generateSlug(child.name)
    }))
  };
};

export const getAllCategories = async (): Promise<Category[]> => {
  const response = await axiosInstance.get<Category[]>('/api/category/all', {
    headers: {
      'Accept': 'application/json',
    },
  });

  return response.data.map(category => ({
    ...category,
    slug: generateSlug(category.name),
    image: category.image ? `${API_URL}${category.image}` : category.image, // Добавляем полный путь к изображению категории
    children: category.children?.map(child => ({
      ...child,
      slug: generateSlug(child.name),
      image: child.image ? `${API_URL}${child.image}` : child.image, // Добавляем полный путь к изображению подкатегории
    })) || [],
  }));
};

export const createCallRequest = async (callRequest: CallRequest) => {
  const response = await axiosInstance.post('/api/call', callRequest, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

// Promo API Methods
export const getAllPromo = async (page: number = 1, itemsPerPage: number = 8): Promise<NewsResponse> => {
  const response = await axiosInstance.get<PromoResponse>('/api/promo/all', {
    params: {
      page,
      itemsPerPage,
      pagination: true
    },
    headers: {
      'Accept': 'application/json',
    },
  });
  
  // Формируем полные URL для изображений
  const dataWithFullUrls = response.data.data.map(promo => ({
    ...promo,
    image: `${API_URL}${promo.image}`,
    promoImages: promo.promoImages?.map(img => ({
      ...img,
      image: `${API_URL}${img.image}`
    }))
  }));
  
  return {
    ...response.data,
    data: dataWithFullUrls
  };
};

export const getMainPromos = async () => {
  const response = await axiosInstance.get<Promo[]>('/api/promo/main', {
    headers: {
      'Accept': 'application/json',
    },
  });
  return response.data;
};

export const getPromoById = async (id: number) => {
  const response = await axiosInstance.get<Promo>(`/api/promo/${id}`, {
    headers: {
      'Accept': 'application/json',
    },
  });
  return response.data;
};

export const getAllNews = async (page: number = 1, itemsPerPage: number = 8): Promise<NewsResponse> => {
  const response = await axiosInstance.get<NewsResponse>('/api/news/all', {
    params: {
      page,
      itemsPerPage,
      pagination: true
    },
    headers: {
      'Accept': 'application/json',
    },
  });
  
  // Формируем полные URL для изображений
  const dataWithFullUrls = response.data.data.map(news => ({
    ...news,
    image: `${API_URL}${news.image}`,
    newsImages: news.newsImages?.map(img => ({
      ...img,
      image: `${API_URL}${img.image}`
    }))
  }));
  
  return {
    ...response.data,
    data: dataWithFullUrls
  };
};

export const getMainNews = async () => {
  const response = await axiosInstance.get<News[]>('/api/news/main', {
    headers: {
      'Accept': 'application/json',
    },
  });
  return response.data;
};

export const getNewsById = async (id: number) => {
  const response = await axiosInstance.get<News>(`/api/news/${id}`, {
    headers: {
      'Accept': 'application/json',
    },
  });
  return response.data;
};

// Company API Methods
export const getAllCompanies = async () => {
  const response = await axiosInstance.get<Company[]>('/api/company', {
    headers: {
      'Accept': 'application/json',
    },
  });
  return response.data;
};

// Works API Methods
export const getAllWorks = async () => {
  const response = await axiosInstance.get<Works[]>('/api/works', {
    headers: {
      'Accept': 'application/json',
    },
  });
  return response.data;
};