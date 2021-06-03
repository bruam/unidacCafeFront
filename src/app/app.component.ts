import { ColaboradorService } from './colaborador.service';
import { Colaborador } from './colaborador';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public colaboradores: Colaborador[];
  public editColaborador: Colaborador;
  public deleteColaborador: Colaborador;

  constructor(private colaboradorService: ColaboradorService){}

  ngOnInit() {
    this.getColaboradores();
  }

  public getColaboradores(): void {
    this.colaboradorService.getColaboradores().subscribe(
      (response: Colaborador[]) => {
        this.colaboradores = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddColaborador(addForm: NgForm): void {
    document.getElementById('add-colab-form').click();
    this.colaboradorService.addColaborador(addForm.value).subscribe(
      (response: Colaborador) => {
        console.log(response);
        this.getColaboradores();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public onUpdateColaborador(colaborador: Colaborador): void {
    this.colaboradorService.updateColaborador(colaborador).subscribe(
      (response: Colaborador) => {
        console.log(response);
        this.getColaboradores();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public onDeleteColaborador(colaboradorId: number): void {
    this.colaboradorService.deleteColaborador(colaboradorId).subscribe(
      (response: void) => {
        console.log(response);
        this.getColaboradores();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  public procurarColaboradores(key: string): void {
    const results: Colaborador[] = [];
    for (const colaborador of this.colaboradores) {
      if (colaborador.nome.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ||  colaborador.cpf.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ||  colaborador.opcao.toLowerCase().indexOf(key.toLowerCase()) !== -1) { //se informação do colaborador igual conteudo digitado na caixa de procura
        results.push(colaborador);
      }
    }
    this.colaboradores = results; //passa lista de resultados para lista de colaboradores
    if (!key) { //se caixa de procura não preenchida
      this.getColaboradores(); //recupera colaboradores existentes do banco
    }
  }

  //gerencia qual model esta sendo usado atraves dos ids no html
  public onOpenModal(colaborador: Colaborador, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button'; //mudando o tipo do botão de submit(default) para tipo botão
    button.style.display = 'none'; //escondendo o design do botão
    button.setAttribute('data-toggle','modal');
    if(mode === 'add') {
      button.setAttribute('data-target','#addColabModal');
    }
    if(mode === 'edit') {
      this.editColaborador = colaborador;
      button.setAttribute('data-target','#updateColabModal');
    }
    if(mode === 'delete') {
      this.deleteColaborador = colaborador;
      button.setAttribute('data-target','#deleteColabModal');
    }
    container.appendChild(button);
    button.click();
  }

}
