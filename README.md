ShopVista E-Commerce Web Application

Tech used :
-HTML
-CSS
-Bootstrap

Authentication :
-Users can register on the website as either a customer or a seller, but the data provided must be accurate, as the form includes validation to ensure correctness.
-Each user's email must be unique, as duplicate registrations with the same email are not allowed.
-All website pages are fully protected, meaning users cannot access any unauthorized pages. For instance, a customer cannot access the seller dashboard, and neither can access the admin dashboard, even if they know the URL.


Home :
-Anyone can access the homepage to browse products and view product details. However, adding items to the cart is restricted to logged-in users only.

Contact
-Anyone can access the contact page, fill out the form, and send a ticket to customer service. These tickets will be delivered to the admins on the dashboard.


Shop
-Logged-in users can browse products, add items to their cart, and filter products by category or name using the search bar.

Cart
-The cart displays all products added, including the desired quantity for each. Users can adjust the quantity as long as the stock allows it.
-If a user tries to request more than the available stock, they will be prevented from adding more.
-The total price of the cart items is automatically displayed and updated whenever items are added or removed.


Checkout :
-Users can proceed to checkout if there are items in the cart and they are ready to confirm the purchase and payment.
-Payment options include Visa or cash, with the form undergoing validation as expected.


Orders :
-The orders page displays a history of all orders made by the user, along with a quick view of purchase details.

Profile :
-The profile page allows users to view and edit their personal information, change their password, or even deactivate their account.

Seller Dashboard :
-The seller dashboard is exclusive to sellers, showing all their products and allowing them to edit or add new items for sale. Newly added items are marked as pending until approved by an admin.
-The dashboard includes a page where sellers can view which products have been sold and details of those transactions.
-Another page displays a chart of sales volume for each of the seller's products.
-If a seller's account is deleted, all their product data will be removed from the website and from any customer's cart. However, if the account is deactivated, their products will remain but will no longer be displayed on the website, allowing for reactivation later.

Admin Dashboard :
-The admin dashboard includes a page to view all products on the website, whether they belong to sellers or the site itself, with options to edit or delete them.
-Another page lists all user accounts, including sellers and customers, allowing admins to view details, edit, delete, or even add new accounts, including admin accounts.
-A page is dedicated to reviewing pending products submitted by sellers, where admins can approve or reject them for display on the site.
-The customer service page allows admins to respond to tickets sent from the contact page.
