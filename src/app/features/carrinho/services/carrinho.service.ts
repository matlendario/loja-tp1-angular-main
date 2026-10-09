import { computed, effect, Injectable, signal } from '@angular/core';
import { ItemPedido } from '../../../model/item-pedido';

@Injectable({
  providedIn: 'root',
})
export default class CarrinhoService {

  private _listaItens = signal<ItemPedido[]>(this._carregarProdutos());

  itens = this._listaItens.asReadonly();

  qtdItens = computed(() => this._listaItens().reduce((s,i) => s+i.quantidade,0));

  valorTotal = computed(() => this._listaItens().reduce((s,i) => s + i.quantidade * i.produto.preco, 0));

  constructor(){
    effect(() =>{
      try{
        localStorage.setItem('lojatp1_carrinho',JSON.stringify(this._listaItens));
      }
      catch(e){
        //inserir a exceção no logger ou exibir alguma mensagem de erro

      }
    });
  }

  private _carregarProdutos(): ItemPedido[]{
    try{
      const conteudo = localStorage.getItem('local_carrinho');
      if(!conteudo)
        return[];
      const lista = JSON.parse(conteudo) as ItemPedido[];
      return lista;
    }catch(e){
      //alguma coisa pra tratar o erro
      return[];
    }
  }

  adicionar(produto: Produto, quantidade: number = i){
    if(!produto){
      return;
    }
    const produtos = this._listaItens();
    const idx = produtos.findIndex(it => it.produto.id === produto.id);
    if(idx > -1){
      const listaAtualizada = produtos.slice();
      listaAtualizada[idx] = {...listaAtualizada[idx], quantidade: listaAtualizada[idx].quantidade * quantidade}
      this._listaItens
    }

  }
}
