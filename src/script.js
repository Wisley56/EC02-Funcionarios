class Funcionario {
    constructor(nome, idade, cargo, salario) {
        this.nome = nome;
        this.idade = idade;
        this.cargo = cargo;
        this.salario = salario;
        this.id = Date.now().toString();
    }

    getNome() { return this.nome; }
    setNome(nome) { this.nome = nome; }

    getIdade() { return this.idade; }
    setIdade(idade) { this.idade = idade; }

    getCargo() { return this.cargo; }
    setCargo(cargo) { this.cargo = cargo; }

    getSalario() { return this.salario; }
    setSalario(salario) { this.salario = salario; }

    getId() { return this.id; }

    toString() {
        return `Nome: ${this.nome}, Idade: ${this.idade}, Cargo: ${this.cargo}, Salário: ${this.salario}`;
    }
}

let funcionarios = [];
let editandoId = null;

/// Criação/Edição de funcionário
document.getElementById('funcionarioForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const idade = parseInt(document.getElementById('idade').value);
    const cargo = document.getElementById('cargo').value;
    const salario = parseFloat(document.getElementById('salario').value);

    if (editandoId) {
        const funcionario = funcionarios.find(f => f.getId() == editandoId);
        if (funcionario) {
            funcionario.setNome(nome);
            funcionario.setIdade(idade);
            funcionario.setCargo(cargo);
            funcionario.setSalario(salario);
        }
        editandoId = null;
        document.getElementById('cancelarEdicao').style.display = 'none';
        document.querySelector('button[type="submit"]').textContent = 'Cadastrar';
        alert('Edição concluída com sucesso.');
    } else {
        const novoFuncionario = new Funcionario(nome, idade, cargo, salario);
        
        if (funcionarios != null && funcionarios.length > 0) {
            const existe = funcionarios.some(funcionario => 
                funcionario.getId() == novoFuncionario.getId() && funcionario.getNome() == novoFuncionario.getNome()
            );
        
            if (existe) {
                alert('Funcionário já cadastrado.');
            } else {
                funcionarios.push(novoFuncionario);
                alert('Funcionário cadastrado com sucesso.');
            }
        } else {
            funcionarios.push(novoFuncionario);
            alert('Funcionário cadastrado com sucesso.');
        }
        
    }

    atualizarTabela();
    e.target.reset();
});

document.getElementById('cancelarEdicao').addEventListener('click', () => {
    editandoId = null;
    document.getElementById('funcionarioForm').reset();
    document.getElementById('cancelarEdicao').style.display = 'none';
});

function atualizarTabela() {
    const tbody = document.querySelector('#tabelaFuncionarios tbody');
    tbody.innerHTML = '';

    funcionarios.forEach(funcionario => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${funcionario.getNome()}</td>
            <td>${funcionario.getIdade()}</td>
            <td>${funcionario.getCargo()}</td>
            <td>R$ ${funcionario.getSalario().toFixed(2)}</td>
            <td>
                <button class="editar" data-id="${funcionario.id}">Editar</button>
                <button class="excluir" data-id="${funcionario.id}">Excluir</button>
            </td>
        `;

        tbody.appendChild(tr);
    });

    document.querySelectorAll('.editar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            editarFuncionario(id);
        });
    });

    document.querySelectorAll('.excluir').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            excluirFuncionario(id);
        });
    });
}

function editarFuncionario(id) {
    const funcionario = funcionarios.find(f => f.id == id);
    if (funcionario) {
        document.getElementById('nome').value = funcionario.getNome();
        document.getElementById('idade').value = funcionario.getIdade();
        document.getElementById('cargo').value = funcionario.getCargo();
        document.getElementById('salario').value = funcionario.getSalario();
        
        editandoId = id;
        document.getElementById('cancelarEdicao').style.display = 'inline';
        document.querySelector('button[type="submit"]').textContent = 'Salvar Edição';
    }
}

function excluirFuncionario(id) {
    if (confirm('Tem certeza que deseja excluir este funcionário?')) {
        funcionarios = funcionarios.filter(f => f.id != id);
        atualizarTabela();
    }
    
    alert('Funcionário excluído com sucesso.');
}

/// Relatórios ///
document.getElementById('relatorioSalario').addEventListener('click', () => {
    const filtrados = funcionarios.filter(f => f.getSalario() > 5000);
    exibirRelatorio('Funcionários com salário > R$5000:', filtrados);
});

document.getElementById('relatorioMedia').addEventListener('click', () => {
    const total = funcionarios.reduce((sum, f) => sum + f.getSalario(), 0);
    const media = funcionarios.length > 0 ? total / funcionarios.length : 0;
    exibirRelatorio(`Média salarial: R$ ${media.toFixed(2)}`);
});

document.getElementById('relatorioCargos').addEventListener('click', () => {
    const cargoFrequencia = funcionarios.reduce((acc, f) => {
        const cargo = f.getCargo().trim().toUpperCase();
        acc[cargo] = (acc[cargo] || 0) + 1;
        return acc;
    }, {});

    const cargosUnicos = Object.keys(cargoFrequencia).filter(cargo => cargoFrequencia[cargo] === 1);

    exibirRelatorio('Cargos únicos:', cargosUnicos);
});

document.getElementById('relatorioNomes').addEventListener('click', () => {
    const nomesMaiusculos = funcionarios.map(f => f.getNome().toUpperCase());
    exibirRelatorio('Nomes em maiúsculo:', nomesMaiusculos);
});

function exibirRelatorio(titulo, dados = []) {
    const div = document.getElementById('resultadoRelatorio');
    div.innerHTML = `<h3>${titulo}</h3>`;

    if (!dados || (Array.isArray(dados) && dados.length === 0)) {
        dados = 'Nenhum dado encontrado';
    }

    if (Array.isArray(dados)) {
        const ul = document.createElement('ul');
        dados.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            ul.appendChild(li);
        });
        div.appendChild(ul);
    } else {
        div.innerHTML += `<p>${dados}</p>`;
    }
}

