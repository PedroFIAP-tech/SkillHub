## 🚀 SkillUp – Plataforma de Requalificação Profissional

Bem-vindo ao repositório do projeto **SkillUp**, uma plataforma robusta e completa desenhada para auxiliar usuários na aquisição de novas habilidades e na requalificação profissional para o futuro do trabalho.

-----

### 🎯 Objetivo do Projeto

O **SkillUp** visa fornecer um sistema simples e prático onde os usuários podem **cadastrar seus perfis**, **escolher áreas de interesse** e **acompanhar o progresso** em diversos cursos técnicos e profissionais. O projeto foi desenvolvido cumprindo todos os requisitos das disciplinas da Global Solution, utilizando uma arquitetura completa e moderna.

-----

### 🏗️ Arquitetura e Tecnologias

O projeto SkillUp é composto por um ecossistema de componentes que se integram para oferecer uma experiência completa:

| Componente | Tecnologia Principal | Função |
| :--- | :--- | :--- |
| **Backend (API)** | **Java** (Spring Boot) | Lógica de negócio, autenticação e gerenciamento de dados. |
| **Banco de Dados** | **Oracle** | Armazenamento persistente de dados de usuários, cursos e progresso. |
| **Aplicativo Mobile** | **React Native** | Interface do usuário e visualização de dados em dispositivos móveis. |
| **Simulação (IoT)** | Java / Outro (Simulação) | Representação de um ponto de coleta de dados ou interação no ambiente. |
| **Infraestrutura** | **Microsoft Azure** | Deploy e hospedagem de todos os componentes da aplicação (backend e DB). |

-----

### 💡 Funcionalidades Principais

O sistema SkillUp permite que o usuário realize as seguintes operações:

  * **Criação e Edição de Perfil:** Gerencie seus dados pessoais e áreas de interesse. (CRUD de Perfil)
  * **Consulta e Inscrição em Cursos:** Explore o catálogo e se inscreva nos treinamentos desejados.
  * **Acompanhamento de Progresso:** Registre e monitore seu avanço em cada curso inscrito.
  * **Relatórios e Rankings:** Visualize os cursos mais populares na plataforma.
  * **Visualização Mobile:** Acompanhe dados e progresso de aprendizado diretamente pelo aplicativo.

-----

### 📱 Desenvolvimento do Aplicativo Mobile

O aplicativo móvel é o ponto de interação primário para o usuário final. Foi desenvolvido em **React Native** e se comunica diretamente com a API Java via **Axios**.

#### Requisitos Cumpridos:

1.  **Mínimo de 5 Telas:**
      * **Login:** Autenticação do usuário.
      * **Lista de Cursos:** Catálogo de cursos disponíveis.
      * **Detalhes do Curso:** Informações e opção de inscrição/acompanhamento.
      * **Progresso:** Visualização do avanço nos cursos inscritos.
      * **Perfil:** Visualização e edição dos dados do usuário.
2.  **Navegação Fluida:** Utilização do **React Navigation** para transições suaves entre as telas.
3.  **CRUD Completo:** Consumo da API Java para realizar todas as operações de **C**riar, **R**eferenciar, **U**pdate e **D**eletar.
4.  **Feedback Visual:** Implementação de *loaders* (indicadores de carregamento) e mensagens de erro claras.
5.  **Estilização Personalizada:** Uso de um design coeso com cores, fontes e ícones personalizados.
6.  **Organização do Código:** Estrutura clara em pastas (`components`, `screens`, `services`).

-----

### ⚙️ Como Executar o Projeto

#### Pré-requisitos

  * **Java Development Kit (JDK) 17+**
  * **Oracle Database** (ou similar com as configurações de conexão da aplicação)
  * **Node.js e npm/yarn**
  * **React Native Environment** (Android Studio e/ou Xcode)

#### 1\. Configuração do Backend (API Java)

1.  Clone o repositório do projeto.
2.  Navegue até a pasta do backend.
3.  Configure as credenciais de conexão do banco de dados **Oracle** no arquivo de propriedades (ex: `application.properties` ou `application.yml`).
4.  Execute a aplicação Java (ex: via IDE ou `mvn spring-boot:run`).
5.  O backend estará acessível na porta configurada (padrão 8080, por exemplo).

#### 2\. Configuração do Aplicativo Mobile (React Native)

1.  Navegue até a pasta do aplicativo mobile.
2.  Instale as dependências:
    ```bash
    npm install
    # ou
    yarn install
    ```
3.  Configure a URL base da API Java no arquivo de serviço (ex: `services/api.js`):
    ```javascript
    const api = axios.create({
      baseURL: 'http://<IP_DA_SUA_MAQUINA_OU_AZURE>:8080/api', // Altere aqui lucas
    });
    ```
4.  Execute o aplicativo:
    ```bash
    npm run android
    # ou
    npm run ios
    ```

-----

### ☁️ Deploy em Nuvem (Azure)

O projeto foi configurado para ser *deployado* na plataforma **Microsoft Azure**, garantindo alta disponibilidade e escalabilidade. Os principais serviços utilizados no Azure incluem:

  * **Azure App Service:** Para hospedar a API Java.
  * **Azure Database for Oracle (ou Máquina Virtual):** Para o banco de dados.
  * **Azure Blob Storage (Opcional):** Para ativos estáticos.

-----

### 🧑‍💻 Desenvolvedores

  * Bruno Carlos Soares - **RM 559250**
  * Lucas Borges de Souza - **RM 560027**
  * Pedro Henrique da Silva - **RM 560393**

-----
