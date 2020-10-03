import { Tema } from './Tema'

export class Postagem{
    public id: number
    public titulo: string
    public texto: string
    public data: Date
    public tema: Tema    //uma postagem tem 1 tema e 1 tema tem varias postagens
}


