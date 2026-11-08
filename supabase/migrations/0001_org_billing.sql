alter table public.organizations
  add column if not exists plan text,
  add column if not exists stripe_customer_id text,
  add column if not exists stripe_subscription_id text;