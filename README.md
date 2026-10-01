# Cadastro e Gerenciamento de Veículos

Aplicativo mobile em **React Native + Expo + TypeScript** para cadastrar,
listar, pesquisar, editar e excluir veículos, consumindo uma API REST
simulada com **JSON Server**.


---

## ✨ Funcionalidades

- Cadastro de veículos (placa, marca, modelo, ano, cor) com validação
- Listagem em cards com pull-to-refresh
- Pesquisa por placa, modelo, marca ou ano
- Filtros por marca e por ano (com opção de limpar)
- Tela de detalhes
- Edição e exclusão com confirmação
- Tratamento de erros e estados de carregamento

---

## 🛠️ Tecnologias

- **React Native** + **Expo SDK 57**
- **TypeScript**
- **React Navigation** (Native Stack)
- **Axios**
- **JSON Server**

---

## 🚀 Como rodar

### Pré-requisitos

- Node.js 20+
- Expo Go instalado no celular
- Conta Expo (https://expo.dev/signup)
- Celular e PC na mesma rede Wi-Fi

### Instalação

```bash
npm install
```

### Terminal 1 — API

```bash
npm run api
```

Sobe o JSON Server em `http://localhost:3000/veiculos`.

### Terminal 2 — App

```bash
npx expo login     # faça login com a mesma conta do Expo Go
npm start
```

Escaneie o QR Code com o **Expo Go** no celular.

---

## 🌐 Configuração de rede

Se o app não conectar à API, abra `src/constants/api.ts` e informe o IP da
sua máquina:

```ts
const API_HOST_OVERRIDE = '192.168.0.10';  // exemplo
```

Descubra seu IP com:

```bash
ip -4 addr show | grep inet | grep -v 127.0.0.1
```

Depois reinicie: `npx expo start -c`.

---

## 📁 Estrutura

```
src/
├── components/     Componentes de UI
├── screens/        Lista, Formulário e Detalhes
├── services/       Chamadas HTTP (Axios + vehicleService)
├── navigation/     React Navigation
├── types/          Tipagem TypeScript
├── utils/          Validações
└── constants/      URL da API e tema
```

---

## 📜 Scripts

| Comando | Descrição |
|---|---|
| `npm start` | Inicia o Expo |
| `npm run api` | Inicia o JSON Server |

---

## 👤 Autor

Gustavo Broio Bortolan
