import { cosineSimilarity } from "./embeddings";
import { KnowledgeDocument } from "./knowledgeBase";

export interface VectorDocument {
  id: string;
  document: KnowledgeDocument;
  embedding: number[];
}

/**
 * In-memory vector store for storing and searching document embeddings
 */
export class VectorStore {
  private documents: VectorDocument[] = [];

  /**
   * Add a document with its embedding to the store
   */
  addDocument(document: KnowledgeDocument, embedding: number[]): void {
    this.documents.push({
      id: document.id,
      document,
      embedding,
    });
  }

  /**
   * Add multiple documents with their embeddings
   */
  addDocuments(documents: KnowledgeDocument[], embeddings: number[][]): void {
    if (documents.length !== embeddings.length) {
      throw new Error("Number of documents must match number of embeddings");
    }

    for (let i = 0; i < documents.length; i++) {
      this.addDocument(documents[i], embeddings[i]);
    }
  }

  /**
   * Search for similar documents using cosine similarity
   */
  search(queryEmbedding: number[], topK: number = 5): VectorDocument[] {
    const results = this.documents.map((doc) => ({
      ...doc,
      similarity: cosineSimilarity(queryEmbedding, doc.embedding),
    }));

    // Sort by similarity (descending) and return top K
    return results
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, topK)
      .map(({ similarity, ...doc }) => doc);
  }

  /**
   * Search with filtering by category or crops
   */
  searchFiltered(
    queryEmbedding: number[],
    filters: {
      category?: string;
      crops?: string[];
      region?: string;
    },
    topK: number = 5
  ): VectorDocument[] {
    let filteredDocs = this.documents;

    // Apply filters
    if (filters.category) {
      filteredDocs = filteredDocs.filter(
        (doc) => doc.document.category === filters.category
      );
    }

    if (filters.crops && filters.crops.length > 0) {
      filteredDocs = filteredDocs.filter((doc) =>
        doc.document.crops?.some((crop) => filters.crops!.includes(crop))
      );
    }

    if (filters.region) {
      filteredDocs = filteredDocs.filter(
        (doc) =>
          !doc.document.region || doc.document.region.includes(filters.region!)
      );
    }

    // Calculate similarities and sort
    const results = filteredDocs.map((doc) => ({
      ...doc,
      similarity: cosineSimilarity(queryEmbedding, doc.embedding),
    }));

    return results
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, topK)
      .map(({ similarity, ...doc }) => doc);
  }

  /**
   * Get total number of documents in store
   */
  size(): number {
    return this.documents.length;
  }

  /**
   * Clear all documents from store
   */
  clear(): void {
    this.documents = [];
  }
}
