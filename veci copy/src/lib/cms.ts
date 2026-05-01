import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { RowDataPacket } from "mysql2";
import { getDbPool, isMysqlEnabled } from "@/lib/db";

export type LocaleText = {
  az: string;
  ru: string;
};

export type CmsService = {
  id: string;
  category: "packages" | "makeup" | "hair" | "henna" | "eyelash";
  name: LocaleText;
  duration: LocaleText;
  price: LocaleText;
  description: LocaleText;
};

export type CmsPhoto = {
  id: string;
  slot?: "about_main" | "featured_1" | "featured_2" | "featured_3";
  imageUrl: string;
  alt: LocaleText;
};

export type CmsGalleryPhoto = CmsPhoto & {
  category: "lashes" | "makeup" | "skincare";
};

export type Reservation = {
  id: string;
  category: string;
  service: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  notes: string;
  createdAt: string;
};

export type CmsData = {
  services: CmsService[];
  homePhotos: CmsPhoto[];
  galleryPhotos: CmsGalleryPhoto[];
  reservations: Reservation[];
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "cms.json");

const seedData: CmsData = {
  services: [
    {
      id: "svc-1",
      category: "makeup",
      name: { az: "Ziyafət makiyajı", ru: "Вечерний макияж" },
      duration: { az: "60-90 dəq", ru: "60-90 мин" },
      price: { az: "80 AZN", ru: "80 AZN" },
      description: {
        az: "Kirpiksiz ziyafət makiyajı.",
        ru: "Вечерний макияж без ресниц.",
      },
    },
    {
      id: "svc-2",
      category: "hair",
      name: { az: "Ziyafət saçı", ru: "Вечерняя прическа" },
      duration: { az: "60-90 dəq", ru: "60-90 мин" },
      price: { az: "60 / 70 / 80 AZN", ru: "60 / 70 / 80 AZN" },
      description: {
        az: "Saç uzunluğundan asılı qiymət.",
        ru: "Цена зависит от длины волос.",
      },
    },
  ],
  homePhotos: [
    {
      id: "home-1",
      slot: "about_main",
      imageUrl:
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80",
      alt: { az: "Gözəllik studiyası interyeri", ru: "Интерьер студии красоты" },
    },
    {
      id: "home-2",
      slot: "featured_1",
      imageUrl:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
      alt: { az: "Makiyaj işi", ru: "Работа визажиста" },
    },
  ],
  galleryPhotos: [
    {
      id: "gal-1",
      category: "lashes",
      imageUrl:
        "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80",
      alt: { az: "Kirpik işi", ru: "Работа по ресницам" },
    },
    {
      id: "gal-2",
      category: "makeup",
      imageUrl:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
      alt: { az: "Makiyaj görünüşü", ru: "Образ с макияжем" },
    },
  ],
  reservations: [],
};

async function ensureDataFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify(seedData, null, 2), "utf8");
  }
}

function normalizeHomePhotoSlots(data: CmsData): CmsData {
  const fallbackSlots: NonNullable<CmsPhoto["slot"]>[] = [
    "about_main",
    "featured_1",
    "featured_2",
    "featured_3",
  ];
  return {
    ...data,
    homePhotos: data.homePhotos.map((photo, index) => ({
      ...photo,
      slot: photo.slot ?? fallbackSlots[index] ?? "featured_3",
    })),
  };
}

const SERVICE_CATEGORIES: CmsService["category"][] = ["packages", "makeup", "hair", "henna", "eyelash"];
const GALLERY_CATEGORIES: CmsGalleryPhoto["category"][] = ["lashes", "makeup", "skincare"];
const HOME_SLOTS: NonNullable<CmsPhoto["slot"]>[] = ["about_main", "featured_1", "featured_2", "featured_3"];

function coerceLocale(obj: unknown): LocaleText {
  if (obj && typeof obj === "object" && "az" in obj && "ru" in obj) {
    const o = obj as Record<string, unknown>;
    return { az: String(o.az ?? ""), ru: String(o.ru ?? "") };
  }
  return { az: "", ru: "" };
}

/** Validates JSON from the admin panel before file or MySQL persistence. */
export function sanitizeCmsInput(input: unknown): CmsData {
  const root = input && typeof input === "object" ? (input as Record<string, unknown>) : {};
  const servicesRaw = Array.isArray(root.services) ? root.services : [];
  const homeRaw = Array.isArray(root.homePhotos) ? root.homePhotos : [];
  const galleryRaw = Array.isArray(root.galleryPhotos) ? root.galleryPhotos : [];
  const resRaw = Array.isArray(root.reservations) ? root.reservations : [];

  const services: CmsService[] = servicesRaw.map((s): CmsService => {
    const row = s && typeof s === "object" ? (s as Record<string, unknown>) : {};
    const catRaw = row.category;
    const category = SERVICE_CATEGORIES.includes(catRaw as CmsService["category"])
      ? (catRaw as CmsService["category"])
      : "makeup";

    return {
      id: String(row.id ?? ""),
      category,
      name: coerceLocale(row.name),
      duration: coerceLocale(row.duration),
      price: coerceLocale(row.price),
      description: coerceLocale(row.description),
    };
  });

  const homePhotos: CmsPhoto[] = homeRaw.map((p, index): CmsPhoto => {
    const row = p && typeof p === "object" ? (p as Record<string, unknown>) : {};
    const slotRaw = row.slot;
    const slot = HOME_SLOTS.includes(slotRaw as NonNullable<CmsPhoto["slot"]>)
      ? (slotRaw as NonNullable<CmsPhoto["slot"]>)
      : HOME_SLOTS[index] ?? "featured_3";

    return {
      id: String(row.id ?? ""),
      slot,
      imageUrl: String(row.imageUrl ?? ""),
      alt: coerceLocale(row.alt),
    };
  });

  const galleryPhotos: CmsGalleryPhoto[] = galleryRaw.map((p): CmsGalleryPhoto => {
    const row = p && typeof p === "object" ? (p as Record<string, unknown>) : {};
    const catRaw = row.category;
    const category = GALLERY_CATEGORIES.includes(catRaw as CmsGalleryPhoto["category"])
      ? (catRaw as CmsGalleryPhoto["category"])
      : "makeup";

    return {
      id: String(row.id ?? ""),
      category,
      imageUrl: String(row.imageUrl ?? ""),
      alt: coerceLocale(row.alt),
    };
  });

  const reservations: Reservation[] = resRaw.map((r): Reservation => {
    const row = r && typeof r === "object" ? (r as Record<string, unknown>) : {};
    return {
      id: String(row.id ?? ""),
      category: String(row.category ?? ""),
      service: String(row.service ?? ""),
      firstName: String(row.firstName ?? ""),
      lastName: String(row.lastName ?? ""),
      email: String(row.email ?? ""),
      phone: String(row.phone ?? ""),
      date: String(row.date ?? ""),
      time: String(row.time ?? ""),
      notes: String(row.notes ?? ""),
      createdAt: String(row.createdAt ?? ""),
    };
  });

  return normalizeHomePhotoSlots({
    services,
    homePhotos,
    galleryPhotos,
    reservations,
  });
}

export async function readCmsData(): Promise<CmsData> {
  if (isMysqlEnabled()) {
    return readCmsDataFromMysql();
  }

  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf8");
  try {
    const parsed = JSON.parse(raw) as CmsData;
    return normalizeHomePhotoSlots(parsed);
  } catch {
    // Recovery path: sometimes two JSON root objects are accidentally concatenated.
    // Convert "{...}{...}" into "[{...},{...}]" and keep the latest object.
    const normalized = `[${raw.trim().replace(/\}\s*\{/g, "},{")}]`;
    const parsed = JSON.parse(normalized) as CmsData[];
    const latest = normalizeHomePhotoSlots(parsed[parsed.length - 1] ?? seedData);
    await writeCmsData(latest);
    return latest;
  }
}

export async function writeCmsData(data: CmsData): Promise<void> {
  if (isMysqlEnabled()) {
    await writeCmsDataToMysql(data);
    return;
  }

  await ensureDataFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

export function newId(prefix: string) {
  return `${prefix}-${randomUUID().slice(0, 8)}`;
}

async function readCmsDataFromMysql(): Promise<CmsData> {
  const pool = getDbPool();

  const [servicesRows] = await pool.query<
    Array<
      RowDataPacket & {
      service_code: string;
      category: CmsService["category"];
      name_az: string;
      name_ru: string;
      duration_az: string;
      duration_ru: string;
      price_az: string;
      price_ru: string;
      description_az: string;
      description_ru: string;
      }
    >
  >(
    `SELECT service_code, category, name_az, name_ru, duration_az, duration_ru, price_az, price_ru, description_az, description_ru
     FROM services
     WHERE is_active = 1
     ORDER BY sort_order ASC, id ASC`,
  );

  const [homeRows] = await pool.query<
    Array<
      RowDataPacket & {
      photo_code: string;
      image_url: string;
      alt_az: string;
      alt_ru: string;
      sort_order: number;
      }
    >
  >(
    `SELECT photo_code, image_url, alt_az, alt_ru, sort_order
     FROM home_photos
     WHERE is_active = 1
     ORDER BY sort_order ASC, id ASC`,
  );

  const [galleryRows] = await pool.query<
    Array<
      RowDataPacket & {
      photo_code: string;
      category: CmsGalleryPhoto["category"];
      image_url: string;
      alt_az: string;
      alt_ru: string;
      sort_order: number;
      }
    >
  >(
    `SELECT photo_code, category, image_url, alt_az, alt_ru, sort_order
     FROM gallery_photos
     WHERE is_active = 1
     ORDER BY sort_order ASC, id ASC`,
  );

  const [reservationRows] = await pool.query<
    Array<
      RowDataPacket & {
      reservation_code: string;
      category: string;
      service: string;
      first_name: string;
      last_name: string;
      email: string | null;
      phone: string;
      reservation_date: string;
      reservation_time: string;
      notes: string | null;
      created_at: string;
      }
    >
  >(
    `SELECT reservation_code, category, service, first_name, last_name, email, phone, reservation_date, reservation_time, notes, created_at
     FROM reservations
     ORDER BY created_at DESC`,
  );

  const data: CmsData = {
    services: servicesRows.map((row) => ({
      id: row.service_code,
      category: row.category,
      name: { az: row.name_az, ru: row.name_ru },
      duration: { az: row.duration_az, ru: row.duration_ru },
      price: { az: row.price_az, ru: row.price_ru },
      description: { az: row.description_az, ru: row.description_ru },
    })),
    homePhotos: homeRows.map((row, index) => ({
      id: row.photo_code,
      slot: (["about_main", "featured_1", "featured_2", "featured_3"][index] ??
        "featured_3") as NonNullable<CmsPhoto["slot"]>,
      imageUrl: row.image_url,
      alt: { az: row.alt_az, ru: row.alt_ru },
    })),
    galleryPhotos: galleryRows.map((row) => ({
      id: row.photo_code,
      category: row.category,
      imageUrl: row.image_url,
      alt: { az: row.alt_az, ru: row.alt_ru },
    })),
    reservations: reservationRows.map((row) => ({
      id: row.reservation_code,
      category: row.category,
      service: row.service,
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email ?? "",
      phone: row.phone,
      date: String(row.reservation_date).slice(0, 10),
      time: String(row.reservation_time).slice(0, 5),
      notes: row.notes ?? "",
      createdAt: row.created_at,
    })),
  };

  return normalizeHomePhotoSlots(data);
}

async function writeCmsDataToMysql(data: CmsData): Promise<void> {
  const pool = getDbPool();
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    await conn.query(`UPDATE services SET is_active = 0`);
    for (let i = 0; i < data.services.length; i += 1) {
      const service = data.services[i];
      await conn.query(
        `INSERT INTO services (service_code, category, name_az, name_ru, duration_az, duration_ru, price_az, price_ru, description_az, description_ru, sort_order, is_active)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
         ON DUPLICATE KEY UPDATE
           category = VALUES(category),
           name_az = VALUES(name_az),
           name_ru = VALUES(name_ru),
           duration_az = VALUES(duration_az),
           duration_ru = VALUES(duration_ru),
           price_az = VALUES(price_az),
           price_ru = VALUES(price_ru),
           description_az = VALUES(description_az),
           description_ru = VALUES(description_ru),
           sort_order = VALUES(sort_order),
           is_active = 1`,
        [
          service.id || newId("svc"),
          service.category,
          service.name.az,
          service.name.ru,
          service.duration.az,
          service.duration.ru,
          service.price.az,
          service.price.ru,
          service.description.az,
          service.description.ru,
          i + 1,
        ],
      );
    }

    await conn.query(`UPDATE home_photos SET is_active = 0`);
    const homeOrder = ["about_main", "featured_1", "featured_2", "featured_3"] as const;
    const sortedHome = [...data.homePhotos].sort(
      (a, b) => homeOrder.indexOf((a.slot ?? "featured_3") as (typeof homeOrder)[number]) -
        homeOrder.indexOf((b.slot ?? "featured_3") as (typeof homeOrder)[number]),
    );
    for (let i = 0; i < sortedHome.length; i += 1) {
      const photo = sortedHome[i];
      await conn.query(
        `INSERT INTO home_photos (photo_code, image_url, alt_az, alt_ru, sort_order, is_active)
         VALUES (?, ?, ?, ?, ?, 1)
         ON DUPLICATE KEY UPDATE
           image_url = VALUES(image_url),
           alt_az = VALUES(alt_az),
           alt_ru = VALUES(alt_ru),
           sort_order = VALUES(sort_order),
           is_active = 1`,
        [photo.id || newId("home"), photo.imageUrl, photo.alt.az, photo.alt.ru, i + 1],
      );
    }

    await conn.query(`UPDATE gallery_photos SET is_active = 0`);
    for (let i = 0; i < data.galleryPhotos.length; i += 1) {
      const photo = data.galleryPhotos[i];
      await conn.query(
        `INSERT INTO gallery_photos (photo_code, category, image_url, alt_az, alt_ru, sort_order, is_active)
         VALUES (?, ?, ?, ?, ?, ?, 1)
         ON DUPLICATE KEY UPDATE
           category = VALUES(category),
           image_url = VALUES(image_url),
           alt_az = VALUES(alt_az),
           alt_ru = VALUES(alt_ru),
           sort_order = VALUES(sort_order),
           is_active = 1`,
        [photo.id || newId("gal"), photo.category, photo.imageUrl, photo.alt.az, photo.alt.ru, i + 1],
      );
    }

    await conn.commit();
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
}
