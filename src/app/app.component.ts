import { Component } from '@angular/core'; // necessário para a criação de um componente 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Todo } from 'src/models/todo.model';

// decorator, estou gerando metadados para essa classe que está sendo exportada
@Component({
  selector: 'app-root', // seletor: o mesmo se torna uma tag html <app-root></app-root>
  templateUrl: './app.component.html', // importação do arquivo com o html do componente
  // template: '<p> meu template </p>', podemos ter essa forma de declarar o html tbm
  styleUrls: ['./app.component.css'] // array onde é definido todos os css desse componente
})
export class AppComponent { // export para tornar a classe publica e poder importar esse componente em outros locais
  public mode = 'list';
  public todos: Todo[] = [];
  public title: string = "Minhas Tarefas";
  public form: FormGroup;

  /*
    Basicamente quando esse componente for importado ele primeiro carrega minhas variaveis declaradas acima
    e depois carrega o contructor carregado abaixo
    Podemos usar o comando ctor para que o mesmo crie a estrutura do constructor
  */
  constructor(private fb: FormBuilder) {
    /* dentro do angular o this tem escopo global, então quando eu utilizo o mesmo eu consigo referencia variaveis
      e métodos definidos dentro da minha classe */
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.required,
      ])]
    });

    // this.todos = JSON.parse(localStorage.getItem('todos') || '[]');
    this.load();
  }

  add() {
    const tittle = this.form.controls['title'].value;
    const id = this.todos.length + 1;

    this.todos.push(new Todo(id, tittle, false));
    this.save();
    this.clear();
  }

  clear() {
    this.form.reset();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);

    if (index != -1) {
      this.todos.splice(index, 1);
    }

    this.save();
  }

  markAsDone(todo: Todo) {
    todo.done = true;

    this.save();
  }

  markAsUndone(todo: Todo) {
    todo.done = false;

    this.save();
  }

  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);

    this.mode = 'list';
  }

  load() {
    const data = localStorage.getItem("todos") || '[]';
    this.todos = JSON.parse(data);
  }

  changeMode(mode: string) {
    this.mode = mode;
  }
}
