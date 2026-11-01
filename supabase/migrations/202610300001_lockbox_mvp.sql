create extension if not exists pgcrypto;
create extension if not exists citext;

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null unique,
  created_at timestamptz not null default now(),
  session_id uuid not null,
  event_name text not null check (event_name in (
    'page_view', 'view_item_list', 'select_item', 'view_item', 'add_to_cart',
    'remove_from_cart', 'view_cart', 'begin_checkout', 'checkout_step_view',
    'delivery_country_selected', 'checkout_review', 'purchase_intent',
    'waitlist_signup', 'scroll_depth', 'page_engagement'
  )),
  product_id text check (product_id is null or product_id in ('timer-lock', 'box-s', 'box-m', 'box-l')),
  cart_value_cents integer check (cart_value_cents is null or cart_value_cents >= 0),
  country text,
  campaign text,
  utm_source text,
  utm_medium text,
  utm_content text,
  event_data jsonb not null default '{}'::jsonb
);

create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email citext not null unique,
  country text,
  preferred_product text check (preferred_product is null or preferred_product in ('timer-lock', 'box-s', 'box-m', 'box-l')),
  marketing_consent boolean not null check (marketing_consent = true),
  consent_timestamp timestamptz not null
);

create index if not exists analytics_events_created_at_idx on public.analytics_events (created_at desc);
create index if not exists analytics_events_name_created_idx on public.analytics_events (event_name, created_at desc);
create index if not exists analytics_events_session_idx on public.analytics_events (session_id);
create index if not exists analytics_events_product_idx on public.analytics_events (product_id) where product_id is not null;
create index if not exists analytics_events_campaign_idx on public.analytics_events (campaign) where campaign is not null;
create index if not exists waitlist_signups_created_at_idx on public.waitlist_signups (created_at desc);

alter table public.analytics_events enable row level security;
alter table public.waitlist_signups enable row level security;

-- Intentionally no anon/authenticated policies. All reads and controlled writes go
-- through server routes using the service role after validation/authorization.
revoke all on public.analytics_events from anon, authenticated;
revoke all on public.waitlist_signups from anon, authenticated;
grant all on public.analytics_events to service_role;
grant all on public.waitlist_signups to service_role;

comment on table public.analytics_events is 'Consent-gated TimerLockBox.eu funnel events. Never store email or raw IP data here.';
comment on table public.waitlist_signups is 'Explicit TimerLockBox.eu launch-email opt-ins. Admin access only.';
