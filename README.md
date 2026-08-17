# ToyMix (Fábrica de Brinquedos)

Projeto full-stack para o gerenciamento de uma fábrica de brinquedos, provendo funcionalidades para cadastro de produtos, gestão de usuários e consumo de APIs.

## 🚀 Tecnologias Utilizadas

### Frontend
- **Framework:** Angular 19
- **Linguagem:** TypeScript
- **Bibliotecas:** NgxBootstrap, Angular Material, Swiper, RxJS, FontAwesome
- **Hospedagem e Deploy Contínuo:** Vercel

### Backend
- **Framework:** Spring Boot (Java)
- **Acesso a Dados:** Spring Data JPA
- **Banco de Dados:** PostgreSQL (Hospedado via Supabase)
- **Containerização:** Docker e Docker Compose
- **Web Server / Proxy Reverso:** Nginx
- **Hospedagem:** Oracle Cloud Infrastructure (OCI) - Virtual Machine
- **Domínio e SSL:** DuckDNS e Certbot (Let's Encrypt)

### CI/CD
- **Pipeline:** GitHub Actions
- **Container Registry:** Docker Hub

## ⚙️ Funcionalidades
- **Gestão de Brinquedos:** Operações CRUD completas (cadastro, leitura, atualização, exclusão e busca personalizada por nome) para os produtos da fábrica.
- **Gestão de Usuários:** Fluxos para controle e autenticação de usuários (suporte a mock e integração com base de dados).
- **Game Wrapper:** Componente do frontend voltado para integração de jogos interativos na plataforma.
- **Deploy Automatizado:** Pipeline GitHub Actions integrada na branch `main` que compila o projeto Java, cria a imagem Docker, faz push no registro e executa a entrega contínua (CD) nos servidores da Oracle por SSH.

## 🏗️ Arquitetura e Deploy (Produção)

A infraestrutura foi desenhada para separar as camadas da aplicação, provendo alta escalabilidade:

1. **Frontend (Vercel):**  
   Conectado diretamente ao repositório GitHub. Qualquer push na branch principal (`main`) dispara um pipeline interno da Vercel que faz o build do projeto Angular e atualiza a interface online.  
   **Acesso em Produção:** [https://fabrica-de-briquedos.vercel.app](https://fabrica-de-briquedos.vercel.app)

2. **Backend (Oracle Cloud VM):**  
   A API Java foi empacotada em um container Docker e está operando dentro de uma Virtual Machine Linux na Oracle Cloud. 
   O servidor faz uso do **Nginx** operando como proxy reverso nas portas 80 e 443. Através da configuração do Certbot, o tráfego é criptografado com SSL (HTTPS) e repassado com segurança para o container do Spring Boot rodando na porta interna 8080.  
   **Endpoint da API:** `https://fabricabrinquedos.duckdns.org`

3. **Banco de Dados (Supabase):**  
   Utiliza um banco de dados relacional PostgreSQL gerido pela infraestrutura do Supabase, conectado à aplicação Java através de pool de conexões (modo SSL exigido).

## 🛠️ Como Executar o Projeto Localmente

### Pré-requisitos
- Node.js (versão 22.x) e NPM
- Java 17+ e Maven
- Variáveis de ambiente configuradas (`DB_URL`, `DB_USERNAME`, `DB_PASSWORD`) apontando para o banco.

### Executando o Backend (Spring Boot)
Na raiz do projeto, acesse a pasta `backend`:
```bash
cd backend
mvn spring-boot:run
```
A API REST subirá no endereço `http://localhost:8080/`.

### Executando o Frontend (Angular)
Em outro terminal, acesse a pasta `fbc-brinquedos`:
```bash
cd fbc-brinquedos
npm install
npm start
```
O frontend subirá por padrão no endereço `http://localhost:4200/`.