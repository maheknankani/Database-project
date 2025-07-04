import pg from "pg";
const { Pool } = pg;

export const db = new Pool({
  user: "exams_owner",
  host: "ep-proud-fog-a17wj7k7-pooler.ap-southeast-1.aws.neon.tech",
  database: "exams",
  password: "npg_lCXDM0i3LauR",
  port: 5432,
  ssl: {
    rejectUnauthorized: false // Required for Neon SSL
  }
});
