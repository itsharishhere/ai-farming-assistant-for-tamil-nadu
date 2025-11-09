/**
 * Simple keyword-based vector representation using TF-IDF
 * This doesn't require external API calls
 */

interface DocumentFrequency {
  [term: string]: number;
}

// Cache for document frequency calculations
let documentFrequency: DocumentFrequency = {};
let totalDocuments = 0;

/**
 * Tokenize and normalize text
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2); // Filter out very short words
}

/**
 * Calculate term frequency
 */
function calculateTF(tokens: string[]): Map<string, number> {
  const tf = new Map<string, number>();
  const totalTokens = tokens.length;
  
  for (const token of tokens) {
    tf.set(token, (tf.get(token) || 0) + 1);
  }
  
  // Normalize by total tokens
  for (const [token, count] of tf.entries()) {
    tf.set(token, count / totalTokens);
  }
  
  return tf;
}

/**
 * Update document frequency cache
 */
export function updateDocumentFrequency(texts: string[]) {
  totalDocuments = texts.length;
  documentFrequency = {};
  
  for (const text of texts) {
    const tokens = new Set(tokenize(text));
    for (const token of tokens) {
      documentFrequency[token] = (documentFrequency[token] || 0) + 1;
    }
  }
}

/**
 * Generate TF-IDF based embedding vector
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const tokens = tokenize(text);
  const tf = calculateTF(tokens);
  const vocabulary = Object.keys(documentFrequency).sort();
  
  // Create fixed-size vector based on vocabulary
  const vector: number[] = new Array(vocabulary.length).fill(0);
  
  for (let i = 0; i < vocabulary.length; i++) {
    const term = vocabulary[i];
    if (tf.has(term)) {
      // TF-IDF = TF * IDF
      const tfValue = tf.get(term)!;
      const idf = Math.log(totalDocuments / (documentFrequency[term] || 1));
      vector[i] = tfValue * idf;
    }
  }
  
  return vector;
}

/**
 * Generate embeddings for multiple texts in batch
 */
export async function generateBatchEmbeddings(
  texts: string[]
): Promise<number[][]> {
  // First, update document frequency
  updateDocumentFrequency(texts);
  
  // Then generate embeddings
  const embeddings: number[][] = [];
  for (const text of texts) {
    embeddings.push(await generateEmbedding(text));
  }
  
  return embeddings;
}

/**
 * Calculate cosine similarity between two vectors
 */
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const maxLength = Math.max(vecA.length, vecB.length);
  
  // Pad shorter vector with zeros
  const paddedA = [...vecA, ...new Array(maxLength - vecA.length).fill(0)];
  const paddedB = [...vecB, ...new Array(maxLength - vecB.length).fill(0)];
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < maxLength; i++) {
    dotProduct += paddedA[i] * paddedB[i];
    normA += paddedA[i] * paddedA[i];
    normB += paddedB[i] * paddedB[i];
  }

  normA = Math.sqrt(normA);
  normB = Math.sqrt(normB);

  if (normA === 0 || normB === 0) {
    return 0;
  }

  return dotProduct / (normA * normB);
}