import { generateEmbedding, generateEmbeddings } from "./embeddings";
import { VectorStore } from "./vectorStore";
import { knowledgeBase, KnowledgeDocument } from "./knowledgeBase";

// Global vector store instance
let vectorStore: VectorStore | null = null;
let isInitialized = false;

/**
 * Initialize the vector store with knowledge base embeddings
 * This is done once and cached in memory
 */
export async function initializeVectorStore(): Promise<VectorStore> {
  if (vectorStore && isInitialized) {
    return vectorStore;
  }

  console.log("Initializing vector store with knowledge base...");
  vectorStore = new VectorStore();

  // Generate embeddings for all documents
  const texts = knowledgeBase.map((doc) => `${doc.title}\n\n${doc.content}`);
  
  try {
    const embeddings = await generateEmbeddings(texts);
    vectorStore.addDocuments(knowledgeBase, embeddings);
    isInitialized = true;
    console.log(`Vector store initialized with ${vectorStore.size()} documents`);
  } catch (error) {
    console.error("Failed to initialize vector store:", error);
    throw error;
  }

  return vectorStore;
}

/**
 * Retrieve relevant documents for a query
 */
export async function retrieveRelevantDocuments(
  query: string,
  options: {
    topK?: number;
    category?: string;
    crops?: string[];
    region?: string;
  } = {}
): Promise<KnowledgeDocument[]> {
  const store = await initializeVectorStore();
  
  // Generate embedding for the query
  const queryEmbedding = await generateEmbedding(query);
  
  // Search with or without filters
  const results = options.category || options.crops || options.region
    ? store.searchFiltered(
        queryEmbedding,
        {
          category: options.category,
          crops: options.crops,
          region: options.region,
        },
        options.topK || 3
      )
    : store.search(queryEmbedding, options.topK || 3);

  return results.map((result) => result.document);
}

/**
 * Format retrieved documents into context string for LLM
 */
export function formatContextForLLM(documents: KnowledgeDocument[]): string {
  if (documents.length === 0) {
    return "No relevant information found in the knowledge base.";
  }

  const contextParts = documents.map((doc, index) => {
    let context = `[Knowledge ${index + 1}] ${doc.title}\n${doc.content}`;
    
    if (doc.crops && doc.crops.length > 0) {
      context += `\nRelevant crops: ${doc.crops.join(", ")}`;
    }
    
    if (doc.region && doc.region.length > 0) {
      context += `\nRelevant regions: ${doc.region.join(", ")}`;
    }
    
    return context;
  });

  return contextParts.join("\n\n---\n\n");
}

/**
 * Get context-aware retrieval based on farmer profile
 */
export async function retrieveWithFarmerContext(
  query: string,
  farmerData?: {
    selectedCrops?: string[];
    region?: string;
    soilType?: string;
  }
): Promise<string> {
  const documents = await retrieveRelevantDocuments(query, {
    topK: 3,
    crops: farmerData?.selectedCrops,
    region: farmerData?.region,
  });

  return formatContextForLLM(documents);
}
