import { inject, Injectable } from '@angular/core';
import { LoggerService } from '../../../core/services/logger/logger.service';
import { Produto, ProdutoMapper } from '../../../model/produto';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private logger = inject(LoggerService);
  private http = inject(HttpClient);

  private apiUrl = 'https://fakestoreapi.com/products';





  listar(): Observable<Produto[]>{
    this.logger.info("[PRODUTO SERVICE] - Retornando lista de produtos");
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(lista => lista.map(prod => ProdutoMapper.fromJson(prod))),
      catchError(erro => {
        this.logger.info("[PRODUTO SERVICE] - Erro ao listar produto");
        return of([]);
      })
    )
  }

  getById(id: number): Observable<Produto | undefined> {
    //exercicio
    this.logger.info(`[PRODUTO SERVICE] - Buscando produto id=${id}`);
    return of();
  }

  criar(produto: Produto):Observable<any>{
    return this.http.post(this.apiUrl, ProdutoMapper.toJson(produto));

  }

}