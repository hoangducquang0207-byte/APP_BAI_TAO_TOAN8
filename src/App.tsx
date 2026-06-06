import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Settings, 
  FileText, 
  Layers, 
  CheckSquare, 
  AlertTriangle, 
  HelpCircle, 
  RotateCcw, 
  Copy, 
  Printer, 
  Sparkles, 
  ChevronRight, 
  Sliders, 
  Check, 
  Info, 
  Award,
  BookOpenCheck,
  Eye,
  EyeOff,
  Calendar,
  FileSpreadsheet,
  FileQuestion,
  Wand2,
  RefreshCw
} from 'lucide-react';
import { TOAN_8_KNTT_DB, INITIAL_WORKSHEET_SAMPLE } from './data';
import { Worksheet, Question } from './types';
import { generateSmartFallback } from './fallbackData';

export default function App() {
  // === STATE CỦA ỨNG DỤNG ===
  const [selectedChapterId, setSelectedChapterId] = useState(TOAN_8_KNTT_DB[1].id); // Mặc định Chương 2
  const [selectedLessonId, setSelectedLessonId] = useState("b5"); // Mặc định bài hằng đẳng thức
  const [customForm, setCustomForm] = useState("Khai triển và rút gọn biểu thức");
  
  // Trạng thái mức độ
  const [levels, setLevels] = useState({
    nhanBiet: true,
    thongHieu: true,
    vanDung: true,
    vanDungCao: true
  });
  
  const [questionCount, setQuestionCount] = useState(10);
  const [questionType, setQuestionType] = useState("Kết hợp nhiều hình thức");
  const [purpose, setPurpose] = useState("Luyện tập trên lớp");
  const [duration, setDuration] = useState("45 phút"); // State quản lý Thời lượng phiếu học tập
  const [worksheetDate, setWorksheetDate] = useState("15/09/2026"); // State quản lý Ngày làm bài của phiếu học tập
  const [customRequest, setCustomRequest] = useState("");
  
  // Trạng thái hiển thị & kết quả bài tập
  const [currentWorksheet, setCurrentWorksheet] = useState<Worksheet>(INITIAL_WORKSHEET_SAMPLE);
  const [activeTab, setActiveTab] = useState("sheet"); // sheet, student, teacher, errors, tips
  const [showSolutions, setShowSolutions] = useState(true);
  
  // Bộ lọc nhanh phân hóa học sinh
  const [diffFilter, setDiffFilter] = useState("all"); // all, basic, medium, hard
  
  // API key & state gọi API
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('user_gemini_api_key') || "";
  });
  const [showApiModal, setShowApiModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  
  // State thông báo tải PDF ảo
  const [showPdfToast, setShowPdfToast] = useState(false);

  // === LẤY DANH SÁCH BÀI HỌC VÀ DẠNG TOÁN THEO CHƯƠNG ĐÃ CHỌN ===
  const currentChapter = TOAN_8_KNTT_DB.find(c => c.id === selectedChapterId) || TOAN_8_KNTT_DB[0];
  const currentLesson = currentChapter.lessons.find(l => l.id === selectedLessonId) || currentChapter.lessons[0];

  // Đồng bộ bài học đầu tiên của chương khi thay đổi chương
  useEffect(() => {
    if (currentChapter) {
      const firstLesson = currentChapter.lessons[0];
      if (firstLesson) {
        setSelectedLessonId(firstLesson.id);
        setCustomForm(firstLesson.forms[0] || "");
      }
    }
  }, [selectedChapterId]);

  // Đồng bộ dạng toán đầu tiên khi đổi bài học
  const handleLessonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lessonId = e.target.value;
    setSelectedLessonId(lessonId);
    const lessonObj = currentChapter.lessons.find(l => l.id === lessonId);
    if (lessonObj && lessonObj.forms.length > 0) {
      setCustomForm(lessonObj.forms[0]);
    }
  };

  // Đồng bộ thời lượng khi currentWorksheet được tải hoặc AI thay đổi
  useEffect(() => {
    if (currentWorksheet && currentWorksheet.duration) {
      setDuration(currentWorksheet.duration);
    }
  }, [currentWorksheet]);

  // Cập nhật MathJax hiển thị lại ký tự toán học khi chuyển tab hoặc kết quả thay đổi
  useEffect(() => {
    const mj = (window as any).MathJax;
    if (mj && mj.typesetPromise) {
      const timer = setTimeout(() => {
        mj.typesetPromise().catch((err: any) => console.log("MathJax error:", err));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeTab, currentWorksheet, diffFilter, duration, worksheetDate]);

  // === THIẾT LẬP THƯ VIỆN MATHJAX KHI KHỞI CHẠY ===
  useEffect(() => {
    (window as any).MathJax = {
      tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
        processEscapes: true
      },
      options: {
        skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
      },
      startup: {
        pageReady: () => {
          return (window as any).MathJax.startup.defaultPageReady();
        }
      }
    };

    const scriptId = "mathjax-script-loader";
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
      script.async = true;
      document.head.appendChild(script);
      script.onload = () => {
        const mj = (window as any).MathJax;
        if (mj && mj.typesetPromise) {
          mj.typesetPromise();
        }
      };
    } else {
      const mj = (window as any).MathJax;
      if (mj && mj.typesetPromise) {
        mj.typesetPromise();
      }
    }
  }, []);

  // === HÀM LƯU API KEY ===
  const saveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('user_gemini_api_key', key);
    setShowApiModal(false);
  };

  // === XỬ LÝ CLICK TẠO BÀI TẬP (AI GENERATOR) ===
  const handleGenerateWorksheet = async (quickMode = false, diffMode = false) => {
    setIsLoading(true);
    setApiError("");

    // Chuẩn bị thông tin đầu vào
    const activeLevels = Object.entries(levels)
      .filter(([_, value]) => value)
      .map(([key, _]) => {
        if (key === 'nhanBiet') return 'Nhận biết';
        if (key === 'thongHieu') return 'Thông hiểu';
        if (key === 'vanDung') return 'Vận dụng';
        return 'Vận dụng cao';
      });

    const levelStr = activeLevels.length > 0 ? activeLevels.join(", ") : "Tự động phân hóa đủ 4 mức";
    const lessonName = currentChapter.lessons.find(l => l.id === selectedLessonId)?.name || "Chủ đề tự do";
    const chapterName = currentChapter.chapter;

    const systemPrompt = `Bạn là một chuyên gia thiết kế đề thi và học liệu Toán học lớp 8 xuất sắc của Việt Nam, am hiểu sâu sắc bộ sách giáo khoa "Kết nối tri thức với cuộc sống" và Chương trình GDPT 2018. Nhiệm vụ của bạn là tạo ra một phiếu bài tập Toán học chuẩn mực sư phạm, đúng kiến thức lớp 8.

Hãy luôn định dạng tất cả biến số, biểu thức, đa thức, số đo và các công thức toán học trong ký tự $ (cho công thức dòng) hoặc $$ (cho công thức hiển thị riêng biệt). Ví dụ: $x$, $y$, $(x+y)^2 = x^2 + 2xy + y^2$, $\\frac{a}{b}$. Đặc biệt chú ý thoát dấu gạch chéo ngược kép (double escape '\\\\') trong chuỗi JSON trả về cho các lệnh LaTeX như '\\\\frac', '\\\\cdot', '\\\\ge', '\\\\ne', '\\\\text' để không làm hỏng cú pháp JSON.

Dữ kiện toán học phải hoàn toàn chính xác, thực tế, logic, ngôn từ chuẩn mực sư phạm Việt Nam. Cần trình bày lời giải chi tiết từng bước dễ hiểu cho học sinh lớp 8. Trả về định dạng JSON phù hợp chính xác với schema đã quy định.`;

    const userPrompt = `Hãy tạo một bộ bài tập Toán lớp 8 với thông tin sau:
- Chương: ${chapterName}
- Bài học: ${lessonName}
- Dạng toán chi tiết: ${customForm}
- Mức độ nhận thức yêu cầu: ${diffMode ? "Phân hóa tối đa từ Nhận biết, Thông hiểu đến Vận dụng, Vận dụng cao" : levelStr}
- Số lượng câu hỏi: ${quickMode ? 5 : questionCount} câu hỏi.
- Hình thức câu hỏi: ${questionType}
- Mục đích sử dụng: ${purpose}
- Thời gian làm bài: ${duration}
${customRequest ? `- Yêu cầu đặc biệt bổ sung từ giáo viên: ${customRequest}` : ""}

LƯU Ý QUAN TRỌNG VỀ ĐỊNH DẠNG LATEX:
1. Bạn phải phân bố các câu hỏi một cách hợp lý từ dễ đến khó.
2. Với các câu hỏi Trắc nghiệm (nếu có), phải cung cấp mảng 4 lựa chọn trong trường "options" dạng ["A. ...", "B. ...", "C. ...", "D. ..."], và chỉ định rõ đáp án đúng (ví dụ: "A") vào trường "correctAnswer". Các giá trị phương án lựa chọn nếu chứa công thức cũng phải bọc trong dấu $.
3. Với câu hỏi tự luận hoặc điền đáp án, mảng "options" để trống, và điền đáp án thu gọn vào "correctAnswer" (định dạng bằng $...$ nếu có công thức).
4. Tất cả biểu thức toán học, biến số (ví dụ: x, y, a, b), công thức khai triển phải nằm trong ký hiệu $...$ để hiển thị đẹp bằng MathJax. Ví dụ: $(x + y)^2 = x^2 + 2xy + y^2$.
5. Hãy tạo ít nhất 3 lưu ý "commonErrors" (lỗi sai thường gặp) cực kỳ thực tế của học sinh lớp 8 và ít nhất 3 mẹo "pedagogicalTips" (gợi ý giảng dạy) cho giáo viên. Các công thức trong phần này cũng cần bọc trong kí hiệu $.`;

    try {
      // Send secure request to server side proxy
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt,
          userPrompt,
          userKey: apiKey // Dynamic user key bypasses server secret if configured
        })
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.message || `Lỗi HTTP ${response.status}`);
      }

      const resultJson = await response.json();
      setCurrentWorksheet(resultJson);
      setIsLoading(false);
      setActiveTab("sheet");
    } catch (error: any) {
      console.warn("API error (could be missing API key). Activating client fallback simulation model.", error);
      setTimeout(() => {
        // High fidelity offline simulation setup using our dynamic Math 8 generator
        const simulatedData = generateSmartFallback(
          selectedChapterId,
          selectedLessonId,
          lessonName,
          customForm,
          quickMode ? 5 : questionCount,
          duration,
          purpose
        );

        setCurrentWorksheet(simulatedData);
        setIsLoading(false);
        setActiveTab("sheet");
        setApiError("Lưu ý: Thầy cô đang trải nghiệm Chế độ Offline (Mô phỏng mẫu). Để kết nối trực tiếp với AI thông minh tạo mọi chuyên đề ngẫu nhiên không giới hạn, xin vui lòng dán Khóa cá nhân tại nút 'Cấu hình AI (Dùng Thử)' bên cạnh hoặc đảm bảo Server đã cấu hình GEMINI_API_KEY.");
      }, 1200);
    }
  };

  // === NÚT LÀM MỚI (RESET) ===
  const handleReset = () => {
    setSelectedChapterId(TOAN_8_KNTT_DB[1].id);
    setSelectedLessonId("b5");
    setCustomForm("Khai triển và rút gọn biểu thức");
    setLevels({
      nhanBiet: true,
      thongHieu: true,
      vanDung: true,
      vanDungCao: true
    });
    setQuestionCount(10);
    setQuestionType("Kết hợp nhiều hình thức");
    setPurpose("Luyện tập trên lớp");
    setDuration("45 phút");
    setWorksheetDate("15/09/2026");
    setCustomRequest("");
    setCurrentWorksheet(INITIAL_WORKSHEET_SAMPLE);
    setActiveTab("sheet");
    setApiError("");
  };

  // === SAO CHÉP PHIẾU BÀI TẬP (COPY) ===
  const handleCopyClipboard = () => {
    let textToCopy = `=== ${currentWorksheet.title.toUpperCase()} ===\n`;
    textToCopy += `Chương trình: Toán 8 (KNTT) - Dạng toán: ${currentWorksheet.form}\n`;
    textToCopy += `Mục tiêu: ${currentWorksheet.objective}\n`;
    textToCopy += `Thời gian làm bài: ${duration} | Ngày làm bài: ${worksheetDate} | Mục đích: ${purpose}\n\n`;
    
    textToCopy += `--------------------------------------\n`;
    textToCopy += `PHẦN ĐỀ BÀI\n`;
    textToCopy += `--------------------------------------\n`;
    
    currentWorksheet.questions.forEach((q, idx) => {
      textToCopy += `Câu ${idx + 1} [${q.level} - ${q.type}]: ${q.content}\n`;
      if (q.options && q.options.length > 0) {
        q.options.forEach(opt => {
          textToCopy += `   ${opt}\n`;
        });
      }
      textToCopy += `\n`;
    });

    if (showSolutions) {
      textToCopy += `--------------------------------------\n`;
      textToCopy += `PHẦN ĐÁP ÁN & LỜI GIẢI CHI TIẾT\n`;
      textToCopy += `--------------------------------------\n`;
      currentWorksheet.questions.forEach((q, idx) => {
        textToCopy += `Câu ${idx + 1}: \n`;
        textToCopy += `- Đáp án đúng: ${q.correctAnswer}\n`;
        textToCopy += `- Lời giải chi tiết:\n${q.solution}\n`;
        if (q.hint) textToCopy += `- Gợi ý: ${q.hint}\n`;
        textToCopy += `\n`;
      });
    }

    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = textToCopy;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    try {
      document.execCommand('copy');
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Không thể sao chép văn bản", err);
    }
    document.body.removeChild(tempTextArea);
  };

  // === TRÌNH BIÊN DỊCH LATEX SANG MATHML ĐỂ WORD ĐỌC ĐƯỢC EQUATION CHUẨN ===
  const latexToMathML = (latex: string) => {
    let clean = latex.replace(/^\$\$?|\$\$/g, '').trim();
    clean = clean.replace(/\\\\/g, '\\');

    // 1. \text{...} -> <mtext>...</mtext>
    clean = clean.replace(/\\text\s*\{([^}]+)\}/g, '<mtext>$1</mtext>');

    // 2. Phân số \frac{A}{B} (Kiểm soát lồng nhau 3 cấp)
    const fractionRegex = /\\frac\s*\{([^}]+)\}\s*\{([^}]+)\}/g;
    for (let i = 0; i < 3; i++) {
      clean = clean.replace(fractionRegex, '<mfrac><mrow>$1</mrow><mrow>$2</mrow></mfrac>');
    }

    // 3. Chỉ số dưới lồng ngoặc nhọn: A_{B}
    clean = clean.replace(/([a-zA-Z0-9)]+)_\{([^}]+)\}/g, '<msub><mrow>$1</mrow><mrow>$2</mrow></msub>');
    // Chỉ số dưới dạng đơn: A_B
    clean = clean.replace(/([a-zA-Z0-9)]+)_([a-zA-Z0-9])/g, '<msub><mrow>$1</mrow><mrow>$2</mrow></msub>');

    // 4. Chỉ số trên lũy thừa lồng ngoặc nhọn: A^{B}
    clean = clean.replace(/([a-zA-Z0-9)]+)\^\{([^}]+)\}/g, '<msup><mrow>$1</mrow><mrow>$2</mrow></msup>');
    // Lũy thừa ngoài ngoặc đơn dạng nhóm: (x+2)^2
    clean = clean.replace(/(\([^)]+\))\^([a-zA-Z0-9+-])/g, '<msup><mrow>$1</mrow><mrow>$2</mrow></msup>');
    // Lũy thừa dạng đơn: x^2
    clean = clean.replace(/([a-zA-Z0-9])\^([a-zA-Z0-9+-])/g, '<msup><mrow>$1</mrow><mrow>$2</mrow></msup>');

    // 5. Thay thế toán tử đặc thù
    clean = clean.replace(/\\cdot/g, '<mo>&#x22C5;</mo>');
    clean = clean.replace(/\\ge/g, '<mo>&#x2265;</mo>');
    clean = clean.replace(/\\le/g, '<mo>&#x2264;</mo>');
    clean = clean.replace(/\\pm/g, '<mo>&#x00B1;</mo>');
    clean = clean.replace(/\\triangle/g, '<mo>&#x25B3;</mo>');
    clean = clean.replace(/\\sim/g, '<mo>&#x223C;</mo>');
    clean = clean.replace(/\\dots/g, '<mo>&#x2026;</mo>');
    clean = clean.replace(/\\Delta/g, '<mo>&#x0394;</mo>');

    // 6. Xử lý các kí tự bổ trợ độ rộng ngoặc \left, \right
    clean = clean.replace(/\\left\(/g, '(').replace(/\\right\)/g, ')');
    clean = clean.replace(/\\left\[/g, '[').replace(/\\right\]/g, ']');

    return `<math xmlns="http://www.w3.org/1998/Math/MathML" display="inline">${clean}</math>`;
  };

  const convertMathToMathML = (text: string) => {
    if (!text) return "";
    let processed = text;
    
    // Tìm kiếm và đổi chỗ phương trình khối lớn $$...$$
    processed = processed.replace(/\$\$(.*?)\$\$/g, (_, formula) => {
      return `<div style="text-align:center; margin: 10px 0;">${latexToMathML(formula)}</div>`;
    });
    
    // Tìm kiếm và đổi chỗ phương trình dòng chữ đơn $...$
    processed = processed.replace(/\$(.*?)\$/g, (_, formula) => {
      return latexToMathML(formula);
    });
    
    return processed;
  };

  // === XUẤT FILE TẢI WORD (.DOC CHỨA NATIVE OFFICE EQUATIONS) ===
  const handleDownloadWord = () => {
    const titleClean = convertMathToMathML(currentWorksheet.title);
    const lessonClean = convertMathToMathML(currentWorksheet.lesson);
    const formClean = convertMathToMathML(currentWorksheet.form);
    const objectiveClean = convertMathToMathML(currentWorksheet.objective);

    let htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <title>${currentWorksheet.title}</title>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #1e293b; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 2px double #cbd5e1; padding-bottom: 15px; }
          .title { font-size: 20pt; font-weight: bold; color: #1e3a8a; margin: 0; }
          .subtitle { font-size: 14pt; font-weight: bold; color: #2563eb; margin: 5px 0 0 0; }
          .meta-info { font-size: 11pt; color: #64748b; font-style: italic; text-align: center; margin-bottom: 20px; }
          .student-info-box { border: 1px solid #e2e8f0; background-color: #f8fafc; padding: 12px; margin-bottom: 25px; }
          .student-info-grid { width: 100%; }
          .student-info-grid td { font-size: 11pt; padding: 4px; }
          .section-heading { font-size: 12pt; font-weight: bold; color: #0f172a; border-left: 4px solid #2563eb; padding-left: 8px; margin-top: 25px; margin-bottom: 15px; }
          .objective-text { background-color: #f1f5f9; padding: 10px; font-style: italic; font-size: 10.5pt; color: #334155; border: 1px solid #e2e8f0; margin-bottom: 20px; }
          .question-block { margin-bottom: 25px; padding-bottom: 15px; border-bottom: 1px dashed #e2e8f0; }
          .question-title { font-weight: bold; font-size: 11pt; color: #0f172a; margin-bottom: 8px; }
          .options-grid { margin-left: 15px; margin-bottom: 12px; }
          .option-item { font-size: 11pt; color: #334155; margin-bottom: 4px; }
          .answer-key-section { background-color: #fafafa; border: 1px solid #e2e8f0; padding: 15px; margin-top: 40px; }
          .solution-block { margin-top: 15px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; }
          .solution-text { font-size: 10.5pt; color: #475569; padding-left: 10px; border-left: 2px solid #818cf8; }
          .footer-text { text-align: center; font-size: 9pt; color: #94a3b8; margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 10px; }
        </style>
      </head>
      <body>
        <div class="header">
          <table style="width: 100%;">
            <tr>
              <td style="font-size: 10pt; font-weight: bold; text-align: left;">PHÒNG GD&ĐT TRƯỜNG THCS</td>
              <td style="font-size: 10pt; font-weight: bold; text-align: right;">NĂM HỌC: 2026 - 2027</td>
            </tr>
          </table>
          <p class="title">PHIẾU BÀI TẬP TOÁN LỚP 8 – KNTT</p>
          <p class="subtitle">${titleClean.toUpperCase()}</p>
        </div>

        <div class="meta-info">
          Dạng toán: ${formClean} | Thời lượng làm bài: ${duration} | Mục đích: ${purpose}
        </div>

        <div class="student-info-box">
          <table class="student-info-grid">
            <tr>
              <td width="60%"><b>Họ và tên học sinh:</b> ................................................................</td>
              <td width="40%"><b>Ngày làm bài:</b> ${worksheetDate}</td>
            </tr>
            <tr>
              <td width="60%"><b>Lớp:</b> ..........................................................................................</td>
              <td width="40%"><b>Điểm số:</b> .................../10</td>
            </tr>
          </table>
        </div>

        <div class="section-heading">MỤC TIÊU CẦN ĐẠT:</div>
        <div class="objective-text">
          ${objectiveClean}
        </div>

        <div class="section-heading">PHẦN BÀI TẬP (ĐỀ BÀI):</div>
        <div>
          ${getFilteredQuestions().map((q, idx) => {
            const contentClean = convertMathToMathML(q.content);
            const optionsClean = q.options && q.options.length > 0
              ? q.options.map(opt => convertMathToMathML(opt))
              : [];
            return `
              <div class="question-block">
                <div class="question-title">
                  Câu ${idx + 1} [${q.level} - ${q.type}]: ${contentClean}
                </div>
                ${optionsClean.length > 0 ? `
                  <div class="options-grid">
                    ${optionsClean.map(opt => `<div class="option-item">${opt}</div>`).join('')}
                  </div>
                ` : `
                  <div style="height: 100px; color: #94a3b8; font-style: italic; font-size: 9.5pt; padding: 10px;">
                    (Học sinh trình bày câu trả lời và các bước giải chi tiết tại đây)
                  </div>
                `}
              </div>
            `;
          }).join('')}
        </div>

        ${showSolutions ? `
          <div class="answer-key-section" style="page-break-before: always;">
            <div class="section-heading" style="color: #4338ca;">PHẦN ĐÁP ÁN & LỜI GIẢI CHI TIẾT:</div>
            ${getFilteredQuestions().map((q, idx) => {
              const answerClean = convertMathToMathML(q.correctAnswer);
              const solutionClean = convertMathToMathML(q.solution);
              const hintClean = q.hint ? convertMathToMathML(q.hint) : '';
              return `
                <div class="solution-block">
                  <div style="font-weight: bold; font-size: 11pt; margin-bottom: 5px;">
                    Câu ${idx + 1} (${q.level})
                  </div>
                  <div style="font-size: 10.5pt; margin-bottom: 5px; color: #16a34a;">
                    <b>Đáp án đúng:</b> ${answerClean}
                  </div>
                  <div class="solution-text">
                    <b>Lời giải chi tiết:</b><br/>
                    ${solutionClean.replace(/\n/g, '<br/>')}
                  </div>
                  ${hintClean ? `
                    <div style="font-size: 10pt; font-style: italic; color: #b45309; margin-top: 5px; background-color: #fffbeb; padding: 5px;">
                      Gợi ý lấy gốc: ${hintClean}
                    </div>
                  ` : ''}
                </div>
              `;
            }).join('')}
          </div>
        ` : ''}

        <div class="footer-text">
          Tài liệu được khởi tạo thông minh từ Trợ lý soạn đề Toán 8 KNTT.
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff' + htmlContent], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Phieu_Toan8_KNTT_${currentWorksheet.title.replace(/\s+/g, '_')}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // === XỬ LÝ KHỞI CHẠY TẢI FILE PDF (IN CHUẨN MATHJAX) ===
  const handleDownloadPdf = () => {
    // Tự động chuyển đổi sang tab hiển thị phiếu bài tập để có nội dung in
    if (activeTab === "errors" || activeTab === "tips") {
      setActiveTab("sheet");
    }
    setShowPdfToast(true);
    // Chờ 1.5 giây để Toast hiện lên, MathJax render lại nếu vừa chuyển tab
    setTimeout(() => {
      setShowPdfToast(false);
      window.print();
    }, 1500);
  };

  const handlePrint = () => {
    // Tự động chuyển đổi sang tab hiển thị phiếu bài tập để có nội dung in
    if (activeTab === "errors" || activeTab === "tips") {
      setActiveTab("sheet");
    }
    // Chờ chút cho DOM và MathJax ổn định
    setTimeout(() => {
      window.print();
    }, 250);
  };

  const getFilteredQuestions = () => {
    if (diffFilter === "all") return currentWorksheet.questions;
    if (diffFilter === "basic") {
      return currentWorksheet.questions.filter(q => q.level === "Nhận biết");
    }
    if (diffFilter === "medium") {
      return currentWorksheet.questions.filter(q => q.level === "Thông hiểu" || q.level === "Vận dụng");
    }
    if (diffFilter === "hard") {
      return currentWorksheet.questions.filter(q => q.level === "Vận dụng cao");
    }
    return currentWorksheet.questions;
  };

  const filteredQuestions = getFilteredQuestions();

  const countLevels = {
    nhanBiet: currentWorksheet.questions.filter(q => q.level === "Nhận biết").length,
    thongHieu: currentWorksheet.questions.filter(q => q.level === "Thông hiểu").length,
    vanDung: currentWorksheet.questions.filter(q => q.level === "Vận dụng").length,
    vanDungCao: currentWorksheet.questions.filter(q => q.level === "Vận dụng cao").length,
  };

  const totalQ = currentWorksheet.questions.length || 1;
  const pctNB = Math.round((countLevels.nhanBiet / totalQ) * 100);
  const pctTH = Math.round((countLevels.thongHieu / totalQ) * 100);
  const pctVD = Math.round((countLevels.vanDung / totalQ) * 100);
  const pctVDC = Math.round((countLevels.vanDungCao / totalQ) * 100);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col antialiased">
      
      {/* TOAST THÔNG BÁO TẢI FILE PDF CHUẨN */}
      {showPdfToast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3.5 max-w-lg w-full border border-slate-700/50 animate-bounce no-print">
          <div className="bg-red-500 text-white p-2.5 rounded-xl">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.363 8.68c-.015-.06-.03-.134-.046-.223a5.5 5.5 0 0 1-.035-.453c0-.18.006-.358.016-.532.01-.174.03-.325.06-.453.03-.128.073-.223.13-.284.058-.061.139-.092.245-.092.083 0 .153.023.21.069a.44.44 0 0 1 .151.19c.04.081.07.185.093.313.022.128.033.275.033.44a5.503 5.503 0 0 1-.065.748c-.035.215-.084.442-.148.682h-.395zm-.736 2.052c.15-.366.326-.757.525-1.171h-.44c-.131 0-.256.02-.377.06-.12.04-.226.103-.316.19a.66.66 0 0 0-.177.306c-.039.124-.058.261-.058.41a.573.573 0 0 0 .141.385c.094.106.215.159.362.159.13 0 .245-.045.342-.134.1-.09.182-.224.248-.405zm1.531.547c.182-.126.355-.26.518-.403h-.32c-.065 0-.13.003-.195.01-.064.006-.125.018-.182.036-.057.017-.11.042-.158.075-.048.032-.084.077-.109.134-.025.056-.038.127-.038.212 0 .093.02.167.06.223.04.056.1.084.18.084.07 0 .144-.023.223-.07a2.213 2.213 0 0 0 .221-.143v-.158zm7.842-3.779V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8l6 6zm-2 .586L15.414 5H6v15h12V7.5zM7.5 14h1.25a1.25 1.25 0 0 1 0 2.5H7.5V18H6v-5.5h1.5V14zm1.25 1a.25 0 0 0 0-.5H7.5v.5h1.25zm4.25-2.25c.828 0 1.5.672 1.5 1.5v2.5c0 .828-.672 1.5-1.5 1.5h-1.5V13H13zm0 4c.276 0 .5-.224.5-.5v-2.5a.5.5 0 0 0-.5-.5h-.5v3.5H13zm5-4h-2.5V18H17v-1.5h1.5V15H17v-1h1.5v-1z"/>
            </svg>
          </div>
          <div className="flex-1 text-left">
            <h4 className="font-extrabold text-sm text-slate-100">Mẹo xuất File PDF:</h4>
            <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
              Tại hộp thoại in kế tiếp, hãy chọn Máy in đích là <strong className="text-amber-300">"Lưu dưới dạng PDF" (Save as PDF)</strong> để xuất file chuẩn màu, siêu sắc nét không bị vỡ hạt!
            </p>
          </div>
        </div>
      )}

      {/* TRANG TRÍ CHỮA TRỊ PRINT MEDIA */}
      <style>{`
        @media print {
          html, body {
            height: auto !important;
            min-height: 0 !important;
            overflow: visible !important;
            background: white !important;
            color: black !important;
          }
          header, footer, .no-print {
            display: none !important;
          }
          main {
            display: block !important;
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            height: auto !important;
            overflow: visible !important;
          }
          section {
            width: 100% !important;
            max-width: 100% !important;
            display: block !important;
            height: auto !important;
            overflow: visible !important;
          }
          div {
            overflow: visible !important;
          }
          .print-full-width {
            width: 100% !important;
            max-width: 100% !important;
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
            height: auto !important;
            overflow: visible !important;
          }
          .print-page-break {
            page-break-before: always;
          }
        }
      `}</style>

      {/* HEADER BAR */}
      <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 text-white shadow-md py-4 px-6 no-print">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/15 p-2 rounded-xl border border-white/20">
              <BookOpenCheck className="h-8 w-8 text-amber-300" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-display font-bold tracking-tight">Trợ lý tạo bài tập Toán 8 KNTT</h1>
                <span className="bg-amber-400 text-slate-900 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                  Chuẩn GDPT 2018
                </span>
              </div>
              <p className="text-xs text-blue-100 mt-0.5">Tạo bài tập, phiếu học tập, đề kiểm tra và lời giải chi tiết chỉ trong vài giây</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button 
              onClick={() => setShowApiModal(true)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                apiKey 
                ? "bg-emerald-500/10 border-emerald-400/40 text-emerald-300 hover:bg-emerald-500/20" 
                : "bg-amber-500/10 border-amber-400/40 text-amber-300 hover:bg-amber-500/20"
              }`}
            >
              <Settings className="h-3.5 w-3.5" />
              {apiKey ? "Đã liên kết AI Gemini" : "Cấu hình AI (Dùng Thử)"}
            </button>
            
            <div className="text-right hidden lg:block border-l border-white/20 pl-4">
              <p className="text-xs text-blue-200">Sách giáo khoa</p>
              <p className="text-xs font-bold">Kết nối tri thức với cuộc sống</p>
            </div>
          </div>
        </div>
      </header>

      {/* CẢNH BÁO LỖI NẾU CÓ */}
      {apiError && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-800 px-6 py-3 text-sm flex items-start gap-2.5 max-w-7xl mx-auto w-full mt-4 rounded-xl no-print">
          <Info className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="flex-1 text-left">
            <p className="font-semibold">Lưu ý hoạt động:</p>
            <p className="text-xs mt-1 leading-relaxed">{apiError}</p>
          </div>
          <button 
            onClick={() => setApiError("")} 
            className="text-amber-500 hover:text-amber-800 font-bold px-1.5 cursor-pointer text-base"
          >
            ×
          </button>
        </div>
      )}

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* VÙNG 1: KHU VỰC NHẬP LIỆU BÊN TRÁI */}
        <section className="lg:col-span-5 space-y-6 no-print">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Sliders className="h-5 w-5 text-blue-600" />
              <h2 className="text-base font-bold text-slate-800 font-display">Bảng điều khiển học liệu</h2>
            </div>

            {/* CHỌN CHƯƠNG */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wide flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-blue-500" />
                Chọn chương học
              </label>
              <select 
                value={selectedChapterId}
                onChange={(e) => setSelectedChapterId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
              >
                {TOAN_8_KNTT_DB.map((ch) => (
                  <option key={ch.id} value={ch.id}>{ch.chapter}</option>
                ))}
              </select>
            </div>

            {/* CHỌN BÀI HỌC */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wide flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-blue-500" />
                Chọn tên bài học
              </label>
              <select 
                value={selectedLessonId}
                onChange={handleLessonChange}
                className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
              >
                {currentChapter.lessons.map((lesson) => (
                  <option key={lesson.id} value={lesson.id}>{lesson.name}</option>
                ))}
              </select>
            </div>

            {/* NHẬP DẠNG TOÁN */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wide flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-blue-500" />
                Nhập dạng toán cần tạo
              </label>
              <div className="relative">
                <input 
                  type="text"
                  value={customForm}
                  onChange={(e) => setCustomForm(e.target.value)}
                  placeholder="Ví dụ: Rút gọn biểu thức, Tìm x..."
                  className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl p-2.5 pr-8 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                />
                <span className="absolute right-2.5 top-3 text-[10px] bg-blue-100 text-blue-700 font-bold px-1 rounded">Mẫu</span>
              </div>
              <p className="text-[11px] text-slate-400 italic">Gợi ý từ SGK: {currentLesson.forms.join(", ")}</p>
            </div>

            {/* CHỌN MỨC ĐỘ NHẬN THỨC */}
            <div className="space-y-2 text-left">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wide flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5 text-blue-500" />
                Mức độ bài tập (Có phân hóa)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setLevels({...levels, nhanBiet: !levels.nhanBiet})}
                  className={`flex items-center justify-between p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    levels.nhanBiet 
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800' 
                      : 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xs font-semibold">Nhận biết</span>
                  <span className={`w-2 h-2 rounded-full ${levels.nhanBiet ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                </button>

                <button
                  type="button"
                  onClick={() => setLevels({...levels, thongHieu: !levels.thongHieu})}
                  className={`flex items-center justify-between p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    levels.thongHieu 
                      ? 'bg-blue-50 border-blue-300 text-blue-800' 
                      : 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xs font-semibold">Thông hiểu</span>
                  <span className={`w-2 h-2 rounded-full ${levels.thongHieu ? 'bg-blue-500' : 'bg-slate-300'}`}></span>
                </button>

                <button
                  type="button"
                  onClick={() => setLevels({...levels, vanDung: !levels.vanDung})}
                  className={`flex items-center justify-between p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    levels.vanDung 
                      ? 'bg-amber-50 border-amber-300 text-amber-800' 
                      : 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xs font-semibold">Vận dụng</span>
                  <span className={`w-2 h-2 rounded-full ${levels.vanDung ? 'bg-amber-500' : 'bg-slate-300'}`}></span>
                </button>

                <button
                  type="button"
                  onClick={() => setLevels({...levels, vanDungCao: !levels.vanDungCao})}
                  className={`flex items-center justify-between p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    levels.vanDungCao 
                      ? 'bg-purple-50 border-purple-300 text-purple-800' 
                      : 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xs font-semibold">Vận dụng cao</span>
                  <span className={`w-2 h-2 rounded-full ${levels.vanDungCao ? 'bg-purple-500' : 'bg-slate-300'}`}></span>
                </button>
              </div>
            </div>

            {/* CHỌN SỐ LƯỢNG CÂU VÀ HÌNH THỨC */}
            <div className="grid grid-cols-2 gap-3 text-left">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Số lượng câu</label>
                <select 
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                >
                  <option value={5}>5 câu</option>
                  <option value={10}>10 câu</option>
                  <option value={15}>15 câu</option>
                  <option value={20}>20 câu</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Hình thức câu</label>
                <select 
                  value={questionType}
                  onChange={(e) => setQuestionType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                >
                  <option value="Trắc nghiệm 4 lựa chọn">Trắc nghiệm 4LĐ</option>
                  <option value="Tự luận">Tự luận giải chi tiết</option>
                  <option value="Điền đáp án khuyết">Điền vào chỗ trống</option>
                  <option value="Đúng/sai">Đúng / Sai</option>
                  <option value="Kết hợp nhiều hình thức">Tất cả hình thức</option>
                </select>
              </div>
            </div>

            {/* CHỌN MỤC ĐÍCH SỬ DỤNG, THỜI GIAN LÀM BÀI VÀ NGÀY LÀM BÀI */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wide flex items-center gap-1.5">
                  <CheckSquare className="h-3.5 w-3.5 text-blue-500" />
                  Mục đích
                </label>
                <select 
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                >
                  <option value="Luyện tập trên lớp">Luyện tập</option>
                  <option value="Bài tập về nhà">Về nhà</option>
                  <option value="Kiểm tra 15 phút">Kiểm tra</option>
                  <option value="Ôn tập giữa kỳ">Ôn giữa kỳ</option>
                  <option value="Bồi dưỡng học sinh khá giỏi">Bồi dưỡng hsg</option>
                  <option value="Phụ đạo học sinh yếu">Phụ đạo</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wide flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-blue-500" />
                  Thời lượng
                </label>
                <select 
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm bg-white font-semibold rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                >
                  <option value="15 phút">15 phút</option>
                  <option value="20 phút">20 phút</option>
                  <option value="30 phút">30 phút</option>
                  <option value="45 phút">45 phút</option>
                  <option value="60 phút">60 phút</option>
                  <option value="90 phút">90 phút</option>
                  <option value="120 phút">120 phút</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wide flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-blue-500" />
                  Ngày làm bài
                </label>
                <input 
                  type="text"
                  value={worksheetDate}
                  onChange={(e) => setWorksheetDate(e.target.value)}
                  placeholder="Ví dụ: 15/09/2026"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* NHẬP SƯ PHẠM BỔ SUNG */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wide flex items-center gap-1.5">
                <HelpCircle className="h-3.5 w-3.5 text-blue-500" />
                Yêu cầu sư phạm bổ sung (Tùy chọn)
              </label>
              <textarea 
                rows={2}
                value={customRequest}
                onChange={(e) => setCustomRequest(e.target.value)}
                placeholder="Ví dụ: Có câu hỏi mô tả hình học thực tế, giải toán bằng số nguyên đẹp, thêm lời khuyên sư phạm chi tiết..."
                className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none resize-none"
              ></textarea>
            </div>

            {/* NÓM CÁC NÚT TÁC VỤ CHÍNH */}
            <div className="pt-2 grid grid-cols-1 gap-2.5">
              <button
                type="button"
                onClick={() => handleGenerateWorksheet(false, false)}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    <span>Đang biên soạn đề với AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 text-amber-300" />
                    <span className="font-display">TẠO BÀI TẬP VỚI TRÍ TUỆ NHÂN TẠO</span>
                  </>
                )}
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleGenerateWorksheet(true, false)}
                  disabled={isLoading}
                  className="bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-800 text-xs font-bold py-2 @laptop:px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
                >
                  <Wand2 className="h-3.5 w-3.5 text-sky-600" />
                  Tạo nhanh 5 câu
                </button>

                <button
                  type="button"
                  onClick={() => handleGenerateWorksheet(false, true)}
                  disabled={isLoading}
                  className="bg-violet-50 hover:bg-violet-100 border border-violet-200 text-violet-800 text-xs font-bold py-2 @laptop:px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
                >
                  <Layers className="h-3.5 w-3.5 text-violet-600" />
                  Tạo bài phân hóa
                </button>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Info className="h-3 w-3" />
                  Mẫu có sẵn kết nối an toàn
                </span>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-slate-500 hover:text-red-500 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3" />
                  Đặt lại mặc định
                </button>
              </div>
            </div>
          </div>

          {/* HỘP PHÂN TÍCH MỨC ĐỘ ĐỀ BÀI */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-indigo-500" />
                Phân tích mức độ đề bài
              </h3>
              <span className="text-[10px] bg-indigo-50 text-indigo-700 font-extrabold px-2 py-0.5 rounded-full border border-indigo-150">
                Ma trận Bộ GD&ĐT
              </span>
            </div>

            <div className="space-y-3.5 text-left">
              {/* Nhận biết */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    Nhận biết
                  </span>
                  <div className="text-right">
                    <span className="font-bold text-emerald-600">{countLevels.nhanBiet} câu ({pctNB}%)</span>
                    <span className="text-[10px] text-slate-400 ml-1.5">(Chuẩn: 40%)</span>
                  </div>
                </div>
                <div className="relative w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 bg-emerald-500 h-full transition-all rounded-full" style={{width: `${pctNB}%`}}></div>
                  <div className="absolute top-0 h-full border-r-2 border-slate-400/80 border-dashed" style={{left: '40%'}}></div>
                </div>
              </div>

              {/* Thông hiểu */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                    Thông hiểu
                  </span>
                  <div className="text-right">
                    <span className="font-bold text-blue-600">{countLevels.thongHieu} câu ({pctTH}%)</span>
                    <span className="text-[10px] text-slate-400 ml-1.5">(Chuẩn: 30%)</span>
                  </div>
                </div>
                <div className="relative w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 bg-blue-500 h-full transition-all rounded-full" style={{width: `${pctTH}%`}}></div>
                  <div className="absolute top-0 h-full border-r-2 border-slate-400/80 border-dashed" style={{left: '30%'}}></div>
                </div>
              </div>

              {/* Vận dụng */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    Vận dụng
                  </span>
                  <div className="text-right">
                    <span className="font-bold text-amber-600">{countLevels.vanDung} câu ({pctVD}%)</span>
                    <span className="text-[10px] text-slate-400 ml-1.5">(Chuẩn: 20%)</span>
                  </div>
                </div>
                <div className="relative w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 bg-amber-500 h-full transition-all rounded-full" style={{width: `${pctVD}%`}}></div>
                  <div className="absolute top-0 h-full border-r-2 border-slate-400/80 border-dashed" style={{left: '20%'}}></div>
                </div>
              </div>

              {/* Vận dụng cao */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                    Vận dụng cao
                  </span>
                  <div className="text-right">
                    <span className="font-bold text-purple-600">{countLevels.vanDungCao} câu ({pctVDC}%)</span>
                    <span className="text-[10px] text-slate-400 ml-1.5">(Chuẩn: 10%)</span>
                  </div>
                </div>
                <div className="relative w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 bg-purple-500 h-full transition-all rounded-full" style={{width: `${pctVDC}%`}}></div>
                  <div className="absolute top-0 h-full border-r-2 border-slate-400/80 border-dashed" style={{left: '10%'}}></div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 text-[11px] text-blue-700 leading-relaxed flex gap-1.5 items-start text-left">
              <Info className="h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" />
              <span>
                Các đường đứt nét biểu thị tỉ lệ vàng của Bộ GD&ĐT <strong>(40% - 30% - 20% - 10%)</strong>. Hãy bám sát mốc chuẩn này khi ra đề kiểm tra định kỳ hoặc đề thi củng cố học kỳ.
              </span>
            </div>
          </div>
        </section>

        {/* VÙNG 2: KHU VỰC KẾT QUẢ BÊN PHẢI */}
        <section className="lg:col-span-7 flex flex-col space-y-4 print-full-width">
          
          {/* THANH ĐIỀU HƯỚNG TABS */}
          <div className="bg-white p-1.5 rounded-xl border border-slate-200/80 shadow-sm flex flex-wrap gap-1 no-print">
            <button
              onClick={() => setActiveTab("sheet")}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "sheet" 
                  ? "bg-blue-600 text-white shadow-sm" 
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <FileSpreadsheet className="h-3.5 w-3.5" />
              Phiếu đầy đủ
            </button>

            <button
              onClick={() => setActiveTab("student")}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "student" 
                  ? "bg-emerald-600 text-white shadow-sm" 
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              Bản học sinh
            </button>

            <button
              onClick={() => setActiveTab("teacher")}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "teacher" 
                  ? "bg-indigo-600 text-white shadow-sm" 
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <EyeOff className="h-3.5 w-3.5" />
              Bản giáo viên
            </button>

            <button
              onClick={() => setActiveTab("errors")}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "errors" 
                  ? "bg-red-600 text-white shadow-sm" 
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <AlertTriangle className="h-3.5 w-3.5" />
              Lỗi thường gặp
            </button>

            <button
              onClick={() => setActiveTab("tips")}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "tips" 
                  ? "bg-amber-600 text-white shadow-sm" 
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Wand2 className="h-3.5 w-3.5" />
              Gợi ý sử dụng
            </button>
          </div>

          {/* CARD CHÍNH HIỂN THỊ PHIẾU BÀI TẬP */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md p-6 md:p-8 flex-1 flex flex-col print-full-width relative overflow-hidden">
            
            {/* Thanh điều khiển phụ của Phiếu */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pb-4 mb-6 border-b border-slate-100 no-print">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-semibold">Lọc nhanh mức độ:</span>
                <select
                  value={diffFilter}
                  onChange={(e) => setDiffFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg px-2 py-1 transition-all outline-none"
                >
                  <option value="all">Tất cả câu</option>
                  <option value="basic">Chỉ Câu dễ (Nhận biết)</option>
                  <option value="medium">Chỉ Câu vừa (Thông hiểu, VD)</option>
                  <option value="hard">Chỉ Câu khó (Vận dụng cao)</option>
                </select>
              </div>

              {/* KHU VỰC CÁC NÚT TÁC VỤ XUẤT FILE */}
              <div className="flex flex-wrap items-center gap-1.5 justify-end">
                {/* NÚT TẢI WORD */}
                <button
                  onClick={handleDownloadWord}
                  className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-lg transition-all flex items-center gap-1.5 text-xs font-extrabold shadow-sm cursor-pointer"
                  title="Xuất file tài liệu .doc mở trực tiếp cực đẹp bằng Microsoft Word"
                >
                  <svg className="w-3.5 h-3.5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.181 8.686H14.12V15.28H12.181V8.686ZM14.12 6.84V7.749H12.181V6.84H14.12ZM20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm-12.2 13H5.8L4.3 8h1.6l.8 5.4.9-5.4h1.4l.9 5.4.8-5.4h1.5l-1.5 9h-1.3L8.5 12l-.7 5zm11.7-1.5h-1.8v-1.1H18V13.3H17.7v-1h.3V11.2h-.3v-1H18V9.1h1.5v6.4z"/>
                  </svg>
                  <span>TẢI WORD</span>
                </button>

                {/* NÚT TẢI PDF */}
                <button
                  onClick={handleDownloadPdf}
                  className="px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 rounded-lg transition-all flex items-center gap-1.5 text-xs font-extrabold shadow-sm cursor-pointer"
                  title="Tải đề dưới dạng tài liệu PDF chất lượng cao"
                >
                  <svg className="w-3.5 h-3.5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.363 8.68c-.015-.06-.03-.134-.046-.223a5.5 5.5 0 0 1-.035-.453c0-.18.006-.358.016-.532.01-.174.03-.325.06-.453.03-.128.073-.223.13-.284.058-.061.139-.092.245-.092.083 0 .153.023.21.069a.44.44 0 0 1 .151.19c.04.081.07.185.093.313.022.128.033.275.033.44a5.503 5.503 0 0 1-.065.748c-.035.215-.084.442-.148.682h-.395zm-.736 2.052c.15-.366.326-.757.525-1.171h-.44c-.131 0-.256.02-.377.06-.12.04-.226.103-.316.19a.66.66 0 0 0-.177.306c-.039.124-.058.261-.058.41a.573.573 0 0 0 .141.385c.094.106.215.159.362.159.13 0 .245-.045.342-.134.1-.09.182-.224.248-.405zm1.531.547c.182-.126.355-.26.518-.403h-.32c-.065 0-.13.003-.195.01-.064.006-.125.018-.182.036-.057.017-.11.042-.158.075-.048.032-.084.077-.109.134-.025.056-.038.127-.038.212 0 .093.02.167.06.223.04.056.1.084.18.084.07 0 .144-.023.223-.07a2.213 2.213 0 0 0 .221-.143v-.158zm7.842-3.779V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8l6 6zm-2 .586L15.414 5H6v15h12V7.5zM7.5 14h1.25a1.25 1.25 0 0 1 0 2.5H7.5V18H6v-5.5h1.5V14zm1.25 1a.25 0 0 0 0-.5H7.5v.5h1.25zm4.25-2.25c.828 0 1.5.672 1.5 1.5v2.5c0 .828-.672 1.5-1.5 1.5h-1.5V13H13zm0 4c.276 0 .5-.224.5-.5v-2.5a.5.5 0 0 0-.5-.5h-.5v3.5H13zm5-4h-2.5V18H17v-1.5h1.5V15H17v-1h1.5v-1z"/>
                  </svg>
                  <span>TẢI PDF</span>
                </button>

                <button
                  onClick={handleCopyClipboard}
                  className="px-2.5 py-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                  title="Sao chép toàn bộ văn bản dạng Plain Text"
                >
                  {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{isCopied ? "Đã sao" : "Sao chép"}</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="px-2.5 py-1.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer	"
                  title="Mở bảng điều khiển in hoặc lưu máy in hệ thống"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>In nhanh</span>
                </button>
              </div>
            </div>

            {/* PHIẾU IN TRỰC TIẾP CHUẨN ĐẸP TRÊN GIẤY */}
            <div className="flex-1 flex flex-col space-y-6 print-full-width">
              
              {/* PHIẾU ĐẦY ĐỦ HOẶC BẢN HỌC SINH */}
              {((activeTab === "sheet" || activeTab === "student" || activeTab === "teacher") && (
                <>
                  {/* TIÊU ĐỀ PHIẾU */}
                  <div className="text-center space-y-2 border-b-2 border-double border-slate-200 pb-5">
                    <div className="flex justify-between text-xs text-slate-500 font-semibold uppercase tracking-wide px-2">
                      <span>TRƯỜNG THCS: .......................................</span>
                      <span>Năm học: 2026 - 2027</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight font-display">
                      PHIẾU BÀI TẬP TOÁN LỚP 8 – KNTT
                    </h2>
                    <p className="text-sm font-extrabold text-blue-600 uppercase tracking-widest font-display">
                      {currentWorksheet.title}
                    </p>
                    <div className="text-xs text-slate-500 italic flex justify-center gap-4">
                      <span>Dạng toán: {currentWorksheet.form}</span>
                      <span>•</span>
                      <span>Thời lượng: {duration}</span>
                    </div>
                  </div>

                  {/* THÔNG TIN HỌC SINH */}
                  <div className="grid grid-cols-2 gap-4 bg-slate-50/70 p-4 rounded-xl border border-slate-100 text-xs md:text-sm text-slate-600 text-left">
                    <div className="space-y-2">
                      <p><strong>Họ và tên học sinh:</strong> ................................................................</p>
                      <p><strong>Lớp:</strong> ..........................................................................................</p>
                    </div>
                    <div className="space-y-2">
                      <p><strong>Ngày làm bài:</strong> {worksheetDate}</p>
                      <p><strong>Điểm số:</strong> .................../10</p>
                    </div>
                  </div>

                  {/* MỤC TIÊU BÀI LÀM */}
                  <div className="space-y-2 text-left">
                    <h3 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5 border-l-4 border-blue-600 pl-2">
                      Mục tiêu cần đạt:
                    </h3>
                    <p className="text-xs text-slate-600 bg-slate-50/50 p-2.5 rounded-lg border border-slate-100 italic leading-relaxed">
                      {currentWorksheet.objective}
                    </p>
                  </div>

                  {/* DANH SÁCH CÂU HỎI */}
                  <div className="space-y-8 mt-4 flex-1">
                    {filteredQuestions.length === 0 ? (
                      <div className="text-center py-12 text-slate-400">
                        <FileQuestion className="h-12 w-12 mx-auto stroke-1 mb-2" />
                        <p className="text-sm">Không có câu hỏi nào thuộc mức độ đã lọc.</p>
                      </div>
                    ) : (
                      filteredQuestions.map((q, idx) => {
                        const levelColors: Record<string, string> = {
                          "Nhận biết": "bg-emerald-50 text-emerald-800 border-emerald-200",
                          "Thông hiểu": "bg-blue-50 text-blue-800 border-blue-200",
                          "Vận dụng": "bg-amber-50 text-amber-800 border-amber-200",
                          "Vận dụng cao": "bg-purple-50 text-purple-800 border-purple-200"
                        };

                        return (
                          <div key={q.id} className="space-y-3 pb-6 border-b border-dashed border-slate-100 last:border-b-0 text-left">
                            
                            {/* Header câu hỏi */}
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex flex-col md:flex-row gap-1.5 md:items-center">
                                <span className="font-bold text-slate-800 text-sm md:text-base">
                                  Câu {idx + 1}. <span className="font-normal text-slate-700 leading-relaxed text-sm md:text-semibold tracking-normal">{q.content}</span>
                                </span>
                              </div>
                              
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 no-print ${levelColors[q.level] || 'bg-slate-100'}`}>
                                {q.level}
                              </span>
                            </div>

                            {/* Options nếu có cho TRẮC NGHIỆM */}
                            {q.options && q.options.length > 0 && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-4 text-xs md:text-sm text-slate-600 font-mono">
                                {q.options.map((opt, oIdx) => (
                                  <div key={oIdx} className="flex items-center gap-1.5 hover:text-slate-900">
                                    <span className="font-medium">{opt}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* BẢN HỌC SINH */}
                            {activeTab === "student" && (
                              <div className="mt-4 pl-4 no-print">
                                {q.type === "Tự luận" ? (
                                  <div className="space-y-1">
                                    <p className="text-[10px] text-slate-400 italic">Bài làm tự luận:</p>
                                    <div className="border border-slate-200/60 rounded-xl h-36 bg-slate-50/30"></div>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-slate-500 font-semibold font-display">Trả lời của em:</span>
                                    <input 
                                      type="text" 
                                      placeholder="Ghi đáp án tại đây..." 
                                      className="border-b border-slate-300 bg-transparent text-xs p-1 focus:border-blue-500 outline-none w-48 font-semibold text-slate-800"
                                    />
                                  </div>
                                )}
                              </div>
                            )}

                            {/* ĐÁP ÁN & GIẢI CHI TIẾT */}
                            {((activeTab === "sheet" || activeTab === "teacher") && showSolutions) && (
                              <div className="mt-3 bg-slate-50/80 p-3.5 rounded-xl border border-slate-150 space-y-2 text-left">
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-700 border-b border-slate-200/60 pb-1.5 font-display">
                                  <CheckSquare className="h-4 w-4 text-indigo-500" />
                                  <span>Đáp án đúng: <span className="text-emerald-600 font-extrabold">{q.correctAnswer}</span></span>
                                </div>
                                <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed font-sans">
                                  <p className="font-semibold text-slate-700">Lời giải chi tiết từng bước:</p>
                                  <p className="whitespace-pre-line pl-1.5 border-l-2 border-indigo-200 text-slate-600">{q.solution}</p>
                                </div>
                                {q.hint && (
                                  <p className="text-[11px] text-amber-700 bg-amber-50/50 p-2 rounded-lg italic">
                                    <strong>💡 Gợi ý lấy gốc:</strong> {q.hint}
                                  </p>
                                )}
                              </div>
                            )}

                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* PHẦN TỰ ĐÁNH GIÁ */}
                  {(activeTab === "sheet" || activeTab === "student") && (
                    <div className="mt-12 pt-6 border-t border-slate-200 space-y-4 text-left">
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider font-display">
                        Phần tự đánh giá của học sinh sau khi làm bài
                      </h4>
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="border border-slate-200/80 p-3 rounded-xl bg-emerald-50/30">
                          <p className="text-lg">😊</p>
                          <p className="text-[11px] font-bold text-emerald-800 mt-1 font-display">Em đã hiểu bài</p>
                        </div>
                        <div className="border border-slate-200/80 p-3 rounded-xl bg-amber-50/30">
                          <p className="text-lg">😐</p>
                          <p className="text-[11px] font-bold text-amber-800 mt-1 font-display">Em còn nhầm lẫn</p>
                        </div>
                        <div className="border border-slate-200/80 p-3 rounded-xl bg-red-50/30">
                          <p className="text-lg">😟</p>
                          <p className="text-[11px] font-bold text-red-800 mt-1 font-display">Cần thầy/cô hỗ trợ</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-8 text-center text-[10px] text-slate-400 border-t border-slate-100 pt-3">
                    Phiếu học tập tự sinh bởi "Trợ lý tạo bài tập Toán 8 KNTT" - Giáo viên rà soát kỹ trước khi áp dụng chính thức.
                  </div>
                </>
              ))}

              {/* TAB: LỖI THƯỜNG GẶP */}
              {activeTab === "errors" && (
                <div className="space-y-6 text-left">
                  <div className="border-b pb-4 mb-4">
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 font-display">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      Phân Tích Lỗi Sai Thường Gặp Của Học Sinh
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">Tổng hợp lỗi tư duy toán học và giải pháp hỗ trợ lớp học</p>
                  </div>

                  <div className="space-y-4">
                    {currentWorksheet.commonErrors.map((err, index) => (
                      <div key={index} className="bg-red-50/40 rounded-xl border border-red-200 p-5 space-y-3">
                        <h4 className="text-sm font-bold text-red-900 flex items-center gap-2 font-display">
                          <span className="bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[11px]">
                            {index + 1}
                          </span>
                          {err.error}
                        </h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                          <div className="space-y-1">
                            <span className="font-semibold text-slate-700 font-display">Nguyên nhân sai lầm:</span>
                            <p className="text-slate-600 leading-relaxed italic">{err.cause}</p>
                          </div>
                          
                          <div className="space-y-1">
                            <span className="font-semibold text-emerald-700 font-display">Phương pháp chỉnh sửa sư phạm:</span>
                            <p className="text-slate-600 leading-relaxed italic">{err.correction}</p>
                          </div>
                        </div>

                        <div className="border-t border-red-100 pt-3 text-xs">
                          <p className="font-semibold text-slate-700 mb-1 font-display">🎯 Đơn cử luyện tập sửa lỗi:</p>
                          <p className="bg-white/80 p-2.5 rounded-lg border border-red-100/50 text-slate-700 italic font-mono">
                            {err.practice}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: GỢI Ý GIẢNG DẠY SƯ PHẠM */}
              {activeTab === "tips" && (
                <div className="space-y-6 text-left">
                  <div className="border-b pb-4 mb-4">
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 font-display">
                      <Wand2 className="h-5 w-5 text-amber-500" />
                      Gợi Ý Tổ Chức Giảng Dạy Trên Lớp Học
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 font-sans">Ý tưởng sư phạm áp dụng phiếu học tập để phân hóa học sinh hiệu quả</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-indigo-50/30 border border-indigo-100 rounded-xl p-5 space-y-3">
                      <h4 className="text-sm font-bold text-indigo-900 flex items-center gap-1.5 font-display">
                        <Award className="h-4 w-4" />
                        Gợi ý phân hóa học sinh
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">
                        - <strong>Học sinh mất gốc:</strong> Tập trung tối đa rèn luyện nhóm câu Nhận biết. Hướng dẫn các em đọc kỹ phần <strong>"Gợi ý lấy gốc"</strong> đi kèm mỗi câu.<br/>
                        - <strong>Học sinh khá giỏi:</strong> Giao nhiệm vụ giải câu thuộc nhóm Vận dụng cao mà không được sử dụng nháp, sau đó trình bày lời giải chứng minh mạch lạc trước lớp học.
                      </p>
                    </div>

                    <div className="bg-amber-50/30 border border-amber-100 rounded-xl p-5 space-y-3">
                      <h4 className="text-sm font-bold text-amber-900 flex items-center gap-1.5 font-display">
                        <Sliders className="h-4 w-4" />
                        Thiết kế hoạt động trạm (15 phút)
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">
                        - Giáo viên in <strong>"Bản học sinh"</strong> và chia lớp thành 4 tổ.<br/>
                        - Mỗi tổ thảo luận và chấm chéo điểm nhóm khác dựa trên <strong>"Bản giáo viên"</strong>. Điều này làm tăng kỹ năng phản biện toán học cho học sinh.
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 border rounded-xl p-5 space-y-3">
                    <h4 className="text-sm font-bold text-slate-800 font-display">Gợi ý sư phạm đúc rút từ AI:</h4>
                    <ul className="list-disc pl-5 text-xs text-slate-600 space-y-2 font-sans">
                      {currentWorksheet.pedagogicalTips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-6 text-center text-xs mt-12 border-t border-slate-800 no-print">
        <p>© 2027 Trợ lý tạo bài tập Toán 8 KNTT - Bản quyền thuộc về Bộ công cụ Giáo học Việt Nam.</p>
        <p className="mt-1 text-slate-600">Thành quả giảng dạy bậc phổ thông theo chương trình cải cách Kết nối tri thức - GDPT 2018.</p>
      </footer>

      {/* MODAL CÀI ĐẶT API GEMINI */}
      {showApiModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 no-print">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full shadow-2xl p-6 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 font-display">
                <Settings className="h-5 w-5 text-indigo-600" />
                Cài đặt kết nối AI Gemini
              </h3>
              <button 
                onClick={() => setShowApiModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold cursor-pointer"
              >
                ×
              </button>
            </div>

            <div className="space-y-3 text-left">
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Học liệu Toán học 8 được tự động biên soạn chuẩn nhờ mô hình trí tuệ nhân tạo **Gemini 3.5 Flash** mạnh mẽ của Google. Quý thầy cô hãy lưu khóa API của mình để mở khóa tính năng tự động soạn bài tập ngẫu nhiên theo ý muốn!
              </p>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase font-display">Khóa API Gemini của bạn:</label>
                <input 
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Dán AI API Key của bạn tại đây (AIzaSy...)"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl p-2.5 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none"
                />
              </div>

              <div className="bg-indigo-50 text-[11px] text-indigo-700 p-3 rounded-lg border border-indigo-150 leading-relaxed font-sans">
                <strong>An toàn bảo mật:</strong> Khóa API của quý thầy cô chỉ được lưu trữ cực kỳ an toàn tại vùng nhớ trình duyệt cá nhân (localStorage) và thực hiện kết nối trực tiếp đến Google GenAI API. Chúng tôi tuyệt đối bảo mật thông tin này.
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 font-display">
              <button
                type="button"
                onClick={() => {
                  setApiKey("");
                  localStorage.removeItem('user_gemini_api_key');
                  setShowApiModal(false);
                }}
                className="px-4 py-2 text-xs text-red-600 hover:bg-red-50 font-bold rounded-xl transition-all cursor-pointer"
              >
                Xóa Key cũ
              </button>

              <button
                type="button"
                onClick={() => saveApiKey(apiKey)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
              >
                Lưu cài đặt
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
