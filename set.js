const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0JVY21zSmlGS3FYWVdad2hzT3dXbGkzdlRDaGIwRGxhMUttZXpmVW1FRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEFRZ3AyVWlCNTNtR1A3QWd5cGxzVkNwM3RDR2cvdHZndW84OElvNHpraz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvTTN4d0tMdHZWWHhqVFcyNjdIdmplRnBhaEdLTEM1Q0txWlVYR0hqRzJVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0L1NkY1IvMDZhTXllNVM3UWcxOEwzazM1eXNKdEtyR3lWUTh6TkZ2Z2pzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1GOXFFdU9yc2xPQ2Z6YzFMK2NubGtvYytSaUNscGVXSGF0bk1iTFN5Vkk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNOS09WeUR3M3ZvblJYd1J4MVhNeXExZ1N6NGJiVVlMaTJ0bE1NWFgvVnM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUVwbjAzaE1SMFJ0U1FrRWIzT2x2VmhqODJGS3pOWkRieXUrTlBuMWZrRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ2ZtV0MyclNLMDd6bUpNbGFsUXlHYjRtWHBZTXlMeUREcEtpU3dnWU5nOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InhqYnZBalh6Q3ViTXhZNTlIeUNzMk9HdzNrcDJwd2xucVAzejA0aDZHZEdwQm8wZFEyczZuSGhmanpQOWRnNURyRmtKeU5SRndGNjZCVCtmVDFML0JnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTI4LCJhZHZTZWNyZXRLZXkiOiJubEVwM1luUmpLOUdVWE5taDEyY3pxaXA1emhvWjhSbEZoWVFva3kyZms0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJlYTVTRTRCZ1JPMnRfR0huRF9XSHd3IiwicGhvbmVJZCI6IjA0ODNlOWUxLTYwNTktNGMzOC1hZjExLTM4Y2ZlZjlmZmE0ZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJOdXU1T21tRmFqWWl1TGsxNitiUmppZVNJd2c9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR2hHelBGaTZCUU1VMld6K2p1clh0Sm1XdmhVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlRRSDFFN1o5IiwibWUiOnsiaWQiOiIyNDM5ODE1NjQxMzg6NjZAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2QkfCdkI7wnZCD8J2QkfCdkIjwnZCG8J2QjiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS2VLK3A4SEVPS3VwN1lHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiQ2JqMHlJTmsxWWpwVFRUTlBXZ3BNR1d0bkNnMlFZZUxiQnJLR0c4MDRtYz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiY3NWdTlPT1p0eHVIdHd1TjR6b3JlbHlhT040K0FjM3dXVFVSK1FKOWNPeExKODFkRnBGYkZMTVA4UUhiSWk3bkZFTnJReURsWkdITWVJZDVrQmlMRGc9PSIsImRldmljZVNpZ25hdHVyZSI6IlFDTzQvcnhFTXlZMVhlQjZ2dFFBc1lxQWZOdjltTEI4b3A5T1lzUDlFV29qeVhOL1R2UE0rbjNjTkM0WnpONTZRYXR2N2lsV3F2STBtS3UvZUpCRkF3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjQzOTgxNTY0MTM4OjY2QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlFtNDlNaURaTldJNlUwMHpUMW9LVEJsclp3b05rR0hpMndheWhodk5PSm4ifX1dLCJwbGF0Zm9ybSI6InNtYmkiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjQ1MDM5MTksIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBUHM3In0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "RODRIGO",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "243981564138",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝐀𝐋𝐏𝐇𝐀-𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/26014f28649c02693fba5.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
