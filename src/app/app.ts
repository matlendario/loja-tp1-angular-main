import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './core/header/header';
import { Footer } from "./core/footer/footer";
import { QuantidadeControle } from './shared/quantidade-controle/quantidade-controle';
import { Produto } from './model/produto';
import { ListaProdutos } from "./features/produtos/lista-produtos/lista-produtos";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, QuantidadeControle, ListaProdutos],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Loja TP1 APP');
  sobre?: string;

  x = signal(10);


  receberSobre(msg: string): void{
    this.sobre = msg;
  }


}
