# Task Manager

Aplicação full-stack para gerenciamento de tarefas pessoais. O usuário pode se cadastrar, fazer login, criar e organizar tarefas, marcá-las como concluídas, editar o perfil e gerenciar a conta — tudo em uma interface responsiva construída com React.

> Projeto de portfólio desenvolvido para demonstrar habilidades em desenvolvimento web moderno, com separação clara entre frontend e backend, integração com banco de dados e boas práticas de organização de código.

---

## Demonstração

| Tela               | Descrição                                 |
| ------------------ | ----------------------------------------- |
| Login / Cadastro   | Autenticação com validação de formulários |
| Dashboard          | Criação e listagem de tarefas pendentes   |
| Tarefas concluídas | Histórico de tarefas finalizadas          |
| Perfil             | Foto de perfil e alteração de senha       |
| Conta              | Exclusão de conta e dados associados      |

---

## Funcionalidades

- **Autenticação** — cadastro de usuário, login com JWT e logout
- **CRUD de tarefas** — criar, listar, editar, excluir e marcar como concluída
- **Filtro por usuário** — cada usuário visualiza apenas suas próprias tarefas
- **Perfil** — upload de foto (Base64), troca de senha com hash no servidor
- **Conta** — exclusão em cascata (tarefas do usuário são removidas junto com a conta)
- **Validação de formulários** — regras no cliente com Zod + React Hook Form
- **Feedback visual** — toasts de sucesso/erro e modais nativos (`<dialog>`)

---

## Tecnologias

### Frontend

| Tecnologia                                      | Uso                          |
| ----------------------------------------------- | ---------------------------- |
| [React 19](https://react.dev/)                  | Biblioteca de interface      |
| [Vite 8](https://vite.dev/)                     | Build tool e dev server      |
| [React Router DOM 7](https://reactrouter.com/)  | Roteamento SPA               |
| [Tailwind CSS 4](https://tailwindcss.com/)      | Estilização utilitária       |
| [DaisyUI 5](https://daisyui.com/)               | Componentes e tema           |
| [React Hook Form](https://react-hook-form.com/) | Gerenciamento de formulários |
| [Zod](https://zod.dev/)                         | Validação de schemas         |
| [Lucide React](https://lucide.dev/)             | Ícones                       |

### Backend

| Tecnologia                                         | Uso                       |
| -------------------------------------------------- | ------------------------- |
| [Node.js](https://nodejs.org/)                     | Runtime JavaScript        |
| [Express 5](https://expressjs.com/)                | Framework HTTP / API REST |
| [Mongoose 9](https://mongoosejs.com/)              | ODM para MongoDB          |
| [MongoDB Atlas](https://www.mongodb.com/atlas)     | Banco de dados em nuvem   |
| [bcryptjs](https://www.npmjs.com/package/bcryptjs) | Hash de senhas            |
| [jose](https://github.com/panva/jose)              | Geração de tokens JWT     |
| [CORS](https://www.npmjs.com/package/cors)         | Comunicação cross-origin  |
| [dotenv](https://www.npmjs.com/package/dotenv)     | Variáveis de ambiente     |

### Ferramentas de desenvolvimento

- **ESLint** — linting do código frontend
- **Prettier** — formatação consistente
- **Nodemon** — hot reload do servidor backend

---

## Arquitetura

O projeto segue uma arquitetura **cliente-servidor** com repositório monolítico:

```
┌─────────────────┐         HTTP/JSON          ┌─────────────────┐
│   React (Vite)  │  ◄──────────────────────►  │  Express (API)  │
│   localhost:5173│                            │  localhost:8000 │
└─────────────────┘                            └────────┬────────┘
                                                      │
                                                      ▼
                                             ┌─────────────────┐
                                             │  MongoDB Atlas  │
                                             └─────────────────┘
```

**Frontend:** componentes React organizados por páginas e responsabilidades, com `UserContext` para compartilhar dados do usuário logado entre rotas protegidas.

**Backend:** padrão em camadas — rotas → controllers → models — com tratamento centralizado de erros do MongoDB.

---

## Estrutura de pastas

```
task_manager/
├── backend/                        # API REST (Node.js + Express)
│   ├── index.js                    # Entry point do servidor
│   └── src/
│       ├── controllers/            # Lógica de negócio
│       │   ├── task.controller.js
│       │   └── user.controller.js
│       ├── database/
│       │   └── mongoose.database.js
│       ├── errors/                 # Respostas de erro padronizadas
│       │   ├── general.errors.js
│       │   └── mongodb.errors.js
│       ├── models/                 # Schemas Mongoose
│       │   ├── task.model.js
│       │   └── user.model.js
│       └── routes/                 # Definição de endpoints
│           ├── task.routes.js
│           └── user.routes.js
│
├── src/                            # Frontend (React + Vite)
│   ├── App.jsx                     # Rotas da aplicação
│   ├── main.jsx                    # Entry point React
│   ├── context/
│   │   └── user-context.jsx        # Estado global do usuário
│   ├── pages/                      # Páginas por rota
│   │   ├── login.jsx
│   │   ├── dashboard.jsx
│   │   ├── profile.jsx
│   │   ├── account.jsx
│   │   └── completed-tasks.jsx
│   └── components/
│       ├── header.jsx
│       ├── footer.jsx
│       ├── user-menu.jsx
│       ├── task-card.jsx
│       ├── toast-message.jsx
│       ├── modals/                 # Modais reutilizáveis
│       │   ├── register-button.jsx
│       │   ├── edit-image-modal.jsx
│       │   ├── edit-password-modal.jsx
│       │   └── delete-account-modal.jsx
│       └── taskBook/               # Módulo de tarefas
│           ├── task-book.jsx
│           ├── new-task.jsx
│           └── task-list.jsx
│
├── public/                         # Assets estáticos
├── rules/                          # Regras para o agente de IA
├── package.json                    # Dependências do frontend
└── vite.config.js
```

---

## Entidades do banco de dados

Banco: **`task-manager`** (MongoDB Atlas)

### User

| Campo        | Tipo     | Descrição                                                        |
| ------------ | -------- | ---------------------------------------------------------------- |
| `first_name` | `String` | Nome (obrigatório)                                               |
| `last_name`  | `String` | Sobrenome (obrigatório)                                          |
| `email`      | `String` | E-mail único (obrigatório)                                       |
| `password`   | `String` | Senha com hash bcrypt (obrigatório)                              |
| `image_url`  | `String` | URL ou Base64 da foto de perfil (padrão: `/default_profile.png`) |

A senha é hasheada automaticamente via hook `pre("save")` do Mongoose antes de persistir no banco.

### Task

| Campo         | Tipo       | Descrição                                            |
| ------------- | ---------- | ---------------------------------------------------- |
| `title`       | `String`   | Título da tarefa (obrigatório)                       |
| `description` | `String`   | Descrição da tarefa (obrigatório)                    |
| `isCompleted` | `Boolean`  | Status de conclusão (padrão: `false`)                |
| `user_id`     | `ObjectId` | Referência ao usuário dono da tarefa (`ref: "User"`) |

### Relacionamento

```
User (1) ──────< (N) Task
```

Ao excluir um usuário, todas as tarefas vinculadas ao `user_id` são removidas em cascata.

---

## API REST

Base URL: `http://localhost:8000`

### Usuários — `/user`

| Método   | Rota          | Descrição                        |
| -------- | ------------- | -------------------------------- |
| `GET`    | `/user`       | Lista todos os usuários          |
| `GET`    | `/user/:id`   | Busca usuário por ID             |
| `POST`   | `/user`       | Cria novo usuário                |
| `PATCH`  | `/user/:id`   | Atualiza senha ou foto de perfil |
| `DELETE` | `/user/:id`   | Remove usuário e suas tarefas    |
| `POST`   | `/user/login` | Autentica e retorna JWT          |

**Login — resposta de sucesso:**

```json
{
  "token": "<jwt>",
  "username": "NomeSobrenome",
  "id": "<user_id>"
}
```

### Tarefas — `/tasks`

| Método   | Rota         | Descrição                                            |
| -------- | ------------ | ---------------------------------------------------- |
| `GET`    | `/tasks`     | Lista tarefas (`?user_id=` para filtrar por usuário) |
| `GET`    | `/tasks/:id` | Busca tarefa por ID                                  |
| `POST`   | `/tasks`     | Cria nova tarefa                                     |
| `PATCH`  | `/tasks/:id` | Atualiza título, descrição ou `isCompleted`          |
| `DELETE` | `/tasks/:id` | Remove tarefa                                        |

---

## Rotas do frontend

| Rota                                  | Página                 |
| ------------------------------------- | ---------------------- |
| `/`                                   | Login                  |
| `/:username/dashboard`                | Dashboard (tarefas)    |
| `/:username/dashboard/profile`        | Perfil do usuário      |
| `/:username/dashboard/account`        | Configurações de conta |
| `/:username/dashboard/completedtasks` | Tarefas concluídas     |

---

## Como executar localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v18 ou superior recomendado)
- Conta no [MongoDB Atlas](https://www.mongodb.com/atlas) (ou MongoDB local)

### 1. Clone o repositório

```bash
git clone https://github.com/HenriqueCoruqieri/task_manager.git
cd task_manager
```

### 2. Configure o backend

```bash
cd backend
npm install
```

Crie um arquivo `.env` na pasta `backend/`:

```env
JWT_SECRET=sua_chave_secreta_aqui
DB_USERNAME=seu_usuario_mongodb
DB_PASSWORD=sua_senha_mongodb
# Opcional: URI completa (sobrescreve DB_USERNAME/DB_PASSWORD)
# MONGODB_URI=mongodb+srv://...
```

Inicie o servidor:

```bash
npm run dev
```

O backend estará disponível em `http://localhost:8000`.

### 3. Configure o frontend

Na raiz do projeto:

```bash
npm install
npm run dev
```

O frontend estará disponível em `http://localhost:5173`.

---

## Scripts disponíveis

### Frontend (raiz)

| Comando           | Descrição                            |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Inicia o servidor de desenvolvimento |
| `npm run build`   | Gera build de produção               |
| `npm run preview` | Pré-visualiza o build                |
| `npm run lint`    | Executa o ESLint                     |
| `npm run format`  | Formata o código com Prettier        |

### Backend (`/backend`)

| Comando       | Descrição                     |
| ------------- | ----------------------------- |
| `npm run dev` | Inicia o servidor com Nodemon |

---

## Decisões técnicas

- **Validação em duas camadas** — Zod no frontend para UX imediata; regras de campos permitidos nos controllers do backend para segurança básica em updates.
- **Context API** — `UserContext` evita prop drilling e centraliza o fetch dos dados do usuário logado.
- **Modais nativos** — uso do elemento HTML `<dialog>` com DaisyUI, sem dependência de biblioteca de modal.
- **Foto de perfil em Base64** — imagem convertida no cliente e armazenada como string no MongoDB (limite de 2 MB no upload).
- **JWT com jose** — token gerado no login com expiração de 1 dia; armazenado no `localStorage` do navegador.

---

## Autor

**Henrique Oliveira**

- GitHub: [@HenriqueCoruqieri](https://github.com/HenriqueCoruqieri)

---

## Licença

Este projeto é de uso educacional e portfólio.
