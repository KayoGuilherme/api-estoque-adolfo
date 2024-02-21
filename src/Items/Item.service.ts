import { BadRequestException, Injectable, Delete } from '@nestjs/common';
import { CreateItemDto } from "./dto/create-Item.dto";
import { UpdateItemDto } from "./dto/update-Item.dto";
import { PrismaClient } from "@prisma/client";



@Injectable()
export class ItemService {

    constructor(
       private readonly prisma: PrismaClient
    ) { }


    async get() {
        try {
            const Company = await this.prisma.item.findMany();
            return {
                message: "Lista de Items",
                Company
            };
        } catch (error) {
            console.log(error)
            throw new BadRequestException('Nao foi possivel visalizar os Items.')
        }
    }


    async getById(id_item: number) {
        try {
            const ProductExist = await this.prisma.item.findUnique({
                    where:{
                        id_item: Number(id_item)
                    }
            });
            if (!ProductExist) throw new BadRequestException('Esse Item não existe')

            const Product = await this.prisma.item.findUnique({
              where:{
                id_item: Number(id_item)
              }
        });
            return Product

        } catch (error) {
            throw new BadRequestException('nao foi possivel visualizar este Item. ')
        }
    }

    async create( data: CreateItemDto ) {
        try {
            const product = this.prisma.item.create ({
                data
            })

            return product;
           
        } catch (e) {
            console.log(e)
            throw new BadRequestException('Erro na criação do Item, preencha os campos Corretamente.')
        }
    }


    async update(id_item: number, { nome, estoque, categoryId}: UpdateItemDto) {
        try {
            const ItemExist = await this.prisma.item.findUnique({
                where: {
                    id_item: Number(id_item)
                }
        });
            if (!ItemExist) throw new BadRequestException('Esse Item nao existe')

            const item = await this.prisma.item.update({data: {
                nome,
                estoque,
                categoryId
            },
            where: {
                id_item: Number(id_item)
            }
        })

            return {
                message: "Item Atualizado com sucesso"
            }
        } catch (error) {
            console.log(error)
            throw new BadRequestException('Erro na modificação de informações do Item')
        }
    }


    async delete(id_item: number) {
        const productExist = await this.prisma.item.findFirst({
            where: {
                id_item: Number(id_item)
            }
          });
          if (!productExist) throw new BadRequestException(`Esse Item do id: ${id_item} não existe`)
      
          await this.prisma.item.delete({
            where: {
                id_item: Number(id_item)
            }
          });
      
          return true;
    }
}
