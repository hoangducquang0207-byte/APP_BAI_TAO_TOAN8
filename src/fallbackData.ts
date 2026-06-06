import { Worksheet, Question, CommonError } from "./types";

// Helper to compile dynamic math worksheets based on user configuration
export function generateSmartFallback(
  chapterId: string,
  lessonId: string,
  lessonName: string,
  formName: string,
  questionCount: number,
  duration: string,
  purpose: string
): Worksheet {
  
  // Base meta-data
  let objective = `Nhận biết và vận dụng thành thạo kiến thức về "${lessonName}" nhằm ôn luyện thực chất, nâng cao kỹ năng suy luận logic và khả năng giải Toán lớp 8 theo chuẩn GDPT 2018.`;
  let questionsPool: Question[] = [];
  let errorsPool: CommonError[] = [];
  let tipsPool: string[] = [];

  // Generate specific content buckets
  if (chapterId === "ch1") {
    // --- CHƯƠNG 1: ĐA THỨC ---
    objective = `Vận dụng vững vàng các phép tính về đơn thức, đa thức nhiều biến, quy tắc cộng trừ nhân chia đa thức để rút gọn và tính giá trị của biểu thức đại số lớp 8.`;
    
    questionsPool = [
      {
        id: 1,
        level: "Nhận biết",
        type: "Trắc nghiệm",
        content: "Trong các biểu thức đại số sau, biểu thức nào là đơn thức?",
        options: [
          "A. $3x^2 + y$",
          "B. $-5x^2y^3$",
          "C. $\\frac{x - y}{2}$",
          "D. $x(y - 1)$"
        ],
        correctAnswer: "B",
        solution: "Đơn thức là biểu thức đại số chỉ gồm một số, hoặc một biến, hoặc một tích giữa các số và các biến.\nBiệu thức $-5x^2y^3$ chỉ gồm tích của số $-5$ và các biến $x, y$ nên là đơn thức.\nDo đó, đáp án đúng là B.",
        hint: "Nhớ rằng đơn thức không chứa phép cộng hoặc phép trừ ngoài dấu âm đứng trước số hệ số."
      },
      {
        id: 2,
        level: "Nhận biết",
        type: "Trắc nghiệm",
        content: "Thu gọn đơn thức $A = 3x^2y \\cdot (-2xy^3)$ ta thu được kết quả là:",
        options: [
          "A. $-6x^3y^4$",
          "B. $x^3y^4$",
          "C. $-6x^2y^3$",
          "D. $6x^3y^4$"
        ],
        correctAnswer: "A",
        solution: "Nhân các hệ số với nhau và nhân các phần biến cùng cơ số với nhau:\n$A = (3 \\cdot (-2)) \\cdot (x^2 \\cdot x) \\cdot (y \\cdot y^3)$\n$A = -6x^{2+1}y^{1+3} = -6x^3y^4$.\nDo đó, đáp án đúng là A.",
        hint: "Áp dụng công thức lũy thừa: $a^m \\cdot a^n = a^{m+n}$."
      },
      {
        id: 3,
        level: "Thông hiểu",
        type: "Trắc nghiệm",
        content: "Tính giá trị của đa thức $P = x^2 - 2xy + y^2$ tại $x = 45$ và $y = 5$.",
        options: [
          "A. $1600$",
          "B. $2000$",
          "C. $2500$",
          "D. $1800$"
        ],
        correctAnswer: "A",
        solution: "Cách 1: Thay trực tiếp $x = 45, y = 5$ vào biểu thức.\nCách 2: Nhận xét đa thức $P$ chính là hằng đẳng thức bình phương một hiệu:\n$P = (x - y)^2$.\nThay $x = 45, y = 5$ ta được $P = (45 - 5)^2 = 40^2 = 1600$.\nDo đó, đáp án đúng là A.",
        hint: "Sử dụng hằng đẳng thức $(x-y)^2$ để thu gọn trước khi thế số sẽ giúp bài xử lý siêu nhanh."
      },
      {
        id: 4,
        level: "Thông hiểu",
        type: "Điền đáp án",
        content: "Thu gọn đa thức sau: $Q = (3x^2y - xy^2) - (x^2y + 2xy^2) + 3xy^2$. Đáp số sau khi thu gọn hoàn chỉnh là:",
        options: [],
        correctAnswer: "$2x^2y$",
        solution: "Thực hiện phá ngoặc rồi nhóm các hạng tử đồng dạng:\n$Q = 3x^2y - xy^2 - x^2y - 2xy^2 + 3xy^2$\n$Q = (3x^2y - x^2y) + (-xy^2 - 2xy^2 + 3xy^2)$\n$Q = 2x^2y + 0 = 2x^2y$.\nVậy đáp án điền vào là $2x^2y$.",
        hint: "Hãy đổi dấu tất cả các hạng tử trong ngoặc thứ hai khi phá ngoặc có dấu trừ đứng trước."
      },
      {
        id: 5,
        level: "Vận dụng",
        type: "Tự luận",
        content: "Cho hai đa thức:\n$A = x^2y - 3xy^2 + 5$\n$B = 2x^2y + xy^2 - 2$\n\na) Tính tổng $C = A + B$.\nb) Tính hiệu $D = A - B$.",
        options: [],
        correctAnswer: "a) $C = 3x^2y - 2xy^2 + 3$; b) $D = -x^2y - 4xy^2 + 7$",
        solution: "a) Tính tổng $C = A + B$:\n$C = (x^2y - 3xy^2 + 5) + (2x^2y + xy^2 - 2)$\n$C = (x^2y + 2x^2y) + (-3xy^2 + xy^2) + (5 - 2)$\n$C = 3x^2y - 2xy^2 + 3$.\n\nb) Tính hiệu $D = A - B$:\n$D = (x^2y - 3xy^2 + 5) - (2x^2y + xy^2 - 2)$\n$D = x^2y - 3xy^2 + 5 - 2x^2y - xy^2 + 2$\n$D = (x^2y - 2x^2y) + (-3xy^2 - xy^2) + (5 + 2)$\n$D = -x^2y - 4xy^2 + 7$.",
        hint: "Nhóm các đa thức đồng dạng với nhau và cẩn thận đổi dấu khi thực hiện phép trừ $A - B$."
      },
      {
        id: 6,
        level: "Vận dụng",
        type: "Tự luận",
        content: "Thực hiện phép tính nhân đa thức phức tạp sau và rút gọn biểu thức:\n$M = (x - 2y)(x^2 + 2xy + y^2) - x(x^2 - y^2)$",
        options: [],
        correctAnswer: "$M = y^3 - 2x^2y - 2xy^2$",
        solution: "Khai triển từng phần tử trong biểu thức:\n1) Tính tích thứ nhất:\n$(x - 2y)(x^2 + 2xy + y^2) = x^3 + 2x^2y + xy^2 - 2x^2y - 4xy^2 - 2y^3$\n$= x^3 - 3xy^2 - 2y^3$.\n\n2) Tính tích thứ hai:\n$-x(x^2 - y^2) = -x^3 + xy^2$.\n\n3) Cộng hai kết quả thu được:\n$M = (x^3 - 3xy^2 - 2y^3) - x^3 + xy^2$\n$M = -2xy^2 - 2y^3$.\nVậy sau khi rút gọn, $M = -2xy^2 - 2y^3$.",
        hint: "Thực hiện phép phân phối nhân lần lượt từng hạng tử của đa thức thứ nhất với đa thức thứ hai."
      },
      {
        id: 7,
        level: "Vận dụng cao",
        type: "Tự luận",
        content: "Tìm giá trị lớn nhất của đa thức sau và chỉ rõ giá trị tương ứng của biến $x$:\n$B = 5 + 8x - 2x^2$",
        options: [],
        correctAnswer: "$B_{\\text{max}} = 13$ tại $x = 2$",
        solution: "Ta tiến hành nhóm biến và thêm bớt để tạo hằng đẳng thức bình phương một hiệu:\n$B = -2(x^2 - 4x) + 5$\n$B = -2(x^2 - 4x + 4 - 4) + 5$\n$B = -2[(x - 2)^2 - 4] + 5$\n$B = -2(x - 2)^2 + 8 + 5 = 13 - 2(x - 2)^2$.\n\nVì $-2(x - 2)^2 \\le 0$ với mọi số thực $x$\nNên $B = 13 - 2(x - 2)^2 \\le 13$ với mọi $x$.\nDấu \"=\" xảy ra khi và chỉ khi $x - 2 = 0 \\Leftrightarrow x = 2$.\nVậy giá trị lớn nhất của đa thức $B$ là $13$ khi $x = 2$.",
        hint: "Đặt dấu âm của hệ số tự do biến bậc hai ra ngoài làm nhân tử chung để thuận lợi tạo nhân tử $(x-2)^2$."
      }
    ];

    errorsPool = [
      {
        error: "Quên đổi dấu toàn bộ các số hạng bên trong ngoặc khi đằng trước có dấu trừ",
        cause: "Học sinh thường chỉ đổi dấu số hạng đầu tiên, ví dụ: $-(3x - y + 2) = -3x - y + 2$ (sai dấu của $y$ và $2$).",
        correction: "Yêu cầu học sinh viết chậm từng bước và dùng mũi tên biểu diễn việc phân phối dấu trừ vào từng hạng tử phía trong ngoặc.",
        practice: "Rút gọn biểu thức $T = (a - b) - (2a - 3b + 1)$."
      },
      {
        error: "Sai lầm khi thực hiện quy tắc chia đa thức cho đơn thức",
        cause: "Học sinh quên chia một trong các hạng tử của đa thức cho đơn thức hoặc quên định mức dấu của phép chia.",
        correction: "Yêu cầu viết rõ dạng phân thức phân rã: $(A + B) : C = \\frac{A}{C} + \\frac{B}{C}$ để rà soát kỹ từng phép chia đơn lẻ.",
        practice: "Thực hiện phép tính $(12x^3y^2 - 6x^2y^3) : 3x^2y$."
      }
    ];

    tipsPool = [
      "Nêu cao tinh thần tự rà soát bậc của đa thức thu gọn để kiểm chứng xem đa thức thu được đã hoàn toàn là tối giản hay chưa.",
      "Lồng ghép trò chơi 'ghép đôi hạng tử đồng dạng' đầu giờ học để kích thích tư duy nhanh toán học."
    ];

  } else if (chapterId === "ch3") {
    // --- CHƯƠNG 3: TỨ GIÁC ---
    objective = `Nhận biết và vận dụng thành thạo các định nghĩa, tính chất, dấu hiệu nhận biết của hình thang cân, hình bình hành, hình chữ nhật, hình thoi, hình vuông để giải các bài tập hình học chứng minh và tính góc, độ dài.`;
    
    questionsPool = [
      {
        id: 1,
        level: "Nhận biết",
        type: "Trắc nghiệm",
        content: "Tứ giác $ABCD$ có $\\widehat{A} = 70^\\circ, \\widehat{B} = 80^\\circ, \\widehat{C} = 100^\\circ$. Số đo của góc $\\widehat{D}$ là:",
        options: [
          "A. $110^\\circ$",
          "B. $120^\\circ$",
          "C. $90^\\circ$",
          "D. $100^\\circ$"
        ],
        correctAnswer: "A",
        solution: "Tổng bốn góc của một tứ giác luôn bằng $360^\\circ$.\nTa có: $\\widehat{A} + \\widehat{B} + \\widehat{C} + \\widehat{D} = 360^\\circ$\n$\\Rightarrow 70^\\circ + 80^\\circ + 100^\\circ + \\widehat{D} = 360^\\circ$\n$\\Rightarrow 250^\\circ + \\widehat{D} = 360^\\circ$\n$\\Rightarrow \\widehat{D} = 360^\\circ - 250^\\circ = 110^\\circ$.\nDo đó, đáp án đúng là A.",
        hint: "Tính tổng 3 góc đã biết trước rồi lấy 360 độ trừ đi tổng đó."
      },
      {
        id: 2,
        level: "Nhận biết",
        type: "Trắc nghiệm",
        content: "Dấu hiệu nào sau đây chứng minh một hình thang là hình thang cân?",
        options: [
          "A. Hình thang có hai đường chéo bằng nhau",
          "B. Hình thang có hai cạnh bên bằng nhau",
          "C. Hình thang có hai cạnh đáy bằng nhau",
          "D. Hình thang có hai đường chéo vuông góc"
        ],
        correctAnswer: "A",
        solution: "Theo định lý và dấu hiệu nhận biết hình thang cân:\n- Hình thang có hai góc kề một đáy bằng nhau là hình thang cân.\n- Hình thang có hai đường chéo bằng nhau là hình thang cân.\nLưu ý: Hình thang có hai cạnh bên bằng nhau chưa chắc là hình thang cân (có thể là hình bình hành).\nDo đó, đáp án đúng là A.",
        hint: "Nhớ rằng hai đường chéo bằng nhau là dấu hiệu nhận biết hình thang cân đặc trưng nhất."
      },
      {
        id: 3,
        level: "Thông hiểu",
        type: "Trắc nghiệm",
        content: "Cho hình chữ nhật $ABCD$ có hai đường chéo cắt nhau tại $O$. Biết đường chéo $AC = 12\\text{ cm}$. Độ dài đoạn thẳng $OB$ bằng bao nhiêu?",
        options: [
          "A. $12\\text{ cm}$",
          "B. $6\\text{ cm}$",
          "C. $8\\text{ cm}$",
          "D. $24\\text{ cm}$"
        ],
        correctAnswer: "B",
        solution: "Trong hình chữ nhật, hai đường chéo bằng nhau và cắt nhau tại trung điểm của mỗi đường:\n$BD = AC = 12\\text{ cm}$.\n$O$ là trung điểm của $BD$ nên:\n$OB = \\frac{1}{2} BD = \\frac{1}{2} \\cdot 12 = 6\\text{ cm}$.\nDo đó, đáp án đúng là B.",
        hint: "Sử dụng tính chất đặc thù của hình chữ nhật: 4 đoạn thẳng nối từ tâm đến các đỉnh đều bằng nhau."
      },
      {
        id: 4,
        level: "Thông hiểu",
        type: "Điền đáp án",
        content: "Cho hình thoi $ABCD$ có hai đường chéo $AC = 6\\text{ cm}, BD = 8\\text{ cm}$. Diện tích của hình thoi đó bằng bao nhiêu cm vuông?",
        options: [],
        correctAnswer: "$24$",
        solution: "Công thức diện tích hình thoi có độ dài hai đường chéo $d_1, d_2$ là:\n$S = \\frac{1}{2} d_1 \\cdot d_2$\nThay số ta được:\n$S = \\frac{1}{2} \\cdot 6 \\cdot 8 = 24\\text{ cm}^2$.\nVậy đáp án điền vào là $24$.",
        hint: "Diện tích hình thoi bằng một nửa tích hai đường chéo."
      },
      {
        id: 5,
        level: "Vận dụng",
        type: "Tự luận",
        content: "Cho hình bình hành $ABCD$. Trên các cạnh $AB$ và $CD$ lần lượt lấy các điểm $E$ và $F$ sao cho $AE = CF$. Chứng minh rằng tứ giác $DEBF$ là hình bình hành.",
        options: [],
        correctAnswer: "$DEBF$ là hình bình hành",
        solution: "Vì $ABCD$ là hình bình hành nên:\n1) $AB \\parallel CD \\Rightarrow EB \\parallel DF$ (do $E \\in AB, F \\in CD$).\n2) $AB = CD$.\n\nTa có:\n$EB = AB - AE$\n$DF = CD - CF$\n\nMà $AB = CD$ (tính chất hình bình hành) và $AE = CF$ (theo giả thiết).\nSuy ra: $EB = DF$.\n\nTứ giác $DEBF$ có hai cạnh đối $EB$ và $DF$ song song và bằng nhau ($EB \\parallel DF$ và $EB = DF$).\nDo đó, tứ giác $DEBF$ là hình bình hành (đpcm).",
        hint: "Sử dụng dấu hiệu: một tứ giác có một cặp cạnh đối song song và bằng nhau là hình bình hành."
      },
      {
        id: 6,
        level: "Vận dụng cao",
        type: "Tự luận",
        content: "Cho tam giác $ABC$ vuông tại $A$, trung tuyến $AM$. Kẻ $MD$ vuông góc với $AB$ tại $D$, $ME$ vuông góc với $AC$ tại $E$.\n\na) Chứng minh tứ giác $ADME$ là hình chữ nhật.\nb) Tứ giác $ADME$ cần thêm điều kiện gì của tam giác $ABC$ để trở thành hình vuông?",
        options: [],
        correctAnswer: "a) $ADME$ là hình chữ nhật; b) $\\triangle ABC$ vuông cân tại $A$",
        solution: "a) Xét tứ giác $ADME$, ta có:\n- $MD \\perp AB \\Rightarrow \\widehat{ADM} = 90^\\circ$\n- $ME \\perp AC \\Rightarrow \\widehat{AEM} = 90^\\circ$\n- Tam giác $ABC$ vuông tại $A \\Rightarrow \\widehat{DAE} = 90^\\circ$\n\nTứ giác $ADME$ có 3 góc vuông nên là hình chữ nhật (đpcm).\n\nb) Để hình chữ nhật $ADME$ trở thành hình vuông, ta cần hai cạnh kề bằng nhau:\n$AD = AE$.\nTrong tam giác vuông $ABC$, $M$ là trung điểm của cạnh huyền $BC$. Vì $MD \\perp AB$, $ME \\perp AC$, nên $D$ và $E$ lần lượt là trung điểm của $AB$ và $AC$.\nDo đó: $AD = \\frac{1}{2} AB$, $AE = \\frac{1}{2} AC$.\nĐể $AD = AE$ thì ta cần $AB = AC$.\nKhi đó, tam giác $ABC$ phải có thêm điều kiện là vuông cân tại $A$.\nVậy điều kiện cần tìm là tam giác $ABC$ vuông cân tại $A$.",
        hint: "Liên hệ độ dài cạnh của tứ giác $ADME$ với các cạnh góc vuông của tam giác $ABC$ để tìm sự tương thích."
      }
    ];

    errorsPool = [
      {
        error: "Nhầm lẫn giữa điều kiện cần và đủ khi nhận biết hình thoi và hình chữ nhật",
        cause: "Học sinh hay ghi nhầm: 'Tứ giác có hai đường chéo vuông góc là hình thoi' (thiếu điều kiện tứ giác đó phải là hình bình hành trước).",
        correction: "Yêu cầu vẽ một diều hình học (tứ giác có đường chéo vuông góc nhưng không phải hình bình hành) để khắc sâu kiến thức.",
        practice: "Nêu chính xác dấu hiệu nhận biết hình thoi dựa trên yếu tố đường chéo."
      }
    ];

    tipsPool = [
      "Hãy dùng bút chì màu vẽ sơ đồ tư duy phân nhánh dấu hiệu nhận biết từ hình thang -> hình bình hành -> hình chữ nhật -> hình thoi -> hình vuông.",
      "Nhấn mạnh cho cả lớp học: Hình vuông là cấp độ hoàn hảo nhất, đồng thời vừa là hình chữ nhật vừa là hình thoi."
    ];

  } else if (chapterId === "ch4") {
    // --- CHƯƠNG 4: ĐỊNH LÝ THALÈS ---
    objective = `Áp dụng thành thạo Định lý Thalès (thuận và đảo), tính chất của đường trung bình tam giác và đường phân giác để tính độ dài đoạn thẳng và chứng minh quan hệ song song trong tam giác.`;
    
    questionsPool = [
      {
        id: 1,
        level: "Nhận biết",
        type: "Trắc nghiệm",
        content: "Cho hai đoạn thẳng $AB = 4\\text{ cm}$ và $CD = 10\\text{ cm}$. Tỉ số của hai đoạn thẳng $AB$ và $CD$ là:",
        options: [
          "A. $\\frac{2}{5}$",
          "B. $\\frac{5}{2}$",
          "C. $\\frac{4}{5}$",
          "D. $\\frac{2}{3}$"
        ],
        correctAnswer: "A",
        solution: "Tỉ số của hai đoạn thẳng $AB$ và $CD$ được xác định bằng thương độ dài của chúng:\n$\\frac{AB}{CD} = \\frac{4}{10} = \\frac{2}{5}$.\nDo đó, đáp án đúng là A.",
        hint: "Nhớ rút gọn phân số tỉ lệ về dạng phân số tối giản."
      },
      {
        id: 2,
        level: "Nhận biết",
        type: "Trắc nghiệm",
        content: "Trong một tam giác, đoạn thẳng nối trung điểm hai cạnh bên được gọi là:",
        options: [
          "A. Đường trung trực",
          "B. Đường trung bình",
          "C. Đường phân giác",
          "D. Đường trung tuyến"
        ],
        correctAnswer: "B",
        solution: "Theo định nghĩa SGK toán 8:\nĐường trung bình của tam giác là phân đoạn nối trung điểm hai cạnh của tam giác.\nDo đó, đáp án đúng là B.",
        hint: "Đừng nhầm lẫn với đường trung tuyến nối đỉnh với trung điểm cạnh đối diện."
      },
      {
        id: 3,
        level: "Thông hiểu",
        type: "Trắc nghiệm",
        content: "Cho tam giác $ABC$, đường thẳng $MN \\parallel BC$ ($M \\in AB$, $N \\in AC$). Biết $AM = 4\\text{ cm}, MB = 2\\text{ cm}, AN = 6\\text{ cm}$. Độ dài của đoạn thẳng $NC$ bằng bao nhiêu?",
        options: [
          "A. $3\\text{ cm}$",
          "B. $4\\text{ cm}$",
          "C. $2\\text{ cm}$",
          "D. $12\\text{ cm}$"
        ],
        correctAnswer: "A",
        solution: "Áp dụng định lý Thalès trong tam giác $ABC$ có $MN \\parallel BC$, ta có hệ thức tỉ lệ:\n$\\frac{AM}{MB} = \\frac{AN}{NC}$\nThay các số đo đã biết vào:\n$\\frac{4}{2} = \\frac{6}{NC} \\Rightarrow 2 = \\frac{6}{NC} \\Rightarrow NC = \\frac{6}{2} = 3\\text{ cm}$.\nDo đó, đáp án đúng là A.",
        hint: "Viết đúng thứ tự các đỉnh tương ứng của hệ thức Thalès."
      },
      {
        id: 4,
        level: "Thông hiểu",
        type: "Điền đáp án",
        content: "Cho tam giác $ABC$ có cạnh $BC = 14\\text{ cm}$. Gọi $D, E$ lần lượt là trung điểm của $AB$ và $AC$. Độ dài của đoạn thẳng $DE$ bằng bao nhiêu cm?",
        options: [],
        correctAnswer: "$7$",
        solution: "Vì $D, E$ là trung điểm của $AB$ và $AC$, nên $DE$ là đường trung bình của tam giác $ABC$.\nTheo tính chất đường trung bình, ta có:\n$DE = \\frac{1}{2} BC$\nThay số: $DE = \\frac{1}{2} \\cdot 14 = 7\\text{ cm}$.\nVậy đáp án điền vào là $7$.",
        hint: "Đường trung bình song song với cạnh thứ ba và bằng một nửa cạnh đó."
      },
      {
        id: 5,
        level: "Vận dụng",
        type: "Tự luận",
        content: "Cho hình bình hành $ABCD$. Từ $A$ kẻ đường thẳng cắt đường chéo $BD$ tại $I$, cắt cạnh $BC$ tại $J$ và cắt tia $DC$ tại $K$.\n\na) Chứng minh rằng $IA^2 = IJ \\cdot IK$.\nb) Tính tỉ số $\\frac{AJ}{AK}$ biết $I$ là trung điểm của $AK$.",
        options: [],
        correctAnswer: "a) Chứng minh qua tam giác đồng dạng hoặc Thalès; b) Tỉ số bằng $\\frac{1}{2}$",
        solution: "a) Vì $ABCD$ là hình bình hành nên $AB \\parallel CD$ và $AD \\parallel BC$.\n- Áp dụng hệ quả định lý Thalès cho $AB \\parallel DK$ với đỉnh là $I$, ta được:\n$\\frac{IA}{IK} = \\frac{IB}{ID}$ (1)\n- Áp dụng hệ quả định lý Thalès cho $AD \\parallel BJ$ với đỉnh là $I$, ta được:\n$\\frac{IJ}{IA} = \\frac{IB}{ID}$ (2)\n\nTừ (1) và (2) suy ra:\n$\\frac{IA}{IK} = \\frac{IJ}{IA} \\Rightarrow IA^2 = IJ \\cdot IK$ (đpcm).\n\nb) Khi $I$ là trung điểm của $AK \\Rightarrow IA = IK$.\nThay vào biểu thức ở câu a: $IA^2 = IJ \\cdot IA \\Rightarrow IA = IJ = IK$.\nKhi đó, $J$ trùng với điểm phản chiếu. Ta thu gọn được tỉ số đề bài yêu cầu là $\\frac{AJ}{AK} = \\frac{1}{2}$.",
        hint: "Nhận diện các đường thẳng song song do bản chất hình bình hành cung cấp để áp dụng hệ quả định lý Thalès."
      }
    ];

    errorsPool = [
      {
        error: "Viết sai tỉ số song song tương ứng của định lý Thalès",
        cause: "Học sinh thường viết nhầm $\\frac{AM}{AB} = \\frac{AN}{AC} = \\frac{MN}{BC}$ nhưng lại áp dụng sai khi viết mảnh bên $\\frac{AM}{MB} = \\frac{MN}{BC}$ (hệ quả Thalès bắt buộc phải dùng tỉ lệ toàn bộ cạnh bên).",
        correction: "Vẽ sơ đồ chỉ rõ hai tam giác đồng dạng lồng nhau để phân biệt rõ Thalès cơ bản (trên hai cạnh bên) và hệ quả Thalès (có chứa cạnh song song).",
        practice: "Viết tất cả tỉ số đúng có thể có từ hình vẽ tam giác $ABC$ có $DE \\parallel BC$."
      }
    ];

    tipsPool = [
      "Luôn khuyến khích học sinh vẽ mũi tên song song đỏ trên tập vở để dễ định hướng lập tỉ lệ thức.",
      "Áp dụng đo đạc bóng nắng thực tế ngoài sân trường để học sinh hiểu giá trị thực của định lý Thalès trong đo chiều cao."
    ];

  } else if (chapterId === "ch5") {
    // --- CHƯƠNG 5: PHÂN THỨC ĐẠI SỐ ---
    objective = `Làm chủ khái niệm phân thức đại số, tìm điều kiện xác định, thực hiện rút gọn và cộng, trừ, nhân, chia phân thức đại số một cách trơn tru, chuẩn xác.`;
    
    questionsPool = [
      {
        id: 1,
        level: "Nhận biết",
        type: "Trắc nghiệm",
        content: "Điều kiện xác định của phân thức đại số $\\frac{x - 3}{x + 2}$ là:",
        options: [
          "A. $x \\neq 3$",
          "B. $x \\neq -2$",
          "C. $x \\neq 2$",
          "D. $x \\ge -2$"
        ],
        correctAnswer: "B",
        solution: "Một phân thức đại số xác định khi và chỉ khi mẫu thức của nó khác $0$.\nTa có: $x + 2 \\neq 0 \\Leftrightarrow x \\neq -2$.\nDo đó, đáp án đúng là B.",
        hint: "Mẫu thức phải khác không, giải nhanh điều kiện của mẫu số."
      },
      {
        id: 2,
        level: "Nhận biết",
        type: "Trắc nghiệm",
        content: "Rút gọn phân thức $\\frac{2x - 2y}{x^2 - y^2}$ ta được kết quả là:",
        options: [
          "A. $\\frac{2}{x+y}$",
          "B. $\\frac{2}{x-y}$",
          "C. $2(x+y)$",
          "D. $\\frac{1}{x+y}$"
        ],
        correctAnswer: "A",
        solution: "Thực hiện nhân tử hóa tử và mẫu thức:\n- Tử thức: $2x - 2y = 2(x - y)$\n- Mẫu thức: $x^2 - y^2 = (x - y)(x + y)$\nThay vào phân thức:\n$\\frac{2(x-y)}{(x-y)(x+y)} = \\frac{2}{x+y}$ (với $x \\neq y$).\nDo đó, đáp án đúng là A.",
        hint: "Dùng phương pháp nhóm nhân tử chung ở tử thức và dùng hằng đẳng thức hiệu hai bình phương ở mẫu thức."
      },
      {
        id: 3,
        level: "Thông hiểu",
        type: "Trắc nghiệm",
        content: "Thực hiện phép tính $\\frac{x}{x-1} + \\frac{1}{1-x}$ ta thu được kết quả là:",
        options: [
          "A. $1$",
          "B. $-1$",
          "C. $\\frac{x+1}{x-1}$",
          "D. $0$"
        ],
        correctAnswer: "A",
        solution: "Đổi mẫu thức của phân thức thứ hai để quy đồng mẫu thức:\n$\\frac{1}{1-x} = \\frac{-1}{x-1}$\nKhi đó ta có phép tính:\n$\\frac{x}{x-1} + \\frac{-1}{x-1} = \\frac{x-1}{x-1} = 1$ (với $x \\neq 1$).\nDo đó, đáp án đúng là A.",
        hint: "Phương pháp đổi dấu mẫu số $A - B = -(B - A)$ là vô cùng phổ biến khi xử lý cộng trừ phân thức."
      },
      {
        id: 4,
        level: "Thông hiểu",
        type: "Điền đáp án",
        content: "Rút gọn phân thức $\\frac{3x^2y^3}{9x^3y^2}$ ta thu được kết quả là phân thức có mẫu số bằng bao nhiêu? (Nhập giá trị mẫu số rút gọn tối giản)",
        options: [],
        correctAnswer: "$3x$",
        solution: "Chia cả tử và mẫu cho ước chung lớn nhất của chúng là $3x^2y^2$:\n$\\frac{3x^2y^3}{9x^3y^2} = \\frac{1 \\cdot y}{3 \\cdot x} = \\frac{y}{3x}$.\nMẫu số sau rút gọn tối giản là $3x$.\nVậy đáp án điền vào là $3x$.",
        hint: "Lần lượt thực hiện phép chia lũy thừa biến x và biến y ở tử và mẫu."
      },
      {
        id: 5,
        level: "Vận dụng",
        type: "Tự luận",
        content: "Rút gọn biểu thức phức tạp sau:\n$B = \\left(\\frac{x}{x^2-4} - \\frac{1}{x-2}\\right) : \\frac{2}{x+2}$ (với $x \\neq \\pm 2$)",
        options: [],
        correctAnswer: "$B = -\\frac{1}{2}$",
        solution: "1) Thu gọn biểu thức trong ngoặc trước, quy đồng mẫu thức chung là $x^2 - 4 = (x - 2)(x + 2)$:\n$\\frac{x}{(x-2)(x+2)} - \\frac{x+2}{(x-2)(x+2)} = \\frac{x - (x + 2)}{(x-2)(x+2)} = \\frac{x - x - 2}{(x-2)(x+2)} = -\\frac{2}{(x-2)(x+2)}$\n\n2) Thực hiện phép chia bằng cách nhân nghịch đảo:\n$B = -\\frac{2}{(x-2)(x+2)} \\cdot \\frac{x+2}{2}$\n$B = -\\frac{2 \\cdot (x+2)}{2 \\cdot (x-2)(x+2)} = -\\frac{1}{x-2}$ hay $\\frac{1}{2-x}$.\nVậy biểu thức thu gọn đạt $B = \\frac{1}{2-x}$.",
        hint: "Quy đồng mẫu thức trong ngoặc đơn, sau đó phân tích tích cực và rút gọn ước chung trước khi nhân nghịch đảo."
      }
    ];

    errorsPool = [
      {
        error: "Rút gọn bừa bãi khi tử số và mẫu số đang là phép cộng trừ",
        cause: "Học sinh thường rút gọn nhầm kiểu $\\frac{x + 2}{x + 5} = \\frac{2}{5}$ bằng cách gạch bỏ chữ $x$ ở cả tử và mẫu.",
        correction: "Nhấn mạnh nguyên tắc vàng: Chỉ được rút gọn khi tử và mẫu đã biến đổi hoàn toàn thành phép nhân tích số (nhân tử). Đối với phép cộng trừ, tuyệt đối không được gạch bỏ thành phần đơn lẻ.",
        practice: "Tìm lỗi sai trong phép biến đổi $\\frac{x^2 - 1}{x^2 + x} = \\frac{-1}{x}$."
      }
    ];

    tipsPool = [
      "Luôn luôn nhắc nhở học sinh đặt điều kiện xác định lên dòng đầu tiên của bài kiểm tra để không bị trừ điểm đáng tiếc.",
      "Bài toán tìm x nguyên để phân thức có giá trị nguyên là dạng toán bồi dưỡng tư duy chia hết tuyệt vời cho lớp 8."
    ];

  } else {
    // --- CHƯƠNG KHÁC (CHAPTER FALLBACK - DÀNG CHO CÁC CHƯƠNG CÒN LẠI) ---
    objective = `Củng cố và rèn luyện tư duy thực hành kỹ năng giải các lớp bài toán toán 8 Chương trình sách Kết nối tri thức.`;
    
    questionsPool = [
      {
        id: 1,
        level: "Nhận biết",
        type: "Trắc nghiệm",
        content: "Tìm nghiệm của phương trình bậc nhất một ẩn sau: $3x - 6 = 0$.",
        options: [
          "A. $x = 2$",
          "B. $x = -2$",
          "C. $x = 3$",
          "D. $x = 6$"
        ],
        correctAnswer: "A",
        solution: "Ta giải phương trình bậc nhất:\n$3x - 6 = 0 \\Leftrightarrow 3x = 6 \\Leftrightarrow x = 2$.\nDo đó đáp án đúng là A.",
        hint: "Chuyển vế đổi dấu rồi thực hiện phép chia tìm $x$."
      },
      {
        id: 2,
        level: "Nhận biết",
        type: "Trắc nghiệm",
        content: "Cho tam giác $ABC$ vuông tại $A$ có $AB = 6\\text{ cm}, AC = 8\\text{ cm}$. Áp dụng định lý Pythagore, độ dài cạnh $BC$ là:",
        options: [
          "A. $10\\text{ cm}$",
          "B. $14\\text{ cm}$",
          "C. $12\\text{ cm}$",
          "D. $100\\text{ cm}$"
        ],
        correctAnswer: "A",
        solution: "Áp dụng định lý Pythagore cho tam giác vuông tại $A$:\n$BC^2 = AB^2 + AC^2 = 6^2 + 8^2 = 36 + 64 = 100$\n$\\Rightarrow BC = \\sqrt{100} = 10\\text{ cm}$.\nDo đó, đáp án đúng là A.",
        hint: "Bình phương cạnh huyền bằng tổng bình phương của hai cạnh góc vuông."
      },
      {
        id: 3,
        level: "Thông hiểu",
        type: "Trắc nghiệm",
        content: "Hình chóp tứ giác đều có cạnh đáy là $6\\text{ cm}$ và chiều cao đáy bằng $5\\text{ cm}$. Diện tích đáy của hình chóp đó là:",
        options: [
          "A. $36\\text{ cm}^2$",
          "B. $30\\text{ cm}^2$",
          "C. $24\\text{ cm}^2$",
          "D. $18\\text{ cm}^2$"
        ],
        correctAnswer: "A",
        solution: "Hình chóp tứ giác đều thì mặt đáy là hình vuông.\nDiện tích đáy hình vuông cạnh $a = 6\\text{ cm}$ là:\n$S = a^2 = 6^2 = 36\\text{ cm}^2$.\nDo đó, đáp án đúng là A.",
        hint: "Nhận diện diện tích đáy của hình chóp tứ giác đều chính là diện tích hình vuông đáy."
      },
      {
        id: 4,
        level: "Thông hiểu",
        type: "Điền đáp án",
        content: "Giải phương trình sau: $5x = 3x + 10$. Nghiệm của phương trình là:",
        options: [],
        correctAnswer: "$5$",
        solution: "Ta chuyển vế các hạng tử chứa biến sang một bên:\n$5x - 3x = 10 \\Leftrightarrow 2x = 10 \\Leftrightarrow x = 5$.\nVậy đáp án điền vào là $5$.",
        hint: "Cần đổi dấu khi chuyển vế hạng tử $3x$ sang vế trái."
      },
      {
        id: 5,
        level: "Vận dụng",
        type: "Tự luận",
        content: "Một người đi xe đạp từ địa điểm $A$ đến địa điểm $B$ với vận tốc trung bình $12\\text{ km/h}$. Lúc về, người đó di chuyển bằng xe máy với vận tốc trung bình $40\\text{ km/h}$ nên thời gian về ít hơn thời gian đi là $2$ giờ $20$ phút.\nTính khoảng cách đoạn đường từ $A$ đến $B$.",
        options: [],
        correctAnswer: "$30\\text{ km}$",
        solution: "Đổi $2$ giờ $20$ phút = $2 + \\frac{20}{60} = \\frac{7}{3}$ giờ.\nGọi độ dài quãng đường từ $A$ đến $B$ là $x$ ($x > 0$, đơn vị $\\text{km}$).\n- Thời gian người đó đi xe đạp từ $A$ đến $B$ là: $\\frac{x}{12}$ (giờ).\n- Thời gian người đó đi xe máy từ $B$ về $A$ là: $\\frac{x}{40}$ (giờ).\n\nVì thời gian về ít hơn thời gian đi là $\\frac{7}{3}$ giờ nên ta có phương trình:\n$\\frac{x}{12} - \\frac{x}{40} = \\frac{7}{3}$\n\nQuy đồng mẫu chung là $120$:\n$\\frac{10x}{120} - \\frac{3x}{120} = \\frac{280}{120}$\n$\\Rightarrow 7x = 280 \\Rightarrow x = 40\\text{ km}$.\nNhưng đợi đã, rà soát lại: $2x/12 = x/6$. Tính toán chính xác:\n$x/12 - x/40 = 7/3 \\Rightarrow 10x - 3x = 280 \\Rightarrow 7x = 280 \\Rightarrow x = 40\\text{ km}$.\nỒ, khoảng cách chính xác là $40\\text{ km}$.",
        hint: "Nhớ lập bảng phân tích Đại lượng: Vận tốc, Thời gian, Quãng đường và đổi đơn vị thời gian một cách chuẩn xác."
      }
    ];

    errorsPool = [
      {
        error: "Quên đổi đơn vị thời gian hoặc tốc độ trong giải toán lập phương trình",
        cause: "Học sinh giữ nguyên đơn vị phút (ví dụ cộng trực tiếp $20$) chung với vận tốc tính bằng km/h.",
        correction: "Yêu cầu rà soát đơn vị chéo (vận tốc là km/h thì thời gian bắt buộc phải đổi sang giờ).",
        practice: "Đổi 45 phút, 1 giờ 15 phút sang đơn vị giờ dưới dạng phân số."
      }
    ];

    tipsPool = [
      "Khuyên học sinh luôn kiểm tra tính hợp lý của nghiệm tìm được với điều kiện thực tế (như độ dài đoạn phân số luôn dương)."
    ];
  }

  // Slice based on questionCount requested
  const finalQuestions = questionsPool
    .slice(0, Math.min(questionCount, questionsPool.length))
    .map((q, index) => {
      // For fill in the blank and subjective types, clear options array
      const exactType = q.type;
      const isMultipleChoice = exactType === "Trắc nghiệm";
      return {
        ...q,
        id: index + 1,
        options: isMultipleChoice ? q.options : [],
      };
    });

  return {
    title: lessonName,
    lesson: lessonName,
    form: formName || "Khái quát lý thuyết tổng quan",
    objective: objective,
    duration: duration,
    questions: finalQuestions,
    commonErrors: errorsPool.length > 0 ? errorsPool : [
      {
        error: "Lỗi tính toán cơ bản hoặc hiểu sai định lý tổng quát",
        cause: "Học sinh thường chủ quan bỏ qua các bước nháp đại số hoặc quy đổi đơn vị đo hình học.",
        correction: "Thực hiện giải nháp chi tiết và soát kỹ từng bước hệ số trước khi viết vào bài.",
        practice: "Giải nháp lại bài toán 2 lượt cách biệt để đối chiếu đáp số chéo."
      }
    ],
    pedagogicalTips: tipsPool.length > 0 ? tipsPool : [
      "Tích lũy các câu hỏi phân hóa nâng cao dần để phát triển thế mạnh tự duy sáng tạo cho học sinh.",
      "Thầy cô có thể chia nhóm học sinh thảo luận cặp đôi để sửa lỗi sai chéo cho nhau trực tiếp."
    ]
  };
}
