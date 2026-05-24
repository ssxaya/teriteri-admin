
## 1. Architecture Design
```mermaid
graph TD
  A[前端 React] --&gt; B[组件层]
  B --&gt; C[WordCard 组件]
  B --&gt; D[App 主组件]
  E[数据层] --&gt; D
  E --&gt; F[预设单词数据]
  G[样式层] --&gt; B
```

## 2. Technology Description
- Frontend: React@18 + tailwindcss@3 + vite
- Initialization Tool: vite-init
- Backend: None（纯前端应用）
- Database: 无数据库，使用本地状态管理

## 3. Route Definitions
| Route | Purpose |
|-------|---------|
| / | 词卡主页 |

## 4. Data Model
### 4.1 Data Types
```typescript
interface Word {
  word: string;
  phonetic: string;
  meaning: string[];
}
```

### 4.2 Initial Dataset
预设3个示例单词：
```javascript
const initialWords: Word[] = [
  {
    word: "serendipity",
    phonetic: "/ˌserənˈdɪpɪti/",
    meaning: ["意外发现珍奇事物的本领", "机缘凑巧"]
  },
  {
    word: "ephemeral",
    phonetic: "/ɪˈfemərəl/",
    meaning: ["短暂的", "瞬息的"]
  },
  {
    word: "luminescent",
    phonetic: "/ˌluːmɪˈnesnt/",
    meaning: ["发冷光的", "夜发光的"]
  }
];
```

