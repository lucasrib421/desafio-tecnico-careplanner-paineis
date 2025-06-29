# CarePlanner - Kanban Backend em Django

## Descrição do Projeto

Este projeto implementa uma API REST simples em Django para gerenciar um quadro Kanban utilizado por enfermeiros no planejamento do cuidado a pacientes internados. A aplicação possui:

- Modelos `Bucket` (colunas do Kanban) e `Card` (cards representando pacientes).
- API para listar, criar, atualizar e mover cards entre buckets.
- Frontend básico usando template Django para visualização e manipulação dos cards.
- Banco de dados PostgreSQL com uso de ORM e migrations.
- Segurança com autenticação e proteção CSRF ativadas.

## Tecnologias Utilizadas

- Python 3.10+
- Django 4.x
- Django REST Framework
- PostgreSQL
- Fetch API (JavaScript) para consumo da API no frontend

## Estrutura do Projeto

- `careplanner/`: Configuração principal do Django
- `kanban/`: App principal contendo modelos, views, serializers e urls
- `templates/index.html`: Interface básica do Kanban
- `manage.py`: Script para comandos Django
- `requirements.txt`: Dependências do projeto

## Configuração e Instalação

1. Clone o repositório:

git clone <URL_DO_REPOSITORIO>
cd desafio-careplanner

2.  Crie e ative o ambiente virtual:

python -m venv venv
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

3. Instale as dependências:

pip install -r requirements.txt

4. Configure o banco de dados PostgreSQL:

Crie o banco careplanner

Crie o usuário careuser com a senha carepassword

Conceda permissões ao usuário

Exemplo (via psql):

CREATE DATABASE careplanner;
CREATE USER careuser WITH PASSWORD 'carepassword';
GRANT ALL PRIVILEGES ON DATABASE careplanner TO careuser;

5. Ajuste as configurações do banco em careplanner/settings.py caso necessário.

6. Aplique as migrations:

python manage.py createsuperuser

7. Crie um superusuário para acessar o admin:

python manage.py createsuperuser

8. Inicie o servidor:

python manage.py runserver

Uso
Acesse o admin Django em: http://127.0.0.1:8000/admin
Crie buckets (exemplo: Pendente, Triagem, Plano de cuidado, Alta)

Crie cards vinculando-os aos buckets via API ou admin.

Acesse o frontend simples do Kanban em: http://127.0.0.1:8000/
Aqui é possível visualizar os cards e movê-los entre buckets usando os botões.

Considerações Técnicas
API construída com Django REST Framework utilizando ViewSets e Serializers.

Autenticação padrão do Django ativada com proteção CSRF para segurança das requisições.

Frontend em HTML/JS puro consumindo a API via Fetch com inclusão do token CSRF para PATCH.

Banco PostgreSQL configurado via settings e usando migrations para gerenciar schema.

Permissões configuradas para garantir que apenas usuários autenticados possam alterar dados.

Melhorias Futuras
Implementar autenticação via token JWT para melhor integração com frontends modernos.

Interface React ou similar para uma melhor UX.

Paginação e filtros na API.

Logs e monitoramento.