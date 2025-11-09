import { NextRequest, NextResponse } from "next/server"

const GEMINI_API_KEY = "AIzaSyAuideqaraeqFwB0faudWsoEyKT7KTLLuI"
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

export async function POST(request: NextRequest) {
  try {
    const { message, farmerData, image } = await request.json()

    if (!message && !image) {
      return NextResponse.json(
        { error: "Message or image is required" },
        { status: 400 }
      )
    }

    // Build context-aware prompt
    let systemContext = `You are an AI farming assistant for Tamil Nadu, India. You help small farmers with:
- Crop guidance (plantation, irrigation, pesticide management)
- Weather-based advice
- Pest and disease management
- Government schemes
- Best practices for Tamil Nadu's climate

Provide practical, actionable advice in simple language. Support both English and Tamil.`

    if (farmerData) {
      systemContext += `\n\nFarmer's Profile:
- Name: ${farmerData.name}
- Crops: ${farmerData.selectedCrops?.join(", ")}
- Region: ${farmerData.region}
- Soil Type: ${farmerData.soilType}
- Land Size: ${farmerData.acres} acres

Tailor your advice to their specific crops, region, and soil type.`
    }

    const fullPrompt = `${systemContext}\n\nFarmer's Question: ${message}\n\nProvide a helpful, concise response:`

    // Build the request body based on whether there's an image
    const parts: any[] = []
    
    if (image) {
      // Extract base64 data from data URL
      const base64Data = image.split(',')[1]
      const mimeType = image.split(';')[0].split(':')[1]
      
      parts.push({
        text: fullPrompt
      })
      parts.push({
        inline_data: {
          mime_type: mimeType,
          data: base64Data
        }
      })
    } else {
      parts.push({
        text: fullPrompt
      })
    }

    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: parts
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        },
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error("Gemini API Error:", errorData)
      return NextResponse.json(
        { error: "Failed to get AI response" },
        { status: response.status }
      )
    }

    const data = await response.json()
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I apologize, I couldn't generate a response."

    return NextResponse.json({ response: aiResponse })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}