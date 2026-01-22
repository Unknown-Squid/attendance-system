import Tesseract from 'tesseract.js';

/**
 * Extract text from image using OCR
 */
export const extractTextFromImage = async (imageData: string): Promise<string> => {
  try {
    const { data: { text } } = await Tesseract.recognize(imageData, 'eng', {
      logger: (m) => {
        if (m.status === 'recognizing text') {
          // Optional: log progress
          console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`);
        }
      }
    });
    
    return text.trim();
  } catch (error) {
    console.error('OCR Error:', error);
    throw new Error('Failed to extract text from image');
  }
};

/**
 * Extract TUPC number from OCR text
 * TUPC format: TUPC- followed by dynamic numbers (e.g., TUPC-20-1986, TUPC-1234, etc.)
 */
export const extractTupcNumber = (text: string): string | null => {
  if (!text || text.trim().length === 0) {
    console.log('OCR: Empty text provided');
    return null;
  }

  // Log the raw text for debugging
  console.log('OCR: Raw text:', text);
  
  // Normalize text - keep original for pattern matching
  const upperText = text.toUpperCase();
  console.log('OCR: Uppercase text:', upperText);
  
  // Pattern 1: TUPC- followed by numbers with dashes (e.g., TUPC-20-1986, TUPC-21-1234)
  const pattern1 = /TUPC-(\d+(?:-\d+)*)/i;
  const match1 = upperText.match(pattern1);
  if (match1) {
    const result = `TUPC-${match1[1]}`;
    console.log('OCR: Pattern 1 matched:', result);
    return result;
  }
  
  // Pattern 2: TUPC followed by spaces or dashes and then numbers
  const pattern2 = /TUPC[-\s]+(\d+(?:[-\s]+\d+)*)/i;
  const match2 = upperText.match(pattern2);
  if (match2) {
    // Normalize spaces to dashes
    const numbers = match2[1].replace(/\s+/g, '-');
    const result = `TUPC-${numbers}`;
    console.log('OCR: Pattern 2 matched:', result);
    return result;
  }
  
  // Pattern 3: TUPC followed directly by numbers (no separator)
  const pattern3 = /TUPC(\d+)/i;
  const match3 = upperText.match(pattern3);
  if (match3) {
    const result = `TUPC-${match3[1]}`;
    console.log('OCR: Pattern 3 matched:', result);
    return result;
  }

  // Pattern 4: More flexible - TUPC with any characters/numbers after (OCR might misread characters)
  // Try to find TUPC followed by anything that looks like numbers
  const pattern4 = /TUPC[^A-Za-z]*(\d+(?:[^A-Za-z]+\d+)*)/i;
  const match4 = upperText.match(pattern4);
  if (match4) {
    // Clean up the numbers - remove non-digit characters except dashes
    const cleaned = match4[1].replace(/[^\d-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    const result = `TUPC-${cleaned}`;
    console.log('OCR: Pattern 4 matched:', result);
    return result;
  }
  
  console.log('OCR: No pattern matched');
  return null;
};

/**
 * Process image and extract TUP-C number
 */
export const processIdImage = async (imageData: string): Promise<string | null> => {
  try {
    const text = await extractTextFromImage(imageData);
    console.log('OCR Extracted Text:', text);
    
    const tupcNumber = extractTupcNumber(text);
    console.log('Extracted TUP-C Number:', tupcNumber);
    
    return tupcNumber;
  } catch (error) {
    console.error('Error processing ID image:', error);
    return null;
  }
};
