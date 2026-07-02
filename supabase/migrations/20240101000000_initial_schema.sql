-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─────────────────────────────────────────────────────────────
-- PROFILES
-- ─────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid not null unique references auth.users(id) on delete cascade,
  full_name     text,
  phone         text,
  date_of_birth date,
  gender        text check (gender in ('male','female','other')),
  avatar_url    text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = user_id);
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = user_id);

-- Auto-create profile on sign-up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles(user_id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─────────────────────────────────────────────────────────────
-- ADDRESSES
-- ─────────────────────────────────────────────────────────────
create table if not exists public.addresses (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  label       text not null default 'Home',
  full_name   text not null,
  phone       text not null,
  line1       text not null,
  line2       text,
  city        text not null,
  state       text not null,
  pincode     text not null,
  is_default  boolean not null default false,
  created_at  timestamptz not null default now()
);
alter table public.addresses enable row level security;
create policy "Users can manage own addresses" on public.addresses
  for all using (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────
-- CATEGORIES & MEDICINES
-- ─────────────────────────────────────────────────────────────
create table if not exists public.categories (
  id       uuid primary key default uuid_generate_v4(),
  name     text not null,
  slug     text not null unique,
  icon_url text
);

create table if not exists public.medicines (
  id                    uuid primary key default uuid_generate_v4(),
  name                  text not null,
  generic_name          text,
  brand                 text,
  category_id           uuid references public.categories(id),
  description           text,
  price                 numeric(10,2) not null,
  discount_percent      numeric(5,2) default 0,
  discounted_price      numeric(10,2) not null,
  image_url             text,
  manufacturer          text,
  composition           text,
  dosage_form           text,
  pack_size             text,
  prescription_required boolean not null default false,
  in_stock              boolean not null default true,
  stock_quantity        integer not null default 0,
  is_featured           boolean not null default false,
  rating                numeric(3,2) default 0,
  review_count          integer default 0,
  created_at            timestamptz not null default now()
);
alter table public.medicines enable row level security;
create policy "Anyone can view medicines" on public.medicines for select using (true);

-- ─────────────────────────────────────────────────────────────
-- ORDERS
-- ─────────────────────────────────────────────────────────────
create table if not exists public.orders (
  id                   uuid primary key default uuid_generate_v4(),
  user_id              uuid not null references auth.users(id),
  address_id           uuid references public.addresses(id),
  status               text not null default 'pending'
                         check (status in ('pending','confirmed','processing','out_for_delivery','delivered','cancelled','returned')),
  payment_method       text not null,
  payment_status       text not null default 'pending'
                         check (payment_status in ('pending','paid','failed','refunded')),
  subtotal             numeric(10,2) not null,
  discount             numeric(10,2) not null default 0,
  delivery_fee         numeric(10,2) not null default 0,
  total                numeric(10,2) not null,
  prescription_id      uuid,
  cancellation_reason  text,
  estimated_delivery   timestamptz,
  delivered_at         timestamptz,
  tracking_url         text,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);
alter table public.orders enable row level security;
create policy "Users can view own orders" on public.orders for select using (auth.uid() = user_id);

create table if not exists public.order_items (
  id          uuid primary key default uuid_generate_v4(),
  order_id    uuid not null references public.orders(id) on delete cascade,
  medicine_id uuid not null references public.medicines(id),
  quantity    integer not null,
  unit_price  numeric(10,2) not null,
  total_price numeric(10,2) not null
);
alter table public.order_items enable row level security;
create policy "Users can view own order items" on public.order_items
  for select using (
    exists (select 1 from public.orders where id = order_id and user_id = auth.uid())
  );

-- ─────────────────────────────────────────────────────────────
-- DOCTORS & CONSULTATIONS
-- ─────────────────────────────────────────────────────────────
create table if not exists public.doctors (
  id                uuid primary key default uuid_generate_v4(),
  full_name         text not null,
  specialization    text not null,
  qualification     text,
  experience_years  integer default 0,
  avatar_url        text,
  rating            numeric(3,2) default 0,
  review_count      integer default 0,
  consultation_fee  numeric(10,2) not null,
  languages         text[] default array['English']
);
alter table public.doctors enable row level security;
create policy "Anyone can view doctors" on public.doctors for select using (true);

create table if not exists public.time_slots (
  id           uuid primary key default uuid_generate_v4(),
  doctor_id    uuid not null references public.doctors(id) on delete cascade,
  date         date not null,
  start_time   time not null,
  end_time     time not null,
  is_available boolean not null default true
);
alter table public.time_slots enable row level security;
create policy "Anyone can view slots" on public.time_slots for select using (true);

create table if not exists public.consultations (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid not null references auth.users(id),
  doctor_id       uuid not null references public.doctors(id),
  slot_id         uuid not null references public.time_slots(id),
  status          text not null default 'scheduled'
                    check (status in ('scheduled','ongoing','completed','cancelled')),
  symptoms        text,
  notes           text,
  prescription_id uuid,
  session_url     text,
  fee             numeric(10,2) not null,
  payment_method  text,
  payment_status  text not null default 'pending',
  created_at      timestamptz not null default now()
);
alter table public.consultations enable row level security;
create policy "Users can view own consultations" on public.consultations
  for select using (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────
-- LAB TESTS
-- ─────────────────────────────────────────────────────────────
create table if not exists public.lab_tests (
  id                uuid primary key default uuid_generate_v4(),
  name              text not null,
  description       text,
  category          text not null,
  price             numeric(10,2) not null,
  discount_percent  numeric(5,2) default 0,
  discounted_price  numeric(10,2) not null,
  turnaround_hours  integer not null default 24,
  sample_type       text not null default 'blood',
  fasting_required  boolean not null default false,
  home_collection   boolean not null default true,
  image_url         text
);
alter table public.lab_tests enable row level security;
create policy "Anyone can view lab tests" on public.lab_tests for select using (true);

create table if not exists public.lab_test_bookings (
  id               uuid primary key default uuid_generate_v4(),
  user_id          uuid not null references auth.users(id),
  test_id          uuid not null references public.lab_tests(id),
  status           text not null default 'booked'
                     check (status in ('booked','sample_collected','processing','report_ready','cancelled')),
  collection_date  date not null,
  collection_slot  text not null,
  address_id       uuid references public.addresses(id),
  payment_method   text,
  fee              numeric(10,2) not null,
  payment_status   text not null default 'pending',
  sample_collected_at timestamptz,
  report_url       text,
  report_ready_at  timestamptz,
  created_at       timestamptz not null default now()
);
alter table public.lab_test_bookings enable row level security;
create policy "Users can view own lab bookings" on public.lab_test_bookings
  for select using (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────
-- PRESCRIPTIONS
-- ─────────────────────────────────────────────────────────────
create table if not exists public.prescriptions (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  image_url    text not null,
  file_path    text,
  doctor_name  text,
  issued_date  date,
  expiry_date  date,
  status       text not null default 'pending_review'
                 check (status in ('pending_review','approved','rejected','expired')),
  notes        text,
  created_at   timestamptz not null default now()
);
alter table public.prescriptions enable row level security;
create policy "Users can manage own prescriptions" on public.prescriptions
  for all using (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────
-- NOTIFICATIONS
-- ─────────────────────────────────────────────────────────────
create table if not exists public.notifications (
  id         uuid primary key default uuid_generate_v4(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  title      text not null,
  body       text not null,
  type       text not null check (type in ('order','consultation','lab_test','promotion','system')),
  data       jsonb,
  read       boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.notifications enable row level security;
create policy "Users can manage own notifications" on public.notifications
  for all using (auth.uid() = user_id);

-- ─────────────────────────────────────────────────────────────
-- STORAGE BUCKETS
-- ─────────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public) values
  ('avatars', 'avatars', true),
  ('prescriptions', 'prescriptions', false)
on conflict (id) do nothing;

create policy "Authenticated users can upload avatars" on storage.objects
  for insert with check (bucket_id = 'avatars' and auth.role() = 'authenticated');
create policy "Anyone can view avatars" on storage.objects
  for select using (bucket_id = 'avatars');
create policy "Users can upload own prescriptions" on storage.objects
  for insert with check (bucket_id = 'prescriptions' and auth.role() = 'authenticated');
create policy "Users can view own prescriptions" on storage.objects
  for select using (bucket_id = 'prescriptions' and auth.uid()::text = (storage.foldername(name))[1]);
