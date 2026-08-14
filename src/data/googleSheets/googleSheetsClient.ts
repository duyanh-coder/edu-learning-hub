export interface GoogleSheetRow {
  [key: string]: string;
}

const GOOGLE_SHEETS_HOST = 'docs.google.com';

const normalizeHeader = (value: string) =>
  value.trim().replace(/^\uFEFF/, '').toLowerCase();

const parseCsv = (csv: string): string[][] => {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < csv.length; i += 1) {
    const char = csv[i];
    const next = csv[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        field += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      row.push(field);
      field = '';
      continue;
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && next === '\n') i += 1;
      row.push(field);
      field = '';
      if (row.some((value) => value.trim() !== '')) rows.push(row);
      row = [];
      continue;
    }

    field += char;
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    if (row.some((value) => value.trim() !== '')) rows.push(row);
  }

  return rows;
};

const getSpreadsheetId = (spreadsheetId?: string, spreadsheetUrl?: string) => {
  if (spreadsheetId?.trim()) return spreadsheetId.trim();

  if (!spreadsheetUrl?.trim()) {
    throw new Error(
      'Google Sheets is not configured. Set VITE_GOOGLE_SHEET_ID or VITE_GOOGLE_SHEET_URL.',
    );
  }

  const url = new URL(spreadsheetUrl);
  if (url.hostname !== GOOGLE_SHEETS_HOST) {
    throw new Error('VITE_GOOGLE_SHEET_URL must be a Google Sheets URL.');
  }

  const match = url.pathname.match(/\/spreadsheets\/d\/([^/]+)/);
  if (!match?.[1]) {
    throw new Error('Could not extract the Google Spreadsheet ID from VITE_GOOGLE_SHEET_URL.');
  }

  return match[1];
};

export const buildGoogleSheetCsvUrl = (
  sheetName: string,
  spreadsheetId?: string,
  spreadsheetUrl?: string,
) => {
  const id = getSpreadsheetId(spreadsheetId, spreadsheetUrl);
  const params = new URLSearchParams({
    tqx: 'out:csv',
    sheet: sheetName,
  });

  return `https://docs.google.com/spreadsheets/d/${encodeURIComponent(id)}/gviz/tq?${params.toString()}`;
};

export const fetchGoogleSheetRows = async ({
  sheetName,
  spreadsheetId,
  spreadsheetUrl,
  signal,
}: {
  sheetName: string;
  spreadsheetId?: string;
  spreadsheetUrl?: string;
  signal?: AbortSignal;
}): Promise<GoogleSheetRow[]> => {
  const url = buildGoogleSheetCsvUrl(sheetName, spreadsheetId, spreadsheetUrl);
  const response = await fetch(url, {
    method: 'GET',
    signal,
    cache: 'no-store',
    headers: {
      Accept: 'text/csv,text/plain;q=0.9,*/*;q=0.8',
    },
  });

  if (!response.ok) {
    throw new Error(
      `Unable to read Google Sheet "${sheetName}" (${response.status} ${response.statusText}).`,
    );
  }

  const csv = await response.text();
  if (!csv.trim()) return [];

  const matrix = parseCsv(csv);
  if (matrix.length < 2) return [];

  const headers = matrix[0].map(normalizeHeader);

  return matrix.slice(1).map((values) =>
    headers.reduce<GoogleSheetRow>((record, header, index) => {
      if (!header) return record;
      record[header] = (values[index] ?? '').trim();
      return record;
    }, {}),
  );
};
