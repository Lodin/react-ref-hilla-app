import cn from 'classnames';
import type { ReactElement } from 'react';

export default function GroceryView(): ReactElement<unknown> | null {
  return (
    <div
      className={cn('flex', 'flex-col', 'h-full', 'items-center', 'justify-center', 'p-l', 'text-center', 'box-border')}
    >
      <img style={{ width: '200px' }} src="images/empty-plant.png" />
      <h2>This place intentionally left empty</h2>
      <p>It’s a place where you can grow your own UI 🤗</p>
    </div>
  );
}
