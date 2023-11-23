# API Node.js - Gerenciamento de Tarefas (Desafio Rocketseat)

## Sobre o projeto

Esta API em Node.js foi desenvolvida como parte do desafio proposto pela Rocketseat. Ela proporciona operações CRUD (Create, Read, Update, Delete) para o gerenciamento de tarefas (tasks), incluindo a funcionalidade de importação e exportação de dados em massa por meio de arquivos CSV.

## Funcionalidades

### **1. Criação de uma task**

- **Rota: `POST - /tasks`**
- **Descrição**: Cria uma nova task no banco de dados, exigindo os campos `title` e `description` no corpo da requisição. Os campos `id`, `created_at`, `updated_at` e `completed_at` são preenchidos automaticamente apenas quando criando manualmente. Quando importando por CSV, esses campos devem ser fornecidos no arquivo.
  **Validações**:
  - Verifica se as propriedades `title` e `description` estão presentes no corpo da requisição.

### **2. Listagem de todas as tasks**

- **Rota: `GET - /tasks`**
- **Descrição**: Lista todas as tasks salvas no banco de dados. Permite busca, filtrando as tasks por `title` e `description`.

### **3. Atualização de uma task pelo `id`**

- **Rota: `PUT - /tasks/:id`**
- **Descrição**: Atualiza uma task específica pelo `id`. O corpo da requisição deve conter apenas o `title` e `description` a serem atualizados. A validação é realizada para garantir que o `id` pertença a uma task existente no banco de dados.
- **Validações**:
  - Verifica se as propriedades `title` e `description` estão presentes no corpo da requisição.
  - Retorna uma mensagem informando se o registro não existe no banco de dados.

### **4. Remoção de uma task pelo `id`**

- **Rota: `DELETE - /tasks/:id`**
- **Descrição**: Remove uma task específica pelo `id`.
- **Validações**:
  - Garante que o `id` pertence a uma task existente no banco de dados.
  - Retorna uma mensagem informando se o registro não existe no banco de dados.

### **5. Marcar uma task como completa pelo `id`**

- **Rota: `PATCH - /tasks/:id/complete`**
- **Descrição**: Marca uma task como completa pelo `id``.
- **Validações**:
  - Retorna uma mensagem informando se o registro não existe no banco de dados.

### **6. Importação e exportação de tasks via CSV**

- **Descrição**: Além das operações básicas, o projeto inclui a funcionalidade de importar e exportar tasks em massa por meio de arquivos CSV. As tasks podem ser lidas de um arquivo CSV e escritas em um arquivo CSV para persistir os dados.

## Estrutura da task

- `id`: Identificador único de cada task.
- `title`: Título da task.
- `description`: Descrição detalhada da task.
- `completed_at`: Data de quando a task foi concluída. O valor inicial é `null`.
- `created_at`: Data de quando a task foi criada.
- `updated_at`: Data de quando a task foi atualizada.

## Testando a API

Um arquivo de configuração para o Insomnia está disponível, `/insomnia.json`. Você pode importar este arquivo no Insomnia para obter coleções de requisições e facilitar os testes da API.

## Executando o projeto

1. Clone este repositório.
2. Instale as dependências utilizando o comando: `yarn`.
3. Execute o projeto usando: `yarn start`.

Certifique-se de ter o Node.js e o yarn instalados em sua máquina.

## Contribuição

Sinta-se à vontade para contribuir com melhorias ou correções neste projeto. Crie um fork do repositório, faça suas alterações e envie um pull request. Estamos abertos a sugestões!

---

**Desenvolvido por Lizandra Malta - github.com/lizandramalta**

_Este projeto foi desenvolvido como parte do desafio proposto pela Rocketseat._
