// Import designations.csv as raw text using Vite
import designationsCsv from '../../../content/usegalaxy/designations.csv?raw';

export interface Designation {
  operative: string;
  tier: string;
  url: string;
}

/**
 * Simple CSV parser for designations.csv
 */
function parseSimpleCsv(csvContent: string): Array<Record<string, string>> {
  const lines = csvContent.trim().split('\n');
  if (lines.length === 0) return [];
  
  const headers = lines[0].split(',').map(h => h.trim());
  const rows: Array<Record<string, string>> = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const values = line.split(',').map(v => v.trim());
    const row: Record<string, string> = {};
    
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    
    rows.push(row);
  }
  
  return rows;
}

/**
 * Normalize URL for matching (remove protocol, port, trailing slash)
 */
export function normalizeUrl(url: string): string {
  return url
    .replace(/^https?:\/\//, '')  // Remove protocol
    .replace(/:\d+/, '')          // Remove port number
    .replace(/\/$/, '')           // Remove trailing slash
    .toLowerCase();
}

/**
 * Load and parse designations.csv
 */
export function loadDesignations(): Map<string, Designation> {
  const designationsMap = new Map<string, Designation>();
  
  // Parse CSV
  const rows = parseSimpleCsv(designationsCsv);
  
  for (const row of rows) {
    const url = row.URL;
    if (url) {
      const normalizedUrl = normalizeUrl(url.trim());
      designationsMap.set(normalizedUrl, {
        operative: row.Operative?.trim() || '',
        tier: row.Tier?.trim() || '',
        url: url.trim()
      });
    }
  }
  
  return designationsMap;
}
