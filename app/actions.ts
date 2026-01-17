// app/actions.ts
"use server";

import { google } from "googleapis";

// REMPLACEZ PAR VOTRE ID DE SHEET
const SPREADSHEET_ID = "1jrVzqnkWlXwRycddU2H_LrvBljmo3AhiCd8yQTI3eNU"; 

export async function submitOrder(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;
  const productId = formData.get("productId") as string;
  const date = new Date().toLocaleString("fr-MA");

  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: "google-credentials.json",
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Feuille 1!A:F", // Vérifiez le nom de l'onglet (Sheet1 ou Feuille 1)
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [date, productId, name, email, phone, address],
        ],
      },
    });

    return { success: true, message: "تم تسجيل طلبك بنجاح!" };
  } catch (error) {
    console.error("Erreur Sheet:", error);
    return { success: false, message: "حدث خطأ أثناء الطلب" };
  }
}