import React, { useMemo, useState } from 'react';
import { Pencil, Plus, Save, Trash2, TicketPercent } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useAppContext } from '../context/AppContext';
import { getDiscountedPrice, type Product, type ProductCategory } from '../lib/products';

const emptyProductForm = {
  name: '',
  price: '0',
  category: 'men' as ProductCategory,
  image: '/file_00000000b94c71fda2f8c8cac8f59657.png',
  description: '',
  sizes: 'S, M, L, XL',
  isNew: true,
  discountPercent: '0'
};

export function AdminDashboard() {
  const { products, createProduct, updateProduct, deleteProduct, applyDiscount } = useAppContext();
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState(emptyProductForm);
  const [panelMessage, setPanelMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [discountDrafts, setDiscountDrafts] = useState<Record<string, string>>({});

  const activeProduct = useMemo(
    () => products.find((product) => product.id === activeProductId) ?? null,
    [activeProductId, products]
  );

  const beginCreate = () => {
    setActiveProductId(null);
    setPanelMessage('');
    setProductForm(emptyProductForm);
  };

  const beginEdit = (product: Product) => {
    setActiveProductId(product.id);
    setPanelMessage('');
    setProductForm({
      name: product.name,
      price: String(product.price),
      category: product.category,
      image: product.image,
      description: product.description,
      sizes: product.sizes.join(', '),
      isNew: Boolean(product.isNew),
      discountPercent: String(product.discountPercent ?? 0)
    });
  };

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    setPanelMessage('');

    const payload = {
      name: productForm.name.trim(),
      price: Number(productForm.price),
      category: productForm.category,
      image: productForm.image.trim(),
      description: productForm.description.trim(),
      sizes: productForm.sizes.split(',').map((size) => size.trim()).filter(Boolean),
      isNew: productForm.isNew,
      discountPercent: Number(productForm.discountPercent) || 0
    };

    if (activeProductId) {
      await updateProduct(activeProductId, payload);
      setPanelMessage('Product updated successfully.');
    } else {
      await createProduct(payload);
      setPanelMessage('Product added to the showroom.');
      setProductForm(emptyProductForm);
    }

    setIsSaving(false);
  };

  const handleDelete = async (productId: string) => {
    setPanelMessage('');
    await deleteProduct(productId);
    if (activeProductId === productId) {
      setActiveProductId(null);
      setProductForm(emptyProductForm);
    }
    setPanelMessage('Product removed from the showroom.');
  };

  const handleDiscount = async (productId: string) => {
    const nextValue = Number(discountDrafts[productId] ?? 0);
    await applyDiscount(productId, nextValue);
    setPanelMessage(`Discount updated to ${nextValue}% for product ${productId}.`);
  };

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.45em] text-gold/80">Admin control center</p>
            <h1 className="font-serif text-5xl md:text-6xl">Catalog and discount management</h1>
            <p className="mt-4 max-w-2xl text-white/60">
              Add new products, edit existing ones, and publish discounts that update instantly across the storefront.
            </p>
          </div>
          <Button
            onClick={beginCreate}
            size="lg"
            className="h-12 rounded-2xl bg-gold px-6 text-black hover:bg-gold/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add new product
          </Button>
        </div>

        <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
          <form
            onSubmit={handleSave}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-8"
          >
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gold/80">
                  {activeProduct ? 'Edit product' : 'Create product'}
                </p>
                <h2 className="mt-2 font-serif text-4xl">
                  {activeProduct ? activeProduct.name : 'New showroom piece'}
                </h2>
              </div>
              {activeProduct ? (
                <button
                  type="button"
                  onClick={beginCreate}
                  className="text-sm text-white/55 transition-colors hover:text-gold"
                >
                  Clear selection
                </button>
              ) : null}
            </div>

            <div className="grid gap-4">
              <Input
                required
                value={productForm.name}
                onChange={(event) => setProductForm((current) => ({ ...current, name: event.target.value }))}
                className="h-12 rounded-2xl border-white/10 bg-white/5 text-white"
                placeholder="Product name"
              />
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  required
                  min="0"
                  type="number"
                  value={productForm.price}
                  onChange={(event) => setProductForm((current) => ({ ...current, price: event.target.value }))}
                  className="h-12 rounded-2xl border-white/10 bg-white/5 text-white"
                  placeholder="Price"
                />
                <Select
                  value={productForm.category}
                  onValueChange={(value) =>
                    setProductForm((current) => ({ ...current, category: value as ProductCategory }))
                  }
                >
                  <SelectTrigger className="h-12 w-full rounded-2xl border-white/10 bg-white/5 text-white">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="w-full border border-white/10 bg-[#141414]">
                    <SelectItem value="men">Men</SelectItem>
                    <SelectItem value="women">Women</SelectItem>
                    <SelectItem value="kids">Kids</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Input
                required
                value={productForm.image}
                onChange={(event) => setProductForm((current) => ({ ...current, image: event.target.value }))}
                className="h-12 rounded-2xl border-white/10 bg-white/5 text-white"
                placeholder="Image path"
              />
              <textarea
                required
                value={productForm.description}
                onChange={(event) =>
                  setProductForm((current) => ({ ...current, description: event.target.value }))
                }
                className="min-h-[140px] rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4 text-white outline-none transition focus:border-gold/40"
                placeholder="Product description"
              />
              <Input
                value={productForm.sizes}
                onChange={(event) => setProductForm((current) => ({ ...current, sizes: event.target.value }))}
                className="h-12 rounded-2xl border-white/10 bg-white/5 text-white"
                placeholder="Sizes, separated by commas"
              />
              <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
                <Input
                  min="0"
                  max="90"
                  type="number"
                  value={productForm.discountPercent}
                  onChange={(event) =>
                    setProductForm((current) => ({ ...current, discountPercent: event.target.value }))
                  }
                  className="h-12 rounded-2xl border-white/10 bg-white/5 text-white"
                  placeholder="Discount percent"
                />
                <label className="flex items-center gap-3 text-sm text-white/70">
                  <input
                    type="checkbox"
                    checked={productForm.isNew}
                    onChange={(event) =>
                      setProductForm((current) => ({ ...current, isNew: event.target.checked }))
                    }
                    className="h-4 w-4 accent-[#C8A84E]"
                  />
                  Mark as new arrival
                </label>
              </div>
            </div>

            {panelMessage ? (
              <div className="mt-6 rounded-2xl border border-gold/20 bg-gold/10 px-4 py-3 text-sm text-white/80">
                {panelMessage}
              </div>
            ) : null}

            <Button
              type="submit"
              size="lg"
              disabled={isSaving}
              className="mt-8 h-12 rounded-2xl bg-gold px-8 text-black hover:bg-gold/90"
            >
              {isSaving ? (
                <span className="flex items-center gap-3">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/25 border-t-black" />
                  Saving changes...
                </span>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {activeProduct ? 'Update product' : 'Create product'}
                </>
              )}
            </Button>
          </form>

          <section className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-[2rem] border border-white/10 bg-black/20 p-5 backdrop-blur-sm"
              >
                <div className="flex flex-col gap-4 lg:flex-row">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-36 w-full rounded-[1.5rem] object-cover lg:w-36"
                  />
                  <div className="flex-1">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <p className="mb-1 text-xs uppercase tracking-[0.3em] text-white/45">{product.category}</p>
                        <h3 className="text-2xl">{product.name}</h3>
                        <p className="mt-3 text-sm text-white/60">{product.description}</p>
                      </div>
                      <div className="text-left lg:text-right">
                        <p className="text-lg font-semibold text-gold">Ksh.{getDiscountedPrice(product)}</p>
                        {product.discountPercent ? (
                          <p className="text-sm text-white/45 line-through">Ksh.{product.price}</p>
                        ) : null}
                      </div>
                    </div>

                    <div className="mt-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                      <div className="flex flex-wrap gap-2">
                        {product.sizes.map((size) => (
                          <span
                            key={size}
                            className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/60"
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <Button
                          variant="outline"
                          onClick={() => beginEdit(product)}
                          className="rounded-full border-gold/30 bg-transparent px-4 text-gold hover:bg-gold hover:text-black"
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => handleDelete(product.id)}
                          className="rounded-full border-red-500/30 bg-transparent px-4 text-red-300 hover:bg-red-500/15 hover:text-red-200"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>

                    <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                      <div className="flex flex-col gap-3 md:flex-row md:items-center">
                        <div className="flex items-center gap-2 text-gold">
                          <TicketPercent className="h-4 w-4" />
                          <span className="text-xs uppercase tracking-[0.3em]">Discount control</span>
                        </div>
                        <div className="flex flex-1 flex-col gap-3 md:flex-row">
                          <Input
                            min="0"
                            max="90"
                            type="number"
                            value={discountDrafts[product.id] ?? product.discountPercent ?? 0}
                            onChange={(event) =>
                              setDiscountDrafts((current) => ({
                                ...current,
                                [product.id]: event.target.value
                              }))
                            }
                            className="h-11 rounded-2xl border-white/10 bg-white/5 text-white"
                          />
                          <Button
                            onClick={() => handleDiscount(product.id)}
                            className="h-11 rounded-2xl bg-gold text-black hover:bg-gold/90"
                          >
                            Apply discount
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
