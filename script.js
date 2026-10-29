lucide.createIcons();

// Estoque inicial idêntico aos seus prints da aba Administração
let estoqueItens = [
    { id: 1, categoria: 'MOCHILAS', nome: 'Mochila Escolar Azul', estado: 'Novo', corBg: 'bg-blue-50/70', corBorder: 'border-blue-200', corTexto: 'text-blue-800', icone: 'backpack' },
    { id: 2, categoria: 'CADERNOS', nome: 'Caderno Universitário 10 Matérias', estado: 'Novo', corBg: 'bg-green-50/70', corBorder: 'border-green-200', corTexto: 'text-green-800', icone: 'book-open' },
    { id: 3, categoria: 'ESTOJOS', nome: 'Kit Lápis, Caneta e Borracha', estado: 'Usado - Ótimo', corBg: 'bg-amber-50/70', corBorder: 'border-amber-200', corTexto: 'text-amber-800', icone: 'pen-tool' }
];

let itemSelecionadoId = null;

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
        page.classList.remove('block');
    });

    document.getElementById(pageId).classList.remove('hidden');
    document.getElementById(pageId).classList.add('block');

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.className = "nav-btn flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm transition-all text-white hover:bg-white/10";
    });

    const activeBtn = document.getElementById('btn-' + pageId);
    activeBtn.className = "nav-btn flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm transition-all bg-white text-purple-900 shadow-sm";
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleDoacaoSubmit(e) {
    e.preventDefault();
    alert("Doação registrada com sucesso! A escola entrará em contato em breve.");
    e.target.reset();
}

// Lógica de Quero Receber (Abrir formulário ao clicar num card)
function abrirFormReceber(categoria) {
    document.getElementById('receber-grid-view').classList.add('hidden');
    document.getElementById('receber-form-view').classList.remove('hidden');
    document.getElementById('receber-form-titulo').innerText = "Solicitar Material: " + categoria;
}

function voltarReceberGrid() {
    document.getElementById('receber-grid-view').classList.remove('hidden');
    document.getElementById('receber-form-view').classList.add('hidden');
}

function handleReceberSubmit(e) {
    e.preventDefault();
    alert("Solicitação enviada com sucesso! A equipe pedagógica entrará em contato.");
    e.target.reset();
    voltarReceberGrid();
}

function fazerLoginAdmin() {
    document.getElementById('admin-login-view').classList.add('hidden');
    document.getElementById('admin-panel-view').classList.remove('hidden');
    renderizarEstoque();
}

// Renderizar o Estoque na Administração
function renderizarEstoque() {
    const grid = document.getElementById('estoque-grid');
    document.getElementById('contador-itens').innerText = estoqueItens.length;

    if (estoqueItens.length === 0) {
        grid.innerHTML = '<div class="col-span-3 text-center py-8 text-slate-400 font-bold">Nenhum item disponível no estoque no momento.</div>';
        return;
    }

    grid.innerHTML = estoqueItens.map(item => `
        <div class="${item.corBg} border ${item.corBorder} p-6 rounded-3xl flex flex-col justify-between shadow-sm">
            <div>
                <div class="flex justify-center mb-4">
                    <div class="p-4 bg-white rounded-2xl shadow-sm ${item.corTexto}">
                        <i data-lucide="${item.icone}" class="w-8 h-8"></i>
                    </div>
                </div>
                <span class="text-xs font-extrabold uppercase tracking-wider text-slate-400 block mb-1">${item.categoria}</span>
                <h4 class="font-extrabold text-lg text-slate-800 mb-4">${item.nome}</h4>
            </div>
            <div class="flex justify-between items-center mt-4 pt-4 border-t border-slate-200/50">
                <span class="px-3 py-1 bg-white text-slate-700 rounded-lg text-xs font-bold shadow-sm">${item.estado}</span>
                <button onclick="abrirModalAtribuir(${item.id})" class="flex items-center gap-1.5 px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-xl font-extrabold text-xs transition-colors shadow-sm">
                    <i data-lucide="user-check" class="w-4 h-4"></i> Atribuir
                </button>
            </div>
        </div>
    `).join('');
    
    lucide.createIcons();
}

// Modal de Atribuir Material
function abrirModalAtribuir(id) {
    itemSelecionadoId = id;
    const item = estoqueItens.find(i => i.id === id);
    if(item) {
        document.getElementById('modal-item-nome').innerText = item.nome + " (" + item.categoria + ")";
        document.getElementById('modal-atribuir').classList.remove('hidden');
        document.getElementById('modal-atribuir').classList.add('flex');
    }
}

function fecharModalAtribuir() {
    document.getElementById('modal-atribuir').classList.add('hidden');
    document.getElementById('modal-atribuir').classList.remove('flex');
    document.getElementById('aluno-atribuido').value = '';
    document.getElementById('turma-atribuida').value = '';
    itemSelecionadoId = null;
}

function confirmarAtribuicao(e) {
    e.preventDefault();
    const aluno = document.getElementById('aluno-atribuido').value;
    const turma = document.getElementById('turma-atribuida').value;
    
    // Remove o item do estoque
    estoqueItens = estoqueItens.filter(i => i.id !== itemSelecionadoId);
    
    alert(`Sucesso! Material atribuído para ${aluno} (${turma}).`);
    fecharModalAtribuir();
    renderizarEstoque();
}
