import {
  Component,
  AfterViewInit,
  OnInit,
  ViewChild,
  ElementRef
} from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import Swal from "sweetalert2";
import { ListaAdeudosService } from "../../services/lista-adeudos.service";
import { Adeudo } from "../../models/adeudo";
import Utils from "../../helpers/utils";
import { ListaAdeudosDataSource } from "../../datasources/lista-adeudos.datasource";
import { debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import { fromEvent, merge } from "rxjs";

@Component({
  selector: "app-lista-adeudos",
  templateUrl: "./lista-adeudos.component.html",
  styleUrls: ["./lista-adeudos.component.css"]
})
export class ListaAdeudosComponent implements OnInit {
  displayedColumns = [
    "folio",
    "fecha",
    "productos",
    "total",
    "abonado",
    "pendiente",
    "opciones"
  ];
  adeudo: Adeudo;
  dataSource: ListaAdeudosDataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("input") input: ElementRef;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private listaAdeudosService: ListaAdeudosService
  ) {}
  errorMessage: string;

  ngOnInit(): void {
    this.adeudo = this._route.snapshot.data["adeudo"];
    this.dataSource = new ListaAdeudosDataSource(this.listaAdeudosService);
    this.dataSource.loadListaAdeudos(this.adeudo.folio, 0, 3, "", "asc");
    this._route.params.subscribe((params: Params) => {
      console.log("id " + params.clientId);
    });
  }
  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, "keyup")
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadAdeudosPage();
        })
      )
      .subscribe();

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadAdeudosPage()))
      .subscribe();
  }

  loadAdeudosPage() {
    this.dataSource.loadListaAdeudos(
      this.adeudo.folio,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.input.nativeElement.value,
      this.sort.direction
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filterValue.trim().toLowerCase();

    //if (this.dataSource.paginator) {
    //this.dataSource.paginator.firstPage();
    //}
  }

  async abonar(e, adeudo) {
    this.muestraModal(adeudo);
  }
  async muestraModal(adeudo: Adeudo) {
    const { value: formValues } = await Swal.fire({
      title: "Venta realizada el: " + adeudo.fecha,
      html:
        "<h2>El monto de venta fue de:</h2>" +
        "<h3>$" +
        adeudo.total +
        "</h3>" +
        "<h2>Se han pagado:</h2>" +
        "<h3>$" +
        adeudo.abonado +
        "</h3>" +
        "<h2>Saldo pendiente:</h2>" +
        "<h3>$" +
        adeudo.pendiente +
        "</h3>" +
        "<h2>Ingrese la cantidad que se abonará a la dueda:</h2>" +
        '<span>$</span> <input id="cantidadInput" type="number" class="swal2-input" style="width:100px;">',
      focusConfirm: false,
      preConfirm: () => {
        let cantidad = (document.getElementById(
          "cantidadInput"
        ) as HTMLTextAreaElement).value;
        return [cantidad];
      }
    });

    if (formValues) {
      var cantidad: number = +formValues[0];
      if (cantidad > 0) {
        this.abonarDinero(cantidad, adeudo);
      } else {
        Utils.showErrorNotification("Ingrese una cantidad válida");
      }
    }
  }
  abonarDinero(cantidad, adeudo) {
    this.listaAdeudosService.abonar(adeudo.id, cantidad).subscribe({
      next: data => {
        if (data.pendiente == 0) {
          Utils.showSuccessNotification("La deuda ha sido saldada");
        } else {
          Utils.showSuccessNotification("Se ha abonado correctamente");
        }
      },
      error: error => {
        this.errorMessage = error.message;
        Utils.showErrorNotification(this.errorMessage);
      }
    });
  }
  saldar(e, adeudo) {
    Swal.fire({
      title: "¿Está seguro?",
      text: "Se saldará la dueda en su totalidad",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Continuar",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.isConfirmed) {
        this.abonarDinero(adeudo.pendiente, adeudo);
      }
    });
  }
}
