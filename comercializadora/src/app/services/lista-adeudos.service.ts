import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import Utils from "../helpers/utils";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class ListaAdeudosService {
  private baseUrl = Utils.getApiUrl();
  constructor(private _http: HttpClient) {}

  getAdeudos(
    clientId: number,
    pageNumber: number,
    pageLength: number,
    order: string,
    filter: string
  ): Observable<any> {
    return this._http
      .get(this.baseUrl + "listaAdeudos", {
        params: new HttpParams()
          .set("clientId", clientId.toString())
          .set("pageNumber", pageNumber.toString())
          .set("filter", filter)
          .set("order", order)
          .set("pageLength", pageLength.toString())
      })
      .pipe(map(res => res["payload"]));
  }

  abonar(id: number, cantidad: number): Observable<any> {
    return this._http.post(this.baseUrl + "abonar", {
      id: id,
      canitdad: cantidad
    });
  }
}
