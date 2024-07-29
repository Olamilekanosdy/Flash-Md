const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0cwcnpKSHN3TkR5K2R2OGsvTjB1V0lOQ1JmZUV0ZTd5VXhPMzJmUkZGYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiekJTQzZOOCtja3hvZ1UzL01FenVWTk1jdE5oVkk5MS9aUWR5YUV1cUpVcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtT2FZRU01S3ZJOVo0SDY3Vk5WZ0srWDFNd08vcEc1K3ZyTDkwcXpjQUdRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzWWhtQVNUb2FINGVjWFkya0NtTndTOWNJQ2Vpc1dHZGIyZS9GUkdZSHkwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFLaWVWN3cxeW12MEpXMEJ3Znk5blRwZEljMWtyWTVQcGZ5eUlvRUtDVWM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndmQi8zOG52OWJtU3c3Z2JLeTh0SUJ6MVZhaFpIdmgzOEZxcndhVXlBUjQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUYwSUlMd0YraGtJWXFucFBWZGZuVm9IbmpvcjlCWjJLZm5uSGF6eGRVVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaWRJOTUvTnlGWmUwMW5DUGRXTVNkZFJiNGpadHROVmNLK2pUaXhiQkEzOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9HVFJuK09TTUFEZ20yZDRGcTkzdzlYMDVaOUkya00zK2JEdGhoVjNxcFNETWFPS0xLdmdVR1NmZFMwQTl3QlpSc3hnTVd1ZlRXbmlaY2RVTTdybWpBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NSwiYWR2U2VjcmV0S2V5IjoiTjgzVjhuVEVyVWkxSTlVaGNkVHZiaENOTG0vbko1U2Y4cDR0b09TTjJRUT0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOltdLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiUEhCRjhPRzVSMTZRTTM3RXdKSkk4USIsInBob25lSWQiOiJiNDNhZDdhYi1lMTVmLTQ0MWUtODViNy1iZWUyMDJmZmI3MzMiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0VXbHZFMkhvc1VNMzNqV015OW9XOVR0VllzPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1hdDVSdXh4Si82L1BWRHQ2ZEZXam9LbjBDYz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJSQUM5S044MiIsIm1lIjp7ImlkIjoiOTQ3NjYxNTM0MzI6MTRAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0ovLzRjZ0VFSUcwbTdVR0dBZ2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ikc4NUFieklpaitnZzB1N1h2WGFxOWxiZlFIT2NyME5lMXZjbDNsRW5HRHc9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ilo5SnlLRVVRWW1XVHhIbnhFV2lGZm4yOGtONzVZS09jR0svbzZ5S3RVYVlJd0ZLOTZkYyt5MUhBUmRpaExDdVJLMXV2TmdZM1NMMkZaYXZ1L21KbERBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIyM2hMWm5zY1d4ZzE0UFR2bXJlNWpGVU9sV0tQcy9JZUxxVDlVd3E3NU0vajNyc3ZCUjJzazBKWnYxbHE0elpFakRTN2lsdnIybjZLQVJyMDhhRGpqZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6Ijk0NzY2MTUzNDMyOjE0QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlJ2T1FHOHlJby9vSU5MdTE3MTJxdlpXMzBCem5LOURYdGIzSmQ1Ukp4ZzgifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjIyMTA4MjksIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRzlIIn0=',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Olamilekan",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "94766153432", 
    A_REACT : process.env.AUTO_REACTION || 'on',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "off",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'Alexa,
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
