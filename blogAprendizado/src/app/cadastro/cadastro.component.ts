import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {


  usuario: Usuario = new Usuario()
  senha: string

  constructor(
    private authService: AuthService,
    private router: Router

  ) { }

  ngOnInit() { 

  }

  conferirSenha(event: any) {
    this.senha = event.target.value

  }


  cadastrar() {
    if ( this.senha === this.usuario.senha ) {
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        alert('Usuário cadastrado com sucesso!')
        this.router.navigate(['/logar'])
        
      })
    } else {
      alert('senhas não são identicas')
    }
  }

}

