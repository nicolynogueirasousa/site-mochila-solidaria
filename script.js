lucide.createIcons();

// Estoque inicial
let estoqueItens = [
    { id: 1, categoria: 'MOCHILAS', nome: 'Mochila Escolar Azul', estado: 'Novo', corBg: 'bg-blue-50/70', corBorder: 'border-blue-200', corTexto: 'text-blue-800', icone: 'backpack' },
    { id: 2, categoria: 'CADERNOS', nome: 'Caderno Universitário 10 Matérias', estado: 'Novo', corBg: 'bg-green-50/70', corBorder: 'border-green-200', corTexto: 'text-green-800', icone: 'book-open' },
    { id: 3, categoria: 'ESTOJOS', nome: 'Kit Lápis, Caneta e Borracha', estado: 'Usado - Ótimo', corBg: 'bg-amber-50/70', corBorder: 'border-amber-200', corTexto: 'text-amber-800', icone: 'pen-tool' }
];

// Itens à venda iniciais
let itensVenda = [
    { id: 101, vendedor: 'Juliana Paes', item: 'Livro de Física - Ensino Médio', preco: '30,00', pix: 'juliana@email.com' },
    { id: 102, vendedor: 'Marcos Vinicius', item: 'Calculadora Científica Casio', preco: '45,00', pix: '(11) 98765-4321' }
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
        btn.className = "nav-btn flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all text-white hover:bg-white/10";
    });

    const activeBtn = document.getElementById('btn-' + pageId);
    activeBtn.className = "nav-btn flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all bg-white text-purple-900 shadow-sm";
    
    if(pageId === 'comprar') {
        renderizarLojaVendas();
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleDoacaoSubmit(e) {
    e.preventDefault();
    alert("Doação registrada com sucesso! A escola entrará em contato em breve.");
    e.target.reset();
}

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

// Lógica de Vender Item
function handleVenderSubmit(e) {
    e.preventDefault();
    const vendedor = document.getElementById('vendedor-nome').value;
    const item = document.getElementById('vendedor-item').value;
    const preco = document.getElementById('vendedor-preco').value;
    const pix = document.getElementById('vendedor-pix').value;

    const novoAnuncio = {
        id: Date.now(),
        vendedor,
        item,
        preco,
        pix
    };

    itensVenda.push(novoAnuncio);
    alert("Item cadastrado com sucesso para venda solidária!");
    e.target.reset();
    showPage('comprar');
}

// Renderizar itens para compra na Feirinha
function renderizarLojaVendas() {
    const grid = document.getElementById('comprar-grid');

    if (itensVenda.length === 0) {
        grid.innerHTML = '<div class="col-span-3 text-center py-12 text-slate-400 font-bold">Nenhum item à venda no momento. Seja o primeiro a anunciar!</div>';
        return;
    }

    grid.innerHTML = itensVenda.map(v => `
        <div class="bg-emerald-50/50 border border-emerald-200 p-6 rounded-3xl flex flex-col justify-between shadow-sm">
            <div>
                <div class="flex justify-between items-start mb-4">
                    <span class="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-extrabold">Seminovo</span>
                    <span class="text-xl font-extrabold text-emerald-700">R$ ${v.preco}</span>
                </div>
                <h4 class="font-extrabold text-xl text-slate-900 mb-2">${v.item}</h4>
                <p class="text-xs font-bold text-slate-500 mb-6">Anunciado por: <span class="text-slate-700">${v.vendedor}</span></p>
            </div>
            <button onclick="abrirModalPix('${v.item}', '${v.preco}', '${v.pix}')" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-sm">
                <i data-lucide="qr-code" class="w-4 h-4"></i> Comprar via Pix
            </button>
        </div>
    `).join('');

    lucide.createIcons();
}

function fazerLoginAdmin() {
    document.getElementById('admin-login-view').classList.add('hidden');
    document.getElementById('admin-panel-view').classList.remove('hidden');
    renderizarEstoque();
    renderizarTabelaAdminVendas();
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

// Renderizar Tabela de Vendas na Administração
function renderizarTabelaAdminVendas() {
    const tbody = document.getElementById('tabela-admin-vendas');
    document.getElementById('contador-vendas').innerText = itensVenda.length;

    if(itensVenda.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="py-6 text-center text-slate-400">Nenhum item cadastrado para venda no momento.</td></tr>';
        return;
    }

    tbody.innerHTML = itensVenda.map(v => `
        <tr class="hover:bg-slate-50/50">
            <td class="py-4 font-bold text-slate-800">${v.vendedor}</td>
            <td class="py-4">${v.item}</td>
            <td class="py-4 font-extrabold text-emerald-700">R$ ${v.preco}</td>
            <td class="py-4 font-mono text-xs bg-amber-50 px-2 py-1 rounded text-amber-900">${v.pix}</td>
            <td class="py-4 text-right">
                <button onclick="removerAnuncioVenda(${v.id})" class="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-xl font-bold text-xs transition-colors">Remover</button>
            </td>
        </tr>
    `).join('');
}

function removerAnuncioVenda(id) {
    if(confirm("Deseja realmente remover este anúncio de venda?")) {
        itensVenda = itensVenda.filter(v => v.id !== id);
        renderizarTabelaAdminVendas();
    }
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
    
    estoqueItens = estoqueItens.filter(i => i.id !== itemSelecionadoId);
    
    alert(`Sucesso! Material atribuído para ${aluno} (${turma}).`);
    fecharModalAtribuir();
    renderizarEstoque();
}

// Modal de Pix
function abrirModalPix(item, preco, pix) {
    document.getElementById('pix-item-info').innerText = `${item} — R$ ${preco}`;
    document.getElementById('pix-chave-texto').innerText = pix;
    document.getElementById('modal-pix').classList.remove('hidden');
    document.getElementById('modal-pix').classList.add('flex');
}

function fecharModalPix() {
    document.getElementById('modal-pix').classList.add('hidden');
    document.getElementById('modal-pix').classList.remove('flex');
}

function copiarChavePix() {
    const chave = document.getElementById('pix-chave-texto').innerText;
    navigator.clipboard.writeText(chave);
    alert("Chave Pix copiada para a área de transferência!");
}
