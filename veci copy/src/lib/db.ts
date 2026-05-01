import mysql from "mysql2/promise";

declare global {
  // eslint-disable-next-line no-var
  var __veciDbPool: mysql.Pool | undefined;
}

function hasMysqlConfig() {
  return Boolean(
    process.env.MYSQL_HOST &&
      process.env.MYSQL_USER &&
      process.env.MYSQL_PASSWORD &&
      process.env.MYSQL_DATABASE,
  );
}

export function isMysqlEnabled() {
  return hasMysqlConfig();
}

function sslOptions(): Parameters<typeof mysql.createPool>[0]["ssl"] {
  const v = (process.env.MYSQL_SSL ?? "").toLowerCase();
  if (!(v === "1" || v === "true" || v === "yes")) {
    return undefined;
  }
  const rejectUnauthorized =
    process.env.MYSQL_SSL_REJECT_UNAUTHORIZED === "1" ||
    process.env.MYSQL_SSL_REJECT_UNAUTHORIZED === "true";
  const ca = process.env.MYSQL_SSL_CA?.trim();
  return {
    rejectUnauthorized,
    ...(ca ? { ca } : {}),
  };
}

export function getDbPool() {
  if (!hasMysqlConfig()) {
    throw new Error("Missing MySQL configuration");
  }

  if (!global.__veciDbPool) {
    const ssl = sslOptions();
    global.__veciDbPool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT ?? 3306),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      charset: "utf8mb4",
      connectTimeout: Number(process.env.MYSQL_CONNECT_TIMEOUT_MS ?? 15000),
      ...(ssl !== undefined ? { ssl } : {}),
    });
  }

  return global.__veciDbPool;
}
