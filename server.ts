import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Parse incoming JSON body
  app.use(express.json({ limit: "15mb" }));

  // API endpoint for worksheet generation
  app.post("/api/generate", async (req, res) => {
    try {
      const { 
        systemPrompt, 
        userPrompt, 
        userKey 
      } = req.body;

      // Prioritize client's key or fallback to background env configuration
      const apiKey = userKey || process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
        return res.status(400).json({ 
          error: "API_KEY_MISSING",
          message: "Không tìm thấy khóa API Gemini hợp lệ. Người dùng hoặc hệ thống chưa cấu hình biến môi trường GEMINI_API_KEY. Vui lòng nhập khóa API cá nhân trong bảng cài đặt để kích hoạt tính năng ra đề tự động này!" 
        });
      }

      // Initialize the safe GenAI client
      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: userPrompt,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              lesson: { type: Type.STRING },
              form: { type: Type.STRING },
              objective: { type: Type.STRING },
              duration: { type: Type.STRING },
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.NUMBER },
                    level: { type: Type.STRING },
                    type: { type: Type.STRING },
                    content: { type: Type.STRING },
                    options: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING }
                    },
                    correctAnswer: { type: Type.STRING },
                    solution: { type: Type.STRING },
                    hint: { type: Type.STRING }
                  },
                  required: ["id", "level", "type", "content", "correctAnswer", "solution"]
                }
              },
              commonErrors: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    error: { type: Type.STRING },
                    cause: { type: Type.STRING },
                    correction: { type: Type.STRING },
                    practice: { type: Type.STRING }
                  },
                  required: ["error", "cause", "correction", "practice"]
                }
              },
              pedagogicalTips: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["title", "lesson", "form", "objective", "duration", "questions", "commonErrors", "pedagogicalTips"]
          }
        }
      });

      const text = response.text;
      if (!text) {
        throw new Error("Không nhận được dữ liệu văn bản từ mô hình AI.");
      }

      const data = JSON.parse(text.trim());
      return res.json(data);
    } catch (err: any) {
      console.error("API Error during task compilation:", err);
      const errMsg = err?.message || String(err);
      return res.status(500).json({ 
        error: "GENERATION_FAILED", 
        message: `Lỗi biên dịch đề Toan 8 từ Gemini: ${errMsg}. Thầy cô vui lòng thử lại.` 
      });
    }
  });

  // Serve static assets or mount Vite middleware depending on the environment
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
}

startServer();
