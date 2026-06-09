import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { EXTRAS, CATEGORY_LABELS, type ExtraCategory, type ExtraSelection } from '../../data/extras';
import { formatCOP } from '../../utils/pricing';
import './BookingExtras.scss';

const CATEGORIES: ExtraCategory[] = ['gastronomia', 'decoracion', 'servicios'];

interface BookingExtrasProps {
  extras: ExtraSelection[];
  onChange: (extras: ExtraSelection[]) => void;
}

export function BookingExtras({ extras, onChange }: BookingExtrasProps) {
  const cartMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const e of extras) map.set(e.itemId, e.quantity);
    return map;
  }, [extras]);

  const cartTotal = useMemo(() => {
    let total = 0;
    for (const e of extras) {
      const item = EXTRAS.find((x) => x.id === e.itemId);
      if (item) total += item.price * e.quantity;
    }
    return total;
  }, [extras]);

  const getQty = (id: string) => cartMap.get(id) ?? 0;

  const setQty = (itemId: string, qty: number) => {
    if (qty < 0) return;
    const updated = qty === 0
      ? extras.filter((e) => e.itemId !== itemId)
      : [...extras.filter((e) => e.itemId !== itemId), { itemId, quantity: qty }];
    onChange(updated);
  };

  return (
    <div className="booking-extras">
      <div className="booking-extras__content">
        {CATEGORIES.map((cat) => {
          const items = EXTRAS.filter((e) => e.category === cat);
          if (items.length === 0) return null;
          return (
            <div key={cat} className="extras-category">
              <h3 className="extras-category__title">{CATEGORY_LABELS[cat]}</h3>
              <div className="extras-category__grid">
                {items.map((item, i) => {
                  const qty = getQty(item.id);
                  return (
                    <motion.div
                      key={item.id}
                      className={`extras-card ${qty > 0 ? 'is-selected' : ''}`}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.04 }}
                    >
                      <div className="extras-card__body">
                        <h4>{item.name}</h4>
                        <p>{item.description}</p>
                        <span className="extras-card__price">
                          {formatCOP(item.price)}
                          <small>/{item.unit}</small>
                        </span>
                      </div>
                      <div className="extras-card__actions">
                        {qty === 0 ? (
                          <button
                            type="button"
                            className="extras-card__add"
                            onClick={() => setQty(item.id, 1)}
                          >
                            <Plus size={16} /> Agregar
                          </button>
                        ) : (
                          <div className="extras-card__qty">
                            <button
                              type="button"
                              className="extras-card__qty-btn"
                              onClick={() => setQty(item.id, qty - 1)}
                            >
                              {qty === 1 ? <Trash2 size={14} /> : <Minus size={14} />}
                            </button>
                            <span>{qty}</span>
                            <button
                              type="button"
                              className="extras-card__qty-btn"
                              onClick={() => setQty(item.id, qty + 1)}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <aside className="booking-extras__cart">
        <div className="extras-cart">
          <div className="extras-cart__header">
            <ShoppingCart size={20} />
            <span>Tu carrito</span>
            {extras.length > 0 && <span className="extras-cart__count">{extras.length}</span>}
          </div>
          {extras.length === 0 ? (
            <p className="extras-cart__empty">
              Aún no has agregado ningún extra. Explora las categorías y elige los que más te gusten.
            </p>
          ) : (
            <ul className="extras-cart__list">
              {extras.map((e) => {
                const item = EXTRAS.find((x) => x.id === e.itemId);
                if (!item) return null;
                return (
                  <li key={e.itemId} className="extras-cart__item">
                    <div className="extras-cart__item-info">
                      <span className="extras-cart__item-name">{item.name}</span>
                      <span className="extras-cart__item-qty">×{e.quantity}</span>
                    </div>
                    <span className="extras-cart__item-price">
                      {formatCOP(item.price * e.quantity)}
                    </span>
                    <button
                      type="button"
                      className="extras-cart__item-remove"
                      onClick={() => setQty(e.itemId, 0)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
          {extras.length > 0 && (
            <div className="extras-cart__total">
              <span>Total extras</span>
              <strong>{formatCOP(cartTotal)}</strong>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
