import { NgModule } from '@angular/core'; // importando devido estar em um modulo
import { ReactiveFormsModule } from '@angular/forms'; // Modulo para o tratamento de formulários dentro do Angular
import { BrowserModule } from '@angular/platform-browser'; // estou indicando para o Angular a plataforma da minha app

import { AppComponent } from './app.component'; // componente raiz, obrigatorio ter pelo menos 1 componente

// metadata
@NgModule({ // decorator para gerar informações adicionais a classe que estou exportando
  declarations: [
    AppComponent
    // sempre colocar os componentes que esse modulo terá
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
    // import de modulos extras
  ],
  providers: [], // tudo que vamos distribuir entre os componente declarados
  bootstrap: [AppComponent] // primeiro componente a ser iniciado
  // ainda poderiamos colocar um atributo chamado export, para falarmos o que esse modulo exporta
})
export class AppModule { } // export no ts cria uma classe publica
