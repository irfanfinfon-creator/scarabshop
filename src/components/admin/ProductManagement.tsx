import { useState, Suspense, lazy } from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../../types';
import { useProductManagement } from '../../hooks/useProductManagement';
import { ProductFormData } from './ProductForm';
import { ProductTable } from './ProductTable';
import { Loading } from '../ui/Loading';

const ProductForm = lazy(() => import('./ProductForm').then(module => ({ default: module.ProductForm })));

/**
 * ProductManagement component - Main container for product CRUD operations
 * Refactored to use custom hooks and separated components for better maintainability
 */
export function ProductManagement() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const {
    products,
    categories,
    loading,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProductManagement();

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter(product => product.category_id === selectedCategory)
    : products;

  const handleCreateProduct = async (formData: ProductFormData) => {
    const success = await createProduct(formData);
    if (success) {
      setShowAddForm(false);
    }
  };

  const handleUpdateProduct = async (formData: ProductFormData) => {
    if (!editingProduct) return;

    const success = await updateProduct(editingProduct.id, formData);
    if (success) {
      setEditingProduct(null);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowAddForm(false);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Products</h2>

        <div className="flex items-center gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-blue-600 rounded-lg focus:outline-none focus:ring-2 bg-white"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              setShowAddForm(true);
              setEditingProduct(null);
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* Add Product Form - Remains at the top */}
      {showAddForm && (
        <Suspense fallback={<Loading />}>
          <ProductForm
            categories={categories}
            onSubmit={handleCreateProduct}
            onCancel={handleCancelAdd}
            loading={loading}
            isEdit={false}
          />
        </Suspense>
      )}

      {/* Products Table with Inline Editing */}
      <ProductTable
        products={filteredProducts}
        categories={categories}
        onEdit={handleEdit}
        onDelete={deleteProduct}
        editingId={editingProduct?.id}
        // New props for inline editing
        editingProduct={editingProduct}
        onUpdate={handleUpdateProduct}
        onCancelEdit={handleCancelEdit}
        loading={loading}
      />
    </div>
  );
}
