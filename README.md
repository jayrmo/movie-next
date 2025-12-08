# MovieMatch - Web II

## Equipe
- Jayr Martins de Oliveira
- Tiago Ramalho Palmeira

## Descrição
MovieMatch é uma aplicação web full-stack para catálogo de filmes que permite aos usuários descobrir, organizar e gerenciar suas coleções de filmes favoritos. O sistema oferece autenticação segura, CRUD completo de filmes, sistema de destaques com carrossel interativo, busca avançada por múltiplos critérios, categorização dinâmica de gêneros e integração com trailers do YouTube.

## Tecnologias
- **Frontend**: Next.js 16 (App Router) + TypeScript + React 19
- **Estilização**: HeroUI (NextUI) + Tailwind CSS 4 + Framer Motion
- **Backend**: Next.js API Routes (Full-Stack)
- **Banco de Dados**: MongoDB Atlas + Mongoose
- **Autenticação**: bcryptjs + Cookie-based sessions
- **Ícones**: Lucide React

## Funcionalidades
- [x] **Sistema de Autenticação Completo**
  - Cadastro de usuários com validação
  - Login com bcrypt para hash de senhas
  - Sessões via cookies httpOnly
  - Middleware de proteção de rotas
  - Logout seguro
  
- [x] **CRUD Completo de Filmes**
  - Criar filmes com formulário validado
  - Listar todos os filmes com paginação
  - Editar filmes existentes
  - Deletar filmes (individual ou em lote)
  - Sistema de destaque (featured flag)
  
- [x] **Busca e Filtros Avançados**
  - Busca por título, gênero, diretor e sinopse
  - Filtro por categorias dinâmicas
  - Contador de resultados em tempo real
  - Categorias geradas automaticamente dos filmes cadastrados
  
- [x] **Interface Rica e Responsiva**
  - Carrossel de filmes em destaque com navegação
  - Cards de filmes com trailers do YouTube incorporados
  - Modal de detalhes com player de vídeo
  - Navbar com menu hambúrguer para mobile
  - Grid responsivo (1→2→3→4 colunas)
  - Dark theme com paleta cinema
  
- [x] **Integração com YouTube**
  - Parser inteligente de URLs do YouTube
  - Players embarcados nos cards
  - Suporte a múltiplos formatos de URL
  
- [x] **Sistema de Paginação**
  - 5 itens por página na listagem de edição
  - 8 itens por página na home
  - Controles de navegação estilizados

## Configuração

### Pré-requisitos
- Node.js 18+ instalado
- Conta no MongoDB Atlas (ou MongoDB local)

### Instruções para rodar localmente:

1. **Clone o repositório**
```bash
git clone https://github.com/jayrmo/movie-next.git
cd movie-next/movie
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o arquivo `.env.local` com a STRING DE CONEXÃO DO MONGO**

Crie um arquivo `.env.local` na raiz do projeto com:

```env
# String de conexão do MongoDB Atlas
MONGODB_URI=sua própria string de conexão do MongoDB Atlas.

# URL da aplicação (opcional)
NEXTAUTH_URL=http://localhost:3000
```

Para obter sua string de conexão:
- Acesse [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Crie um cluster gratuito
- Vá em "Connect" → "Connect your application"
- Copie a string de conexão e substitua `<password>` pela senha do seu usuário

4. **Execute o servidor de desenvolvimento**
```bash
npm run dev
```

5. **Acesse a aplicação**

Abra [http://localhost:3000](http://localhost:3000) no navegador

### Primeiro Acesso
1. Clique em "Criar Conta"
2. Cadastre-se com nome, email e senha
3. Faça login
4. Comece a adicionar filmes!

## Estrutura do Projeto

```
movie/
├── src/
│   ├── app/                    # Pages e Layouts (App Router)
│   │   ├── api/               # API Routes (Backend)
│   │   │   ├── auth/          # Endpoints de autenticação
│   │   │   └── movies/        # CRUD de filmes
│   │   ├── home/              # Página inicial com carrossel
│   │   ├── login/             # Página de login
│   │   ├── register/          # Página de cadastro
│   │   └── movies/            # Páginas de filmes
│   │       ├── create/        # Adicionar filme
│   │       ├── edit/          # Editar/deletar filmes
│   │       └── category/      # Filtro por categoria
│   ├── components/            # Componentes React
│   │   ├── Button.tsx
│   │   ├── MovieCard.tsx      # Card com trailer
│   │   ├── MovieModal.tsx     # Modal de detalhes
│   │   ├── MovieFormModal.tsx # Formulário de filme
│   │   └── Navbar.tsx         # Navegação responsiva
│   ├── lib/                   # Utilitários
│   │   ├── db.ts             # Conexão MongoDB
│   │   └── youtube.ts         # Parser de URLs
│   ├── models/                # Schemas Mongoose
│   │   ├── Movie.ts
│   │   └── User.ts
│   └── middleware.ts          # Proteção de rotas
├── .env.local                 # Variáveis de ambiente
└── package.json
```

## API Endpoints

### Autenticação
- `POST /api/auth/register` - Criar conta
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

### Filmes
- `GET /api/movies` - Listar todos os filmes
- `POST /api/movies` - Criar novo filme
- `GET /api/movies/[id]` - Buscar filme por ID
- `PUT /api/movies/[id]` - Atualizar filme
- `DELETE /api/movies/[id]` - Deletar filme

## Deploy
[Acesse o projeto aqui] https://movie-next-one.vercel.app/login

### Como fazer deploy na Vercel:

1. Faça push do código para o GitHub
2. Acesse [Vercel](https://vercel.com)
3. Importe o repositório
4. Configure a variável de ambiente `MONGODB_URI`
5. Deploy automático!

---

**Desenvolvido para a disciplina Web II**
