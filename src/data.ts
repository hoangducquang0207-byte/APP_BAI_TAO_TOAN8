import { Chapter, Worksheet } from "./types";

// === DATABASE CHƯƠNG TRÌNH TOÁN 8 KẾT NỐI TRI THỨC VỚI CUỘC SỐNG ===
export const TOAN_8_KNTT_DB: Chapter[] = [
  {
    id: "ch1",
    chapter: "Chương 1: Đa thức",
    lessons: [
      { id: "b1", name: "Đơn thức và đa thức nhiều biến", forms: ["Nhận biết đơn thức, đa thức", "Thu gọn đa thức", "Tính giá trị của đa thức tại $x = x_0, y = y_0$"] },
      { id: "b2", name: "Cộng, trừ đa thức", forms: ["Cộng hai đa thức $A + B$", "Trừ hai đa thức $A - B$", "Rút gọn biểu thức chứa đa thức"] },
      { id: "b3", name: "Nhân đa thức", forms: ["Nhân đơn thức với đa thức", "Nhân đa thức với đa thức $(A+B)(C+D)$", "Chứng minh giá trị biểu thức không phụ thuộc vào biến"] },
      { id: "b4", name: "Chia đa thức cho đơn thức", forms: ["Chia đơn thức cho đơn thức", "Chia đa thức cho đơn thức", "Rút gọn rồi tính giá trị biểu thức"] }
    ]
  },
  {
    id: "ch2",
    chapter: "Chương 2: Hằng đẳng thức đáng nhớ và ứng dụng",
    lessons: [
      { id: "b5", name: "Hiệu hai bình phương. Bình phương của một tổng hoặc một hiệu", forms: ["Khai triển hằng đẳng thức $(A \\pm B)^2$, $A^2 - B^2$", "Rút gọn và tính giá trị biểu thức", "Tìm $x$ dựa vào hằng đẳng thức"] },
      { id: "b6", name: "Lập phương của một tổng hoặc một hiệu", forms: ["Khai triển hằng đẳng thức bậc ba $(A \\pm B)^3$", "Rút gọn biểu thức phức tạp", "Tính nhanh giá trị biểu thức"] },
      { id: "b7", name: "Tổng và hiệu hai lập phương", forms: ["Khai triển tổng, hiệu hai lập phương $A^3 \\pm B^3$", "Phân tích nhân tử cơ bản", "Chứng minh đẳng thức chia hết"] },
      { id: "b8", name: "Phân tích đa thức thành nhân tử", forms: ["Phương pháp đặt nhân tử chung", "Dùng hằng đẳng thức đáng nhớ", "Phương pháp nhóm hạng tử", "Phối hợp nhiều phương pháp"] }
    ]
  },
  {
    id: "ch3",
    chapter: "Chương 3: Tứ giác",
    lessons: [
      { id: "b9", name: "Tứ giác. Hình thang cân", forms: ["Tính số đo góc trong tứ giác", "Chứng minh một hình là thang cân", "Tính độ dài đoạn thẳng trong hình thang"] },
      { id: "b10", name: "Hình bình hành", forms: ["Chứng minh một tứ giác là hình bình hành", "Sử dụng tính chất hình bình hành để chứng minh đẳng thức", "Tìm điều kiện để tứ giác là hình bình hành"] },
      { id: "b11", name: "Hình chữ nhật, hình thoi, hình vuông", forms: ["Chứng minh tứ giác là hình chữ nhật", "Chứng minh tứ giác là hình thoi", "Chứng minh tứ giác là hình vuông", "Bài toán ứng dụng thực tế"] }
    ]
  },
  {
    id: "ch4",
    chapter: "Chương 4: Định lý Thalès",
    lessons: [
      { id: "b12", name: "Định lý Thalès trong tam giác", forms: ["Tính độ dài đoạn thẳng bằng định lý Thalès", "Chứng minh hai đường thẳng song song", "Ứng dụng định lý Thalès đảo"] },
      { id: "b13", name: "Đường trung bình của tam giác", forms: ["Chứng minh quan hệ song song và trung điểm", "Tính độ dài đoạn thẳng bằng tính chất đường trung bình", "Bài toán thực tế ứng dụng đường trung bình"] },
      { id: "b14", name: "Tính chất đường phân giác của tam giác", forms: ["Tính tỉ số độ dài các đoạn thẳng", "Tính độ dài các cạnh của tam giác", "Chứng minh hệ thức hình học"] }
    ]
  },
  {
    id: "ch5",
    chapter: "Chương 5: Phân thức đại số",
    lessons: [
      { id: "b15", name: "Khái niệm phân thức đại số", forms: ["Tìm điều kiện xác định của phân thức", "Tính giá trị phân thức đại số", "Chứng minh hai phân thức bằng nhau $\\frac{A}{B} = \\frac{C}{D}$"] },
      { id: "b16", name: "Tính chất cơ bản của phân thức đại số", forms: ["Rút gọn phân thức đại số", "Quy đồng mẫu thức nhiều phân thức", "Tìm giá trị $x$ nguyên để phân thức có giá trị nguyên"] },
      { id: "b17", name: "Phép cộng, phép trừ phân thức đại số", forms: ["Cộng các phân thức cùng mẫu, khác mẫu", "Trừ phân thức đại số", "Rút gọn biểu thức phân thức tổng hợp"] },
      { id: "b18", name: "Phép nhân, phép chia phân thức đại số", forms: ["Nhân hai phân thức đại số", "Chia hai phân thức đại số", "Tìm phân thức nghịch đảo"] }
    ]
  },
  {
    id: "ch6",
    chapter: "Chương 6: Phương trình bậc nhất một ẩn",
    lessons: [
      { id: "b19", name: "Phương trình bậc nhất một ẩn và cách giải", forms: ["Giải phương trình bậc nhất cơ bản $ax + b = 0$", "Giải phương trình đưa về dạng bậc nhất", "Tìm điều kiện tham số để phương trình có nghiệm"] },
      { id: "b20", name: "Giải toán bằng cách lập phương trình", forms: ["Bài toán chuyển động", "Bài toán năng suất, công việc", "Bài toán quan hệ số học", "Bài toán thực tế hình học"] }
    ]
  },
  {
    id: "ch7",
    chapter: "Chương 7: Định lý Pythagore và Tam giác đồng dạng",
    lessons: [
      { id: "b21", name: "Định lý Pythagore", forms: ["Tính độ dài cạnh tam giác vuông bằng định lý Pythagore", "Nhận biết tam giác vuông bằng định lý đảo", "Bài toán thực tế tính khoảng cách"] },
      { id: "b22", name: "Tam giác đồng dạng", forms: ["Chứng minh hai tam giác đồng dạng $\\triangle ABC \\sim \\triangle A'B'C'$", "Sử dụng tỉ số đồng dạng tính cạnh", "Tính diện tích tam giác đồng dạng"] }
    ]
  },
  {
    id: "ch8",
    chapter: "Chương 8: Hình chóp tam giác đều và hình chóp tứ giác đều",
    lessons: [
      { id: "b23", name: "Hình chóp tam giác đều", forms: ["Mô tả đặc điểm hình chóp tam giác đều", "Tính diện tích xung quanh $S_{xq}$", "Tính thể tích hình chóp tam giác đều $V$"] },
      { id: "b24", name: "Hình chóp tứ giác đều", forms: ["Mô tả đặc điểm hình chóp tứ giác đều", "Tính diện tích xung quanh $S_{xq}$ và thể tích $V$", "Bài toán thực tế lều trại, kim tự tháp"] }
    ]
  }
];

// === DỮ LIỆU MẪU BAN ĐẦU CHUẨN ĐẸP 10 CÂU THEO TỈ LỆ 40% - 30% - 20% - 10% ===
export const INITIAL_WORKSHEET_SAMPLE: Worksheet = {
  title: "Hằng đẳng thức đáng nhớ",
  lesson: "Hiệu hai bình phương. Bình phương của một tổng hoặc một hiệu",
  form: "Khai triển và rút gọn biểu thức",
  objective: "Nhận biết và vận dụng thành thạo hằng đẳng thức bình phương của một tổng, một hiệu và hiệu hai bình phương để khai triển, thu gọn biểu thức, rèn luyện tư duy biến đổi đại số.",
  duration: "45 phút",
  questions: [
    {
      id: 1,
      level: "Nhận biết",
      type: "Trắc nghiệm",
      content: "Khai triển hằng đẳng thức $(x + 2)^2$ ta được kết quả là:",
      options: [
        "A. $x^2 + 4$",
        "B. $x^2 + 2x + 4$",
        "C. $x^2 + 4x + 4$",
        "D. $x^2 - 4x + 4$"
      ],
      correctAnswer: "C",
      solution: "Áp dụng hằng đẳng thức bình phương của một tổng: $(A + B)^2 = A^2 + 2AB + B^2$.\nVới $A = x$, $B = 2$, ta có:\n$(x + 2)^2 = x^2 + 2 \\cdot x \\cdot 2 + 2^2 = x^2 + 4x + 4$.\nDo đó, đáp án đúng là C.",
      hint: "Hãy đối chiếu công thức tổng quát $(A+B)^2$ với $A=x$ và $B=2$."
    },
    {
      id: 2,
      level: "Nhận biết",
      type: "Trắc nghiệm",
      content: "Viết biểu thức $x^2 - 9$ dưới dạng tích ta được:",
      options: [
        "A. $(x-3)(x-3)$",
        "B. $(x-3)(x+3)$",
        "C. $(x+3)(x+3)$",
        "D. $x(x-9)$"
      ],
      correctAnswer: "B",
      solution: "Áp dụng hằng đẳng thức hiệu hai bình phương: $A^2 - B^2 = (A - B)(A + B)$.\nTa có: $x^2 - 9 = x^2 - 3^2 = (x - 3)(x + 3)$.\nDo đó, đáp án đúng là B.",
      hint: "Nhận diện số $9$ chính bằng $3^2$ để áp dụng hiệu hai bình phương."
    },
    {
      id: 3,
      level: "Nhận biết",
      type: "Trắc nghiệm",
      content: "Khai triển hằng đẳng thức $(y - 5)^2$ ta được kết quả là:",
      options: [
        "A. $y^2 - 25$",
        "B. $y^2 - 10y + 25$",
        "C. $y^2 + 10y + 25$",
        "D. $y^2 - 5y + 25$"
      ],
      correctAnswer: "B",
      solution: "Áp dụng hằng đẳng thức bình phương của một hiệu: $(A - B)^2 = A^2 - 2AB + B^2$.\nVới $A = y$, $B = 5$, ta có:\n$(y - 5)^2 = y^2 - 2 \\cdot y \\cdot 5 + 5^2 = y^2 - 10y + 25$.\nDo đó, đáp án đúng là B.",
      hint: "Đối chiếu công thức $(A-B)^2$ với hạng tử thứ hai có chứa dấu trừ $-2AB$."
    },
    {
      id: 4,
      level: "Nhận biết",
      type: "Trắc nghiệm",
      content: "Đẳng thức nào sau đây là hằng đẳng thức \"Tổng hai lập phương\"?",
      options: [
        "A. $A^3 + B^3 = (A+B)(A^2 + AB + B^2)$",
        "B. $A^3 + B^3 = (A+B)^3$",
        "C. $A^3 + B^3 = (A-B)(A^2 + AB + B^2)$",
        "D. $A^3 + B^3 = (A+B)(A^2 - AB + B^2)$"
      ],
      correctAnswer: "D",
      solution: "Theo định nghĩa công thức tổng hai lập phương, ta có:\n$A^3 + B^3 = (A+B)(A^2 - AB + B^2)$ (tích của tổng với bình phương thiếu của hiệu).\nDo đó, đáp án đúng là D.",
      hint: "Lưu ý phần ngoặc thứ hai phải là bình phương thiếu mang dấu trừ ($-AB$)."
    },
    {
      id: 5,
      level: "Thông hiểu",
      type: "Trắc nghiệm",
      content: "Rút gọn biểu thức $M = (x - 3)(x + 3) - (x - 1)^2$ ta thu được biểu thức:",
      options: [
        "A. $2x - 10$",
        "B. $-2x - 8$",
        "C. $2x - 8$",
        "D. $-2x - 10$"
      ],
      correctAnswer: "A",
      solution: "Áp dụng hằng đẳng thức hiệu hai bình phương và bình phương một hiệu:\n1) $(x - 3)(x + 3) = x^2 - 3^2 = x^2 - 9$\n2) $(x - 1)^2 = x^2 - 2x + 1$\nThay vào biểu thức $M$:\n$M = (x^2 - 9) - (x^2 - 2x + 1)$\n$M = x^2 - 9 - x^2 + 2x - 1$\n$M = 2x - 10$.\nDo đó, đáp án đúng là A.",
      hint: "Chú ý dấu trừ đằng trước biểu thức $(x-1)^2$ khi phá ngoặc."
    },
    {
      id: 6,
      level: "Thông hiểu",
      type: "Điền đáp án",
      content: "Điền đơn thức thích hợp vào dấu $[\\dots]$ để được đẳng thức đúng:\n$4x^2 - 12xy + [\\dots] = (2x - 3y)^2$",
      options: [],
      correctAnswer: "$9y^2$",
      solution: "Ta thấy vế phải là bình phương của một hiệu: $(2x - 3y)^2$.\nKhai triển vế phải:\n$(2x - 3y)^2 = (2x)^2 - 2 \\cdot 2x \\cdot 3y + (3y)^2 = 4x^2 - 12xy + 9y^2$.\nSo sánh với vế trái: $4x^2 - 12xy + [\\dots]$, ta thấy phần còn thiếu là $(3y)^2 = 9y^2$.\nVậy đáp án điền vào là $9y^2$.",
      hint: "Khai triển vế phải để so sánh trực tiếp các hạng tử tương ứng với vế trái."
    },
    {
      id: 7,
      level: "Thông hiểu",
      type: "Trắc nghiệm",
      content: "Xét giá trị biểu thức $A = 101^2 - 99^2$. Giá trị của $A$ là:",
      options: [
        "A. $200$",
        "B. $400$",
        "C. $40000$",
        "D. $20000$"
      ],
      correctAnswer: "B",
      solution: "Sử dụng hằng đẳng thức hiệu hai bình phương để tính nhanh:\n$A = 101^2 - 99^2 = (101 - 99)(101 + 99)$\n$A = 2 \\cdot 200 = 400$.\nDo đó, đáp án đúng là B.",
      hint: "Tránh tính trực tiếp luỹ thừa, hãy nhóm nhân tử chung thông qua hằng đẳng thức."
    },
    {
      id: 8,
      level: "Vận dụng",
      type: "Tự luận",
      content: "Một mảnh vườn ban đầu có hình vuông cạnh bằng $x$ (mét). Người ta mở rộng mảnh vườn bằng cách tăng chiều rộng thêm $5\\text{ m}$ và giảm chiều dài đi $5\\text{ m}$ để được một mảnh vườn hình chữ nhật.\n\na) Viết biểu thức đại số biểu thị diện tích $S$ của mảnh vườn hình chữ nhật sau khi mở rộng.\nb) Biết diện tích ban đầu của mảnh vườn là $144\\text{ m}^2$. Hãy tính diện tích mới của mảnh vườn sau khi thay đổi kích thước.",
      options: [],
      correctAnswer: "a) $S = x^2 - 25$; b) $S_{\\text{mới}} = 119\\text{ m}^2$",
      solution: "a) Chiều rộng mới của mảnh vườn là: $x + 5$ (m).\nChiều dài mới của mảnh vườn là: $x - 5$ (m).\nDiện tích mảnh vườn mới hình chữ nhật là:\n$S = (x + 5)(x - 5)$ (m$^2$).\nÁp dụng hằng đẳng thức hiệu hai bình phương, ta thu gọn được:\n$S = x^2 - 25$ (m$^2$).\n\nb) Diện tích mảnh vườn hình vuông ban đầu là $S_0 = x^2 = 144$ (m$^2$).\nThay giá trị $x^2 = 144$ vào biểu thức diện tích mới, ta được:\n$S = 144 - 25 = 119$ (m$^2$).\nVậy diện tích mới của mảnh vườn là $119\\text{ m}^2$.",
      hint: "Chiều dài mới và chiều rộng mới nhân với nhau sẽ tạo ra cấu trúc hằng đẳng thức hiệu hai bình phương $(a-b)(a+b)$."
    },
    {
      id: 9,
      level: "Vận dụng",
      type: "Tự luận",
      content: "Tìm giá trị của $x$ biết: $(x - 4)^2 - (x - 2)(x + 2) = 4$",
      options: [],
      correctAnswer: "$x = 2$",
      solution: "Khai triển vế trái biểu thức:\n1) $(x - 4)^2 = x^2 - 8x + 16$\n2) $(x - 2)(x + 2) = x^2 - 4$\nThay vào phương trình ta có:\n$(x^2 - 8x + 16) - (x^2 - 4) = 4$\n$x^2 - 8x + 16 - x^2 + 4 = 4$\n$-8x + 20 = 4$\n$-8x = 4 - 20$\n$-8x = -16$\n$x = 2$.\nVậy giá trị cần tìm là $x = 2$.",
      hint: "Thực hiện khai triển thu gọn đa thức để đưa về phương trình bậc nhất một ẩn cơ bản."
    },
    {
      id: 10,
      level: "Vận dụng cao",
      type: "Tự luận",
      content: "Chứng minh rằng biểu thức $A = x^2 - 4x + y^2 - 6y + 15$ luôn nhận giá trị dương với mọi giá trị của biến $x$ và $y$.",
      options: [],
      correctAnswer: "$A > 0$ với mọi $x, y$",
      solution: "Biến đổi biểu thức $A$ bằng cách nhóm các hạng tử thích hợp để xuất hiện các hằng đẳng thức bình phương của một hiệu:\n$A = (x^2 - 4x + 4) + (y^2 - 6y + 9) + 2$\n$A = (x - 2)^2 + (y - 3)^2 + 2$\n\nVì bình phương của một số luôn không âm với mọi số thực:\n$(x - 2)^2 \\ge 0$ với mọi $x$\n$(y - 3)^2 \\ge 0$ với mọi $y$\nDo đó: $(x - 2)^2 + (y - 3)^2 + 2 \\ge 2 > 0$ với mọi $x, y$.\nVậy biểu thức $A$ luôn nhận giá trị dương với mọi giá trị của $x$ và $y$ (đpcm).",
      hint: "Tách số $15$ thành $4 + 9 + 2$ để ghép vào hai hằng đẳng thức riêng biệt chứa biến $x$ và biến $y$."
    }
  ],
  commonErrors: [
    {
      error: "Nhầm lẫn giữa bình phương của một hiệu $(a-b)^2$ và hiệu hai bình phương $a^2-b^2$",
      cause: "Học sinh thường viết nhầm $(a - b)^2 = a^2 - b^2$ hoặc ngược lại do chưa phân biệt được cấu trúc của ngôn từ định nghĩa.",
      correction: "Nhắc học sinh: $(a - b)^2 = a^2 - 2ab + b^2$ là bình phương của một hiệu (luôn có số hạng trung gian $-2ab$), còn $a^2 - b^2 = (a-b)(a+b)$ là hiệu của hai bình phương.",
      practice: "Phân tích biểu thức $(2x - 3)^2$ và so sánh với $4x^2 - 9$ để thấy rõ sự khác biệt."
    },
    {
      error: "Quên nhân hệ số $2$ trong số hạng liên đới ($2ab$)",
      cause: "Khi khai triển $(x + 3)^2$, học sinh viết sai thành $x^2 + 3x + 9$ or $x^2 + 9$ do bỏ sót hệ số $2$ trong tích $2 \\cdot x \\cdot 3$.",
      correction: "Yêu cầu học sinh luôn viết rõ bước trung gian dạng: $x^2 + 2 \\cdot (x) \\cdot (3) + 3^2$ trước khi tiến hành thu gọn.",
      practice: "Khai triển biểu thức $(3x + 4)^2$ có ghi đầy đủ bước trung gian tích lũy."
    },
    {
      error: "Không đổi dấu tất cả các hạng tử khi có dấu trừ phía trước ngoặc",
      cause: "Khi thu gọn biểu thức $x^2 - (x - 2)^2$, học sinh viết thành $x^2 - x^2 - 4x + 4$ (chỉ đổi dấu hạng tử đầu tiên của hằng đẳng thức).",
      correction: "Dạy học sinh phương pháp an toàn: Giữ nguyên dấu ngoặc, thực hiện khai triển bên trong ngoặc trước, sau đó mới tiến hành phá ngoặc và đảo toàn bộ dấu bên trong: $x^2 - (x2 - 4x + 4) = x^2 - x^2 + 4x - 4$.",
      practice: "Rút gọn biểu thức $P = 16 - (x - 4)^2$."
    }
  ],
  pedagogicalTips: [
    "Sử dụng trực quan hóa hình học bằng cách ghép các hình chữ nhật và hình vuông nhỏ để biểu thị diện tích hằng đẳng thức $(a+b)^2 = a^2 + 2ab + b^2$ giúp học sinh hiểu sâu bản chất công thức.",
    "Khuyến khích học sinh khá giỏi tự viết hằng đẳng thức theo chiều nghịch (từ đa thức thu gọn đưa về tích) để bổ trợ kỹ năng phân tích đa thức thành nhân tử.",
    "Khi chấm bài, giáo viên nên khoanh tròn lỗi 'thiếu số 2' bằng mực đỏ và yêu cầu học sinh viết lại công thức tổng quát $(a \\pm b)^2 = a^2 \\pm 2ab + b^2$ ngay lề vở."
  ]
};
