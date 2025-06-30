# SignalR Chat Web

Um front-end de chat em tempo real desenvolvido em Angular, conectado via SignalR a um servidor .NET.

## Descrição

Este projeto é uma aplicação web de chat em tempo real, onde múltiplos usuários podem trocar mensagens instantaneamente. O front-end é construído com Angular e utiliza o SignalR para comunicação em tempo real com um backend .NET.

## Tecnologias Utilizadas
- [Angular](https://angular.io/) 19+
- [Angular Material](https://material.angular.io/)
- [SignalR](https://learn.microsoft.com/aspnet/core/signalr/introduction?view=aspnetcore-7.0)
- [TypeScript](https://www.typescriptlang.org/)
- [.NET SignalR Backend](https://learn.microsoft.com/aspnet/core/signalr/introduction?view=aspnetcore-7.0) (não incluso neste repositório)

## Pré-requisitos
- Node.js 18+
- Angular CLI
- Backend .NET com SignalR rodando (ajuste a URL do hub em `home.component.ts` se necessário)

## Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/signalr-chat-web.git
   cd signalr-chat-web
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Certifique-se de que o backend .NET SignalR está rodando e acessível na URL configurada (por padrão: `https://localhost:44300/chat`).

## Executando o Projeto

```bash
ng serve
```

Acesse [http://localhost:4200](http://localhost:4200) no seu navegador.

## Configuração do Backend
- O front-end espera que o backend SignalR esteja disponível em `https://localhost:44300/chat`.
- Se necessário, altere a URL do hub em `src/app/views/home/home.component.ts`:
  ```typescript
  .withUrl('https://localhost:44300/chat')
  ```
- O backend deve implementar os métodos SignalR para broadcast de mensagens e notificação de novos usuários.

## Funcionalidades
- Escolha de nome ao entrar no chat
- Envio e recebimento de mensagens em tempo real
- Notificação de entrada de novos usuários
- Interface responsiva e moderna com Angular Material

## Testes
Para rodar os testes unitários:
```bash
ng test
```

## Licença
Este projeto está sob a licença MIT.

---

> Desenvolvido para fins de estudo e demonstração de integração Angular + SignalR + .NET.
