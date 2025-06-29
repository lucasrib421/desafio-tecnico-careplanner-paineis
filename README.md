CarePlanner - Kanban Backend em Django
📋 Descrição do Projeto
Este projeto implementa uma API REST simples em Django para gerenciar um quadro Kanban utilizado por enfermeiros no planejamento do cuidado a pacientes internados. A aplicação possui:

✅ Modelos Bucket (colunas do Kanban) e Card (cards representando pacientes)
✅ API para listar, criar, atualizar e mover cards entre buckets
✅ Frontend básico usando template Django para visualização e manipulação dos cards
✅ Banco de dados PostgreSQL com uso de ORM e migrations
✅ Segurança com autenticação e proteção CSRF ativadas

🛠️ Tecnologias Utilizadas

    Python 3.10+
    Django 4.x
    Django REST Framework
    PostgreSQL
    Fetch API (JavaScript) para consumo da API no frontend

🗂️ Estrutura do Projeto

desafio-careplanner/
├── careplanner/         # Configuração principal do Django
├── kanban/              # App principal contendo modelos, views, serializers e urls
├── static/              # Arquivos CSS e JS do frontend
├── templates/index.html # Interface básica do Kanban
├── manage.py            # Script de comandos Django
├── requirements.txt     # Dependências do projeto
└── README.md            # Instruções do projeto

⚙️ Configuração e Instalação

1. Clone o repositório:
    git clone <https://github.com/lucasrib421/desafio-tecnico-careplanner-paineis/tree/master>
    cd desafio-careplanner

2. Crie e ative o ambiente virtual:
    python -m venv venv

    # Windows
    venv\Scripts\activate

    # Linux/Mac
    source venv/bin/activate

3. Instale as dependências:

    pip install -r requirements.txt

4. Configure o banco de dados PostgreSQL:

    CREATE DATABASE careplanner;
    CREATE USER careuser WITH PASSWORD 'carepassword';
    GRANT ALL PRIVILEGES ON DATABASE careplanner TO careuser;

5. Ajuste as configurações do banco em careplanner/settings.py caso necessário.

6. Aplique as migrations:

    python manage.py migrate

7. Crie um superusuário para acessar o admin:

    python manage.py createsuperuser

8. Inicie o servidor:
    python manage.py runserver

🚀 Uso
    Acesse o Django Admin em: http://127.0.0.1:8000/admin

    Crie os buckets desejados (exemplo: Pendente, Triagem, Plano de cuidado, Alta)

    Crie cards vinculando-os aos buckets via admin ou API

    Acesse o frontend do Kanban em: http://127.0.0.1:8000/

    Visualize os cards e mova-os entre os buckets usando os botões de ação

🔒 Considerações Técnicas

    ✔ API construída com Django REST Framework utilizando ViewSets e Serializers
    ✔ Autenticação padrão do Django ativada com proteção CSRF para segurança das requisições
    ✔ Frontend em HTML/JS puro consumindo a API via Fetch com inclusão do token CSRF para PATCH
    ✔ Banco PostgreSQL configurado via settings e usando migrations para gerenciar o schema
    ✔ Permissões configuradas para garantir que apenas usuários autenticados possam alterar dados

💡 Melhorias Futuras

    Interface React ou similar para melhor experiência de usuário
    Paginação e filtros na API
    Logs e monitoramento da aplicação

📦 API Endpoints - CarePlanner

    A API segue o padrão RESTful para manipulação dos recursos de Buckets (colunas do Kanban) e Cards (pacientes).

💂 Buckets (Colunas do Kanban)

GET /api/buckets/

    Lista todos os buckets.

    Exemplo de resposta:

    [
    {
        "id": 1,
        "name": "Pendente"
    },
    {
        "id": 2,
        "name": "Triagem"
    }
    ]

POST /api/buckets/

    Cria um novo bucket.

    Corpo da requisição:

    {
    "name": "Alta"
    }

📝 Cards (Pacientes)

GET /api/cards/

    Lista todos os cards (pacientes).

Exemplo de resposta:

    [
    {
        "id": 1,
        "name": "João Silva",
        "marital_status": "Solteiro",
        "age": 45,
        "gender": "Masculino",
        "admission_date": "2025-06-29",
        "notes": "Paciente com histórico de hipertensão.",
        "bucket": 1
    }
    ]

POST /api/cards/

    Cria um novo card (paciente).

Corpo da requisição:

    {
    "name": "Maria Souza",
    "marital_status": "Casada",
    "age": 30,
    "gender": "Feminino",
    "admission_date": "2025-06-29",
    "notes": "Sem observações.",
    "bucket": 1
    }

PATCH /api/cards/{id}/

Atualiza parcialmente um card (ex: mover entre buckets).

Corpo da requisição para mover de bucket:

    {
    "bucket": 2
    }

🔒 Segurança

    Apenas usuários autenticados podem alterar dados.
    O frontend utiliza token CSRF nas requisições PATCH.
    A autenticação padrão do Django Admin está habilitada.


🗄️ Script SQL Opcional para Banco PostgreSQL

Caso prefira criar as tabelas manualmente no banco de dados, execute o seguinte SQL:

    -- Tabela Buckets (colunas do Kanban)
    CREATE TABLE kanban_bucket (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );

    -- Tabela Cards (pacientes)
    CREATE TABLE kanban_card (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        marital_status VARCHAR(255) NOT NULL,
        age INTEGER NOT NULL,
        gender VARCHAR(20) NOT NULL,
        admission_date DATE NOT NULL,
        notes TEXT,
        bucket INTEGER NOT NULL REFERENCES kanban_bucket(id) ON DELETE CASCADE
    );

Exemplo de inserção de dados:
    -- Inserindo buckets
    INSERT INTO kanban_bucket (name) VALUES ('Pendente'), ('Triagem'), ('Plano de cuidado'), ('Alta');

    -- Inserindo um card
    INSERT INTO kanban_card (name, marital_status, age, gender, admission_date, notes, bucket)
    VALUES ('João da Silva', 'Solteiro', 30, 'Masculino', CURRENT_DATE, 'Paciente em observação', 1);
