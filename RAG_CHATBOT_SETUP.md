# 🤖 Production-Grade RAG Chatbot - Complete Setup Guide

## Advanced RAG Architecture (Not Basic!)

This n8n workflow implements a **state-of-the-art RAG chatbot** with:
- ✅ **Hybrid Search** (Semantic + Keyword matching)
- ✅ **Multi-Step Retrieval** with reranking
- ✅ **Conversation Memory** (multi-turn context)
- ✅ **Self-Correction** mechanisms
- ✅ **Source Attribution** (shows where answers come from)
- ✅ **Adaptive Chunking** strategies
- ✅ **Query Expansion** for better retrieval
- ✅ **Answer

 Confidence Scoring**

---

## 🏗️ System Architecture

```
User Query
    ↓
1. Query Analysis & Expansion (AI)
    ↓
2. Hybrid Retrieval (Vector + BM25)
    ↓
3. Reranking (Cross-Encoder)
    ↓
4. Context Assembly
    ↓
5. LLM Generation with Sources
    ↓
6. Self-Validation
    ↓
7. Response + Sources + Confidence
```

---

## 📋 What You Need to Prepare

### 1. **Vector Database** (Choose ONE)

#### Option A: Qdrant (Recommended - Open Source, Free)
```bash
# Install Qdrant locally with Docker
docker pull qdrant/qdrant
docker run -p 6333:6333 qdrant/qdrant
```
- **Qdrant URL:** `http://localhost:6333`
- **Collection Name:** Create a collection (we'll do this in workflow)
- **API Key:** Not needed for local

#### Option B: Pinecone (Cloud-based, Easy Setup)
- **Sign up:** https://www.pinecone.io
- **Create Index:**
  - Dimension: `1536` (for OpenAI embeddings) or `768` (for open-source)
  - Metric: `cosine`
  - Environment: `us-east-1-aws` (or your preferred region)
- **Get API Key:** From Pinecone dashboard

---

### 2. **LLM API Keys**

#### Required:
- **OpenAI API Key** (for embeddings + GPT-4)
  - Get from: https://platform.openai.com/api-keys
  - Models used:
    - `text-embedding-3-small` (embeddings)
    - `gpt-4-turbo` or `gpt-4o` (generation)
  - Estimated cost: $0.01-0.05 per conversation

#### Alternative (Open Source):
- **Ollama** (Free, runs locally)
  ```bash
  # Install Ollama
  curl https://ollama.ai/install.sh | sh
  
  # Pull models
  ollama pull llama3.1
  ollama pull nomic-embed-text  # For embeddings
  ```

---

### 3. **Knowledge Base Documents**

Prepare your knowledge base in any format:
- **PDFs** (manuals, reports, research papers)
- **Word Documents** (.docx)
- **Text Files** (.txt, .md)
- **Web Pages** (URLs to scrape)
- **Google Docs** (shareable links)
- **Notion Pages** (export as markdown)

**Recommendations:**
- Start with 10-50 documents (1-500 pages total)
- Ensure content is well-structured
- Remove duplicates
- Include metadata (titles, dates, authors)

---

### 4. **Optional Enhancements**

#### A. **Reranking Model** (Improves accuracy by 20-30%)
- **Cohere Rerank API** (Free tier: 1000 requests/month)
  - Sign up: https://cohere.com
  - Get API key
  
#### B. **BM25 for Keyword Search**
- Integrated in workflow (no separate setup)

#### C. **Conversation Memory**
- **Redis** (for multi-user chat history)
  ```bash
  docker run -p 6379:6379 redis
  ```

---

## 🚀 Step-by-Step Configuration

### Step 1: Install Required n8n Nodes

Your n8n instance needs these nodes (most are built-in):
- ✅ Webhook Trigger
- ✅ OpenAI (for embeddings & LLM)
- ✅ Qdrant Vector Store (or Pinecone)
- ✅ Code Node (JavaScript)
- ✅ HTTP Request
- ✅ IF Conditional
- ✅ Set Node

Check by searching in n8n node palette. If missing, install from n8n community nodes.

---

### Step 2: Set Up Vector Database

#### For Qdrant:

1. **Start Qdrant:**
   ```bash
   docker run -p 6333:6333 qdrant/qdrant
   ```

2. **Create Collection** (via API or Qdrant UI):
   ```bash
   curl -X PUT 'http://localhost:6333/collections/knowledge_base' \
   -H 'Content-Type: application/json' \
   -d '{
     "vectors": {
       "size": 1536,
       "distance": "Cosine"
     }
   }'
   ```

3. **Note your settings:**
   - URL: `http://localhost:6333`
   - Collection: `knowledge_base`

#### For Pinecone:

1. Sign up at https://www.pinecone.io
2. Create index with:
   - **Dimension:** 1536
   - **Metric:** cosine
3. Copy API key and index name

---

### Step 3: Configure API Keys in n8n

1. Go to **Settings** → **Credentials** in n8n
2. Add credentials for:
   
   **OpenAI:**
   - Name: `OpenAI Main`
   - API Key: `sk-...` (your OpenAI key)
   
   **Qdrant (if using):**
   - Name: `Qdrant Local`
   - URL: `http://localhost:6333`
   - API Key: (leave empty for local)
   
   **Pinecone (if using):**
   - Name: `Pinecone Main`
   - API Key: (from Pinecone dashboard)
   - Environment: (e.g., `us-east-1-aws`)
   
   **Cohere (optional, for reranking):**
   - Name: `Cohere Rerank`
   - API Key: (from Cohere dashboard)

---

### Step 4: Prepare Your Knowledge Base

#### Document Chunking Strategy:

**Best Practice (2026):**
We'll use **Semantic Chunking** with these rules:
- **Chunk Size:** 512-1024 tokens
- **Overlap:** 128 tokens (15-20%)
- **Method:** Sentence-based with paragraph preservation
- **Metadata:** Include source, page number, title, date

**Tools to Pre-Process Documents:**

1. **For PDFs:**
   - Use n8n's "Read PDF" node or upload via workflow

2. **For Web Scraping:**
   - Use n8n's HTTP Request + Cheerio to extract text

3. **For Google Docs:**
   - Use Google Docs API node to fetch content

**The workflow handles chunking automatically!**

---

### Step 5: Ingest Documents into Vector Database

You have 2 options:

#### Option A: Use Dedicated Ingestion Workflow (Recommended)
We'll create a separate "Document Ingestion" workflow that:
1. Reads documents
2. Chunks them smartly
3. Generates embeddings
4. Stores in vector DB with metadata

#### Option B: Manual Upload via Script
```python
# Example Python script (if you prefer)
from qdrant_client import QdrantClient
from openai import OpenAI

client = QdrantClient(url="http://localhost:6333")
openai_client = OpenAI(api_key="YOUR_KEY")

# Read your document
with open("knowledge.txt") as f:
    text = f.read()

# Chunk (simplified - use better chunking in production)
chunks = [text[i:i+1000] for i in range(0, len(text), 800)]

# Generate embeddings and upload
for i, chunk in enumerate(chunks):
    embedding = openai_client.embeddings.create(
        model="text-embedding-3-small",
        input=chunk
    ).data[0].embedding
    
    client.upsert(
        collection_name="knowledge_base",
        points=[{
            "id": i,
            "vector": embedding,
            "payload": {"text": chunk, "source": "knowledge.txt"}
        }]
    )
```

---

### Step 6: Test Your Setup

Before activating the chatbot, verify:

1. ✅ **Vector DB is running:**
   - For Qdrant: Open `http://localhost:6333/dashboard`
   - For Pinecone: Check dashboard for index stats

2. ✅ **Documents are ingested:**
   - Check vector count in database
   - Should match number of chunks

3. ✅ **n8n credentials work:**
   - Test OpenAI connection in n8n
   - Test Vector DB connection

---

## 🎯 Using the RAG Chatbot

### Chat Interface Options:

1. **Direct Webhook** (for testing):
   ```bash
   curl -X POST http://localhost:5678/webhook/rag-chat \
   -H "Content-Type: application/json" \
   -d '{"question": "What is RAG?", "session_id": "user-123"}'
   ```

2. **Embed in Website:**
   ```html
   <script>
   async function askRAG(question) {
     const response = await fetch('http://localhost:5678/webhook/rag-chat', {
       method: 'POST',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({question, session_id: 'web-user-001'})
     });
     const data = await response.json();
     console.log('Answer:', data.answer);
     console.log('Sources:', data.sources);
     console.log('Confidence:', data.confidence);
   }
   </script>
   ```

3. **Slack Integration:**
   - Use n8n's Slack Trigger
   - Route messages to RAG workflow
   - Post responses back to Slack

4. **WhatsApp/Telegram:**
   - Use respective n8n trigger nodes
   - Same RAG logic applies

---

## 📊 Response Format

The chatbot returns:

```json
{
  "answer": "RAG (Retrieval-Augmented Generation) is...",
  "confidence": 0.92,
  "sources": [
    {
      "text": "Relevant chunk #1...",
      "source": "manual.pdf",
      "page": 12,
      "score": 0.87
    },
    {
      "text": "Relevant chunk #2...",
      "source": "guide.pdf",
      "page": 5,
      "score": 0.82
    }
  ],
  "retrieval_count": 5,
  "query_expansion": "What is Retrieval-Augmented Generation and how does it work?",
  "processing_time_ms": 1247
}
```

---

## 🔧 Workflow Configuration

### Workflow Settings:

1. **Webhook Path:** `/webhook/rag-chat`
2. **Response Mode:** "Response to Webhook" (returns JSON)
3. **Execution:** Runs on-demand (webhook triggered)

### Key Nodes to Configure:

#### 1. **Query Expansion Node** (AI Agent)
- **Model:** `gpt-4-turbo`
- **Prompt:** "Expand this user query into a more detailed search query. Be specific and preserve intent."
- **Temperature:** 0.3

#### 2. **Embedding Node**
- **Model:** `text-embedding-3-small`
- **Input:** User query (expanded)

#### 3. **Vector Search Node** (Qdrant/Pinecone)
- **Collection:** `knowledge_base`
- **Top K:** 10 (retrieve top 10 chunks)
- **Score Threshold:** 0.7

#### 4. **BM25 Keyword Search Node** (optional but recommended)
- Searches using tokenized keywords
- Finds exact matches vector search might miss

#### 5. **Hybrid Fusion Node** (Code)
- Combines vector search + BM25 results
- Uses Reciprocal Rank Fusion (RRF)
- Deduplicates

#### 6. **Reranking Node** (Cohere or Cross-Encoder)
- Takes top 10, reranks to top 3-5
- Uses Cohere Rerank API or local cross-encoder
- **Model:** `rerank-english-v2.0` (Cohere)

#### 7. **Context Assembly** (Code)
- Combines top 3-5 chunks
- Formats with source info
- Checks token limits (8K max for GPT-4)

#### 8. **LLM Generation Node**
- **Model:** `gpt-4-turbo`
- **System Prompt:**
  ```
  You are a helpful assistant. Answer questions based ONLY on the provided context.
  If the context doesn't contain the answer, say "I don't have enough information."
  Always cite your sources by referencing [Source 1], [Source 2], etc.
  ```
- **Temperature:** 0.2 (factual answers)

#### 9. **Self-Validation Node** (optional)
- AI checks if answer is supported by context
- Flags low-confidence responses
- Triggers fallback if needed

---

## 🎨 Advanced Features

### 1. **Conversation Memory**

Store chat history per session:
```javascript
// In Code Node - Store conversation
const sessionId = $json.session_id;
const conversation = $('Memory').all();

// Retrieve last 5 turns
const history = conversation.slice(-5);

// Format for LLM
const context = history.map(turn => 
  `User: ${turn.question}\nAssistant: ${turn.answer}`
).join('\n\n');
```

### 2. **Query Classification**

Before retrieval, classify query type:
- Factual (use strict RAG)
- Conversational (use memory + RAG)
- Creative (use LLM mostly, light RAG)

### 3. **Multi-Hop Reasoning**

For complex questions:
1. Break question into sub-questions
2. Retrieve for each
3. Synthesize final answer

### 4. **Source Highlighting**

Return specific text spans that support answer:
```json
{
  "answer": "The capital of France is Paris.",
  "evidence": [
    {
      "text": "Paris, the capital and largest city of France...",
      "start_char": 0,
      "end_char": 50,
      "source": "geography.pdf"
    }
  ]
}
```

---

## 📈 Performance Optimization

### For Production Use:

1. **Caching:**
   - Cache frequently asked questions
   - Cache embeddings for common queries
   - Use Redis for fast access

2. **Batch Processing:**
   - Embed multiple queries at once
   - Batch vector searches

3. **Async Operations:**
   - Run vector search + BM25 in parallel
   - Concurrent reranking

4. **Monitoring:**
   - Log all queries and responses
   - Track average confidence scores
   - Monitor retrieval accuracy

---

## 🐛 Troubleshooting

### Issue: Low Confidence Scores

**Solutions:**
- Check if documents are properly ingested
- Verify embedding model consistency
- Adjust similarity threshold (lower to 0.6)
- Add more documents to knowledge base

### Issue: Slow Response Times

**Solutions:**
- Reduce Top K from 10 to 5
- Skip reranking for simple queries
- Use smaller embedding model
- Cache common queries

### Issue: Wrong Answers

**Solutions:**
- Enable query expansion
- Use reranking
- Lower LLM temperature (0.1-0.2)
- Add self-validation step
- Check chunk quality (are they meaningful?)

### Issue: "I don't have enough information" too often

**Solutions:**
- Lower similarity threshold
- Increase Top K to 15-20
- Check if documents actually contain the info
- Use query expansion to broaden search

---

## 🔐 Security Best Practices

1. **Rate Limiting:**
   - Limit queries per user/IP
   - Prevent abuse

2. **Input Sanitization:**
   - Clean user input
   - Prevent prompt injection

3. **Access Control:**
   - Protect webhook with API key
   - Use authentication for sensitive knowledge bases

4. **Data Privacy:**
   - Don't log sensitive user queries
   - Use local models for private data

---

## 💰 Cost Estimation

**For 1,000 conversations/month:**

| Component | Provider | Cost |
|-----------|----------|------|
| Embeddings (query) | OpenAI | $0.10 |
| Embeddings (docs) | OpenAI | $0.50 (one-time) |
| LLM Generation | GPT-4-Turbo | $15-30 |
| Reranking | Cohere | Free (up to 1k) |
| Vector DB | Qdrant (local) | Free |
| **Total/month** | | **~$15-30** |

**To reduce costs:**
- Use Ollama (free, local LLM)
- Use open-source embeddings (nomic-embed-text)
- Skip reranking for simple queries

---

## ✅ Configuration Checklist

Before activating:

- [ ] Vector database running
- [ ] Documents ingested and embedded
- [ ] OpenAI API key configured
- [ ] Qdrant/Pinecone credentials set
- [ ] Webhook path configured
- [ ] Test query returns results
- [ ] Confidence scores look reasonable (>0.7)
- [ ] Sources are attributed correctly
- [ ] Response time < 3 seconds

---

## 📚 Next Steps After Setup

1. **Test with real questions** from your domain
2. **Tune similarity threshold** based on results
3. **Add more documents** to improve coverage
4. **Set up monitoring** dashboard
5. **Integrate with your app** (website, Slack, etc.)
6. **Collect feedback** to improve responses

---

## 🚀 Ready to Build!

**Now proceed to the n8n workflow configuration. The workflow has been created with ID: 3psHYRaa0kWCKSFL**

**Access it at:** `http://localhost:5678/workflow/3psHYRaa0kWCKSFL`

Happy chatting! 🤖✨
