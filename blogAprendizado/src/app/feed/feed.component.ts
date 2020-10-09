import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  key = 'data'
  reverse = true

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]

  tema: Tema = new Tema ()
  listaTemas: Tema[]
  idTema: number
  titulo: string
  nomeTema: string
  
  constructor(
     private postagemService: PostagemService,
     private temaService: TemaService,
     private alert: AlertasService,
     private router: Router    
    ) { }

  ngOnInit() {

    let token = environment.token
    if(token == ''){
      this.router.navigate(['/login'])
      this.alert.showAlertInfo("Você precisa fazer login para acessar")
    }


    window.scroll(0,0)

    this.findAllPostagens()
    this.findAllTemas()
  }


  findAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[])=>{
      this.listaPostagens = resp

    })


  }

  publicar(){
    this.tema.id= this.idTema
    this.postagem.tema = this.tema

    if(this.postagem.titulo == null || this.postagem.texto == null || this.postagem.tema == null){

      alert('Preencha todos os campos')
      

    }else{
      this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=> {
        this.postagem = resp
        this.postagem = new Postagem()
        this.alert.showAlertSucess ('Postagem realizada com sucesso')
        this.findAllPostagens()

      })


    }

  }


  findAllTemas(){
    this.temaService.getAllTemas().subscribe((resp: Tema[])=>{
      this.listaTemas = resp

    })


  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp;
    })

  }

  findTituloPostagem() {
    if(this.titulo === ''){
      this.findAllPostagens()

    }else {

      this.postagemService.getByTituloPostagem(this.titulo).subscribe((resp: Postagem[]) => {
          this.listaPostagens = resp 

      })
    }


  }

  findByNomeTema(){
    if(this.nomeTema === ''){
      this.findAllTemas()


    }else{
       this.temaService.getByNomeTema(this.nomeTema).subscribe((resp: Tema[])=>{
         this.listaTemas = resp
       })

    }


  }

}
