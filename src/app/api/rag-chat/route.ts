import { NextRequest, NextResponse } from "next/server";
import { retrieveWithFarmerContext } from "@/lib/rag/retriever";

const GEMINI_API_KEY = "AIzaSyAuideqaraeqFwB0faudWsoEyKT7KTLLuI";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, farmerData, image } = body;

    if (!message || message.trim() === "") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Retrieve relevant context from knowledge base
    console.log("Retrieving relevant context for query:", message);
    const relevantContext = await retrieveWithFarmerContext(message, farmerData);
    console.log("Retrieved context length:", relevantContext.length);

    // Build context-aware system prompt
    let systemPrompt = `You are an expert agricultural advisor specializing in Tamil Nadu farming practices. You provide practical, actionable advice to farmers.

FARMER PROFILE:
${farmerData?.name ? `Name: ${farmerData.name}` : ""}
${farmerData?.selectedCrops?.length > 0 ? `Crops: ${farmerData.selectedCrops.join(", ")}` : ""}
${farmerData?.region ? `Region: ${farmerData.region}` : ""}
${farmerData?.soilType ? `Soil Type: ${farmerData.soilType}` : ""}
${farmerData?.acres ? `Land Size: ${farmerData.acres} acres` : ""}

RELEVANT KNOWLEDGE BASE INFORMATION:
${relevantContext}

INSTRUCTIONS:
- Use the knowledge base information above to provide accurate, contextual answers
- If the knowledge base contains relevant information, prioritize that in your response
- Provide specific recommendations based on the farmer's crops, region, and soil type
- Include practical steps, timings, and quantities where applicable
- If discussing pest management, mention both organic and chemical options
- When relevant, mention government schemes that can help
- Keep responses clear and actionable
- Use both English and Tamil terms for crops and practices when helpful
- If the knowledge base doesn't have specific information, use your general agricultural knowledge but indicate this

Answer the farmer's question using the context provided above.`;

    // Prepare Gemini API request
    const parts: Array<{ text?: string; inline_data?: { mime_type: string; data: string } }> = [];

    // Add text prompt
    parts.push({
      text: `${systemPrompt}\n\nFARMER QUESTION: ${message}`
    });

    // Add image if provided
    if (image) {
      const base64Data = image.split(",")[1];
      const mimeType = image.split(";")[0].split(":")[1];
      
      parts.push({
        inline_data: {
          mime_type: mimeType,
          data: base64Data,
        },
      });
    }

    // Call Gemini API
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: parts,
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gemini API error:", errorData);
      return NextResponse.json(
        { error: "Failed to get response from AI" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiResponse) {
      return NextResponse.json(
        { error: "No response generated" },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      response: aiResponse,
      contextUsed: true,
      documentsRetrieved: relevantContext.includes("[Knowledge") ? 
        (relevantContext.match(/\[Knowledge \d+\]/g) || []).length : 0
    });
  } catch (error) {
    console.error("RAG Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
