// API Client
// Token type default expiration times
// access token 48 hours
// refresh token 200 days

// rs-online-shop-2024_Adm
const clientID = "MXjx0D7Jw1Cmi0ZqSHWq2MUJ";
const secret = "HQk1sjqtKnouVW4uQ9ofT_6PGhL66lXT";
const scope = "manage_project:e-commerce-asinc";
const projectKey = "e-commerce-asinc";

// User
const clientID_READ = "AmDqUyGilXgCfhGMWKn5LNc_";
const secret_READ = "4sxGWQdf0oZzhsn1fbOyE5wDq-bbf5Hf";
const scope_USER_READ = "view_products:e-commerce-asinc manage_my_shopping_lists:e-commerce-asinc view_types:e-commerce-asinc manage_my_payments:e-commerce-asinc view_quote_requests:e-commerce-asinc manage_my_profile:e-commerce-asinc view_attribute_groups:e-commerce-asinc view_payments:e-commerce-asinc view_states:e-commerce-asinc view_staged_quotes:e-commerce-asinc manage_my_orders:e-commerce-asinc view_quotes:e-commerce-asinc view_tax_categories:e-commerce-asinc view_messages:e-commerce-asinc view_shipping_methods:e-commerce-asinc view_connectors_deployments:e-commerce-asinc view_connectors:e-commerce-asinc create_anonymous_token:e-commerce-asinc view_categories:e-commerce-asinc view_cart_discounts:e-commerce-asinc view_orders:e-commerce-asinc view_shopping_lists:e-commerce-asinc view_standalone_prices:e-commerce-asinc view_published_products:e-commerce-asinc view_product_selections:e-commerce-asinc manage_my_quotes:e-commerce-asinc";

const apiURL = "https://api.us-central1.gcp.commercetools.com";
const authURL = "https://auth.us-central1.gcp.commercetools.com";

const scope_EXTENDED = "view_products:e-commerce-asinc view_customers:e-commerce-asinc manage_my_shopping_lists:e-commerce-asinc view_types:e-commerce-asinc view_api_clients:e-commerce-asinc manage_my_payments:e-commerce-asinc view_stores:e-commerce-asinc view_quote_requests:e-commerce-asinc manage_my_profile:e-commerce-asinc view_attribute_groups:e-commerce-asinc view_payments:e-commerce-asinc view_states:e-commerce-asinc view_staged_quotes:e-commerce-asinc view_business_units:e-commerce-asinc manage_my_orders:e-commerce-asinc view_quotes:e-commerce-asinc view_project_settings:e-commerce-asinc manage_my_business_units:e-commerce-asinc view_tax_categories:e-commerce-asinc view_key_value_documents:e-commerce-asinc view_sessions:e-commerce-asinc view_import_containers:e-commerce-asinc view_audit_log:e-commerce-asinc view_messages:e-commerce-asinc view_shipping_methods:e-commerce-asinc view_connectors_deployments:e-commerce-asinc view_connectors:e-commerce-asinc create_anonymous_token:e-commerce-asinc view_customer_groups:e-commerce-asinc view_categories:e-commerce-asinc view_cart_discounts:e-commerce-asinc view_orders:e-commerce-asinc view_shopping_lists:e-commerce-asinc view_standalone_prices:e-commerce-asinc view_associate_roles:e-commerce-asinc view_published_products:e-commerce-asinc view_product_selections:e-commerce-asinc view_discount_codes:e-commerce-asinc view_order_edits:e-commerce-asinc manage_my_quote_requests:e-commerce-asinc manage_my_quotes:e-commerce-asinc";