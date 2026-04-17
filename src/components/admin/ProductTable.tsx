import { Suspense, lazy } from 'react';
import { Product, Category } from '../../types';
import { Edit, Trash2 } from 'lucide-react';
import { formatCurrency, getProductImage } from '../../utils';
import { ProductFormData } from './ProductForm';
import { Loading } from '../ui/Loading';

const ProductForm = lazy(() => import('./ProductForm').then(module => ({ default: module.ProductForm })));

interface ProductTableProps {
  products: Product[];
  categories: Category[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
  editingId?: string | null;
  // Inline editing props
  editingProduct?: Product | null;
  onUpdate?: (formData: ProductFormData) => void;
  onCancelEdit?: () => void;
  loading?: boolean;
}

export function ProductTable({
  products,
  categories,
  onEdit,
  onDelete,
  editingId = null,
  editingProduct,
  onUpdate,
  onCancelEdit,
  loading = false,
}: ProductTableProps) {
  const handleDelete = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      onDelete(productId);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            {['Product', 'Price', 'Stock', 'Category', 'Status', 'Actions'].map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product) => {
            const isEditing = editingId === product.id;

            return (
              <>
                <tr
                  key={product.id}
                  className={isEditing ? 'bg-red-400/10' : 'hover:bg-gray-50'}
                >
                  {/* Product Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={getProductImage(product.images)}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.slug}</div>
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(product.price)}
                    </span>
                  </td>

                  {/* Stock */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${product.stock === 0
                        ? 'text-red-600'
                        : product.stock < 10
                          ? 'text-yellow-600'
                          : 'text-green-600'
                        }`}>
                        {product.stock}
                      </span>
                      {product.stock === 0 && (
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                          Out of Stock
                        </span>
                      )}
                      {product.stock > 0 && product.stock < 10 && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                          Low Stock
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    {product.category ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {product.category.name}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-sm">No category</span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.is_active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                      }`}>
                      {product.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(product)}
                        disabled={isEditing}
                        className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Edit product"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Inline Editing Form */}
                {isEditing && editingProduct && onUpdate && onCancelEdit && (
                  <tr>
                    <td colSpan={6} className="bg-gray-50 px-6 py-6 border-t border-b border-gray-200">
                      <div className="max-full mx-auto">
                        <Suspense fallback={<Loading />}>
                          <ProductForm
                            product={editingProduct}
                            categories={categories}
                            onSubmit={onUpdate}
                            onCancel={onCancelEdit}
                            loading={loading}
                            isEdit={true}
                          />
                        </Suspense>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>

      {products.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">No products found</div>
          <div className="text-gray-500 text-sm mt-2">
            Add your first product to get started
          </div>
        </div>
      )}
    </div>
  );
}