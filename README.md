# Addis Eats

Addis Eats is a React food ordering interface for Addis Ababa.

## Run the project
bash
npm install
npm run dev

For a production build:

 bash
npm run build

## Main features

- Browse Ethiopian dishes and categories
- Search the menu
- Open a dish detail page
- Add dishes to the basket
- Increase and decrease quantities
- Remove dishes from the basket
- Basket total and delivery fee
- Checkout form
- Account sign-in screen
- Responsive mobile-first layout

## Cart state

The cart is kept in a Zustand store because several screens need the same order data. The store contains the items and the actions used to add, remove, decrease, and clear items.

The cart uses Zustand persistence with the key `addis-eats-cart`, so an order remains after a page refresh.

Components use narrow selectors such as `useCartStore((state) => state.items)` or `useCartStore((state) => state.addItem)` instead of reading the complete store.

Auth and interface state stay local to the screens in this version because they do not need the same shared cart behavior.
