import { google } from 'googleapis';

function authentication() {
  const target = ['https://www.googleapis.com/auth/spreadsheets'];
  const jwt = new google.auth.JWT(
    process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    undefined,
    (process.env.GOOGLE_SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    target
  );

  const sheets = google.sheets({ version: 'v4', auth: jwt });
  return sheets;
}

export async function getList() {
  try {
    const sheets = authentication();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'Data', // sheet name
    });

    const rows: any = response.data.values;

    return rows;
  } catch (err) {
    console.log(err);
  }
  return [];
}

export async function writeNew(data: any) {
  try {
    const sheets = authentication();
    const range = 'Data';
    console.log('LOG ~ writeNew ~ data:', data);
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: range,
      valueInputOption: 'RAW',
      requestBody: {
        range: range,
        values: [data],
      },
    });
  } catch (err) {
    console.log(err);
  }
  return true;
}
