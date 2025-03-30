# README - Sistema de Gestão de Funcionários

## Descrição do Projeto

Sistema web para gerenciamento de funcionários de uma startup de tecnologia, desenvolvido com HTML, CSS e JavaScript, utilizando Docker para conteinerização. O sistema permite:

- Cadastrar novos funcionários
- Listar todos os funcionários em tabela
- Editar informações existentes
- Excluir registros
- Gerar relatórios diversos

## Funcionalidades Implementadas

✅ Cadastro de funcionários com nome, idade, cargo e salário  
✅ Listagem em tabela HTML dinâmica  
✅ Edição de registros existentes  
✅ Exclusão de funcionários  
✅ Relatórios:
- Funcionários com salário > R$5000
- Média salarial da empresa
- Lista de cargos únicos
- Nomes em maiúsculo

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- Docker
- Nginx (servidor web no container)

## Como Executar o Projeto

### Pré-requisitos

- Docker instalado na máquina
- Git (opcional, para clonar o repositório)

### Passos para Execução

1. **Construir a imagem Docker**:
   ```bash
   docker build -t funcionarios-app .
   ```

2. **Executar o container**:
   ```bash
   docker run -d -p 8080:80 --name funcionarios-container funcionarios-app
   ```

3. **Acessar a aplicação**:
   Abra o navegador e acesse:
   ```
   http://localhost:8080
   ```

### Comandos Úteis

- Parar o container:
  ```bash
  docker stop funcionarios-container
  ```

- Remover o container:
  ```bash
  docker rm funcionarios-container
  ```

- Visualizar containers em execução:
  ```bash
  docker ps
  ```

## Estrutura de Arquivos

```
/funcionarios-startup
│── /src
│   ├── index.html        # Página principal
│   ├── script.js         # Lógica da aplicação
│   └── style.css         # Estilos da página
├── Dockerfile            # Configuração do Docker
└── README.md             # Este arquivo
```

## Contribuição

Contribuições são bem-vindas! Siga os passos:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto é de uso livre para fins educacionais.

---

**Observação**: Este README foi gerado por IA e revisado e ajustado pelo autor do projeto.