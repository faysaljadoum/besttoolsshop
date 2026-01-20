// app/actions.ts
"use server";

import { google } from "googleapis";

// On utilise une variable d'environnement ou on met l'ID en dur (moins propre mais ça marche)
const SPREADSHEET_ID = "1jrVzqnkWlXwRycddU2H_LrvBljmo3AhiCd8yQTI3eNU";

export async function submitOrder(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;
  const quantite = formData.get("quantite") as string;
  const productId = formData.get("productId") as string;
  const date = new Date().toLocaleString("fr-MA");

  try {
    
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Feuille 1!A:G",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [date, productId, name, email, phone, address,quantite],
        ],
      },
    });

    console.log("Succès !");
    return { success: true, message: "تم تسجيل طلبك بنجاح!" };

  } catch (error) {
    // Regardez les logs de Vercel pour voir cette erreur
    console.error("ERREUR CRITIQUE GOOGLE SHEETS:", error);
    return { success: false, message: "حدث خطأ أثناء تسجيل الطلب." };
  }
}