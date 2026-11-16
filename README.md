# TaskForge ⚔️

**Gestão de Projetos e Produtividade Full Stack**  
Boards, listas, cards, prazos e prioridades — estilo Trello com experiência mobile rápida.

[![GitHub](https://img.shields.io/badge/GitHub-SRGAMES22%2FTaskForge-blue?logo=github)](https://github.com/SRGAMES22/TaskForge)

---

## Stack

| Camada     | Tecnologia                              |
|------------|-----------------------------------------|
| Backend    | Ruby on Rails 7.2 (API) + PostgreSQL + JWT |
| Web        | Angular 18 + Tailwind CSS               |
| Mobile     | React Native (Expo)                     |
| Temas      | Light / Dark / **Mutant** (pago)        |

---

## Funcionalidades

- Boards com listas e cards
- Cards com prioridade, prazo, descrição e checklist
- Mover cards entre listas
- Atualização rápida de status no mobile (toque para marcar concluído)
- **3 Temas**: Light / Dark / **Mutant** (vermelho + dourado estilo Deadpool & Wolverine)

---

## Como rodar

### Backend
```bash
cd backend
bundle install
rails db:create db:migrate db:seed
rails s -p 3000
```

**Usuário demo:**  
`demo@taskforge.app` / `123456` (plano **Mutant** ativado)

### Web (Angular)
```bash
cd web
npm install
ng serve
```

### Mobile
```bash
cd mobile
npm install
npx expo start
```

---

## Status

✅ Backend completo (Auth, Boards, Lists, Cards, Checklist, Move)  
✅ Web (Angular) com Login + Lista de Boards + Visualização do Board  
✅ Mobile com Login + Boards + Detalhe do Board + toggle de conclusão  
✅ Tema **Mutant** exclusivo para plano pago  
✅ Seeds com board de exemplo completo  

---

Feito por **[SRGAMES22](https://github.com/SRGAMES22)**
