import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { ListaAdeudosService } from "../services/lista-adeudos.service";

class Adeudo {
  public folio: number;
  public fecha: string;
  public productos: string;
  public total: number;
  public abonado: number;
  public pendiente: number;
  constructor() {}
}


export class ListaAdeudosDataSource implements DataSource<Adeudo>{
private listaAdeudosSubject = new BehaviorSubject<Adeudo[]>([]);
private loadingSubject = new BehaviorSubject<boolean>(false);

public loading$ = this.loadingSubject.asObservable();
    constructor(private listaAdeudosService: ListaAdeudosService) {}

connect(collectionViewer: CollectionViewer): Observable<any[]|readonly any[]> {
 return this.listaAdeudosSubject.asObservable();
}
disconnect(collectionViewer: CollectionViewer): void {
        this.listaAdeudosSubject.complete();
        this.loadingSubject.complete();
}
loadListaAdeudos(clientId: number, pageNumber: number, pageLength: number ,order: string, filter: string){
                   this.loadingSubject.next(true);
                   this.listaAdeudosService.getAdeudos(clientId,pageNumber,pageLength,order,filter).pipe(
                     catchError(()=> of([])),
                     finalize(()=> this.loadingSubject.next(false))
                   ).subscribe(adeudos => this.listaAdeudosSubject.next(adeudos));
                }


}